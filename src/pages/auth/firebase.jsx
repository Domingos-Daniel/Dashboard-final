// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3pjjhao5HhdPfJRonDi6cQAwwPmM3KN0",
  authDomain: "bni-atm.firebaseapp.com",
  projectId: "bni-atm",
  storageBucket: "bni-atm.appspot.com",
  messagingSenderId: "1087416068939",
  appId: "1:1087416068939:web:36f4337c62b9747de496ce",
  measurementId: "G-FL067VKJ6W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);