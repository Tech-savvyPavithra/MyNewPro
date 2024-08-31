// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1NdNhh6DtBuLRgp9X0sDwKUSynqny1cQ",
  authDomain: "mynewpro-3ea89.firebaseapp.com",
  projectId: "mynewpro-3ea89",
  storageBucket: "mynewpro-3ea89.appspot.com",
  messagingSenderId: "559232418524",
  appId: "1:559232418524:web:5ac58bb17df54e9781aa19",
  measurementId: "G-EE9Y58DZRE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);  // Initialize Firebase Authentication

export { app, analytics, auth };
