// api.js
const API_BASE_URL = "http://localhost:5000/api"; // Altere a URL conforme necessário

export const cadastrarUsuario = async (dadosUsuario) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cadastrarUsuario`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosUsuario),
    });

    if (!response.ok) {
      throw new Error("Erro ao cadastrar usuário");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    throw error;
  }
};

export const atribuirPermissao = async (dadosPermissao) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/cadastrarUsuario`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosUsuario),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Erro ao atribuir permissão");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao atribuir permissão:", error);
    throw error;
  }
};
