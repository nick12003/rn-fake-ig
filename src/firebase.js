// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzcYz73gv0X-VfYrXlxCg154aqqjsad-4",
  authDomain: "fake-ig-app.firebaseapp.com",
  projectId: "fake-ig-app",
  storageBucket: "fake-ig-app.appspot.com",
  messagingSenderId: "126406084042",
  appId: "1:126406084042:web:510031919248a361c7fb33",
  measurementId: "G-DRHPKL6V03",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// setPersistence(auth, browserLocalPersistence);
export const db = getFirestore(app);
