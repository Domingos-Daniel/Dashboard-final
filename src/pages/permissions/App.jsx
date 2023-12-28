import React, { useState } from "react";
import CadastroUsuario from "./CadastroUsuario";
import AtribuirPermissoes from "./AtribuirPermissoes";

const App = () => {
  const [usuarios, setUsuarios] = useState([]);

  const cadastrarUsuario = (novoUsuario) => {
    // Envie os dados do novo usuário para o servidor (usando fetch ou axios)
    // Atualize a lista de usuários no estado
    setUsuarios([...usuarios, novoUsuario]);
  };

  const atribuirPermissao = (dadosPermissao) => {
    // Envie os dados de atribuição de permissão para o servidor
    // Atualize o estado conforme necessário
    console.log("Atribuir Permissão:", dadosPermissao);
  };

  return (
    <div className="mx-auto my-8 max-w-4xl rounded bg-white p-8 shadow-md">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Gestão de Gestores e Permissões
      </h1>
      <div className="mb-8">
        <CadastroUsuario onSubmit={cadastrarUsuario} />
      </div>
      <div className="mb-8">
        <AtribuirPermissoes usuarios={usuarios} onSubmit={atribuirPermissao} />
      </div>
      {/* Exiba a lista de usuários e permissões conforme necessário */}
    </div>
  );
};

export default App;
