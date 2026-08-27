const BASE_URL = window.APP_CONFIG.API_BASE_URL;

async function request(caminho, options = {}) {
  let response;
  try {
    response = await fetch(`${BASE_URL}${caminho}`, {
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
      ...options,
    });
  } catch (_erro) {
    throw new Error(`Não foi possível conectar à API em ${BASE_URL}. Verifique se o backend está em execução.`);
  }
  const texto = await response.text();
  let corpo = null;
  if (texto) {
    try { corpo = JSON.parse(texto); } catch (_erro) { corpo = texto; }
  }
  if (!response.ok) {
    const mensagem = typeof corpo === "string" ? corpo : corpo?.mensagem || corpo?.message;
    const erro = new Error(mensagem || `Erro HTTP ${response.status}`);
    erro.status = response.status;
    throw erro;
  }
  return corpo;
}

function queryString(filtros = {}) {
  const params = new URLSearchParams();
  Object.entries(filtros).forEach(([campo, valor]) => {
    if (valor !== null && valor !== undefined && String(valor).trim() !== "") params.append(campo, valor);
  });
  const query = params.toString();
  return query ? `?${query}` : "";
}

export const FuncionariosAPI = {
  listarTodos: () => request("/funcionarios"),
  buscarPorId: (id) => request(`/funcionarios/${id}`),
  buscar: (filtros) => request(`/funcionarios/buscar${queryString(filtros)}`),
  cadastrar: (dados) => request("/funcionarios", { method: "POST", body: JSON.stringify(dados) }),
  atualizar: (id, dados) => request(`/funcionarios/${id}`, { method: "PUT", body: JSON.stringify(dados) }),
  atualizarParcial: (id, dados) => request(`/funcionarios/${id}`, { method: "PATCH", body: JSON.stringify(dados) }),
  excluir: (id) => request(`/funcionarios/${id}`, { method: "DELETE" }),
  indicadores: () => request("/funcionarios/indicadores"),
};
