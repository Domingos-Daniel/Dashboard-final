import React, { useState, useEffect } from "react";

const ATMModal = ({ atm, showModal, handleCloseModal }) => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center transition-opacity duration-300 ease-in-out bg-gray-900 bg-opacity-50 opacity-100">
          <div className="absolute bg-white p-4 rounded-lg w-96 font-semibold">
            <h2 className="text-xl font-bold mb-3 pb-4">Detalhes do ATM</h2>
            {loading ? (
              <p className="text-blue-500">Carregando informações...</p>
            ) : (
              <>
                <p className="pb-2">ID: {atm.id}</p>
                <p className="pb-2">Nome: {atm.name}</p>
                <p className="pb-4 border-b">Localização: {atm.location}</p>

                {atm.integrity < 50 && (
                  <p className="border-b pb-2 text-red-500">
                    A integridade está muito baixa e necessita de assistência.
                  </p>
                )}

                {atm.cash < 70000 && (
                  <p className="border-b pb-2 text-red-500">
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
                  <p className="border-b pb-2 text-red-500">
                    Necessita de recarga de papel (papel abaixo de 500).
                  </p>
                )}

                {atm.systemStatus === "on" && (
                  <p className="border-b pb-2 text-green-500">
                    O sistema está ligado e funcionando normalmente.
                  </p>
                )}

                {atm.systemStatus === "of" && (
                  <p className="border-b pb-2 text-red-500">
                    O ATM está sem sistema, necessita de assistência urgente.
                  </p>
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
    </>
  );
};

export default ATMModal;
