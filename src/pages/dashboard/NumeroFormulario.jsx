import React, { useState } from 'react';

function NumeroFormulario() {
  const [numero, setNumero] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleNumeroChange = (e) => {
    setNumero(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Faça algo com o número inserido, por exemplo, exiba-o no console
    console.log(numero);

    // Defina a mensagem amigável
    setMensagem(`Número ${numero} inserido com sucesso!`);
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numero">
            Insira o número base de notificações:
          </label>
          <input
            type="number"
            id="numero"
            name="numero"
            value={numero}
            onChange={handleNumeroChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Número"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Enviar
          </button>
        </div>
      </form>

      {mensagem && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mt-4">
          {mensagem}
        </div>
      )}
    </div>
  );
}

export default NumeroFormulario;
