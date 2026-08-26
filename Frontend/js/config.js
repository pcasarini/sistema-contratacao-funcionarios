import { FuncionariosAPI } from "../api/funcionariosApi.js";
import { mostrarErro, montarNav } from "../utils/ui.js";

montarNav("indicadores.html");

const elCarregando = document.getElementById("estado-carregando");
const elConteudo = document.getElementById("conteudo");
const elAlertaErro = document.getElementById("alerta-erro");
const elBarra = document.getElementById("barra-distribuicao");
const elLegenda = document.getElementById("legenda-distribuicao");

const SEGMENTOS = [
  { chave: "emAnalise", label: "Em análise", cor: "var(--amber)" },
  { chave: "aprovados", label: "Aprovados", cor: "var(--accent)" },
  { chave: "reprovados", label: "Reprovados", cor: "var(--rust)" },
  { chave: "contratados", label: "Contratados", cor: "#2b5a8c" },
];

async function carregar() {
  try {
    const dados = await FuncionariosAPI.indicadores();

    document.getElementById("valor-total").textContent = dados.total ?? 0;
    document.getElementById("valor-em-analise").textContent = dados.emAnalise ?? 0;
    document.getElementById("valor-aprovados").textContent = dados.aprovados ?? 0;
    document.getElementById("valor-reprovados").textContent = dados.reprovados ?? 0;
    document.getElementById("valor-contratados").textContent = dados.contratados ?? 0;

    renderizarBarra(dados);

    elCarregando.hidden = true;
    elConteudo.hidden = false;
  } catch (erro) {
    elCarregando.hidden = true;
    mostrarErro(elAlertaErro, erro);
  }
}

function renderizarBarra(dados) {
  const total = dados.total || 0;
  elBarra.innerHTML = "";
  elLegenda.innerHTML = "";

  if (total === 0) {
    elLegenda.textContent = "Nenhum funcionário cadastrado ainda.";
    return;
  }

  SEGMENTOS.forEach((segmento) => {
    const valor = dados[segmento.chave] || 0;
    const percentual = (valor / total) * 100;

    const bloco = document.createElement("div");
    bloco.className = "barra__segmento";
    bloco.style.width = `${percentual}%`;
    bloco.style.background = segmento.cor;
    elBarra.appendChild(bloco);

    const item = document.createElement("span");
    item.innerHTML = `<strong style="color:${segmento.cor}">●</strong> ${segmento.label}: ${valor} (${percentual.toFixed(0)}%)`;
    elLegenda.appendChild(item);
  });
}

carregar();