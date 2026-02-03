// Import Firebase core
import { initializeApp } from "firebase/app";

// Import Firebase services you want to use
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2uc-dmGDYG4IDnq4tHj7a1vfk9-CJbQo",
  authDomain: "todolist-d4f9d.firebaseapp.com",
  projectId: "todolist-d4f9d",
  storageBucket: "todolist-d4f9d.appspot.com",
  messagingSenderId: "843678169332",
  appId: "1:843678169332:web:9a37593a0faec5603186a1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
