import React, { useState, useEffect } from "react";
import {
  MagnifyingGlassCircleIcon, HomeModernIcon
} from "@heroicons/react/24/solid";
import {
  getFirestore,
  collection,
  where,
  query,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import firebaseApp from "./firebaseConfig";
import ATMCard from "./ATMCard"; // Certifique-se de fornecer o caminho correto para o seu componente ATMCard

const db = getFirestore(firebaseApp);

const ATMByAgency = () => {
  const [searchType, setSearchType] = useState("location");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = async () => {
    try {
      let queryRef;

     if (searchType === "location") {
        const q = query(
          collection(db, "registrosDiario"),
          where("atmData.location", ">=", searchTerm),
          where("atmData.location", "<=", searchTerm + "\uf8ff")
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setSearchResult(querySnapshot.docs.map((doc) => doc.data()));
        } else {
          setSearchResult([]);
        }
        return;
      }

      console.log("Entrou aqui");

      const docRef = doc(db, "registrosDiario", searchTerm);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        setSearchResult([docSnapshot.data()]);
      } else {
        setSearchResult([]);
        console.log("Registro não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar registro:", error);
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
      <h1 className="mb-4 text-2xl font-semibold">
        Pesquisar ATMs
      </h1>
      <div className="mb-4 flex items-center space-x-2">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="rounded-md cursor-pointer text-xs border py-3 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="id">ID do ATM</option>
          <option value="name">Nome do ATM</option>
          <option value="location">Localização da Agência</option>
        </select>
        <input
          type="text"
          placeholder={`Pesquisar por ${
            searchType === "location" ? "location" : searchType
          }`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-md border py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="cursor-pointer rounded-md bg-blue-500 py-2 px-4 text-white hover:bg-blue-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>

        </button>
      </div>

      {searchTerm && searchResult && searchResult.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchResult.map((registro, index) => (
            <ATMCard key={index} atm={registro.atmData} />
          ))}
        </div>
      ) : searchTerm ? (
        <p className="mt-4 text-red-500">Nenhum registro encontrado.</p>
      ) : null}
    </div>
  );
};

export default ATMByAgency;
