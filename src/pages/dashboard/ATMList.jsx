import React, { useState, useEffect } from 'react';

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
      <div className="w-full lg:w-3/3">
        <div className="overflow-auto lg:overflow-visible">
          <table className="table-auto w-full text-gray-700 border-separate text-sm">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Nome</th>
                <th className="p-3">Localização</th>
                <th className="p-3">Status do Sistema</th>
                <th className="p-3">Dinheiro</th>
                <th className="p-3">Integridade</th>
                <th className="p-3">Papel</th>
                <th className="p-3">Ação</th>
              </tr>
            </thead>
            <tbody>
              {atms.map(atm => (
                <tr key={atm.id} className="bg-gray-100 font-semibold">
                  <td className="p-3">{atm.id}</td>
                  <td className="p-3">{atm.name}</td>
                  <td className="p-3">{atm.location}</td>
                  <td className={`p-3 text-center ${atm.systemStatus === 'of' ? 'bg-red-500' : (atm.systemStatus === 'of' ? 'bg-yellow-400' : 'bg-green-400')}`}>
                    {atm.systemStatus}
                  </td>
                  <td className="p-3">${atm.cash}</td>
                  <td className="p-3">{atm.integrity}</td>
                  <td className="p-3">{atm.coins}</td>
                  <td className="p-3">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded-md"
                      onClick={() => handleOpenModal(atm)}
                    >
                      + informações
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
          <div className="bg-white p-4 rounded-lg w-96  font-semibold">
            <h2 className="text-xl font-bold mb-2">Detalhes do ATM</h2>
            {loading ? (
              <p className="text-blue-500">Carregando informações...</p>
            ) : (
              <>
                <p className="pb-2">ID: {selectedATM.id}</p>
                <p className="pb-2">Nome: {selectedATM.name}</p>
                <p className="pb-4 border-b">Localização: {selectedATM.location}</p>
                
                {selectedATM.integrity < 50 && (
                  <p className="border-b pb-2 text-red-500">A integridade está muito baixa e necessita de assistência.</p>
                )}
                
                {selectedATM.cash < 70000 && (
                  <p className="border-b pb-2 text-red-500">Necessita de recarga (dinheiro abaixo de 70000).</p>
                )}

                {selectedATM.cash > 70000 && (
                  <p className="border-b pb-2 text-green-500">Tem Dinheiro suficiente.</p>
                )}

                {selectedATM.cash > 500 && (
                  <p className="border-b pb-2 text-green-500">Tem Papel suficiente.</p>
                )}

                {selectedATM.coins < 500 && (
                  <p className="border-b pb-2 text-red-500">Necessita de recarga de papel (papel abaixo de 500).</p>
                )}

                {selectedATM.systemStatus === 'on' && (
                  <p className="border-b pb-2 text-green-500">O sistema está ligado e funcionando normalmente.</p>
                )}

                {selectedATM.systemStatus === 'of' && (
                  <p className="border-b pb-2 text-yellow-500">O ATM está sem sistema, necessita de assistência urgente.</p>
                )}
              </>
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

export default ATMList;
