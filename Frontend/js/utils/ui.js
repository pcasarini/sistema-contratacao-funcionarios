const STATUS_LABELS = {
  EM_ANALISE: "Em análise",
  APROVADO: "Aprovado",
  REPROVADO: "Reprovado",
  CONTRATADO: "Contratado",
};

export const statusLabel = (status) => STATUS_LABELS[status] || status || "—";
export const statusBadgeClass = (status) => `badge badge--${String(status || "").toLowerCase().replaceAll("_", "-")}`;
export const formatarSalario = (valor) => valor === null || valor === undefined || valor === "" ? "—" : Number(valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export const getQueryParam = (nome) => new URLSearchParams(window.location.search).get(nome);

export function mostrarErro(elemento, erro) {
  if (!elemento) return;
  elemento.textContent = erro?.message || "Ocorreu um erro inesperado.";
  elemento.hidden = false;
}

export function ocultarErro(elemento) {
  if (!elemento) return;
  elemento.textContent = "";
  elemento.hidden = true;
}

export function montarNav(paginaAtiva) {
  const nav = document.querySelector("[data-nav]");
  if (!nav) return;
  const itens = [["index.html", "Funcionários"], ["cadastro.html", "Novo funcionário"], ["indicadores.html", "Indicadores"]];
  nav.innerHTML = itens.map(([href, label]) => `<a href="${href}" class="nav__link${href === paginaAtiva ? " nav__link--ativo" : ""}">${label}</a>`).join("");
}
