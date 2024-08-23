import React, { useState, useMemo } from "react";
import Chart from "react-apexcharts";

const ErrorLogs = ({ atm }) => {
  const [selectedInterval, setSelectedInterval] = useState("daily");

  const errorLogsData = useMemo(
    () => ({
      errorFrequency: Array.from(
        { length: 7 },
        () => Math.floor(Math.random() * 9) + 1
      ),
      possibleErrors: [
        "Falha ao dispensar dinheiro",
        "Falha na leitura de cartões",
        "Erro de conexão com o banco",
        "Falha no sistema de segurança",
        "Erro de manutenção",
      ],
    }),
    []
  );

  const { errorFrequency, possibleErrors } = errorLogsData;

  const generateXAxisCategories = useMemo(() => {
    switch (selectedInterval) {
      case "daily":
        return ["00:00", "06:00", "07:00", "13:00", "19:00", "23:59"];
      case "weekly":
        return ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
      case "monthly":
        return ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5"];
      case "annual":
        return [
          "Jan",
          "Fev",
          "Mar",
          "Abr",
          "Mai",
          "Jun",
          "Jul",
          "Ago",
          "Set",
          "Out",
          "Nov",
          "Dez",
        ];
      default:
        return [];
    }
  }, [selectedInterval]);

  const generateSeriesData = useMemo(() => {
    switch (selectedInterval) {
      case "daily":
        return Array.from(
          { length: 6 },
          () => Math.floor(Math.random() * 9) + 1
        );
      case "weekly":
        return Array.from(
          { length: 7 },
          () => Math.floor(Math.random() * 9) + 1
        );
      case "monthly":
        return Array.from(
          { length: 5 },
          () => Math.floor(Math.random() * 9) + 1
        );
      case "annual":
        return Array.from(
          { length: 12 },
          () => Math.floor(Math.random() * 9) + 1
        );
      default:
        return [];
    }
  }, [selectedInterval]);

  const getErrorSuggestion = useMemo(() => {
    const maxErrorFrequency = Math.max(...errorFrequency);
    const maxErrorIndex = errorFrequency.indexOf(maxErrorFrequency);
    const frequentError = possibleErrors[maxErrorIndex];

    if (maxErrorFrequency <= 9) {
      return `Prioridade de manutenção para resolver problemas frequentes de ${frequentError}.`;
    } else if (maxErrorFrequency >= 5) {
      return `Realizar uma verificação geral para evitar ${frequentError} recorrente.`;
    } else {
      return "O ATM está operando dentro do limite aceitável de erros.";
    }
  }, [errorFrequency, possibleErrors]);

  return (
    <div className="h-full w-full overflow-x-auto overflow-y-scroll p-4">
      <h2 className="mb-4 text-2xl font-bold">
        Logs de Erros nos Últimos 7 Dias do {atm.name}
      </h2>
      <select
        value={selectedInterval}
        onChange={(e) => setSelectedInterval(e.target.value)}
        className="mb-4 rounded-md border border-gray-300 p-2 text-lg"
      >
        <option value="daily">Diário</option>
        <option value="weekly">Semanal</option>
        <option value="monthly">Mensal</option>
        <option value="annual">Anual</option>
      </select>
      <div className="mt-4">
        <p>
          Nos últimos 7 dias, foram registrados os seguintes erros no ATM{" "}
          {atm.name}:
        </p>
        <ul className="mt-2 list-inside list-disc">
          {possibleErrors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
        <p className="mt-4 font-semibold">Sugestão: {getErrorSuggestion}</p>
      </div>
      <Chart
        options={{
          chart: {
            id: "errorLogs",
            animations: {
              enabled: true,
              easing: "easeinout",
              speed: 1200,
              animateGradually: {
                enabled: true,
                delay: 200,
              },
              dynamicAnimation: {
                enabled: true,
                speed: 600,
              },
            },
          },
          xaxis: {
            categories: generateXAxisCategories,
          },
          plotOptions: { bar: { horizontal: false, barHeight: "50%" } },
          fill: { colors: ["#F87171"] },
        }}
        series={[
          {
            name: "Frequência de Erros",
            data: generateSeriesData,
          },
        ]}
        type="bar"
        width={700}
        height={320}
      />
    </div>
  );
};

export default ErrorLogs;
