import { getFirestore } from 'firebase/firestore';
import firebaseApp from '@/firebaseConfig'; // Adjust the import path as needed

const db = getFirestore(firebaseApp);

export { db };
