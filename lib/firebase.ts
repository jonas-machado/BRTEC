// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC72hTA945mFu4g4fjD6RM5l_KtEB0J3WI",
  authDomain: "brtec-dcbd8.firebaseapp.com",
  projectId: "brtec-dcbd8",
  storageBucket: "brtec-dcbd8.appspot.com",
  messagingSenderId: "17414534723",
  appId: "1:17414534723:web:ad1946bb1a24ecd7c446f6",
  measurementId: "G-XEN91WWEBB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
