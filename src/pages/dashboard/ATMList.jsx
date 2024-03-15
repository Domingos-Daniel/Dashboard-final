import React, { useState, useEffect } from "react";

const ATMList = ({ atms }) => {
  const [selectedATM, setSelectedATM] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOpenModal = (atm) => {
    setSelectedATM(atm);
  };

  const handleCloseModal = () => {
    setSelectedATM(null);
  };

  useEffect(() => {
    if (selectedATM) {
      // Simule um carregamento demorado (você pode substituir isso pelo seu carregamento real)
      setLoading(true);

      // Simule uma carga de 2 segundos
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [selectedATM]);

  return (
    <div className="flex items-center justify-center">
      <div className="lg:w-3/3 w-full">
        <div className="overflow-x-auto lg:overflow-visible">
          <table className="min-w-full overflow-hidden rounded-lg bg-white text-gray-900 shadow-md">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-3 text-sm font-semibold uppercase">
                  ID
                </th>
                <th className="py-2 px-3 text-sm font-semibold uppercase">
                  Nome
                </th>
                <th className="py-2 px-3 text-sm font-semibold uppercase">
                  Localização
                </th>
                <th className="py-2 px-3 text-sm font-semibold uppercase">
                  Sistema
                </th>
                <th className="py-2 px-3 text-sm font-semibold uppercase">
                  Dinheiro
                </th>
                <th className="py-2 px-3 text-sm font-semibold uppercase">
                  Integridade
                </th>
                <th className="py-2 px-3 text-sm font-semibold uppercase">
                  Papel
                </th>
                <th className="py-2 px-3 text-sm font-semibold uppercase">
                  Ação
                </th>
              </tr>
            </thead>
            <tbody>
              {atms.map((atm) => (
                <tr key={atm.id} className="text-sm font-semibold">
                  <td className="mb-4 py-3 px-4">{atm.id}</td>
                  <td className="mb-4 py-3 px-4">{atm.name}</td>
                  <td className="mb-4 py-3 px-4">{atm.location}</td>
                  <td
                    className={`mb-4 py-3 px-4 text-center ${
                      atm.systemStatus === "of"
                        ? "text-red-500 "
                        : atm.systemStatus === "on"
                        ? "text-green-500"
                        : "text-yellow-500 text-white"
                    }`}
                  >
                    {atm.systemStatus}
                  </td>
                  <td
                    className={`py-3 px-4 ${
                      atm.cash > 70000 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {atm.cash}
                    {atm.cash > 70000 ? (
                      <span className="ml-2 text-green-500">↑</span>
                    ) : (
                      <span className="ml-2 text-red-500">↓</span>
                    )}
                  </td>
                  <td className="mb-4 py-3 px-4">{atm.integrity}%</td>
                  <td className="mb-4 py-3 px-4">{atm.coins}</td>
                  <td className="mb-4 py-3 px-4">
                    <button
                      className="rounded-md bg-blue-500 px-2 py-1 text-white"
                      onClick={() => handleOpenModal(atm)}
                    >
                      + infor
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedATM && (
        <div className="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50 opacity-100 transition-opacity duration-300 ease-in-out">
          <div className="w-96 rounded-lg bg-white p-4 font-semibold">
            <h2 className="mb-3 pb-4 text-xl font-bold">Detalhes do ATM</h2>
            {loading ? (
              <p className="text-blue-500">Carregando informações...</p>
            ) : (
              <>
                <p className="pb-2">ID: {selectedATM.id}</p>
                <p className="pb-2">Nome: {selectedATM.name}</p>
                <p className="border-b pb-4">
                  Localização: {selectedATM.location}
                </p>

                {selectedATM.integrity < 50 && (
                  <p className="border-b pb-2 text-red-500">
                    A integridade está muito baixa e necessita de assistência.
                  </p>
                )}

                {selectedATM.cash < 70000 && (
                  <p className="border-b pb-2 text-red-500">
                    Necessita de recarga (dinheiro abaixo de 70000).
                  </p>
                )}

                {selectedATM.cash > 70000 && (
                  <p className="border-b pb-2 text-green-500">
                    Tem Dinheiro suficiente.
                  </p>
                )}

                {selectedATM.cash > 500 && (
                  <p className="border-b pb-2 text-green-500">
                    Tem Papel suficiente.
                  </p>
                )}

                {selectedATM.coins < 500 && (
                  <p className="border-b pb-2 text-red-500">
                    Necessita de recarga de papel (papel abaixo de 500).
                  </p>
                )}

                {selectedATM.systemStatus === "on" && (
                  <p className="border-b pb-2 text-green-500">
                    O sistema está ligado e funcionando normalmente.
                  </p>
                )}

                {selectedATM.systemStatus === "of" && (
                  <p className="border-b pb-2 text-red-500">
                    O ATM está sem sistema, necessita de assistência urgente.
                  </p>
                )}
              </>
            )}

            <button
              className="mt-4 rounded-md bg-blue-500 px-2 py-1 text-white"
              onClick={handleCloseModal}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ATMList;
