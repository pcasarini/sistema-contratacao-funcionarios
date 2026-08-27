import { FuncionariosAPI } from "../api/funcionariosApi.js";
import { formatarSalario, montarNav, mostrarErro, ocultarErro, statusBadgeClass, statusLabel } from "../utils/ui.js";

montarNav("index.html");

const form = document.getElementById("form-busca");
const tbody = document.getElementById("tbody-funcionarios");
const erroEl = document.getElementById("alerta-erro");
const carregando = document.getElementById("estado-carregando");
const vazio = document.getElementById("estado-vazio");
const tabela = document.getElementById("wrapper-tabela");
const contador = document.getElementById("contador");

function renderizar(lista) {
  carregando.hidden = true;
  contador.textContent = `${lista.length} registro(s)`;
  vazio.hidden = lista.length > 0;
  tabela.hidden = lista.length === 0;
  tbody.innerHTML = lista.map((f) => `
    <tr>
      <td class="td-id" data-label="ID">${f.id}</td>
      <td data-label="Nome">${f.nome || "—"}</td>
      <td data-label="Cargo">${f.cargo || "—"}</td>
      <td data-label="Departamento">${f.departamento || "—"}</td>
      <td data-label="Cidade">${f.cidade || "—"}</td>
      <td data-label="Salário">${formatarSalario(f.salario)}</td>
      <td data-label="Status"><span class="${statusBadgeClass(f.status)}">${statusLabel(f.status)}</span></td>
      <td data-label="Ações"><div class="row-actions">
        <a class="btn btn--ghost btn--sm" href="editar.html?id=${f.id}">Consultar/Editar</a>
        <button class="btn btn--danger btn--sm" type="button" data-excluir-id="${f.id}">Excluir</button>
      </div></td>
    </tr>`).join("");
}

async function carregarTodos() {
  ocultarErro(erroEl);
  carregando.hidden = false;
  vazio.hidden = true;
  tabela.hidden = true;
  try { renderizar((await FuncionariosAPI.listarTodos()) || []); }
  catch (erro) { carregando.hidden = true; mostrarErro(erroEl, erro); }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  ocultarErro(erroEl);
  carregando.hidden = false;
  try {
    renderizar((await FuncionariosAPI.buscar({
      nome: document.getElementById("busca-nome").value,
      cargo: document.getElementById("busca-cargo").value,
      status: document.getElementById("busca-status").value,
    })) || []);
  } catch (erro) { carregando.hidden = true; mostrarErro(erroEl, erro); }
});

document.getElementById("btn-limpar-busca").addEventListener("click", () => {
  form.reset();
  carregarTodos();
});

tbody.addEventListener("click", async (event) => {
  const botao = event.target.closest("[data-excluir-id]");
  if (!botao || !confirm(`Deseja excluir o funcionário ${botao.dataset.excluirId}?`)) return;
  try { await FuncionariosAPI.excluir(botao.dataset.excluirId); await carregarTodos(); }
  catch (erro) { mostrarErro(erroEl, erro); }
});

carregarTodos();
