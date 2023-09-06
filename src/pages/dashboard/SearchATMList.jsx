import React, { useState } from "react";

const SearchATMList = ({ searchResult }) => {
  const [selectedATM, setSelectedATM] = useState(null);

  const handleOpenModal = (atm) => {
    setSelectedATM(atm);
  };

  const handleCloseModal = () => {
    setSelectedATM(null);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full lg:w-3/3">
        <div className="overflow-x-auto lg:overflow-visible">
          <table className="min-w-full bg-white text-gray-900 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-3 uppercase font-semibold text-sm">ID</th>
                <th className="py-2 px-3 uppercase font-semibold text-sm">Nome</th>
                <th className="py-2 px-3 uppercase font-semibold text-sm">Localização</th>
                <th className="py-2 px-3 uppercase font-semibold text-sm">Sistema</th>
                <th className="py-2 px-3 uppercase font-semibold text-sm">Dinheiro</th>
                <th className="py-2 px-3 uppercase font-semibold text-sm">Integridade</th>
                <th className="py-2 px-3 uppercase font-semibold text-sm">Papel</th>
                <th className="py-2 px-3 uppercase font-semibold text-sm">Ação</th>
              </tr>
            </thead>
            <tbody>
              {searchResult.map((atm) => (
                <tr key={atm.id} className="text-sm font-semibold">
                  <td className="py-3 px-4 mb-4">{atm.id}</td>
                  <td className="py-3 px-4 mb-4">{atm.name}</td>
                  <td className="py-3 px-4 mb-4">{atm.location}</td>
                  <td className={`py-3 px-4 mb-4 text-center ${atm.systemStatus === 'of' ? 'text-red-500 ' : (atm.systemStatus === 'on' ? 'text-green-500' : 'text-yellow-500 text-white')}`}>
                    {atm.systemStatus}
                  </td>
                  <td className={`py-3 px-4 ${atm.cash > 70000 ? 'text-green-500' : 'text-red-500'}`}>
                    {atm.cash}
                    {atm.cash > 70000 ? (
                      <span className="ml-2 text-green-500">↑</span>
                    ) : (
                      <span className="ml-2 text-red-500">↓</span>
                    )}
                  </td>
                  <td className="py-3 px-4 mb-4">{atm.integrity}%</td>
                  <td className="py-3 px-4 mb-4">{atm.coins}</td>
                  <td className="py-3 px-4 mb-4">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded-md"
                      onClick={() => handleOpenModal(atm)}
                    >
                      + info
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
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center transition-opacity duration-300 ease-in-out bg-gray-900 bg-opacity-50 opacity-100">
          <div className="bg-white p-4 rounded-lg w-96 font-semibold">
            <h2 className="text-xl font-bold mb-3 pb-4">Detalhes do ATM</h2>
            <p className="pb-2">ID: {selectedATM.id}</p>
            <p className="pb-2">Nome: {selectedATM.name}</p>
            <p className="pb-4 border-b">Localização: {selectedATM.location}</p>
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
              <p className="border-b pb-2 text-green-500">Tem Dinheiro suficiente.</p>
            )}
            {selectedATM.cash > 500 && (
              <p className="border-b pb-2 text-green-500">Tem Papel suficiente.</p>
            )}
            {selectedATM.coins < 500 && (
              <p className="border-b pb-2 text-red-500">
                Necessita de recarga de papel (papel abaixo de 500).
              </p>
            )}
            {selectedATM.systemStatus === 'on' && (
              <p className="border-b pb-2 text-green-500">O sistema está ligado e funcionando normalmente.</p>
            )}
            {selectedATM.systemStatus === 'of' && (
              <p className="border-b pb-2 text-red-500">O ATM está sem sistema, necessita de assistência urgente.</p>
            )}
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded-md mt-4"
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

export default SearchATMList;
