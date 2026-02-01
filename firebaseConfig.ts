import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAVNnUIFwzQxCTF-yQzyvbZHjyj30I4yps",
  authDomain: "avn-ventures-92028.firebaseapp.com",
  projectId: "avn-ventures-92028",
  storageBucket: "avn-ventures-92028.firebasestorage.app",
  messagingSenderId: "298390394946",
  appId: "1:298390394946:web:30b6c33b629ef5ac6cf5db"
};

let app, db, storage, auth;
let isConfigured = false;

try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  
  db = getFirestore(app);
  storage = getStorage(app);
  auth = getAuth(app);
  isConfigured = true;
  console.log("Firebase connected successfully");
} catch (error) {
  console.error("Firebase initialization error:", error);
}

export { db, storage, auth, isConfigured };