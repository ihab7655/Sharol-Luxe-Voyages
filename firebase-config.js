// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyAUYJ5jJypWSHA1sZUlQWLRYz1k51AIQIU",
  authDomain: "sharol-707f4.firebaseapp.com",
  projectId: "sharol-707f4",
  storageBucket: "sharol-707f4.firebasestorage.app",
  messagingSenderId: "671741319957",
  appId: "1:671741319957:web:e91ea4813e3d5dbab9e71c",
  measurementId: "G-TDF02W6SL6"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
