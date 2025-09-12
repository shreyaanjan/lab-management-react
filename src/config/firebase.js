import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2mtanupNOGh9wcztnfNnBR8VM4i5BxbI",
  authDomain: "react-test-app-3ecc3.firebaseapp.com",
  projectId: "react-test-app-3ecc3",
  storageBucket: "react-test-app-3ecc3.firebasestorage.app",
  messagingSenderId: "892117222086",
  appId: "1:892117222086:web:e51d66253211f66a044dc7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)