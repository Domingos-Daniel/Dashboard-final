import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const LineChart = ({ chartData, icon, title, description }) => {
  const [chartSeries, setChartSeries] = useState(chartData.datasets.map((dataset) => ({
    name: dataset.label,
    data: [],
  })));

  const options = {
    chart: {
      id: "real-time-line",
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },
      toolbar: {
        show: true,
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        format: "HH:mm:ss",
      },
    },
    yaxis: {
      min: 0,
      max: 150, // Ajuste o valor máximo conforme necessário
    },
    legend: {
      show: true,
    },
    colors: chartData.datasets.map((dataset) => dataset.color), // Cores personalizadas
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimestamp = new Date().getTime();
      const newData = chartData.datasets.map((dataset) => ({
        x: newTimestamp,
        y: Math.floor(Math.random() * 150), // Limitar a 150
      }));

      setChartSeries((prevChartSeries) => {
        return prevChartSeries.map((series, index) => {
          const updatedSeries = [...series.data, newData[index]];
          if (updatedSeries.length > 10) {
            updatedSeries.shift();
          }
          return {
            ...series,
            data: updatedSeries,
          };
        });
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className={`rounded-full w-12 h-12 bg-${icon.color} flex items-center justify-center text-white mb-4`}>
        <i className={`fas fa-${icon.component}`}></i>
      </div>
      <div className="text-center">
        <h4 className="text-xl font-semibold mb-2">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="mt-4">
        <ReactApexChart options={options} series={chartSeries} type="line" height={350} />
      </div>
    </div>
  );
};

export default LineChart;
