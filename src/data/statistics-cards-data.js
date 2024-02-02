import axios from "axios";
import {
  BanknotesIcon,
  UserPlusIcon,
  UserIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

// Função para fazer a requisição Axios e atualizar as estatísticas
function fetchDataAndUpdateStatistics() {
  axios
    .get("https://atms-app.com/wp/wp-json/custom-atm-api/v1/atms")
    .then((response) => {
      const atms = response.data;

      // Atualizar as estatísticas com base nos dados da API
      // Atualizar as estatísticas com base nos dados da API
      const totalATMs = atms.length;
      const functional = atms.filter(
        (atm) =>
          atm.cash >= 30000 &&
          atm.integrity >= 50 &&
          atm.coins >= 1000 &&
          atm.systemStatus === "on"
      ).length;
      statisticsCardsData[0].value = totalATMs.toString();
      statisticsCardsData[1].value = atms
        .filter((atm) => atm.systemStatus === "of")
        .length.toString();
      statisticsCardsData[2].value = functional.toString();
      const pending = atms.filter(
        (atm) =>
          (atm.cash < 30000 && atm.cash > 1000) ||
          (atm.coins < 1000 && atm.coins >= 500) ||
          (atm.integrity < 50 && atm.integrity >= 30) ||
          atm.systemStatus === "of"
      ).length;
      statisticsCardsData[3].value = pending.toString();
      const urgent = totalATMs - functional - pending;
      statisticsCardsData[1].value = urgent.toString();
      // Se necessário, você pode usar a variável `urgent` para algum propósito específico

      // Chame uma função para atualizar a interface do usuário com os novos valores
      updateUIWithStatistics();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Função para atualizar a interface do usuário com as estatísticas atualizadas
function updateUIWithStatistics() {
  // Se estiver no navegador, atualize a interface do usuário
  if (typeof window !== "undefined") {
    const totalATMsElement = document.getElementById("totalATMs");
    const atmsForaDeServicoElement =
      document.getElementById("atmsForaDeServico");
    const atms100PercentElement = document.getElementById("atms100Percent");
    const pendentesElement = document.getElementById("pendentes");

    // Verifique se os elementos existem antes de tentar atualizá-los
    if (totalATMsElement) {
      totalATMsElement.textContent = statisticsCardsData[0].value;
    }
    if (atmsForaDeServicoElement) {
      atmsForaDeServicoElement.textContent = statisticsCardsData[1].value;
    }
    if (atms100PercentElement) {
      atms100PercentElement.textContent = statisticsCardsData[2].value;
    }
    if (pendentesElement) {
      pendentesElement.textContent = statisticsCardsData[3].value;
    }
  }
}

// Função para buscar dados e atualizar estatísticas
const fetchData = () => {
  fetchDataAndUpdateStatistics();
  // Configurar timeout para chamar a função novamente após 1 minuto
  setTimeout(fetchData, 1000);
};

// Chame a função inicialmente
fetchData();

export const statisticsCardsData = [
  {
    color: "blue",
    icon: BanknotesIcon,
    title: "Total ATMs",
    value: "150",
    footer: {
      color: "text-green-500",
      value: "+4",
      label: "do que ontem",
    },
  },
  {
    color: "pink",
    icon: UserIcon,
    title: "ATMs Fora de Serviço",
    value: "11",
    footer: {
      color: "text-green-500",
      value: "+3",
      label: "do que ontem",
    },
  },
  {
    color: "green",
    icon: UserPlusIcon,
    title: "ATMs 100%",
    value: "120",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "do que ontem",
    },
  },
  {
    color: "orange",
    icon: ChartBarIcon,
    title: "Pendentes",
    value: "19",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "do que ontem",
    },
  },
];
