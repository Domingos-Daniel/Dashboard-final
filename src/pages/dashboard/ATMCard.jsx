import React, { useState } from "react";

const ATMCard = ({ atm }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  const cash = atm.cash;
  const systemStatus = atm.systemStatus;
  const papel = atm.coins;
  const integridade = atm.integrity;

  let cardColor = "bg-red-500"; // Cor padrão vermelha
  let spanColor = "bg-primary"; // Cor padrão para o span
  let MoneyIcon,
    paperIcon,
    sysIcon = "text-green-500";

  if (cash > 30000 && integridade >= 50 && papel > 1000) {
    cardColor = "bg-green-500"; // Cor verde
  } else if (
    (cash > 10000 && cash <= 30000) ||
    (integridade < 50 && integridade >= 30) ||
    (papel > 500 && papel < 1000)
  ) {
    cardColor = "bg-yellow-500"; // Cor de aviso
  }
  if (cash > 70000) {
    MoneyIcon = "text-green-500";
  } else if (cash >= 30000 && cash < 70000) {
    MoneyIcon = "text-yellow-500";
  } else if (cash < 30000) {
    MoneyIcon = "text-red-500";
  }

  if (papel >= 50000) {
    paperIcon = "text-green-500";
  } else if (papel >= 30000 && papel < 50000) {
    paperIcon = "text-yellow-500";
  } else if (papel < 30000) {
    paperIcon = "text-red-500";
  }

  if (systemStatus !== "on") {
    sysIcon = "text-red-500";
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  
  const openSecondModal = () => {
    setIsSecondModalOpen(true);
    setIsModalOpen(false); // Feche o primeiro modal quando o segundo é aberto
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
 
  return (
    <div className="relative my-4 w-64 rounded-lg bg-white py-6 px-6 shadow-md">
      <div
        onClick={openModal}
        className={`absolute left-4 -top-6 flex cursor-pointer items-center rounded-full py-4 px-4 text-white shadow-xl ${cardColor}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </div>
      <div className="mt-8">
        <p className="my-2 text-xl font-semibold">{atm.name}</p>
        <div className="flex space-x-2 text-sm text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <p>Localização: {atm.location}</p>
        </div>
        <div className={`my-3 flex space-x-2 text-sm text-gray-400`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width={1.5}
            stroke="currentColor"
            className={`h-6 w-6 ${MoneyIcon}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
            />
          </svg>
          <p>Dinheiro: {atm.cash}</p>
        </div>
        <div className="my-3 flex space-x-2 text-sm text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width={1.5}
            stroke="currentColor"
            className={`h-6 w-6 ${paperIcon}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
            />
          </svg>
          <p>Papel: {atm.coins}</p>
        </div>
        <div className="my-3 flex space-x-2 text-sm text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width={1.5}
            stroke="currentColor"
            className={`h-6 w-6 ${sysIcon}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
            />
          </svg>
          <p>Sistema: {atm.systemStatus}</p>
        </div>
        <div className="border-t-2" />
        <div className="flex justify-between">
          <div className="my-2">
            <p className="mb-2 text-base font-semibold">Integridade</p>
            <div className="text-base font-semibold text-gray-400">
              <p>{atm.integrity}%</p>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-96 rounded-lg font-semibold bg-white p-4">
          <div className="flex justify-end">
        <button onClick={closeModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600 hover:text-gray-800 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
            <p className="mb-2 text-xl font-semibold">{atm.name}</p>
            <p className="pb-2">ID: {atm.id}</p>
            <p className="pb-2">Nome: {atm.name}</p>
            <p className="border-b pb-4">Localização: {atm.location}</p>
            {atm.integrity < 50 && (
              <p className="animate-pulse border-b pb-2 text-red-500">
                {" "}
                {/* Adicionando a classe animate-pulse */}A integridade está
                muito baixa e necessita de assistência.
              </p> 
            )}
            {atm.cash < 70000 && (
              <p className="animate-pulse border-b pb-2 text-red-500">
                {" "}
                {/* Adicionando a classe animate-pulse */}
                Necessita de recarga (dinheiro abaixo de 70000).
              </p>
            )}
            {atm.cash > 70000 && (
              <p className="border-b pb-2 text-green-500">
                Tem Dinheiro suficiente.
              </p>
            )}
            {atm.cash > 500 && (
              <p className="border-b pb-2 text-green-500">
                Tem Papel suficiente.
              </p>
            )}
            {atm.coins < 500 && (
              <p className="animate-pulse border-b pb-2 text-red-500">
                {" "}
                {/* Adicionando a classe animate-pulse */}
                Necessita de recarga de papel (papel abaixo de 500).
              </p>
            )}
            {atm.systemStatus === "on" && (
              <p className="border-b pb-2 text-green-500">
                O sistema está ligado e funcionando normalmente.
              </p>
            )}
            {atm.systemStatus === "of" && (
              <p className="animate-pulse border-b pb-2 text-red-500">
                {" "}
                {/* Adicionando a classe animate-pulse */}O ATM está sem
                sistema, necessita de assistência urgente.
              </p>
            )}
            <button
              onClick={openSecondModal}
              className="mt-4 rounded-md bg-blue-500 py-2 px-4 text-white"
            >
              Detalhe individual
            </button>
          </div>
        </div>
      )}
{isSecondModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    
    <div className="w-1/2 rounded-lg font-semibold bg-white p-6">
      <p className="mb-4 text-2xl font-semibold text-center">{atm.name}</p>
      <div className="border-b border-gray-300 mb-4">
        <p className="mb-2 text-lg font-semibold">Informações Adicionais</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 mr-2 text-blue-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <p>Frequência de Uso: Alta</p>
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 mr-2 text-yellow-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <p>Frequência de Recarga de Dinheiro: Mensal</p>
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 mr-2 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <p>Frequência de Recarga de Papel: Semanal</p>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-300 mb-4">
        <p className="mb-2 text-lg font-semibold">Histórico</p>
        <p>
          O ATM foi instalado em 15 de setembro de 2023 na Rua Principal.
          Frequência de recarga de dinheiro: Mensal.
          Frequência de recarga de papel: Semanal.
        </p>
        <p>
          Data da última recarga de dinheiro: 10 de outubro de 2023.
          Data da última recarga de papel: 5 de outubro de 2023.
        </p>
        <p>
          Frequência com que o dinheiro acaba: Uma vez a cada 3 semanas.
          Frequência com que o papel acaba: Uma vez por semana.
        </p>
      </div>
      <div className="border-b border-gray-300 mb-4">
        <p className="mb-2 text-lg font-semibold">Histórico de Manutenção</p>
        <p>
          Problema relatado: Falha no dispensador de dinheiro.
          Data de relato: 12 de novembro de 2023.
          Ação tomada: Substituição do dispensador.
        </p>
        <p>
          Problema relatado: Sistema travado.
          Data de relato: 5 de outubro de 2023.
          Ação tomada: Reinicialização do sistema.
        </p>
        <p>
          Problema relatado: Impressora com defeito.
          Data de relato: 18 de setembro de 2023.
          Ação tomada: Substituição da impressora.
        </p>
      </div>
      <button
        onClick={() => setIsSecondModalOpen(false)}
        className="mt-6 rounded-md bg-blue-500 py-2 px-4 text-white float-right"
      >
        Fechar Detalhes
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default ATMCard;
