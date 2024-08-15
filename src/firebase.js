import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDzCtJ7t32h1tkLvUPwa2sgXS4lfSLVLb4",
  authDomain: "taxiwebsite-787c1.firebaseapp.com",
  projectId: "taxiwebsite-787c1",
  storageBucket: "taxiwebsite-787c1.appspot.com",
  messagingSenderId: "660834076643",
  appId: "1:660834076643:web:1f795b28313447452e82d6",
  measurementId: "G-FL9YWTSC1V"
};

const app = initializeApp(firebaseConfig);


// Initialize Firestore
const firestore = getFirestore(app);


export { app, firestore  };
