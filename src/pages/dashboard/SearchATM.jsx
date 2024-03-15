import React, { useState, useEffect } from "react";
import ATMCard from "./ATMCard"; // Certifique-se de fornecer o caminho correto para o seu componente ATMCard
import { useParams } from "react-router-dom";

const SearchATM = () => {
  const [searchType, setSearchType] = useState("id");
  const [searchTerm, setSearchTerm] = useState("");
  const [allATMs, setAllATMs] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Usar o hook useParams para acessar os parâmetros da URL
  const { id: idParam } = useParams();

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fazer a chamada para a sua API aqui
      const response = await fetch(
        "https://atms-app.com/wp/wp-json/custom-atm-api/v1/atms"
      );
      const data = await response.json();
      setAllATMs(data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar registros:", error);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    let filteredResult = [];

    if (searchType === "id") {
      filteredResult = allATMs.filter(
        (atm) => atm.id_atm === parseInt(searchTerm, 10)
      );
    } else if (searchType === "name") {
      filteredResult = allATMs.filter((atm) =>
        atm.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (searchType === "location") {
      filteredResult = allATMs.filter((atm) =>
        atm.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setSearchResult(filteredResult);
  };

  // UseEffect para chamar fetchData quando o componente monta
  useEffect(() => {
    fetchData();
  }, []);

  // UseEffect para chamar handleSearch quando o searchTerm muda
  useEffect(() => {
    if (searchTerm) {
      handleSearch();
    } else {
      setSearchResult(null);
    }
  }, [searchTerm, searchType, allATMs]);

  // UseEffect para chamar handleSearch quando o idParam muda
  useEffect(() => {
    if (idParam) {
      setSearchType("id");
      setSearchTerm(idParam);
    }
  }, [idParam]);

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="mb-4 text-2xl font-semibold">Pesquisar ATMs</h1>
      <div className="mb-4 flex items-center space-x-2">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="rounded-md border py-2 px-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="id">ID do ATM</option>
          <option value="name">Nome do ATM</option>
          <option value="location">Localização do ATM</option>
        </select>
        <input
          type="text"
          placeholder={`Pesquisar por ${
            searchType === "id" ? "ID" : searchType
          }`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-md border py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="cursor-pointer rounded-md bg-blue-500 py-2 px-4 text-white hover:bg-blue-600"
        >
          {loading ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              className="h-5 w-5 animate-spin"
            >
              <circle cx="12" cy="12" r="10" />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 8v4l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          )}
        </button>
      </div>

      {loading ? (
        <p className="mt-4 animate-pulse text-gray-500">Pesquisando...</p>
      ) : searchTerm && searchResult && searchResult.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {searchResult.map((registro, index) => (
            <ATMCard key={index} atm={registro} />
          ))}
        </div>
      ) : searchTerm ? (
        <p className="mt-4 animate-pulse text-red-500">
          Nenhum registro encontrado.
        </p>
      ) : null}
    </div>
  );
};

export default SearchATM;
