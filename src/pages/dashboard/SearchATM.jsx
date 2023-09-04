import React, { useState, useEffect } from 'react';
import { getFirestore, collection, where, query, getDocs } from 'firebase/firestore'; 
import firebaseApp from './firebaseConfig';

const db = getFirestore(firebaseApp);

const SearchATM = () => {
  const [searchType, setSearchType] = useState('id'); 
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = async () => {
    try {
      let queryRef;

      if (searchType === 'id') {
        const q = query(collection(db, 'registrosDiario'), where('atmData.id', '==', parseInt(searchTerm, 10)));
        const querySnapshot = await getDocs(q);
      
        if (!querySnapshot.empty) {
          setSearchResult(querySnapshot.docs.map(doc => doc.data()));
        } else {
          setSearchResult([]);
        }
        return;
      } else if (searchType === 'name') {
        const q = query(collection(db, 'registrosDiario'), where('atmData.name', '>=', searchTerm), where('atmData.name', '<=', searchTerm + '\uf8ff'));
        const querySnapshot = await getDocs(q);
      
        if (!querySnapshot.empty) {
          setSearchResult(querySnapshot.docs.map(doc => doc.data()));
        } else {
          setSearchResult([]);
        }
        return;
      } else if (searchType === 'location') {
        const q = query(collection(db, 'registrosDiario'), where('atmData.location', '>=', searchTerm), where('atmData.location', '<=', searchTerm + '\uf8ff'));
        const querySnapshot = await getDocs(q);
      
        if (!querySnapshot.empty) {
          setSearchResult(querySnapshot.docs.map(doc => doc.data()));
        } else {
          setSearchResult([]);
        }
        return;
      }
      

      console.log('Entrou aqui');

      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        setSearchResult([docSnapshot.data()]);
      } else {
        setSearchResult([]);
        console.log('Registro não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao buscar registro:', error);
    }
  };

  // UseEffect para chamar handleSearch quando o searchTerm muda
  useEffect(() => {
    if (searchTerm) {
      handleSearch();
    } else {
      setSearchResult(null);
    }
  }, [searchTerm]);

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-2xl font-semibold mb-4">Pesquisar Registro no Firebase</h1>
      <div className="flex items-center space-x-2 mb-4">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="id">ID do ATM</option>
          <option value="name">Nome do ATM</option>
          <option value="location">Localização do ATM</option>
        </select>
        <input
          type="text"
          placeholder={`Pesquisar por ${searchType === 'id' ? 'ID' : searchType}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 cursor-pointer"
        >
          Pesquisar
        </button>
      </div>

      {searchTerm && searchResult && searchResult.length > 0 ? (
        <div className="mt-4 p-4 border border-gray-300 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Resultado da Pesquisa:</h2>
          <ul>
            {searchResult.map((registro, index) => (
              <li key={index}>
                <p><span className="font-semibold">ID:</span> {registro.atmData.id}</p>
                <p><span className="font-semibold">Nome do ATM:</span> {registro.atmData.name}</p>
                <p><span className="font-semibold">Localização do ATM:</span> {registro.atmData.location}</p>
                {/* Adicione outras propriedades aqui */}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        searchTerm ? (
          <p className="mt-4 text-red-500">Nenhum registro encontrado.</p>
        ) : null
      )}
    </div>
  );
};

export default SearchATM;
