// Utilitários de interface compartilhados entre as páginas.

export const STATUS_LABELS = {
  EM_ANALISE: "Em análise",
  APROVADO: "Aprovado",
  REPROVADO: "Reprovado",
  CONTRATADO: "Contratado",
};

export const STATUS_OPTIONS = Object.keys(STATUS_LABELS);

export function statusLabel(status) {
  return STATUS_LABELS[status] || status || "—";
}

export function statusBadgeClass(status) {
  return `badge badge--${(status || "").toLowerCase().replace(/_/g, "-")}`;
}

export function httpTag(metodo) {
  return `<span class="http-tag http-tag--${metodo.toLowerCase()}">${metodo}</span>`;
}

export function formatarSalario(valor) {
  if (valor === null || valor === undefined || valor === "") return "—";
  const numero = Number(valor);
  if (Number.isNaN(numero)) return "—";
  return numero.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function getQueryParam(nome) {
  return new URLSearchParams(window.location.search).get(nome);
}

let toastTimer = null;

export function showToast(mensagem, tipo = "sucesso") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast--${tipo}`;
  toast.textContent = mensagem;
  container.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("toast--visivel"));

  setTimeout(() => {
    toast.classList.remove("toast--visivel");
    setTimeout(() => toast.remove(), 250);
  }, 4200);
}

export function mostrarErro(container, erro) {
  if (!container) return;
  container.textContent = erro?.message || "Ocorreu um erro inesperado.";
  container.hidden = false;
}

export function ocultarErro(container) {
  if (!container) return;
  container.hidden = true;
  container.textContent = "";
}

export function confirmarAcao(mensagem) {
  return window.confirm(mensagem);
}

/** Monta a barra de navegação padrão, marcando o item ativo. */
export function montarNav(paginaAtiva) {
  const nav = document.querySelector("[data-nav]");
  if (!nav) return;
  const itens = [
    { href: "index.html", label: "Funcionários" },
    { href: "cadastro.html", label: "Novo funcionário" },
    { href: "indicadores.html", label: "Indicadores" },
  ];
  nav.innerHTML = itens
    .map(
      (item) =>
        `<a href="${item.href}" class="${item.href === paginaAtiva ? "nav__link nav__link--ativo" : "nav__link"}">${item.label}</a>`
    )
    .join("");
}