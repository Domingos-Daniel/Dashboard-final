import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";

const RealtimeATMStatusComponent = ({ bgColor }) => {
  const [atms, setATMs] = useState([]);
  const [totalATMs, setTotalATMs] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://atms-app.com/wp/wp-json/custom-atm-api/v1/atms"
        );
        const data = await response.json();

        setATMs(data);
        setTotalATMs(data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Atualize os dados do gráfico a cada segundo
    const interval = setInterval(() => {
      fetchData();
    }, 500);

    // Limpe o intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, []);

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

    const urgent = totalATMs - functional - pending;

    return {
      functional,
      pending,
      urgent,
    };
  };

  useEffect(() => {
    // Atualize os dados do gráfico a cada segundo
    const interval = setInterval(() => {
      const newChartData = [...chartData, calculateTotals()];
      setChartData(newChartData);
    }, 1000);

    // Limpe o intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, [chartData]); // Certifique-se de monitorar chartData para atualizações

  const options = {
    chart: {
      id: "realtime-atm-status-chart",
      animations: {
        enabled: true,
        dynamicAnimation: {
          speed: 100,
        },
      },
      toolbar: {
        show: true,
      },
    },
    xaxis: {
      type: "datetime",
      categories: chartData.map(
        (data, index) =>
          new Date().getTime() - (chartData.length - index) * 1000
      ),
    },
    yaxis: {
      max: totalATMs,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    zoom: {
      enabled: true,
    },
    colors: ["#4caf50", "#e6d200", "#f44336"], // Cores padrão para 100% funcional, pendente e Urgente
  };

  const series = [
    {
      name: "100% Funcional",
      data: chartData.map((data) => data.functional),
      shift: 1, // Adicione o shift para remover dados antigos
    },
    {
      name: "Pendente",
      data: chartData.map((data) => data.pending),
      shift: 1,
    },
    {
      name: "Urgente",
      data: chartData.map((data) => data.urgent),
      shift: 1,
    },
  ];

  return (
    <div
      className={`realtime-atm-status-component ${bgColor} mb-4 rounded-xl p-4 shadow-xl`}
    >
      <h2 className="mb-4 text-2xl font-semibold">Status em tempo real</h2>
      <ApexCharts options={options} series={series} type="line" height={330} />
    </div>
  );
};

export default RealtimeATMStatusComponent;
