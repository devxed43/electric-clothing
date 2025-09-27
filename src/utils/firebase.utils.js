import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  writeBatch,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD37aDI3aXyeZ_1fDE4Bdy-pNrZ0A2W-KU",
  authDomain: "electric-fashion.firebaseapp.com",
  projectId: "electric-fashion",
  storageBucket: "electric-fashion.firebasestorage.app",
  messagingSenderId: "866276083227",
  appId: "1:866276083227:web:1032fdcea764e68d6f9abe",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Sign In Form
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

// Sign In Form
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Sign Up Form
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const db = getFirestore();
