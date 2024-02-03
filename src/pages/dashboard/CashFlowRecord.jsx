import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import jsPDF from "jspdf";

const CashFlowRecord = ({ atm }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Título
    doc.setFontSize(18);
    doc.text("Relatório de Fluxo de Caixa", 20, 15);

    // Informações
    doc.setFontSize(12);
    doc.text(`Datas de Recarga: ${rechargeDates.join(", ")}`, 20, 30);
    doc.text(`Período de Uso: ${usagePeriod}`, 20, 40);
    doc.text(`Serviço mais Popular: ${popularService}`, 20, 50);
    doc.text(`Média de Levantamento: ${averageWithdrawalAmount}`, 20, 60);

    // Gráfico
    const chartImgData = serviceData.series.map((data, index) => {
      const chartCanvas = document.createElement("canvas");
      const ctx = chartCanvas.getContext("2d");
      const chartOptions = {
        type: "line",
        data: {
          labels: serviceData.labels,
          datasets: [{ label: data.name, data: data.data }],
        },
      };
      new Chart(ctx, chartOptions);

      const imageData = chartCanvas.toDataURL("image/png");
      doc.addImage(imageData, "PNG", 20, 70 + index * 50, 160, 80);
      return imageData;
    });

    // Sugestão
    doc.text(`Sugestão: ${suggestion}`, 20, 70 + chartImgData.length * 50 + 10);

    // Salva o PDF
    doc.save("relatorio_fluxo_caixa.pdf");
  };

  // Simulação de dados fictícios
  const [cashFlowData, setCashFlowData] = useState({
    rechargeDates: ["2023-09-20", "2023-09-15", "2023-09-10"],
    usagePeriod: "Diurno",
    popularService: generateRandomService(),
    averageWithdrawalAmount: "30.000 Kzs",
    serviceData: {
      labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
      series: [
        {
          name: "Levantamentos",
          data: Array.from(
            { length: 7 },
            () => Math.floor(Math.random() * 100) + 1
          ),
        },
        {
          name: "Consultas",
          data: Array.from(
            { length: 7 },
            () => Math.floor(Math.random() * 100) + 1
          ),
        },
        {
          name: "Transferências",
          data: Array.from(
            { length: 7 },
            () => Math.floor(Math.random() * 100) + 1
          ),
        },
      ],
    },
    errorData: {
      labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
      series: [
        {
          name: "Erros",
          data: Array.from(
            { length: 7 },
            () => Math.floor(Math.random() * 10) + 1
          ),
        },
      ],
    },
  });

  function generateRandomService() {
    const services = ["Levantamentos", "Consultas", "Transferências"];
    const randomIndex = Math.floor(Math.random() * services.length);
    return services[randomIndex];
  }

  const {
    rechargeDates,
    usagePeriod,
    popularService,
    averageWithdrawalAmount,
    serviceData,
    errorData,
  } = cashFlowData;

  // Lógica sugestiva com base nos dados do gráfico
  let suggestion = "";
  if (popularService === "Levantamentos") {
    suggestion =
      "Prioridade de recarga de dinheiro nos dias em que há maior fluxo.";
  } else if (
    popularService === "Transferências" ||
    popularService === "Consultas"
  ) {
    suggestion = "Prioridade de recarga de papel.";
  } else {
    suggestion = "Recarga de papel e dinheiro neste ATM em função da métrica.";
  }

  return (
    <div className="overflow-y: auto h-4/6 w-4/6 rounded-lg bg-white p-4">
      <h2 className="mb-4 text-2xl font-bold">Registro de Fluxo de Caixa</h2>
      <button onClick={generatePDF}>Gerar Relatório em PDF</button>

      <p className="mb-2">
        <strong>Datas de Recarga:</strong> {rechargeDates.join(", ")}
      </p>
      <p className="mb-2">
        <strong>Período de Uso:</strong> {usagePeriod}
      </p>
      <p className="mb-2">
        <strong>Serviço mais Popular:</strong> {popularService}
      </p>
      <p className="mb-4">
        <strong>Média de Levantamento:</strong> {averageWithdrawalAmount}
      </p>
      <div className="mb-4 rounded-lg bg-white p-4">
        <Chart
          options={{
            chart: {
              height: 350,
              type: "line",
              zoom: {
                enabled: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: "smooth",
            },
            xaxis: {
              categories: serviceData.labels,
            },
            yaxis: {
              max: 100,
            },
            markers: {
              size: 6,
              hover: {
                size: 10,
              },
            },
          }}
          series={serviceData.series}
          type="line"
          width={700}
          height={320}
        />
      </div>

      <p className="mb-4">
        <strong>Sugestão:</strong> {suggestion}
      </p>
    </div>
  );
};

export default CashFlowRecord;
