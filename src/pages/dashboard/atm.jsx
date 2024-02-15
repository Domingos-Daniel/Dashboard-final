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
import { apiUrl, logo } from "../../apiConfig";
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
  const [filterValue, setFilterValue] = useState("all");

  const filterLabels = {
    all: "Todos",
    green: "Funcional",
    yellow: "Pendente",
    red: "Urgente",
  };

  const generateAllATMsPDF = (filter) => {
    const doc = new jsPDF();

    const buttonText =
      filter === "all"
        ? "Gerar Relatório de Todos os ATMs"
        : `Gerar Relatório de ${filterLabels[filterColor]} ATMs`;

    // Adiciona imagem
    const imgData = `data:image/png;base64,` + logo; // Substitua logo pela base64 da sua imagem
    doc.addImage(imgData, "PNG", doc.internal.pageSize.width - 45, 10, 30, 30);

    // Título
    doc.setFont("Poppins", "bold");
    doc.setFontSize(18);
    doc.text(`Relatório de ${filterLabels[filterColor]} ATMs`, 20, 25);

    let yPos = 45;

    // Informações de cada ATM
    let attentionATMs = [];
    let mostRequestedService = { name: "", count: 0 };
    let mostErrorProneATM = { id: 0, errorCount: 0 };
    let filteredATMs;

    if (filter === "all") {
      filteredATMs = atms;
    } else {
      // Utiliza a função filterATMsByColor para aplicar o filtro
      filteredATMs = filterATMsByColor(atms, filter);
    }

    filteredATMs.forEach((atm, index) => {
      const lineSpacing = 10;
      const blockHeight = 90; // Ajustei a altura do bloco

      const checkPageHeight = () => {
        if (yPos + blockHeight + lineSpacing > doc.internal.pageSize.height) {
          doc.addPage();
          yPos = 30;
        }
      };

      checkPageHeight();

      // Nome do ATM negritado
      doc.setFont("Poppins", "bold");
      doc.setFontSize(14);
      doc.text(`Nome do ATM: ${atm.name}`, 20, yPos);
      yPos += lineSpacing;

      // Demais informações
      doc.setFont("Poppins", "normal");
      doc.text(`Gerente: ${atm.managerName}`, 20, yPos);
      doc.text(`Localização: ${atm.location}`, 20, yPos + lineSpacing);

      // Cores para Cash, Papel, Integrity e SystemStatus
      const cashColor = atm.cash >= 30000 ? [0, 128, 0] : [255, 0, 0];
      const coinsColor = atm.coins >= 1000 ? [0, 128, 0] : [255, 0, 0];
      const integrityColor = atm.integrity >= 50 ? [0, 128, 0] : [255, 0, 0];
      const systemStatusColor =
        atm.systemStatus === "on" ? [0, 128, 0] : [255, 0, 0];

      // Adiciona informações coloridas
      doc.setTextColor(...cashColor);
      doc.text(`Dinheiro: ${atm.cash} Kwanzas`, 20, yPos + 3 * lineSpacing);
      doc.setTextColor(0, 0, 0); // Retorna à cor preta

      doc.setTextColor(...integrityColor);
      doc.text(`Integridade: ${atm.integrity}%`, 20, yPos + 4 * lineSpacing);
      doc.setTextColor(0, 0, 0); // Retorna à cor preta

      doc.setTextColor(...coinsColor);
      doc.text(`Papel: ${atm.coins} unidades`, 20, yPos + 5 * lineSpacing);
      doc.setTextColor(0, 0, 0); // Retorna à cor preta

      doc.setTextColor(...systemStatusColor);
      doc.text(
        `Status de Sistema: ${atm.systemStatus}`,
        20,
        yPos + 6 * lineSpacing
      );
      doc.setTextColor(0, 0, 0); // Retorna à cor preta

      doc.line(20, yPos + 7 * lineSpacing, 190, yPos + 7 * lineSpacing);

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

      yPos += 7 * lineSpacing;
    });

    // Adiciona informações de resumo
    yPos += 10; // Espaçamento antes do resumo
    doc.setFont("Poppins", "bold");
    doc.setFontSize(14);
    doc.text(`Resumo de ${filterLabels[filterColor]} ATMs:`, 20, yPos);

    yPos += 15; // Espaçamento antes dos detalhes do resumo
    doc.setFont("Poppins", "normal");
    doc.setFontSize(12);

    if (attentionATMs.length > 0) {
      doc.setTextColor(255, 0, 0); // Vermelho para ATMs que requerem atenção
      doc.text(
        `ATMs que requerem atenção especial: ${attentionATMs.join(", ")}`,
        20,
        yPos
      );
      yPos += 15;
    } else {
      doc.setTextColor(0, 128, 0); // Verde para todos os ATMs operando normalmente
      doc.text("Todos os ATMs estão operando normalmente.", 20, yPos);
      yPos += 15;
    }

    doc.setTextColor(0, 0, 0); // Retorna à cor preta
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

    // Adiciona rodapé com data e hora
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    const formattedTime = `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    const filename = `relatorio-${filterLabels[filterColor]}-atms-${formattedDate}-${formattedTime}.pdf`;
    doc.setFontSize(10);
    doc.text(
      `Processado por atms-manager em: ${formattedDate} às ${formattedTime}`,
      15,
      doc.internal.pageSize.height - 10
    );

    // Salva o PDF com o nome do arquivo formatado
    doc.save(filename);
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
        (atm) => atm.cash >= 30000 && atm.integrity >= 50 && atm.coins > 1000
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
          !(atm.cash < 30000 && atm.integrity < 50 && atm.coins < 500)
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
                  onChange={(e) => {
                    handleFilterChange(e.target.value);
                    setFilterValue(e.target.value);
                  }}
                >
                  <option value="all">Todos ⇕</option>
                  <option value="green">100%</option>
                  <option value="yellow">Pendente</option>
                  <option value="red">Urgente</option>
                </select>
              </div>

              <button
                className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                onClick={() => generateAllATMsPDF(filterColor)}
              >
                {`Gerar Relatório de ${filterLabels[filterColor]} ATMs`}
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
