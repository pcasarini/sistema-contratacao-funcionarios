// Camada de acesso à API REST (Spring Boot).
// Nenhum dado é mockado: toda função aqui faz uma requisição real ao back-end.

const BASE_URL = window.APP_CONFIG.API_BASE_URL;

/**
 * Interpreta a resposta HTTP. A API retorna erros como texto puro
 * (ResponseEntity<String>), então tentamos JSON e caímos para texto.
 */
async function handleResponse(response) {
  const raw = await response.text();
  let body = null;

  if (raw) {
    try {
      body = JSON.parse(raw);
    } catch (_e) {
      body = raw; // corpo de erro em texto puro
    }
  }

  if (!response.ok) {
    const mensagem = typeof body === "string" && body.trim() ? body : null;
    const erro = new Error(mensagem || mensagemPadraoPorStatus(response.status));
    erro.status = response.status;
    throw erro;
  }

  return body;
}

function mensagemPadraoPorStatus(status) {
  switch (status) {
    case 400:
      return "Dados inválidos. Verifique os campos preenchidos.";
    case 401:
      return "Você não está autenticado para realizar esta ação.";
    case 403:
      return "Você não tem permissão para realizar esta ação.";
    case 404:
      return "Registro não encontrado.";
    case 409:
      return "Conflito: este registro já existe.";
    case 500:
      return "Erro interno no servidor. Tente novamente mais tarde.";
    default:
      return "Ocorreu um erro inesperado.";
  }
}

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
      ...options,
    });
  } catch (_networkError) {
    const erro = new Error(
      `Não foi possível conectar à API em ${BASE_URL}. Verifique se o back-end Spring Boot está em execução e se a URL em js/config.js está correta.`
    );
    erro.status = 0;
    throw erro;
  }
  return handleResponse(response);
}

function montarQueryString(params) {
  const query = new URLSearchParams();
  Object.entries(params || {}).forEach(([chave, valor]) => {
    if (valor !== null && valor !== undefined && String(valor).trim() !== "") {
      query.append(chave, valor);
    }
  });
  const texto = query.toString();
  return texto ? `?${texto}` : "";
}

export const FuncionariosAPI = {
  listarTodos() {
    return request("/funcionarios");
  },

  buscarPorId(id) {
    return request(`/funcionarios/${id}`);
  },

  // GET /funcionarios/buscar?nome=&cargo=&status=
  buscar({ nome, cargo, status } = {}) {
    return request(`/funcionarios/buscar${montarQueryString({ nome, cargo, status })}`);
  },

  cadastrar(funcionario) {
    return request("/funcionarios", {
      method: "POST",
      body: JSON.stringify(funcionario),
    });
  },

  // PUT: atualização completa
  atualizar(id, funcionario) {
    return request(`/funcionarios/${id}`, {
      method: "PUT",
      body: JSON.stringify(funcionario),
    });
  },

  // PATCH: atualização parcial — enviar somente os campos alterados
  atualizarParcial(id, camposAlterados) {
    return request(`/funcionarios/${id}`, {
      method: "PATCH",
      body: JSON.stringify(camposAlterados),
    });
  },

  excluir(id) {
    return request(`/funcionarios/${id}`, { method: "DELETE" });
  },

  indicadores() {
    return request("/funcionarios/indicadores");
  },
};