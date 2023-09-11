// firebaseConfig.js
import { initializeApp } from "firebase/app";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3pjjhao5HhdPfJRonDi6cQAwwPmM3KN0",
  authDomain: "bni-atm.firebaseapp.com",
  projectId: "bni-atm",
  storageBucket: "bni-atm.appspot.com",
  messagingSenderId: "1087416068939",
  appId: "1:1087416068939:web:36f4337c62b9747de496ce",
  measurementId: "G-FL067VKJ6W",
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
