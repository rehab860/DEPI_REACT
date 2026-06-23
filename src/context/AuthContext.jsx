import React, { createContext, useState, useEffect, useRef } from 'react';
import { auth, db } from '../firebase/config';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile as firebaseUpdateProfile 
} from 'firebase/auth';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  doc, 
  deleteDoc 
} from 'firebase/firestore';
import Swal from 'sweetalert2';

// Global window.alert override with SweetAlerts
if (typeof window !== 'undefined') {
  window.alert = (message) => {
    let icon = 'info';
    let title = 'Notification';
    
    const lowerMsg = String(message).toLowerCase();
    if (lowerMsg.includes('success') || lowerMsg.includes('saved')) {
      icon = 'success';
      title = 'Success';
    } else if (
      lowerMsg.includes('error') || 
      lowerMsg.includes('failed') || 
      lowerMsg.includes('invalid') || 
      lowerMsg.includes('wrong')
    ) {
      icon = 'error';
      title = 'Oops...';
    } else if (
      lowerMsg.includes('required') || 
      lowerMsg.includes('please') || 
      lowerMsg.includes('cannot') || 
      lowerMsg.includes('not match')
    ) {
      icon = 'warning';
      title = 'Warning';
    }

    Swal.fire({
      title,
      text: message,
      icon,
      confirmButtonText: 'OK',
      confirmButtonColor: '#1d9e75', // matches var(--primary-teal)
    });
  };
}

const AuthContext = createContext();

const loadAuthState = () => {
  try {
    const storedAuth = localStorage.getItem('reevue_auth_v1');
    if (storedAuth) {
      const parsed = JSON.parse(storedAuth);
      return parsed.user || null;
    }
  } catch (err) {
    console.error('Failed to parse auth state', err);
  }
  return null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(loadAuthState);
  const [authLoading, setAuthLoading] = useState(true);
  const [dbLoading, setDbLoading] = useState(true);
  const latestReviewsRef = useRef([]);

  // Monitor user state automatically
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const formattedUser = {
          name: currentUser.displayName || currentUser.email.split('@')[0],
          email: currentUser.email,
          bio: 'Firebase authenticated user.',
          uid: currentUser.uid,
        };
        setUser(formattedUser);
        localStorage.setItem('reevue_auth_v1', JSON.stringify({ user: formattedUser }));
      } else {
        // Only clear if we were logged in via Firebase
        setUser((prev) => {
          if (prev && prev.uid) {
            localStorage.removeItem('reevue_auth_v1');
            return null;
          }
          return prev;
        });
      }
      setAuthLoading(false);
    });
    return unsubscribe; // clean up on unmount
  }, []);

  // Monitor reviews and sync with localStorage in real-time
  useEffect(() => {
    const reviewsRef = collection(db, 'reviews');
    const q = query(reviewsRef, orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const reviewsList = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        let dateStr = data.date;
        if (!dateStr && data.createdAt) {
          const dateObj = data.createdAt.toDate ? data.createdAt.toDate() : new Date();
          dateStr = dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
        }
        reviewsList.push({
          id: doc.id,
          ...data,
          date: dateStr || 'Recently',
        });
      });

      latestReviewsRef.current = reviewsList;
      localStorage.setItem('reevue_reviews_v1', JSON.stringify(reviewsList));
      setDbLoading(false);
    }, (error) => {
      console.error("Firestore reviews sync error:", error);
      setDbLoading(false);
    });

    return unsubscribe;
  }, []);

  // Intercept localStorage.setItem to capture deletes from other pages
  useEffect(() => {
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function(key, value) {
      originalSetItem.apply(this, arguments);
      if (key === 'reevue_reviews_v1') {
        try {
          const localReviews = JSON.parse(value);
          const deletedReviews = latestReviewsRef.current.filter(
            (firestoreReview) => !localReviews.some((localReview) => localReview.id === firestoreReview.id)
          );
          deletedReviews.forEach((deleted) => {
            deleteDoc(doc(db, 'reviews', deleted.id))
              .then(() => console.log('Successfully deleted from Firestore:', deleted.id))
              .catch((err) => console.error('Failed to delete from Firestore:', err));
          });
        } catch (e) {
          console.error('Failed to sync setItem deletion:', e);
        }
      }
    };
    return () => {
      localStorage.setItem = originalSetItem;
    };
  }, []);

  // Login handler
  const loginUser = (email, password) => {
    if (typeof email === 'object' && email !== null) {
      const payload = email;
      setUser(payload.user);
      localStorage.setItem('reevue_auth_v1', JSON.stringify({ user: payload.user }));
      return Promise.resolve(payload.user);
    }
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Sign up handler
  const signUpUser = async (email, password, displayName) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Add display name to profile
    await firebaseUpdateProfile(userCredential.user, { displayName });
    return userCredential.user;
  };

  // Logout handler
  const logoutUser = () => {
    localStorage.removeItem('reevue_auth_v1');
    setUser(null);
    return signOut(auth);
  };

  // Profile update handler
  const updateProfileUser = async (payload) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...payload };
      localStorage.setItem('reevue_auth_v1', JSON.stringify({ user: updated }));
      return updated;
    });

    if (auth.currentUser) {
      if (payload.name) {
        await firebaseUpdateProfile(auth.currentUser, { displayName: payload.name });
      }
    }
  };

  const authState = {
    user,
    isLoggedIn: !!user,
  };

  const value = {
    auth: authState,
    user,
    isLoggedIn: !!user,
    login: loginUser,
    signup: signUpUser,
    logout: logoutUser,
    updateProfile: updateProfileUser,
  };

  const loading = authLoading || dbLoading;

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
