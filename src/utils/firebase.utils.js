import { initializeApp } from "firebase/app";

// Auth Service
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";

// Database Service
import {
  getFirestore, // import db
  // =========================
  doc, // retrieve documents inside db
  setDoc, // set document's data
  getDoc, // get document's data
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

// =============== Authentication Functions ===============
export const auth = getAuth();

// Sign In Provider Service
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

// =============== Database Functions ===============
export const db = getFirestore(); // what we pass around

// we get back userAuth from authentication service
// THIS IS HOW WE CREATE THE USER ON SIGN UP
export const createUserDocumentFromAuth = async (userAuth) => {
  // does doc reference exist?
  // userDocRef is an instance of a document model

  // 3 args: db, collection, unique id off of the userAuth for THAT user
  const userDocRef = doc(db, "users", userAuth.uid);

  // this gives us the entire document reference
  console.log("user document reference:", userDocRef);

  // kind of like the data. an object
  // gets the document data off of the user document refernece
  const userSnapShot = await getDoc(userDocRef);
  console.log("userSnapShot:", userSnapShot);
  // does the user exist in our database?
  console.log("exists?:", userSnapShot.exists());

  // if user snapshot, doesn't exist, create it
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    // set the document on the user doc ref and we pass in the data to set it with
    try {
      setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  // if does exist, just return reference

  return userDocRef;
};
