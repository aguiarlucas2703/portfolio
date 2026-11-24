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

export const projects = [
  {
    number: "01",
    title: "CAES",
    context: "Projeto em equipe · Capacitação Web Full-stack WebAcademy",
    visibility: "Repositório privado",
    summary:
      "Aplicação web proposta para apoiar a Pró-Reitoria de Assuntos Estudantis da UFAC na inscrição, avaliação e divulgação de bolsas e auxílios, além do cadastro socioeconômico.",
    contributions: [
      "Implementei endpoints REST para consulta, criação, atualização e remoção de estudantes.",
      "Estruturei DTOs e o mapeamento entre os dados da API e as entidades.",
      "Criei uma primeira tela da área do estudante para visualizar processos seletivos, com dados simulados.",
    ],
    technologies: ["Java 17", "Spring Boot", "MySQL", "Angular", "TypeScript"],
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
