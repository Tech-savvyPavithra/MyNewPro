// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOn4_rL86IDzbr6B9AT6sGDuNDhR1iGYM",
  authDomain: "esp32nitrosis.firebaseapp.com",
  databaseURL: "https://esp32nitrosis-default-rtdb.firebaseio.com",
  projectId: "esp32nitrosis",
  storageBucket: "esp32nitrosis.appspot.com",
  messagingSenderId: "22140092534",
  appId: "1:22140092534:web:1e897cb3a89b5d73755f57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);  // Initialize Firebase Authentication
const db = getDatabase(app);

export { app, analytics, auth, db };
