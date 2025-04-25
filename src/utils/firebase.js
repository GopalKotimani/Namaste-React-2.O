// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCkCeWdxSYZpH9TxDguXtpIY-QWZI64FA",
  authDomain: "netflixgpt-74c96.firebaseapp.com",
  projectId: "netflixgpt-74c96",
  storageBucket: "netflixgpt-74c96.firebasestorage.app",
  messagingSenderId: "129707706509",
  appId: "1:129707706509:web:fa6470f8e6c578894bbac4",
  measurementId: "G-SDCYZHP6BY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();