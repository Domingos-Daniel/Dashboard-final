import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { saveAs } from 'file-saver';

const ErrorLogs = ({ atm }) => {
    const downloadCSV = () => {
        const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(errorData.join('\n'));
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'error_logs.csv');
      };
    
      const downloadPNG = () => {
        const chartRef = React.createRef();
        const chart = chartRef.current.chart.ctx;
        chart.canvas.toBlob(function (blob) {
          saveAs(blob, 'error_logs.png');
        });
      };
    
  const [errorLogsData, setErrorLogsData] = useState({
    errorFrequency: Array.from({ length: 7 }, () => Math.floor(Math.random() * 9) + 1),
    possibleErrors: [
      'Falha ao dispensar dinheiro',
      'Falha na leitura do cartão',
      'Erro de conexão com o banco',
      'Falha no sistema de segurança',
      'Erro de manutenção',
    ],
  });

  const { errorFrequency, possibleErrors } = errorLogsData;

  const getErrorSuggestion = () => {
    const maxErrorFrequency = Math.max(...errorFrequency);
    const maxErrorIndex = errorFrequency.indexOf(maxErrorFrequency);
    const frequentError = possibleErrors[maxErrorIndex];

    if (maxErrorFrequency <= 9) {
      return `Prioridade de manutenção para resolver problemas frequentes de ${frequentError}`;
    } else if (maxErrorFrequency >= 5) {
      return `Realizar uma verificação geral para evitar ${frequentError} recorrente`;
    } else {
      return 'O ATM está operando dentro do limite aceitável de erros.';
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg w-4/6 h-4/6 overflow-y: auto">
      <h2>Logs de Erros nos Últimos 7 Dias do  {atm.name}</h2>
      <button onClick={downloadCSV} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 mr-2 rounded mt-4">
        Baixar como CSV
      </button>
      <button onClick={downloadPNG} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-4">
        Baixar como PNG
      </button>
      <Chart
        options={{
          chart: {
            id: 'errorLogs',
            animations: {
              enabled: true,
              easing: 'easeinout',
              speed: 800,
              animateGradually: {
                enabled: true,
                delay: 150,
              },
              dynamicAnimation: {
                enabled: true,
                speed: 350,
              },
            },
          },
          xaxis: { categories: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'] },
          plotOptions: { bar: { horizontal: false, barHeight: '50%' } },
          fill: { colors: ['#F87171'] },
        }}
        series={[
          {
            name: 'Frequência de Erros',
            data: errorFrequency,
          },
        ]}
        type="bar"
        width={700}
        height={320}
      />
      <div className="mt-4">
        <p>
          Nos últimos 7 dias, foram registrados os seguintes erros no ATM {atm.name}:
        </p>
        <ul className="list-disc list-inside mt-2">
          {possibleErrors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
        <p className="mt-4 font-semibold">Sugestão: {getErrorSuggestion()}</p>
      </div>
    </div>
  );
};

export default ErrorLogs;
