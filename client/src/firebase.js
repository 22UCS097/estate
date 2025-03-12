// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-60271.firebaseapp.com",
  projectId: "estate-60271",
  storageBucket: "estate-60271.firebasestorage.app",
  messagingSenderId: "1052961336580",
  appId: "1:1052961336580:web:7afcd6aec1d6cb401ff451"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);