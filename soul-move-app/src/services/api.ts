// Exporta a URL base para você concatenar depois
const BASE_URL = "http://localhost:8080"; // A URL do seu backend Java

export const api = {
  // Criamos um método get personalizado usando fetch
  get: async (endpoint: string) => {
    const resposta = await fetch(`${BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!resposta.ok) {
      throw new Error(`Erro na requisição: ${resposta.status}`);
    }

    // Convertendo a resposta para JSON
    const data = await resposta.json();
    
    // Retornamos num formato { data } para que o código do frontend 
    // funcione exatamente como estava planeado
    return { data }; 
  },

  // Já deixo aqui o método POST preparado para quando formos enviar o formulário!
  post: async <T>(endpoint: string, body: T) => {
    const resposta = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!resposta.ok) {
      // Se for o erro 409 (conflito de limite diário), podemos tratar depois
      throw new Error(`Erro na requisição: ${resposta.status}`);
    }

    const data = await resposta.json();
    return { data };
  }
};