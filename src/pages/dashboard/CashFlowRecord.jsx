import React from "react";
import ReactApexChart from "react-apexcharts";

const CashFlowRecord = ({ selectedATM }) => {
  // Dados aleatórios do registro do fluxo de caixa baseado no ATM selecionado
  const cashFlowData = {
    reloadDates: ["01/09/2023", "15/09/2023", "28/09/2023"],
    endDates: ["03/09/2023", "17/09/2023", "30/09/2023"],
    peakUsagePeriod: "Tarde",
    mostRequestedService: "Levantamentos",
    weeklyServiceData: {
      series: [
        {
          name: "Uso do Serviço",
          data: [30, 40, 25, 50, 49, 60, 70],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        xaxis: {
          categories: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
        },
      },
    },
  };

  return (
    <div>
      <h2>Registro do Fluxo de Caixa</h2>
      <p>Datas de Recarga: {cashFlowData.reloadDates.join(", ")}</p>
      <p>Datas de Término: {cashFlowData.endDates.join(", ")}</p>
      <p>Período de Pico de Uso: {cashFlowData.peakUsagePeriod}</p>
      <p>Serviço Mais Solicitado: {cashFlowData.mostRequestedService}</p>
      <div id="chart">
        <ReactApexChart
          options={cashFlowData.weeklyServiceData.options}
          series={cashFlowData.weeklyServiceData.series}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
};

export default CashFlowRecord;
