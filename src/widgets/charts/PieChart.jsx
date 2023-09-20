import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";

const PieChart = () => {
  const [atms, setATMs] = useState([]);
  const maxDataPoints = 10; // Limite de pontos de dados no gráfico

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://my-json-server.typicode.com/Domingos-Daniel/api-teste/atms"
        );
        const data = await response.json();

        setATMs(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const calculateTotals = () => {
    const functional = atms.filter(
      (atm) => atm.cash > 30000 && atm.integrity >= 50 && atm.coins > 1000
    ).length;

    const pending = atms.filter(
      (atm) =>
        (atm.cash > 10000 && atm.cash <= 30000) ||
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
    colors: ["#4caf50", "#e6d200", "#f44336"], // Cores para labels "100% Funcional", "Pendente" e "Urgente"
  };

  const series = chartData;

  return (
    <div className="mb-3 rounded-lg p-4 ">
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
