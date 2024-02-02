import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import { apiUrl } from "../../apiConfig";

const PieChart = () => {
  const [atms, setATMs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        setATMs(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Configura um intervalo para buscar dados a cada 1 minuto
    const intervalId = setInterval(fetchData, 1000);

    // Retorna uma função de limpeza para interromper o intervalo quando o componente for desmontado
    return () => clearInterval(intervalId);
  }, []); // Adicione um array de dependências vazio para garantir que o intervalo seja configurado apenas uma vez

  const calculateTotals = () => {
    const functional = atms.filter(
      (atm) =>
        atm.cash >= 30000 &&
        atm.integrity >= 50 &&
        atm.coins >= 1000 &&
        atm.systemStatus === "on"
    ).length;

    const pending = atms.filter(
      (atm) =>
        (atm.cash > 1000 && atm.cash <= 30000) ||
        (atm.integrity >= 30 && atm.integrity < 50) ||
        (atm.coins >= 500 && atm.coins <= 1000)
    ).length;

    const urgent = atms.length - functional - pending;

    return [functional, pending, urgent];
  };

  const chartData = calculateTotals();

  const options = {
    chart: {
      width: 380,
      type: "pie",
      animations: {
        enabled: true,
        dynamicAnimation: {
          speed: 1000,
        },
      },
      toolbar: {
        show: true,
      },
    },
    labels: ["100% Funcional", "Pendente", "Urgente"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    colors: ["#4caf50", "#e6d200", "#f44336"],
  };

  const series = chartData;

  return (
    <div className="mb-3 rounded-lg p-4">
      <div className="flex items-center justify-center">
        <ApexCharts
          options={options}
          series={series}
          type="pie"
          width={400}
          height={400}
        />
      </div>
    </div>
  );
};

export default PieChart;
