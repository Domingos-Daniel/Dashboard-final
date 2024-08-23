import React, { useState, useMemo, useEffect } from "react";
import Chart from "react-apexcharts";
import { motion } from "framer-motion";

const ErrorLogs = ({ atm }) => {
  const [selectedInterval, setSelectedInterval] = useState("daily");
  const [shuffledErrors, setShuffledErrors] = useState([]);

  // Function to shuffle the errors randomly
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const initialErrors = [
      "Falha ao dispensar dinheiro",
      "Falha na leitura de cartões",
      "Erro de conexão com o banco",
      "Falha no sistema de segurança",
      "Erro de manutenção",
    ];

    setShuffledErrors(shuffleArray(initialErrors));
  }, []);

  const errorLogsData = useMemo(
    () => ({
      errorFrequency: Array.from(
        { length: shuffledErrors.length },
        () => Math.floor(Math.random() * 9) + 1
      ),
      possibleErrors: shuffledErrors,
    }),
    [shuffledErrors]
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

  const getAISuggestions = useMemo(() => {
    return possibleErrors.map((error, index) => {
      let suggestion = "";

      switch (error) {
        case "Falha ao dispensar dinheiro":
          suggestion =
            "Sugestão de IA: Aumente a frequência de manutenção para o mecanismo de dispensa de dinheiro.";
          break;
        case "Falha na leitura de cartões":
          suggestion =
            "Sugestão de IA: Verifique e limpe os leitores de cartão regularmente.";
          break;
        case "Erro de conexão com o banco":
          suggestion =
            "Sugestão de IA: Verifique a estabilidade da conexão de rede do ATM.";
          break;
        case "Falha no sistema de segurança":
          suggestion =
            "Sugestão de IA: Realize uma auditoria completa no sistema de segurança.";
          break;
        case "Erro de manutenção":
          suggestion =
            "Sugestão de IA: Aumente a supervisão e a frequência das inspeções de manutenção.";
          break;
        default:
          suggestion =
            "Sugestão de IA: O ATM está operando dentro dos parâmetros normais.";
          break;
      }

      return {
        error,
        suggestion,
        frequency: errorFrequency[index],
      };
    });
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
        <div className="mt-4">
          {getAISuggestions.map((item, index) => (
            <motion.div
              key={index}
              className="mb-4 rounded-lg border border-blue-300 bg-blue-50 p-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <p className="font-semibold text-blue-600">{item.suggestion}</p>
              <p className="text-sm text-gray-600">
                Frequência do Erro: {item.frequency} vezes
              </p>
            </motion.div>
          ))}
        </div>
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
