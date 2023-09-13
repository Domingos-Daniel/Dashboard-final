import axios from 'axios';
import { apiUrl } from './apiConfig'; // Importe a URL da API definida globalmente

// Função genérica para fazer uma requisição GET à API
export const getApiData = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw error; // Você pode tratar erros aqui ou capturá-los onde usar essa função
  }
};
