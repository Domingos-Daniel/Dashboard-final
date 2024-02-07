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
import jsPDF from "jspdf";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function Atm() {
  const [atms, setATMs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [viewMode, setViewMode] = useState("card");
  const [filterColor, setFilterColor] = useState("all");
  const [processedATMIds, setProcessedATMIds] = useState([]);
  const [smsSentTimestamps, setSmsSentTimestamps] = useState({});
  const [startDate, setStartDate] = useState(new Date());

  const generateAllATMsPDF = () => {
    const doc = new jsPDF();

    // Título
    doc.setFontSize(18);
    doc.text("Relatório de Todos os ATMs", 20, 15);

    let yPos = 30;

    // Informações de cada ATM
    let attentionATMs = [];
    let mostRequestedService = { name: "", count: 0 };
    let mostErrorProneATM = { id: 0, errorCount: 0 };

    const filteredATMs = atms.filter((atm) => {
      const atmDate = new Date(atm.timestamp);
      return atmDate >= startDate;
    });

    filteredATMs.forEach((atm, index) => {
      const lineSpacing = 10;
      const blockHeight = 50;

      const checkPageHeight = () => {
        if (yPos + blockHeight + lineSpacing > doc.internal.pageSize.height) {
          doc.addPage();
          yPos = 30;
        }
      };

      checkPageHeight();

      doc.setFontSize(12);
      doc.text(`ATM ID: ${atm.id}`, 20, yPos);
      doc.text(`Gerente: ${atm.managerName}`, 20, yPos + lineSpacing);
      doc.text(`Dinheiro: ${atm.cash} Kwanzas`, 20, yPos + 2 * lineSpacing);
      doc.text(`Integridade: ${atm.integrity}%`, 20, yPos + 3 * lineSpacing);
      doc.text(`Papel: ${atm.coins} unidades`, 20, yPos + 4 * lineSpacing);

      doc.line(20, yPos + 5 * lineSpacing, 190, yPos + 5 * lineSpacing);

      // Atualiza as informações de resumo
      if (atm.cash < 30000 || atm.integrity < 50 || atm.coins < 1000) {
        attentionATMs.push(atm.id);
      }

      if (atm.serviceRequestCount > mostRequestedService.count) {
        mostRequestedService.name = atm.mostRequestedService;
        mostRequestedService.count = atm.serviceRequestCount;
      }

      if (atm.errorCount > mostErrorProneATM.errorCount) {
        mostErrorProneATM.id = atm.id;
        mostErrorProneATM.errorCount = atm.errorCount;
      }

      yPos += blockHeight + lineSpacing;
    });

    // Adiciona informações de resumo
    yPos += 20; // Espaçamento antes do resumo
    doc.setFontSize(14);
    doc.text("Resumo:", 20, yPos);

    yPos += 15; // Espaçamento antes dos detalhes do resumo
    doc.setFontSize(12);

    if (attentionATMs.length > 0) {
      doc.text(
        `ATMs que requerem atenção especial: ${attentionATMs.join(", ")}`,
        20,
        yPos
      );
      yPos += 15;
    } else {
      doc.text("Todos os ATMs estão operando normalmente.", 20, yPos);
      yPos += 15;
    }

    doc.text(
      `Serviço mais solicitado: ${mostRequestedService.name} (Total: ${mostRequestedService.count} solicitações)`,
      20,
      yPos
    );
    yPos += 15;

    doc.text(
      `ATM com mais erros: ATM ID ${mostErrorProneATM.id} (Total de erros: ${mostErrorProneATM.errorCount})`,
      20,
      yPos
    );
    yPos += 15;

    // Salva o PDF
    doc.save("relatorio_todos_atms.pdf");
  };

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

    const intervalId = setInterval(fetchData, 1000);

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

              <button
                onClick={generateAllATMsPDF}
                className="ml-4 mt-4 rounded bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-700"
              >
                Gerar Relatório de Todos os ATMs
              </button>

              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
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
