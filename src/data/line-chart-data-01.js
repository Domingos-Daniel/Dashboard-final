// line-chart-data-01.js
const chartData = {
  labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "100% Funcional",
      color: "#00FF00", // Verde
      data: [15, 13, 15, 16, 10, 11, 16, 13, 15],
    },
    {
      label: "Pendentes",
      color: "#FFFF00", // Amarelo
      data: [1, 2, 1, 0, 3, 2, 0, 1, 1],
    },
    {
      label: "Urgente",
      color: "#FF0000", // Vermelho
      data: [0, 1, 0, 0, 3, 2, 0, 2, 0],
    },
  ],
};

export default chartData;
