const chartData = {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "100% Funcional",
        color: "#00FF00",
        data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
      },
      {
        label: "Pendentes",
        color: "#FFFF00",
        data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
      },
      {
        label: "Urgente",
        color: "#FF0000",
        data: [150, 120, 180, 200, 240, 180, 260, 220, 280],
      },
    ],
  };
  
  export default chartData;
  