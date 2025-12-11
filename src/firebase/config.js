// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA31_a_KOyT3Jmi_Lg71zlMOTUqU34AMPg",
  authDomain: "anonymous-message-6233a.firebaseapp.com",
  projectId: "anonymous-message-6233a",
  storageBucket: "anonymous-message-6233a.firebasestorage.app",
  messagingSenderId: "258918699048",
  appId: "1:258918699048:web:5e90226e94caa6debe651d",
  measurementId: "G-7KY9MWP161"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
export const analytics = getAnalytics(app);