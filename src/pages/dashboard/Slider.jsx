import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Slider.css";
import { apiUrl } from "../../apiConfig";

const Slider = () => {
  const [atms, setAtms] = useState([]);

  useEffect(() => {
    // Função para tratar as atualizações SSE
    // Função para tratar as atualizações SSE
    const handleSSEUpdate = (event) => {
      console.log("Recebido SSE Update:", event.data);

      const data = JSON.parse(event.data);

      // Atualize apenas se houver alterações
      if (!arraysAreEqual(atms, data)) {
        setAtms(data);
      }
    };

    const eventSource = new EventSource(
      "https://atms-app.com/wp/wp-admin/admin-ajax.php?action=custom_atm_sse"
    );

    eventSource.onmessage = handleSSEUpdate;

    return () => {
      eventSource.close();
    };
  }, [atms]);

  // Função de comparação de arrays
  const arraysAreEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
      if (
        arr1[i].cash !== arr2[i].cash ||
        arr1[i].integrity !== arr2[i].integrity ||
        arr1[i].coins !== arr2[i].coins ||
        arr1[i].systemStatus !== arr2[i].systemStatus
        // Adicione mais comparações conforme necessário
      ) {
        return false;
      }
    }

    return true;
  };

  // Função para buscar dados da API
  const fetchData = () => {
    axios
      .get(apiUrl)
      .then((response) => {
        // Filtrar apenas os ATMs com problemas
        const filteredAtms = response.data.filter(
          (atm) =>
            atm.cash < 30000 || atm.coins < 800 || atm.systemStatus === "of"
        );
        setAtms(filteredAtms);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados da API:", error);
      });
  };

  useEffect(() => {
    fetchData(); // Chame a função fetchData inicialmente
  }, []); // Adicione um array de dependências vazio para garantir que ele só seja executado uma vez

  const getProblemDescription = (atm) => {
    const problems = [];

    if (atm.cash < 30000) {
      problems.push("Pouco Dinheiro");
    }
    if (atm.coins < 1000) {
      problems.push("Pouco Papel");
    }
    if (atm.systemStatus === "of") {
      problems.push("Sem Sistema");
    }

    return problems.length > 0
      ? problems.join(", ")
      : "Nenhum Problema Conhecido";
  };

  return (
    <div className="slider">
      <div className="slide-track">
        {atms.map((atm, index) => (
          <div className={`slide ${getProblemDescription(atm)}`} key={index}>
            <p>{atm.name}&nbsp;</p>
            <p> | Problema: {getProblemDescription(atm)}</p>
            {/* Adicione mais informações conforme necessário */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
