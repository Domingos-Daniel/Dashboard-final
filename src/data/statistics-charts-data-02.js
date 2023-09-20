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
      size: 15,
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

  
  

export const statisticsChartsData02 = [
 
  {
    color: "green",
    title: "ATMs 100% Funcionais Recebidos esta semana",
    description: "15% de aumento em relação à ontem",
    footer: "Atualizado 2 min atrás",
    chart: dailySalesChart,
  },
];

export default statisticsChartsData02;
