import { FuncionariosAPI } from "../api/funcionariosApi.js";
import { getQueryParam, mostrarErro, ocultarErro } from "../utils/ui.js";

const id = getQueryParam("id");
const erroEl = document.getElementById("alerta-erro");
const carregando = document.getElementById("estado-carregando");
const conteudo = document.getElementById("conteudo");
const formPut = document.getElementById("form-put");
const formPatch = document.getElementById("form-patch");
const valor = (campo) => document.getElementById(campo).value.trim();

function identificarFuncionario(f) {
  document.getElementById("put-id").value = f.id ?? "";
}

function limparPut() {
  formPut.reset();
  document.getElementById("put-id").value = id;
}

async function carregar() {
  if (!id) { carregando.hidden = true; mostrarErro(erroEl, new Error("ID não informado na URL.")); return; }
  try {
    const funcionario = await FuncionariosAPI.buscarPorId(id);
    identificarFuncionario(funcionario);
    document.getElementById("titulo-pagina").textContent = `Editar ${funcionario.nome}`;
    carregando.hidden = true;
    conteudo.hidden = false;
  } catch (erro) { carregando.hidden = true; mostrarErro(erroEl, erro); }
}

formPut.addEventListener("submit", async (event) => {
  event.preventDefault();
  ocultarErro(erroEl);
  const atualizado = {
    id: null, nome: valor("put-nome") || null, email: valor("put-email") || null,
    telefone: valor("put-telefone") || null, cargo: valor("put-cargo"),
    departamento: valor("put-departamento") || null,
    salario: valor("put-salario") ? Number(valor("put-salario")) : null,
    cidade: valor("put-cidade") || null, status: valor("put-status"),
  };
  atualizado.cargo = atualizado.cargo || null;
  atualizado.status = atualizado.status || null;
  try {
    await FuncionariosAPI.atualizar(id, atualizado);
    limparPut();
    alert("Funcionário atualizado com PUT. Campos não preenchidos foram definidos como null.");
  }
  catch (erro) { mostrarErro(erroEl, erro); }
});

formPatch.addEventListener("submit", async (event) => {
  event.preventDefault();
  ocultarErro(erroEl);
  const campos = {};
  if (valor("patch-nome")) campos.nome = valor("patch-nome");
  if (valor("patch-email")) campos.email = valor("patch-email");
  if (valor("patch-telefone")) campos.telefone = valor("patch-telefone");
  if (valor("patch-cargo")) campos.cargo = valor("patch-cargo");
  if (valor("patch-departamento")) campos.departamento = valor("patch-departamento");
  if (valor("patch-salario")) campos.salario = Number(valor("patch-salario"));
  if (valor("patch-cidade")) campos.cidade = valor("patch-cidade");
  if (valor("patch-status")) campos.status = valor("patch-status");
  if (!Object.keys(campos).length) { mostrarErro(erroEl, new Error("Preencha pelo menos um campo para o PATCH.")); return; }
  try {
    await FuncionariosAPI.atualizarParcial(id, campos);
    formPatch.reset();
    alert("Funcionário atualizado com PATCH.");
  } catch (erro) { mostrarErro(erroEl, erro); }
});

document.getElementById("btn-excluir").addEventListener("click", async () => {
  if (!confirm(`Deseja excluir o funcionário ${id}?`)) return;
  try { await FuncionariosAPI.excluir(id); location.href = "index.html"; }
  catch (erro) { mostrarErro(erroEl, erro); }
});

carregar();
