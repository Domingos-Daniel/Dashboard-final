// firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const db = getFirestore(firebaseApp);

export { db };
