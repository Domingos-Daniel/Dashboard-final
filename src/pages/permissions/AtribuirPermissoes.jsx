import React, { useState } from "react";

const AtribuirPermissoes = ({ usuarios, onSubmit }) => {
  const [usuarioSelecionado, setUsuarioSelecionado] = useState("");
  const [nivelPermissao, setNivelPermissao] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Valide os dados, se necessário

    // Envie os dados para o servidor
    onSubmit({ usuario: usuarioSelecionado, permissao: nivelPermissao });

    // Limpe os campos do formulário
    setUsuarioSelecionado("");
    setNivelPermissao("");
  };

  return (
    <div className="mt-8 rounded bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">
        Atribuir Permissões
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="usuario"
            className="block text-sm font-semibold text-gray-600"
          >
            Usuário:
          </label>
          <select
            id="usuario"
            value={usuarioSelecionado}
            onChange={(e) => setUsuarioSelecionado(e.target.value)}
            className="form-select mt-1 block w-full rounded-md border-2 border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none"
          >
            <option value="" disabled>
              Selecione um gestor
            </option>
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="nivelPermissao"
            className="block text-sm font-semibold text-gray-600"
          >
            Nível de Permissão:
          </label>
          <input
            type="text"
            id="nivelPermissao"
            value={nivelPermissao}
            onChange={(e) => setNivelPermissao(e.target.value)}
            className="form-input mt-1 block w-full rounded-md border-2 border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="focus:shadow-outline-blue rounded-md bg-blue-500 py-2 px-4 text-white hover:bg-blue-700 focus:outline-none"
        >
          Atribuir Permissão
        </button>
      </form>
    </div>
  );
};

export default AtribuirPermissoes;
