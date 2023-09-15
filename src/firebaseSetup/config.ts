// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4ESCjep5tPbgQS_sEqNOgBVHJqW2mLgw",
  authDomain: "webshop-applicationtypescript.firebaseapp.com",
  projectId: "webshop-applicationtypescript",
  storageBucket: "webshop-applicationtypescript.appspot.com",
  messagingSenderId: "76640613737",
  appId: "1:76640613737:web:09808f8953837c6426b9f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()

export { db, app }