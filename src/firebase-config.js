// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔥 Your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyAdDfA0VHBy4KY4qfdfajAkJVRg1IInVWo",
  authDomain: "nutrifit-8bd81.firebaseapp.com",
  projectId: "nutrifit-8bd81",
  storageBucket: "nutrifit-8bd81.firebasestorage.app",
  messagingSenderId: "510485323671",
  appId: "1:510485323671:web:2a564c1e5e49c88ec36ed2"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// ✅ Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
