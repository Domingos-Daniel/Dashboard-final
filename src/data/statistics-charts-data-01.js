import { chartsConfig } from "@/configs";
const dailySalesChart = {
    type: "line",
    height: 320,
    series: [
      {
        name: "Sales",
        data: [10, 20, 50, 60, 65, 100, 140],
      },
    ],
    options: {
      ...chartsConfig,
      colors: ["#fff"],
      stroke: {
        lineCap: "round",
      },
      markers: {
        size: 10,
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: [
          "Seg",
          "Ter",
          "Qua",
          "Qui",
          "Sex",
          "Sab",
          "Dom",
        ],
      },
    },
  };
  
  const completedTasksChart = {
    ...dailySalesChart,
    series: [
      {
        name: "Tasks",
        data: [120, 150, 150,  100, 150, 133, 30],
      },
    ],
  };
  

export const statisticsChartsData01 = [
 
  {
    color: "blue",
    title: "Frequência de Erros",
    description: "15% de aumento em relação à ontem",
    footer: "Atualizado 1s atrás",
    chart: dailySalesChart,
  },
];

export default statisticsChartsData01;
