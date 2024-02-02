import React, { useState, useEffect } from "react";

const ATMModal = ({ atm, showModal, handleCloseModal }) => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {showModal && (
        <div className="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50 opacity-100 transition-opacity duration-300 ease-in-out">
          <div className="absolute w-96 rounded-lg bg-white p-4 font-semibold">
            <h2 className="mb-3 pb-4 text-xl font-bold">Detalhes do ATM</h2>
            {loading ? (
              <p className="text-blue-500">Carregando informações...</p>
            ) : (
              <>
                <p className="pb-2">ID: {atm.id}</p>
                <p className="pb-2">Nome: {atm.name}</p>
                <p className="border-b pb-4">Localização: {atm.location}</p>

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

                {atm.cash >= 1000 && (
                  <p className="border-b pb-2 text-green-500">
                    Tem Papel suficiente.
                  </p>
                )}

                {atm.coins < 1000 && (
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
              className="mt-4 rounded-md bg-blue-500 px-2 py-1 text-white"
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
