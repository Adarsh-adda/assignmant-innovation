// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyDedvtsNOK8UDxrUA1NSF6COBwvrAEmIUk",
//   authDomain: "assignment-157e9.firebaseapp.com",
//   projectId: "assignment-157e9",
//   storageBucket: "assignment-157e9.appspot.com",
//   messagingSenderId: "768716170430",
//   appId: "1:768716170430:web:84363b19a9cdc0529a6aef",
//   measurementId: "G-F0KG6L3EZS",
// };
const firebaseConfig = {
  apiKey: "AIzaSyAPCmAakKckWHignCQtpnXIbUXB0-vNFSc",
  authDomain: "newtask-72115.firebaseapp.com",
  projectId: "newtask-72115",
  storageBucket: "newtask-72115.appspot.com",
  messagingSenderId: "660842382011",
  appId: "1:660842382011:web:5b74d957d2855e478f1f9e",
  measurementId: "G-BLZ7GC92DQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
