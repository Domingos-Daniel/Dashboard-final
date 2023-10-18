import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Slider.css"; // Importe o arquivo CSS que você forneceu
import { apiUrl } from '../../apiConfig';

const Slider = () => {
  const [atms, setAtms] = useState([]);

  useEffect(() => {
    axios.get(apiUrl)
      .then((response) => {
        // Filtrar os ATMs de acordo com as condições especificadas
        const filteredAtms = response.data.filter(
          (atm) =>
            !(atm.cash > 30000) ||
            !(atm.coins > 1000) ||
            atm.systemStatus === "of"
        );
        setAtms(filteredAtms);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados da API:", error);
      });
  }, []);

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
    return problems.length > 0 ? problems.join(", ") : "Nenhum Problema Conhecido";
  };

  return (
    <div className="slider">
      <div className="slide-track">
        {atms.map((atm, index) => (
          <div className={`slide ${getProblemDescription(atm)}`} key={index}>
            <p>{atm.name}&nbsp;</p>
            <p> |  Problema: {getProblemDescription(atm)}</p>
            {/* Adicione mais informações conforme necessário */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
