export const profile = {
  name: "Lucas Aguiar dos Santos",
  shortName: "Lucas Aguiar",
  role: "Desenvolvedor full-stack",
  intro:
    "Construo aplicações pensando no produto inteiro — da interface à lógica que sustenta cada experiência.",
};

export const stackGroups = [
  {
    label: "Tecnologias que já utilizei",
    items: ["C", "Python", "R", "HTML", "CSS", "MySQL", "SQLite", "Kotlin"],
  },
  {
    label: "Atualmente estudando",
    items: ["Java", "Spring", "JavaScript", "TypeScript", "Angular", "Django"],
  },
] as const;

export const education = [
  {
    type: "Graduação",
    title: "Sistemas de Informação",
    institution: "Universidade Federal do Acre",
    status: "Concluída · 2022–2026",
  },
  {
    type: "Pós-graduação lato sensu",
    title: "Inteligência Artificial para Engenharia de Testes de Software",
    status: "Em andamento",
  },
] as const;
