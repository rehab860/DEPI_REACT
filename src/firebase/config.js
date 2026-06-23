import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // 1. Import Auth
import { getFirestore } from "firebase/firestore"; // 2. Import Firestore

const firebaseConfig = {
    apiKey: "AIzaSyDSjCqqwrFPwD7TiuuXIloPoZICtBX28q4",
    authDomain: "reevue-156b7.firebaseapp.com",
    projectId: "reevue-156b7",
    storageBucket: "reevue-156b7.firebasestorage.app",
    messagingSenderId: "824149958577",
    appId: "1:824149958577:web:c379d21bc3afce6023e790",
    measurementId: "G-N9SGLC9C29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 3. Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export { app, analytics };
