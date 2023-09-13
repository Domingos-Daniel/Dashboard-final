import React, { useEffect, useState } from "react";
import axios from "axios";
import ATMCard from "./ATMCard";
import ATMList from "./ATMList";
import PaginationButtons from "./PaginationButtons";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { Square3Stack3DIcon, ListBulletIcon } from "@heroicons/react/24/solid";
import { apiUrl } from '../../apiConfig'; // Importe a URL da API definida globalmente

export function Atm() {
  const [atms, setATMs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [viewMode, setViewMode] = useState("card");
  const [filterColor, setFilterColor] = useState("all"); // Adicione o estado para o filtro de cores

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        setATMs(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
      });
  }, []);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;

  // Função para filtrar os ATMs com base na cor
  const filterATMsByColor = (atms, color) => {
    if (color === "all") {
      return atms;
    } else if (color === "green") {
      return atms.filter(
        (atm) => atm.cash > 30000 && atm.integrity >= 50 && atm.coins > 1000
      );
    } else if (color === "yellow") {
      return atms.filter(
        (atm) =>
          atm.cash > 10000 &&
          atm.cash <= 30000 ||
          atm.integrity < 50 &&
          atm.integrity >= 30||
          atm.coins  > 500 &&
          atm.coins < 1000
      );
    } else if (color === "red") {
      return atms.filter(
        (atm) =>
          !(atm.cash > 30000 && atm.integrity >= 50 && atm.coins > 1000) &&
          !(
            atm.cash > 10000 &&
            atm.cash <= 30000 &&
            atm.integrity < 50 &&
            atm.integrity >= 30
          )
      );
    }
  };

  const currentATMs = filterATMsByColor(
    atms.slice(firstItemIndex, lastItemIndex),
    filterColor
  );

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleFilterChange = (color) => {
    setFilterColor(color);
  };

  return (
    <>
      <Tabs value={viewMode}>
        {/* Adicione um novo Tab para o filtro de cores */}
        <TabsHeader>
          <Tab key="card" value="card" onClick={() => setViewMode("card")}>
            Visualização em Cartão
          </Tab>
          <Tab key="list" value="list" onClick={() => setViewMode("list")}>
            Visualização em Lista
          </Tab>
        </TabsHeader>
        <TabsBody>
          <TabPanel key="card" value="card">
            {/* Adicione um select para o filtro de cores */}
            <div className="filter-select">
              <div className="relative inline-flex">
                <select
                  className="focus:shadow-outline appearance-none rounded border border-gray-300 bg-white px-2 py-1 leading-tight shadow hover:border-gray-400 focus:outline-none"
                  onChange={(e) => handleFilterChange(e.target.value)}
                >
                  <option value="all">Todos</option>
                  <option value="green">100%</option>
                  <option value="yellow">Pendente</option>
                  <option value="red">Urgente</option>
                </select>
              </div>
            </div>
            <div className="App mt-5 flex items-center justify-center">
              <div className="flex flex-wrap gap-6 sm:gap-4 md:gap-6 lg:gap-8">
                {currentATMs.map((atm) => (
                  <ATMCard key={atm.id} atm={atm} />
                ))}
              </div>
            </div>
          </TabPanel>
          <TabPanel key="list" value="list">
            <div className="filter-select">
              <div className="relative inline-flex">
                <select
                  className="focus:shadow-outline appearance-none rounded border border-gray-300 bg-white px-2 py-1 leading-tight shadow hover:border-gray-400 focus:outline-none"
                  onChange={(e) => handleFilterChange(e.target.value)}
                >
                  <option value="all">Todos</option>
                  <option value="green">100%</option>
                  <option value="yellow">Pendente</option>
                  <option value="red">Urgente</option>
                </select>
              </div>
            </div>
            <div className="App mt-5">
              <ATMList atms={currentATMs} />
            </div>
          </TabPanel>
        </TabsBody>
      </Tabs>

      {atms.length > itemsPerPage && (
        <PaginationButtons
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          currentPage={currentPage}
          lastItemIndex={lastItemIndex}
          totalItems={atms.length}
        />
      )}
    </>
  );
}

export default Atm;
