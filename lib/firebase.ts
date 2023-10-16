// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiU7yJms2n0A2IB_uTJMumn97NPegxccg",
  authDomain: "jm-script.firebaseapp.com",
  projectId: "jm-script",
  storageBucket: "jm-script.appspot.com",
  messagingSenderId: "436587608100",
  appId: "1:436587608100:web:06d7b0eceff0ec8a3ac0b1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
