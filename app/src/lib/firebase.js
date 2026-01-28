// Firebase Configuration - Pure Life Pharmacy
// da yaw demo configuration dy. In production, mung ba environment variables use kw

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "demo-api-key-for-development",
  authDomain: "purelifepharmacy-demo.firebaseapp.com",
  projectId: "purelifepharmacy-demo",
  storageBucket: "purelifepharmacy-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
