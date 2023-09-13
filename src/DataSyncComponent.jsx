import React, { useEffect } from 'react';
import { getApiData } from './ApiRequest';
import { db } from '@/pages/dashboard/firebase';

import {
  getFirestore,
  collection,
  addDoc, // Use addDoc to add documents to the collection
} from 'firebase/firestore';
import firebaseApp from '@/pages/dashboard/firebaseConfig'; // Adjust the import path as needed

function DataSyncComponent() {
  useEffect(() => {
    const syncInterval = 24 * 60 * 60 * 1000; // Set the interval to one day in milliseconds

    const syncData = async () => {
      try {
        const apiData = await getApiData();
        const firestore = getFirestore(db);

        const registoDiarioCollection = collection(firestore, 'registrosDiario');

        // Loop through the "atms" array in the API data
        for (const atm of apiData.atms) {
          // Add each ATM as a document in the "registoDiario" collection
          await addDoc(registoDiarioCollection, {
            id: atm.id,
            location: atm.location,
            name: atm.name,
            cash: atm.cash,
            coins: atm.coins,
            systemStatus: atm.systemStatus,
            integrity: atm.integrity,
          });
        }

        console.log('Dados sincronizados com sucesso');
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    // Call syncData immediately and then at the specified interval
    syncData();
    const intervalId = setInterval(syncData, syncInterval);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return null;
}

export default DataSyncComponent;
