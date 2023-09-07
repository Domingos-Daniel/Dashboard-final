import { chartsConfig } from "@/configs";
const dailySalesChart = {
    type: "area",
    height: 320,
    series: [
      {
        name: "Total ATMs",
        data: [10, 140, 50, 150, 65, 100, 140],
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
