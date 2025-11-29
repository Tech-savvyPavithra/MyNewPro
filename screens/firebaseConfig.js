// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC41TGdqg25g13F20wYszCkkiAj6V1XQfM",
  authDomain: "esp32nitrosis-93433.firebaseapp.com",
  databaseURL: "https://esp32nitrosis-93433-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "esp32nitrosis-93433",
  storageBucket: "esp32nitrosis-93433.firebasestorage.app",
  messagingSenderId: "100385172576",
  appId: "1:100385172576:web:a99dd11447345cdc7ea705",
  measurementId: "G-WPTJ6L4BWB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);           // For authentication (login/signup)
const db = getDatabase(app);         // For realtime database
const analytics = getAnalytics(app); // For analytics

export { app, auth, db, analytics };
