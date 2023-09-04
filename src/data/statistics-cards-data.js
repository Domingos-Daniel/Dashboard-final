// Importe a biblioteca axios
import axios from "axios";

// Importações dos ícones permanecem inalteradas
import {
  BanknotesIcon,
  UserPlusIcon,
  UserIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

const total = "";
// Função para fazer a requisição Axios e atualizar as estatísticas
// ... Importações dos ícones permanecem inalteradas ...

// Função para fazer a requisição Axios e atualizar as estatísticas
function fetchDataAndUpdateStatistics() {
  // Fazer a requisição Axios
  axios
    .get("https://my-json-server.typicode.com/Domingos-Daniel/api-teste/atms")
    .then((response) => {
      const atms = response.data;

      // Atualizar as estatísticas com base nos dados da API
      statisticsCardsData[0].value = atms.length.toString();
      // Você pode substituir os outros valores aqui com base nos dados da API
      statisticsCardsData[1].value = atms.filter((atm) => atm.systemStatus === "of").length.toString(); // Substitua conforme necessário
      // Filtrar os ATMs que atendem às condições
      const atms100Percent = atms.filter(
        (atm) =>
          atm.cash > 30000 &&
          atm.integrity >= 50 &&
          atm.coins > 1000 &&
          atm.systemStatus === "on"
      );

      // Log dos ATMs que atendem às condições para depuração
      //console.log("ATMs 100% 2:", atms100Percent);

      // Atualizar o valor do cartão de estatísticas correspondente
      statisticsCardsData[2].value = atms100Percent.length.toString();

      const pendingATMs = atms.filter(
        (atm) =>
          atm.cash < 30000 ||
          atm.coins < 1000 ||
          atm.integrity < 50 ||
          atm.systemStatus === "of"
      );

      // Atualizar o valor do cartão de estatísticas correspondente
      statisticsCardsData[3].value = pendingATMs.length.toString();
      //statisticsCardsData[3].value = "Novo Valor 3"; // Substitua conforme necessário

      // Chame uma função para atualizar a interface do usuário com os novos valores
      updateUIWithStatistics();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Função para atualizar a interface do usuário com as estatísticas atualizadas
function updateUIWithStatistics() {
  // Supondo que você tenha elementos HTML onde deseja exibir as estatísticas
  // Você pode selecionar esses elementos pelo ID, classe, ou outra maneira

  // Por exemplo, se você tem elementos com IDs correspondentes às estatísticas:
  const totalATMsElement = document.getElementById("totalATMs");
  const atmsForaDeServicoElement = document.getElementById("atmsForaDeServico");
  const atms100PercentElement = document.getElementById("atms100Percent");
  const pendentesElement = document.getElementById("pendentes");

  // Atualize o conteúdo dos elementos com os novos valores
  totalATMsElement.textContent = statisticsCardsData[0].value;
  atmsForaDeServicoElement.textContent = statisticsCardsData[1].value;
  atms100PercentElement.textContent = statisticsCardsData[2].value;
  pendentesElement.textContent = statisticsCardsData[3].value;
}

// Chame a função para buscar dados e atualizar estatísticas
fetchDataAndUpdateStatistics();

// ... Exporte o objeto `statisticsCardsData` ...


// Exporte o objeto `statisticsCardsData`
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
