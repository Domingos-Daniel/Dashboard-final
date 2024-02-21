import React, { useState, useEffect } from "react";
import ApexChart from "react-apexcharts";
import jData from "./j.json";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import { apiUrl, logo } from "../../apiConfig";
import "jspdf-autotable";
const Relatorio = () => {
  const [atmsData, setAtmsData] = useState(jData);
  const [managerFilter, setManagerFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState("2024-02-10");
  const [endDateFilter, setEndDateFilter] = useState("2024-02-14");
  const [cashThreshold, setCashThreshold] = useState(1000000);
  const [coinsThreshold, setCoinsThreshold] = useState(800);
  const [systemStatusFilter, setSystemStatusFilter] = useState("off");
  const [filteredData, setFilteredData] = useState([]);
  const [problemMessage, setProblemMessage] = useState("");
  const [lineChartData, setLineChartData] = useState({
    categories: [],
    series: [],
  });
  const [totalGanhos, setTotalGanhos] = useState(0);
  useEffect(() => {
    setFilteredData([]); // Limpa os problemas anteriores ao aplicar filtros
    filterData();
  }, [
    managerFilter,
    locationFilter,
    startDateFilter,
    endDateFilter,
    cashThreshold,
    coinsThreshold,
    systemStatusFilter,
  ]);

  const filterData = () => {
    const filtered = atmsData.filter((atm) => {
      return (
        atm.managerName.toLowerCase().includes(managerFilter.toLowerCase()) &&
        atm.location.toLowerCase().includes(locationFilter.toLowerCase()) &&
        new Date(atm.date_saved) >= new Date(startDateFilter) &&
        new Date(atm.date_saved) <= new Date(endDateFilter) &&
        (atm.cash < cashThreshold ||
          atm.coins < coinsThreshold ||
          atm.systemStatus !== systemStatusFilter)
      );
    });

    setFilteredData(filtered);

    const uniqueDates = [
      ...new Set(
        filtered.map((atm) => new Date(atm.date_saved).toLocaleDateString())
      ),
    ];
    const cashProblems = uniqueDates.map(
      (date) =>
        filtered.filter(
          (atm) =>
            new Date(atm.date_saved).toLocaleDateString() === date &&
            atm.cash < cashThreshold
        ).length
    );
    const coinsProblems = uniqueDates.map(
      (date) =>
        filtered.filter(
          (atm) =>
            new Date(atm.date_saved).toLocaleDateString() === date &&
            atm.coins < coinsThreshold
        ).length
    );
    const systemStatusProblems = uniqueDates.map(
      (date) =>
        filtered.filter(
          (atm) =>
            new Date(atm.date_saved).toLocaleDateString() === date &&
            atm.systemStatus !== systemStatusFilter
        ).length
    );

    setLineChartData({
      categories: uniqueDates,
      series: [
        { name: "Cash Problems", data: cashProblems },
        { name: "Coins Problems", data: coinsProblems },
        { name: "System Status Problems", data: systemStatusProblems },
      ],
    });

    const problemCount = filtered.length;
    const totalATMs = atmsData.length;
    const percentage = ((problemCount / totalATMs) * 100).toFixed(2);

    const mostProblematicDates = getMostProblematicDates(
      uniqueDates,
      cashProblems,
      coinsProblems,
      systemStatusProblems
    );
    const mostProblematicATMs = getMostProblematicATMs(filtered);

    const totalGanhosFiltered = mostProblematicATMs.reduce(
      (total, atm) => total + atm.cash,
      0
    );
    setTotalGanhos(totalGanhosFiltered);

    setProblemMessage(
      `Há ${problemCount} ATMs com problemas (${percentage}% do total). ${
        mostProblematicDates.length > 0
          ? `Nos dias ${mostProblematicDates.join(
              ", "
            )} há muitos problemas. Sugerimos verificar [sua sugestão específica aqui].`
          : ""
      } Total de ganhos: ${totalGanhosFiltered}.`
    );
  };

  const getMostProblematicDates = (
    dates,
    cashProblems,
    coinsProblems,
    systemStatusProblems
  ) => {
    const threshold = Math.max(
      ...cashProblems,
      ...coinsProblems,
      ...systemStatusProblems
    );
    return dates.filter(
      (date, index) =>
        cashProblems[index] +
          coinsProblems[index] +
          systemStatusProblems[index] >=
        threshold
    );
  };

  const getMostProblematicATMs = (filtered) => {
    const atmMap = new Map();
    filtered.forEach((atm) => {
      if (!atmMap.has(atm.id)) {
        atmMap.set(atm.id, atm);
      }
    });

    return Array.from(atmMap.values());
  };

  // ...

  const renderProblemsChart = () => {
    return (
      <div className="rounded bg-white p-4 shadow-md">
        <h2 className="mb-4 text-xl font-bold">
          Evolução dos Problemas nos ATMs
        </h2>
        <div className="border-t border-gray-200 pt-4">
          <ApexChart
            options={{
              chart: { type: "line", stacked: false, toolbar: { show: true } },
              xaxis: {
                categories: lineChartData.categories,
                labels: { rotate: -45 },
              },
              yaxis: { title: { text: "Número de ATMs" } },
              colors: ["#FF0000", "#00FF00", "#0000FF"],
              plotOptions: {
                line: {
                  curve: "smooth",
                },
              },
            }}
            series={lineChartData.series}
            type="line"
            height={400}
          />
        </div>
      </div>
    );
  };

  // ...

  const handleClearFilters = () => {
    setManagerFilter("");
    setLocationFilter("");
    setStartDateFilter("2024-02-10");
    setEndDateFilter("2024-02-14");
    setCashThreshold(1000000);
    setCoinsThreshold(800);
    setSystemStatusFilter("off");
    setFilteredData([]); // Limpa os problemas ao limpar filtros
  };

  const generatePDF = () => {
    const pdf = new jsPDF("landscape");
    const imgData = `data:image/png;base64,` + logo; // Imagem base64

    // Adicionar logotipo
    pdf.addImage(imgData, "JPEG", 10, 10, 40, 40);

    // Adicionar título e data
    pdf.setFontSize(16);
    pdf.text("Relatório de ATMs", 60, 25);
    pdf.setFontSize(12);
    pdf.text("Data: " + new Date().toLocaleDateString(), 60, 35);

    // Adicionar tabela de dados filtrados
    const headers = [
      [
        "ID",
        "Location",
        "Name",
        "Cash",
        "Coins",
        "System Status",
        "Integrity",
        "Manager Phone",
        "Manager Name",
        "Date Saved",
      ],
    ];
    const data = filteredData.map((atm) => [
      atm.id,
      atm.location,
      atm.name,
      atm.cash,
      atm.coins,
      atm.systemStatus,
      atm.integrity,
      atm.managerPhone,
      atm.managerName,
      new Date(atm.date_saved).toLocaleDateString(),
    ]);
    pdf.autoTable({
      head: headers,
      body: data,
      startY: 50,
    });

    // Salvar ou abrir o PDF
    pdf.save("relatorio.pdf");
  };

  const generateXLSX = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filteredData);
    XLSX.utils.book_append_sheet(wb, ws, "Relatorio");

    // Salve ou abra o arquivo XLSX
    XLSX.writeFile(wb, "relatorio.xlsx");
  };

  const generateTXT = () => {
    const txtContent = `Relatório de ATMs\nData: ${new Date().toLocaleDateString()}\n\n`;

    // Adicione mais conteúdo conforme necessário

    // Salve ou abra o arquivo TXT
    const blob = new Blob([txtContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "relatorio.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto mt-5 p-4">
      <h1 className="mb-4 text-3xl font-bold">Relatório de ATMs</h1>

      <div className="mb-4 flex">
        <div className="mr-4 w-1/4">
          <label className="mb-2 block">Gestor:</label>
          <input
            type="text"
            className="w-full border p-2"
            value={managerFilter}
            onChange={(e) => setManagerFilter(e.target.value)}
          />
        </div>

        <div className="mr-4 w-1/4">
          <label className="mb-2 block">Localização:</label>
          <input
            type="text"
            className="w-full border p-2"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
        </div>

        <div className="mr-4 w-1/4">
          <label className="mb-2 block">Data de Início:</label>
          <input
            type="date"
            className="w-full border p-2"
            value={startDateFilter}
            onChange={(e) => setStartDateFilter(e.target.value)}
          />
        </div>

        <div className="w-1/4">
          <label className="mb-2 block">Data de Fim:</label>
          <input
            type="date"
            className="w-full border p-2"
            value={endDateFilter}
            onChange={(e) => setEndDateFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-4 flex">
        <div className="mr-4 w-1/4">
          <label className="mb-2 block">Limite de Dinheiro:</label>
          <input
            type="number"
            className="w-full border p-2"
            value={cashThreshold}
            onChange={(e) => setCashThreshold(e.target.value)}
          />
        </div>

        <div className="mr-4 w-1/4">
          <label className="mb-2 block">Limite de Papel:</label>
          <input
            type="number"
            className="w-full border p-2"
            value={coinsThreshold}
            onChange={(e) => setCoinsThreshold(e.target.value)}
          />
        </div>

        <div className="mr-4 w-1/4">
          <label className="mb-2 block">Status do Sistema:</label>
          <select
            className="w-full border p-2"
            value={systemStatusFilter}
            onChange={(e) => setSystemStatusFilter(e.target.value)}
          >
            <option value="on">Online</option>
            <option value="of">Fora de Serviço</option>
          </select>
        </div>

        <div className="flex w-1/4 items-end">
          <button
            className="rounded bg-blue-500 p-2 text-white"
            onClick={handleClearFilters}
          >
            Limpar Filtros
          </button>
        </div>
      </div>

      <div className="flex w-1/4 items-end">
        <button
          className="mr-2 rounded bg-blue-500 p-2 text-white"
          onClick={generatePDF}
        >
          Gerar PDF
        </button>
        <button
          className="mr-2 rounded bg-green-500 p-2 text-white"
          onClick={generateXLSX}
        >
          Gerar XLSX
        </button>
        <button
          className="rounded bg-yellow-500 p-2 text-white"
          onClick={generateTXT}
        >
          Gerar TXT
        </button>
      </div>

      <div className="mb-4">
        <p className="text-red-500">{problemMessage}</p>
      </div>

      <div className="mb-8 rounded bg-white p-4 shadow">
        {renderProblemsChart()}
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-bold">ATMs com Problemas:</h2>
        <ul>
          {getMostProblematicATMs(filteredData).map((atm) => (
            <li key={atm.id} className="mb-2">
              <span>ATM: {atm.name}, </span>
              <span className={atm.cash < cashThreshold ? "text-red-500" : ""}>
                Dinheiro: {atm.cash},{" "}
              </span>
              <span
                className={atm.coins < coinsThreshold ? "text-red-500" : ""}
              >
                Papel: {atm.coins},{" "}
              </span>
              <span>Status: {atm.systemStatus}</span>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-lg font-bold">Total de Ganhos: {totalGanhos}</p>
      </div>
    </div>
  );
};

export default Relatorio;
