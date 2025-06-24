// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaGXTkfzQG9EXgvbR0XFHJur1a7EtgeJY",
  authDomain: "bizzco-app.firebaseapp.com",
  projectId: "bizzco-app",
  storageBucket: "bizzco-app.appspot.com",
  messagingSenderId: "926103740290",
  appId: "1:926103740290:web:671e4cc39b428906b0f99b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);