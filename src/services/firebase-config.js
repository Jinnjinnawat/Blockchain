// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4uu3VIdaGCWrxIrSkDwnV0KwM7bir1BI",
  authDomain: "blockchainfarmer-a43a7.firebaseapp.com",
  projectId: "blockchainfarmer-a43a7",
  storageBucket: "blockchainfarmer-a43a7.firebasestorage.app",
  messagingSenderId: "894274905065",
  appId: "1:894274905065:web:43e9c768a07be82da02178",
  measurementId: "G-7SXY3LFCEC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);