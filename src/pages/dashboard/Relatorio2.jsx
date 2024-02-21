import React, { useState, useEffect } from "react";
import ApexChart from "react-apexcharts";
import jData from "./j.json";

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
    // Limpar problemas anteriores
    setFilteredData([]);
    setProblemMessage("");
    setLineChartData({ categories: [], series: [] });
    setTotalGanhos(0);

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

  const renderProblemsChart = () => {
    return (
      <ApexChart
        options={{
          chart: { type: "line", stacked: false, toolbar: { show: false } },
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
        height={300}
      />
    );
  };

  const handleClearFilters = () => {
    setManagerFilter("");
    setLocationFilter("");
    setStartDateFilter("2024-02-10");
    setEndDateFilter("2024-02-14");
    setCashThreshold(1000000);
    setCoinsThreshold(800);
    setSystemStatusFilter("off");
  };

  return (
    <div className="container mx-auto mt-5 p-4">
      <h1 className="mb-4 text-3xl font-bold">Relatório de ATMs</h1>

      <div className="mb-4 flex">
        <div className="mr-4 w-1/4">
          <label className="mb-2 block">Manager:</label>
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
          <label className="mb-2 block">Limite de Cash:</label>
          <input
            type="number"
            className="w-full border p-2"
            value={cashThreshold}
            onChange={(e) => setCashThreshold(e.target.value)}
          />
        </div>

        <div className="mr-4 w-1/4">
          <label className="mb-2 block">Limite de Coins:</label>
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
            <option value="on">On</option>
            <option value="off">Off</option>
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

      <div className="mb-4">
        <p className="text-red-500">{problemMessage}</p>
      </div>

      <div className="mb-8">{renderProblemsChart()}</div>

      <div>
        <h2 className="mb-4 text-2xl font-bold">ATMs com Problemas:</h2>
        <ul>
          {filteredData.map((atm) => (
            <li key={atm.id} className="mb-2">
              <span className={atm.cash < cashThreshold ? "text-red-500" : ""}>
                Cash: {atm.cash},{" "}
              </span>
              <span
                className={atm.coins < coinsThreshold ? "text-red-500" : ""}
              >
                Coins: {atm.coins},{" "}
              </span>
              <span
                className={
                  atm.systemStatus !== systemStatusFilter ? "text-red-500" : ""
                }
              >
                System Status: {atm.systemStatus}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-lg font-bold">Total de Ganhos: {totalGanhos}</p>
      </div>
    </div>
  );
};

export default Relatorio;
