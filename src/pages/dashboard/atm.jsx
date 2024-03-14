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
import Papa from "papaparse";
import * as XLSX from "xlsx";
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
  const [formatoRelatorio, setFormatoRelatorio] = useState("pdf");

  const filterLabels = {
    all: "Todos",
    green: "Funcional",
    yellow: "Pendente",
    red: "Urgente",
  };

  /////////////////////////////////

  const generateAllATMsCSV = (filter) => {
    let filteredATMs;

    if (filter === "all") {
      filteredATMs = atms;
    } else {
      filteredATMs = filterATMsByColor(atms, filter);
    }

    const csvData = Papa.unparse(filteredATMs);

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const filename = `relatorio-${filterLabels[filterColor]}-atms.csv`;

    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement("a");

      if (link.download !== undefined) {
        // Browsers com suporte para o atributo download
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error(
          "Seu navegador não suporta o download direto deste arquivo. Tente usando um navegador diferente."
        );
      }
    }
  }; 

  //////////////////

  const generateAllATMsXLSX = (filter) => {
    // Lógica para obter os dados (semelhante ao seu código existente)
    let filteredATMs;
    if (filter === "all") {
      filteredATMs = atms;
    } else {
      filteredATMs = filterATMsByColor(atms, filter);
    }

    // Preparar os dados para o formato XLSX
    const data = [
      [
        "Nome do ATM",
        "Gerente",
        "Localização",
        "Dinheiro (Kwanzas)",
        "Integridade (%)",
        "Papel (unidades)",
        "Status",
      ],
      ...filteredATMs.map((atm) => [
        atm.name,
        atm.managerName,
        atm.location,
        atm.cash,
        atm.integrity,
        atm.coins,
        atm.systemStatus, 
      ]),
    ];

    // Criar uma planilha XLSX
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "ATMs");

    // Gera o arquivo Excel e faz o download
    XLSX.writeFile(wb, `relatorio-${filterLabels[filterColor]}-atms.xlsx`);
  };

  /////

  const generateAllATMsTXT = (filter) => {
    // Lógica para obter os dados (semelhante ao seu código existente)
    let filteredATMs;
    if (filter === "all") {
      filteredATMs = atms;
    } else {
      filteredATMs = filterATMsByColor(atms, filter);
    }

    // Preparar os dados para o formato TXT
    const data = filteredATMs
      .map((atm) => {
        return `
  Nome do ATM: ${atm.name}
  Gerente: ${atm.managerName}
  Localização: ${atm.location}
  Dinheiro (Kwanzas): ${atm.cash}
  Integridade (%): ${atm.integrity}
  Papel (unidades): ${atm.coins}
  Status: ${atm.systemStatus}
  ----------------------
  `;
      })
      .join("");

    // Criar um Blob e gerar uma URL
    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    // Criar um link para o download
    const a = document.createElement("a");
    a.href = url;
    a.download = `relatorio-${filterLabels[filterColor]}-atms.txt`;
    a.click();
  };

  ////

  const generateAllATMsReport = (filter, formato) => {
    if (formato === "pdf") {
      generateAllATMsPDF(filter);
    } else if (formato === "xlsx") {
      generateAllATMsXLSX(filter);
    } else if (formato === "txt") {
      generateAllATMsTXT(filter);
    } else if (formato === "csv") {
      generateAllATMsCSV(filter);
    } else {
      console.error("Formato de relatório não suportado:", formato);
    }
  };

  const generateAllATMsPDF = (filter) => {
    const doc = new jsPDF({ orientation: "landscape" });

    const buttonText =
      filter === "all"
        ? "Gerar Relatório de Todos os ATMs"
        : `Gerar Relatório de ${filterLabels[filterColor]} ATMs`;

    const imgData = `data:image/png;base64,` + logo;
    doc.addImage(imgData, "PNG", doc.internal.pageSize.width - 45, 10, 30, 30);

    doc.setFont("Poppins", "bold");
    doc.setFontSize(18);
    doc.text(
      `Relatório de ${filterLabels[filterColor]} ATMs`,
      doc.internal.pageSize.width / 2,
      25,
      { align: "center" }
    );

    let yPos = 45;

    const tableHeaders = [
      "ATM",
      "Gerente",
      "Localização",
      "Dinheiro (Kwanzas)",
      "Integridade (%)",
      "Papel (unidades)",
      "Status",
    ];

    const headerSpacing = 10;
    const cellWidth = 40;
    const tableWidth = tableHeaders.length * cellWidth;

    const checkPageHeight = () => {
      if (yPos + headerSpacing > doc.internal.pageSize.height - 10) {
        doc.addPage();
        yPos = 10; // Redefine a posição y para o início da página
      }
    };

    const calculateHorizontalOffset = () => {
      return (doc.internal.pageSize.width - tableWidth) / 2;
    };

    // Adiciona cabeçalhos da tabela
    doc.setFillColor(200, 220, 255); // Cor de fundo para cabeçalhos
    doc.setFont("Poppins", "bold");
    doc.setFontSize(12);

    tableHeaders.forEach((header, index) => {
      doc.setDrawColor(0);
      doc.setLineWidth(0.2);
      doc.setFillColor(200, 220, 255);
      const xPosition = calculateHorizontalOffset() + index * cellWidth;
      doc.rect(xPosition, yPos, cellWidth, headerSpacing, "F");
      doc.setTextColor(0);
      doc.text(header, xPosition + 5, yPos + headerSpacing / 2, {
        align: "center",
      });
    });

    yPos += headerSpacing;

    let filteredATMs;

    if (filter === "all") {
      filteredATMs = atms;
    } else {
      filteredATMs = filterATMsByColor(atms, filter);
    }

    filteredATMs.forEach((atm, index) => {
      const lineSpacing = 10;
      const cellSpacing = 5;

      checkPageHeight();

      doc.setFont("Poppins", "normal");

      const dataRow = [
        atm.name,
        atm.managerName,
        atm.location,
        `${atm.cash} Kwanzas`,
        `${atm.integrity}%`,
        `${atm.coins} unidades`,
        atm.systemStatus,
      ];

      doc.setDrawColor(0);
      doc.setLineWidth(0.2);

      // Adiciona dados da tabela
      dataRow.forEach((data, dataIndex) => {
        const xPosition = calculateHorizontalOffset() + dataIndex * cellWidth;
        doc.rect(xPosition, yPos, cellWidth, lineSpacing, "D");
        doc.text(data, xPosition + 5, yPos + cellSpacing);
      });

      yPos += lineSpacing;
    });

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
              <div className="relative mx-2 inline-flex">
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
                onClick={() =>
                  generateAllATMsReport(filterColor, formatoRelatorio)
                }
              >
                {`Gerar Relatório de ${filterLabels[filterColor]} ATMs`}
              </button>

              <div className="relative mx-2 inline-flex">
                <select
                  className="focus:shadow-outline appearance-none rounded border border-gray-300 bg-white px-2 py-2 leading-tight shadow hover:border-gray-400 focus:outline-none"
                  value={formatoRelatorio}
                  onChange={(e) => setFormatoRelatorio(e.target.value)}
                >
                  <option value="pdf">PDF ⇕</option>
                  <option value="xlsx">EXCEL</option>
                  <option value="txt">TXT</option>
                  <option value="csv">CSV</option>
                </select>
              </div>

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
