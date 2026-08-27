import { FuncionariosAPI } from "../api/funcionariosApi.js";
import { montarNav, mostrarErro } from "../utils/ui.js";

montarNav("indicadores.html");
const carregando = document.getElementById("estado-carregando");
const conteudo = document.getElementById("conteudo");
const erroEl = document.getElementById("alerta-erro");
const barra = document.getElementById("barra-distribuicao");
const legenda = document.getElementById("legenda-distribuicao");
const segmentos = [
  ["emAnalise", "Em análise", "var(--amber)"],
  ["aprovados", "Aprovados", "var(--accent)"],
  ["reprovados", "Reprovados", "var(--rust)"],
  ["contratados", "Contratados", "#2b5a8c"],
];

function renderizarBarra(dados) {
  const total = dados.total || 0;
  barra.innerHTML = "";
  legenda.innerHTML = "";
  if (!total) { legenda.textContent = "Nenhum funcionário cadastrado."; return; }
  segmentos.forEach(([campo, label, cor]) => {
    const quantidade = dados[campo] || 0;
    const percentual = quantidade / total * 100;
    const bloco = document.createElement("div");
    bloco.className = "barra__segmento";
    bloco.style.width = `${percentual}%`;
    bloco.style.background = cor;
    barra.appendChild(bloco);
    const item = document.createElement("span");
    item.textContent = `${label}: ${quantidade} (${percentual.toFixed(0)}%)`;
    legenda.appendChild(item);
  });
}

async function carregar() {
  try {
    const dados = await FuncionariosAPI.indicadores();
    document.getElementById("valor-total").textContent = dados.total ?? 0;
    document.getElementById("valor-em-analise").textContent = dados.emAnalise ?? 0;
    document.getElementById("valor-aprovados").textContent = dados.aprovados ?? 0;
    document.getElementById("valor-reprovados").textContent = dados.reprovados ?? 0;
    document.getElementById("valor-contratados").textContent = dados.contratados ?? 0;
    renderizarBarra(dados);
    carregando.hidden = true;
    conteudo.hidden = false;
  } catch (erro) { carregando.hidden = true; mostrarErro(erroEl, erro); }
}

carregar();
