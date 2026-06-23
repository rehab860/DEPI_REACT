import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile as firebaseUpdateProfile 
} from 'firebase/auth';

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
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    });
    return unsubscribe; // clean up on unmount
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

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
