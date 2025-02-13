// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiSkrgjwLk7D88NK2W8b0JTtuRe2cG1tA",
  authDomain: "mynetflix-6fa6a.firebaseapp.com",
  projectId: "mynetflix-6fa6a",
  storageBucket: "mynetflix-6fa6a.firebasestorage.app",
  messagingSenderId: "765252806076",
  appId: "1:765252806076:web:513dee4f3d17292e19f7b9",
  measurementId: "G-K323ELRW5M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();