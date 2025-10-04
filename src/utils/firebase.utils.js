import { initializeApp } from "firebase/app";

// Auth Service
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// Database Service
import {
  getFirestore, // import db
  // =========================
  doc, // retrieve documents inside db
  setDoc, // set document's data
  getDoc, // get document's data

  // =========================
  collection, // gets a collection Ref instead of document ref
  writeBatch,

  // =========================
  query,
  getDocs,
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

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

// =============== Database Functions ===============
export const db = getFirestore(); // what we pass around

// we get back userAuth from authentication service
// THIS IS HOW WE CREATE THE USER ON SIGN UP
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

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
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  // if does exist, just return reference

  return userDocRef;
};

// Sign Up Form
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

// DATABASE: add to database
// users is the key of the collection
// categories is they key of that collection
export const addCollectionAndDocuments = async (colKey, objsToAdd) => {
  // access db, access collection key,
  const colRef = collection(db, colKey);
  const batch = writeBatch(db);

  // objsToAdd -> entire SHOP_DATA
  // obj -> each category of products
  objsToAdd.forEach((obj) => {
    // our document instance references the collectionRef which targets db and the collectionKey aka 'categories'
    const docRef = doc(colRef, obj.title.toLowerCase());

    // has db, collectionKey aka 'categories', document reference title

    // set docRef location and set it with value of obj
    batch.set(docRef, obj);
  });

  await batch.commit();
  console.log("done");
};

// prevents breakage from future changes of firebase
// centralize it here in this file
export const getCategoriesAndDocuments = async () => {
  const colRef = collection(db, "categories");
  const q = query(colRef); // returns obj

  const querySnapshot = await getDocs(q); // documents in the snapshot
  // reducing over the array of docs - MOST CONFUSING PART
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};
