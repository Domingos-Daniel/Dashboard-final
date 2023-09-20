import { chartsConfig } from "@/configs";

const websiteViewsChart = {
  type: "bar",
  height: 220,
  series: [
    {
      name: "ATMs Recebidos",
      data: [170, 165, 169, 170, 169, 100, 170],
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#fff",
    plotOptions: {
      bar: {
        columnWidth: "26%",
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["S", "T", "Q", "Q", "S", "S", "D"],
    },
  },
};

const dailySalesChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "ATMs com erro",
      data: [50, 40, 10, 0, 30, 100, 10, 230, 50, 100, 100],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#fff"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "Jan",
        "Fev",
        "Abr",
        "Mar",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ],
    },
  },
};

const completedTasksChart = {
  ...dailySalesChart,
  series: [
    {
      name: "ATMs Operando a 100%",
      data: [350, 40, 300, 220, 200, 250, 240, 230, 300],
    },
  ],
};

export const statisticsChartsData = [
  {
    color: "blue",
    title: "Frequência diária de ATMs",
    description: "Número total de ATMs fornecidos, frequências diária",
    footer: "Dados de 2 min atrás",
    chart: websiteViewsChart,
  },
  {
    color: "pink",
    title: "Frequência de Erros",
    description: "15% de aumento em relação à ontem",
    footer: "Atualizado 1s atrás",
    chart: dailySalesChart,
  },
  {
    color: "green",
    title: "Frequência de ATMs 100%",
    description: "13% de aumento na resolução de problemas nos ATMs",
    footer: "Agora mesmo",
    chart: completedTasksChart,
  },
];

export default statisticsChartsData;
