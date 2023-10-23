import React, { useState } from "react";
import CashFlowRecord from './CashFlowRecord';
import ErrorLogs from "./ErrorLogs";

const ATMCard = ({ atm }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Estado para controlar a animação de carregamento

  const cash = atm.cash;
  const systemStatus = atm.systemStatus;
  const papel = atm.coins;
  const integridade = atm.integrity;
  let st = 0;

  let cardColor = "bg-red-500"; // Cor padrão vermelha
  let spanColor = "bg-primary"; // Cor padrão para o span
  let MoneyIcon,
    paperIcon,
    sysIcon = "text-green-500";

  if (cash > 30000 && integridade >= 50 && papel > 1000) {
    cardColor = "bg-green-500"; // Cor verde
    st = 1;
  } else if (
    (cash > 10000 && cash <= 30000) ||
    (integridade < 50 && integridade >= 30) ||
    (papel > 500 && papel < 1000)
  ) {
    st = 2;
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

  const [isCashFlowModalOpen, setIsCashFlowModalOpen] = useState(false);
  const [isErrotLogsModalOpen, setIsErrotLogsModalOpen] = useState(false);

  const openCashFlowModal = () => {
    setIsCashFlowModalOpen(true);
  };
  const openErrorLogsModal = () => {
    setIsErrotLogsModalOpen(true);
  };

  const closeCashFlowModal = () => {
    setIsCashFlowModalOpen(false);
  };
  const closeErrorLogsModal = () => {
    setIsErrotLogsModalOpen(false);
  };
  

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const currentDate = new Date();
const formattedDate = `${currentDate.getDate()}/${
  currentDate.getMonth() + 1
}/${currentDate.getFullYear()}`;

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
              <button className="mt-2 rounded-md bg-blue-500 py-2 px-4 text-white" onClick={openCashFlowModal}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                </svg>
              </button>
              <button className="mt-2 rounded-md bg-red-400 py-2 px-4 text-white" onClick={openErrorLogsModal}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {isCashFlowModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/2 rounded-lg bg-white p-6 font-semibold shadow-md">
            <div className="flex justify-end">
            <span className="close" onClick={closeCashFlowModal}>
              &times;
            </span>
            </div>
            <CashFlowRecord atm={atm} />
          </div>
        </div>
      )}

      {isErrotLogsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/2 rounded-lg bg-white p-6 font-semibold shadow-md">
            <div className="flex justify-end">
            <span className="close" onClick={closeErrorLogsModal}>
              &times;
            </span>
            </div>
            <ErrorLogs atm={atm} />
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-4 font-semibold">
            <div className="flex justify-end">
              <button onClick={closeModal}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 cursor-pointer text-gray-600 hover:text-gray-800"
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
          <div className="w-1/2 rounded-lg bg-white p-6 font-semibold">
            <p className="mb-4 text-center text-2xl font-semibold">
              {atm.name}
            </p>
            <div className="mb-4 border-b border-gray-300">
              <p className="mb-2 text-lg font-semibold">
                Informações Adicionais
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {st === 0 && (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="mr-2 h-6 w-6 text-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <p>Urgente</p>
                    </>
                  )}
                  {st === 2 && (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="mr-2 h-6 w-6 text-yellow-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <p>Pendente</p>
                    </>
                  )}
                  {st === 1 && (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="mr-2 h-6 w-6 text-blue-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <p>100%</p>
                    </>
                  )}
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="mr-2 h-6 w-6 text-yellow-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <p>F Recarga de Dinheiro: <strong className="font-bold">Bidiario</strong></p>
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="mr-2 h-6 w-6 text-red-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <p>F Recarga de Papel: Semanal</p>
                </div>
              </div>
            </div>
            <div className="mb-4 border-b border-gray-300">
              {/* Detalhes do Histórico aqui com base no ATM selecionado */}
              <div className="mb-4 border-b border-gray-300">
                <p className="mb-2 text-lg font-semibold">Histórico</p>
                {st === 1 && (
                  <p>
                    Este ATM está em pleno funcionamento e tem sido mantido
                    regularmente desde a instalação.
                  </p>
                )}
                {st === 2 && (
                  <p>
                    Algumas questões foram relatadas no passado, mas foram
                    resolvidas oportunamente pela equipe de manutenção.
                  </p>
                )}
                {st === 0 && (
                  <p>
                    Problemas críticos têm ocorrido com frequência recentemente,
                    exigindo intervenções imediatas para garantir o
                    funcionamento contínuo do ATM.
                  </p>
                )}
              </div>
            </div>
            <div className="mb-4 border-b border-gray-300">
              
              {/* Detalhes do Histórico de Manutenção aqui com base no ATM selecionado */}
              <div className="mb-4 border-b border-gray-300">
                <p className="mb-2 text-lg font-semibold">
                  Histórico de Manutenção
                </p>
                {st = 1 && (
                  <>
                    <p>
                      Nenhum problema de manutenção foi registrado desde a
                      instalação.
                    </p>
                    <p>
                      A manutenção preventiva tem sido realizada regularmente.
                    </p>
                  </>
                )}
                {st = 2 && (
                  <>
                    <p>
                      A manutenção foi realizada para resolver problemas
                      anteriores, incluindo problemas com a dispensação de
                      dinheiro e travamentos ocasionais do sistema.
                    </p>
                    <p>
                      A última manutenção foi realizada em {formattedDate} {" "}
                      .
                    </p>
                  </>
                )}
                {st = 0 && (
                  <>
                    <p>
                      Problemas críticos têm exigido manutenções frequentes,
                      incluindo substituições de componentes e ajustes regulares
                      para garantir o funcionamento contínuo do ATM.
                    </p>
                    <p>
                      A última manutenção foi realizada em {" "}
                      {atm.lastMaintenanceDate} devido a
                      {atm.lastMaintenanceIssue}.
                    </p>
                  </>
                )}
              </div>
            </div>
            <button
              onClick={() => setIsSecondModalOpen(false)}
              className="float-right mt-6 rounded-md bg-blue-500 py-2 px-4 text-white"
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
