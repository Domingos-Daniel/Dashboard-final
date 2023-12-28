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
import { apiUrl } from "../../apiConfig";

export function Atm() {
  const [atms, setATMs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [viewMode, setViewMode] = useState("card");
  const [filterColor, setFilterColor] = useState("all");
  const [processedATMIds, setProcessedATMIds] = useState([]);
  const [smsSentTimestamps, setSmsSentTimestamps] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setATMs(response.data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;

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
          (atm.cash > 10000 && atm.cash <= 30000) ||
          (atm.integrity < 50 && atm.integrity >= 30) ||
          (atm.coins > 500 && atm.coins < 1000)
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

  const sendSMSTwilio = (to, text) => {
    const accountSid = "AC244405a75e6cf7a7a0de3eadf5238a3a"; // Seu Twilio Account SID
    const authToken = "5f36a6f7c2a77dac035f6d410a3a8c55"; // Seu Twilio Auth Token
    const from = "+12295525457"; // Seu número Twilio tire o 0

    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    const auth = "Basic " + btoa(accountSid + ":" + authToken);

    const details = {
      To: to,
      From: from,
      Body: text,
    };

    const formBody = [];
    for (const property in details) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    const requestBody = formBody.join("&");

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Authorization: auth,
      },
      body: requestBody,
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("SMS enviado com sucesso:", responseJson);
      })
      .catch((error) => {
        console.error("Erro ao enviar o SMS:", error);
      });
  };

  const sendSMS = (atm) => {
    const { cash, integrity, coins, managerPhone, managerName, id } = atm;
    const issues = [];

    if (!(cash > 30000 && integrity >= 50 && coins > 1000)) {
      issues.push(`Dinheiro com ${cash} Kwanzas`);
      if (integrity < 50) issues.push(`Integridade baixa com ${integrity}%`);
      if (coins < 1000) issues.push(`Papel baixo com ${coins} unidades`);
    }

    if (
      issues.length > 0 &&
      processedATMIds.filter((atmId) => atmId === id).length < 2
    ) {
      const message = `ATM ID ${id} (${managerName}) está prestes a ficar sem ${issues.join(
        ", "
      )}. Por favor, verifique.`;

      const currentTimestamp = Date.now();
      if (
        !smsSentTimestamps[id] ||
        currentTimestamp - smsSentTimestamps[id] >= 300000
      ) {
        sendSMSTwilio(managerPhone, message);
        setProcessedATMIds([...processedATMIds, id]);
        setSmsSentTimestamps({ ...smsSentTimestamps, [id]: currentTimestamp });
      }
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
            <div className="filter-select">
              <div className="relative inline-flex">
                <select
                  className="focus:shadow-outline appearance-none rounded border border-gray-300 bg-white px-2 py-2 leading-tight shadow hover:border-gray-400 focus:outline-none"
                  onChange={(e) => handleFilterChange(e.target.value)}
                >
                  <option value="all">Todos ⇕</option>
                  <option value="green">100%</option>
                  <option value="yellow">Pendente</option>
                  <option value="red">Urgente</option>
                </select>
              </div>
            </div>
            <div className="App mt-5 flex items-center justify-center">
              <div className="flex flex-wrap gap-6 sm:gap-4 md:gap-6 lg:gap-8">
                {currentATMs.map((atm) => {
                  sendSMS(atm);
                  return <ATMCard key={atm.id} atm={atm} />;
                })}
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
