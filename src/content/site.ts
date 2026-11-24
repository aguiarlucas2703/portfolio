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
    repository: null,
  },
  {
    number: "02",
    title: "Astros",
    context: "Aplicativo Android nativo · Projeto pessoal",
    summary:
      "Aplicativo de astronomia com catálogo de corpos celestes e imagens da NASA, eventos astronômicos, rastreador da Estação Espacial Internacional e atividades interativas.",
    contributions: [
      "Estruturei o aplicativo e desenvolvi o catálogo conectado à API de imagens da NASA.",
      "Implementei quiz, modo de adivinhação, eventos e acompanhamento da posição da ISS.",
      "Registrei o histórico das partidas no armazenamento local e integrei os dados ao perfil.",
    ],
    technologies: ["Kotlin", "Jetpack Compose", "Retrofit", "NASA APIs"],
    repository: { url: "https://github.com/aguiarlucas2703/Astros", label: "Ver código" },
  },
  {
    number: "03",
    title: "SmartFridge",
    context: "Aplicativo mobile · Projeto pessoal",
    summary:
      "Aplicativo que organiza ingredientes disponíveis em casa e busca receitas compatíveis, indicando o que já está na despensa e o que falta.",
    contributions: [
      "Implementei a seleção de ingredientes e o salvamento local da despensa.",
      "Integrei a busca à TheMealDB e ordenei os resultados pela quantidade de ingredientes coincidentes.",
      "Desenvolvi a tradução de ingredientes e receitas para português, com cache local.",
    ],
    technologies: ["React Native", "Expo", "JavaScript", "AsyncStorage", "TheMealDB API"],
    repository: { url: "https://github.com/aguiarlucas2703/SmartFridge", label: "Ver código" },
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
