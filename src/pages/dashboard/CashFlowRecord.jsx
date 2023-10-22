import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const CashFlowRecord = ({ atm }) => {
  // Simulação de dados fictícios
  const [cashFlowData, setCashFlowData] = useState({
    rechargeDates: ["2023-09-20", "2023-09-15", "2023-09-10"],
    usagePeriod: "Diurno",
    popularService: generateRandomService(),
    averageWithdrawalAmount: Math.floor(Math.random() * 50000) + 1,
    serviceData: {
      labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
      series: [
        {
          name: "Levantamentos",
          data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100) + 1),
        },
        {
          name: "Consultas",
          data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100) + 1),
        },
        {
          name: "Transferências",
          data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100) + 1),
        },
      ],
    },
  });

  const { rechargeDates, usagePeriod, popularService, averageWithdrawalAmount, serviceData } = cashFlowData;
   // Lógica sugestiva com base nos dados do gráfico

   
  function generateRandomService() {
    const services = ["Levantamentos", "Consultas", "Transferências", ""];
    const randomIndex = Math.floor(Math.random() * services.length);
    return services[randomIndex];
  }

   let suggestion = "";
   if (popularService === "Levantamentos") {
     suggestion = "Prioridade de recarga de dinheiro nos dias em que há maior fluxo.";
   } else if (popularService === "Transferências" || popularService === "Consultas") {
     suggestion = "Prioridade de recarga de papel.";
   } else {
     suggestion = "Recarga de papel e dinheiro neste ATM em função da métrica.";
   }

  return (
    <div className="bg-white p-4 rounded-lg w-4/6 h-4/6">
      <h2 className="text-2xl font-bold mb-4">Registro de Fluxo de Caixa</h2>
      <p className="mb-2"><strong>Datas de Recarga:</strong> {rechargeDates.join(', ')}</p>
      <p className="mb-2"><strong>Período de Uso:</strong> {usagePeriod}</p>
      <p className="mb-2"><strong>Serviço mais Popular:</strong> {popularService}</p>
      <p className="mb-4"><strong>Média de Levantamento:</strong> {averageWithdrawalAmount}</p>
      <div className="bg-white p-4 rounded-lg">
        <Chart
          options={{
            chart: {
              height: 350,
              type: 'line',
              zoom: {
                enabled: true
              }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'smooth'
            },
            xaxis: {
              categories: serviceData.labels
            },
            yaxis: {
              max: 100
            },
            markers: {
              size: 6,
              hover: {
                size: 10
              }
            }
          }}
          series={serviceData.series}
          type="line"
          width={700}
          height={320}
        />
      </div>
      <p className="mt-4"><strong>Sugestão:</strong> {suggestion}</p>
    
    </div>
  );
};

export default CashFlowRecord;
