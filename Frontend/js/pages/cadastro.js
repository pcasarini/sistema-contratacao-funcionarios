import { FuncionariosAPI } from "../api/funcionariosApi.js";
import { montarNav, mostrarErro, ocultarErro } from "../utils/ui.js";

montarNav("cadastro.html");
const form = document.getElementById("form-cadastro");
const erroEl = document.getElementById("alerta-erro");
const botao = document.getElementById("btn-salvar");
const texto = (id) => document.getElementById(id).value.trim() || null;

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  ocultarErro(erroEl);
  if (!form.checkValidity()) { form.reportValidity(); return; }
  const salario = document.getElementById("salario").value;
  const funcionario = {
    id: Number(document.getElementById("id").value),
    nome: texto("nome"), email: texto("email"), telefone: texto("telefone"),
    cargo: texto("cargo"), departamento: texto("departamento"),
    salario: salario ? Number(salario) : null,
    cidade: texto("cidade"), status: document.getElementById("status").value,
  };
  botao.disabled = true;
  botao.textContent = "Cadastrando...";
  try { await FuncionariosAPI.cadastrar(funcionario); location.href = "index.html"; }
  catch (erro) { mostrarErro(erroEl, erro); }
  finally { botao.disabled = false; botao.textContent = "Cadastrar funcionário"; }
});
