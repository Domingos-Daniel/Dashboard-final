import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CadastroUsuario = ({ onSubmit }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [agencia, setAgencia] = useState("");
  const [telefone, setTelefone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Valide os dados, se necessário

    try {
      // Envie os dados para o servidor
      await onSubmit({ nome, email, senha, agencia, telefone });

      // Limpe os campos do formulário
      setNome("");
      setEmail("");
      setSenha("");
      setAgencia("");
      setTelefone("");

      // Exiba uma mensagem de sucesso
      toast.success("Cadastro realizado com sucesso!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      // Exiba uma mensagem de erro
      toast.error("Erro ao cadastrar. Por favor, tente novamente.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-m mx-auto rounded bg-white p-8"
    >
      <h2 className="mb-4 text-center text-2xl font-bold text-gray-800">
        Adicionar Gestor
      </h2>
      <div className="mb-4">
        <label
          htmlFor="nome"
          className="block text-sm font-semibold text-gray-600"
        >
          Nome do Gestor:
        </label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="form-input mt-1 block w-full rounded-md border-2 border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-gray-600"
        >
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input mt-1 block w-full rounded-md border-2 border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="senha"
          className="block text-sm font-semibold text-gray-600"
        >
          Senha:
        </label>
        <input
          type="password"
          id="senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="form-input mt-1 block w-full rounded-md border-2 border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="agencia"
          className="block text-sm font-semibold text-gray-600"
        >
          Agência:
        </label>
        <input
          type="text"
          id="agencia"
          value={agencia}
          onChange={(e) => setAgencia(e.target.value)}
          className="form-input mt-1 block w-full rounded-md border-2 border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="telefone"
          className="block text-sm font-semibold text-gray-600"
        >
          Telefone:
        </label>
        <input
          type="tel"
          id="telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          className="form-input mt-1 block w-full rounded-md border-2 border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="focus:shadow-outline-blue rounded-md bg-blue-500 py-2 px-4 text-white hover:bg-blue-700 focus:outline-none"
      >
        Cadastrar
      </button>
    </form>
  );
};

export default CadastroUsuario;
