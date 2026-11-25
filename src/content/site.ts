export const profile = {
  name: "Lucas Aguiar dos Santos",
  shortName: "Lucas Aguiar",
  role: "Desenvolvedor full-stack",
  email: "lucasaguiar2703@gmail.com",
  github: "https://github.com/aguiarlucas2703",
  intro:
    "Sou desenvolvedor web full-stack, formado em Sistemas de Informação. Construo aplicações com uma visão do produto como um todo, da lógica à interface, sempre atento à experiência de quem usa.",
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

export type ProjectScreenshot = {
  src: string;
  width: number;
  height: number;
  title: string;
  alt: string;
};

const caesScreenshots: readonly ProjectScreenshot[] = [
  {
    src: "/projects/caes/portal-de-editais.webp",
    width: 1870,
    height: 968,
    title: "Portal de editais",
    alt: "Portal público de editais da UFAC com o formulário de acesso pelo ID UFAC.",
  },
  {
    src: "/projects/caes/analise-socioeconomica.webp",
    width: 960,
    height: 424,
    title: "Análise socioeconômica",
    alt: "Painel da equipe com atalhos para análise de formulários, solicitações de atualização e ranking socioeconômico.",
  },
  {
    src: "/projects/caes/processos-seletivos.webp",
    width: 869,
    height: 428,
    title: "Processos seletivos",
    alt: "Área do estudante com filtros e uma lista de editais, prazos, status e opções de inscrição.",
  },
];

const smartFridgeScreenshots: readonly ProjectScreenshot[] = [
  {
    src: "/projects/smartfridge/boas-vindas.webp",
    width: 323,
    height: 713,
    title: "Boas-vindas",
    alt: "Criação do perfil com escolha de avatar e campo para o nome.",
  },
  {
    src: "/projects/smartfridge/inicio.webp",
    width: 326,
    height: 711,
    title: "Início",
    alt: "Página inicial com o total de ingredientes, receitas favoritas e um atalho para sugestões.",
  },
  {
    src: "/projects/smartfridge/despensa.webp",
    width: 324,
    height: 710,
    title: "Despensa",
    alt: "Despensa com busca e seleção de ingredientes por categoria.",
  },
  {
    src: "/projects/smartfridge/receitas.webp",
    width: 321,
    height: 712,
    title: "Receitas sugeridas",
    alt: "Lista de receitas com filtros, porcentagem de compatibilidade e contagem dos ingredientes que faltam.",
  },
  {
    src: "/projects/smartfridge/detalhe-da-receita.webp",
    width: 319,
    height: 709,
    title: "Detalhe da receita",
    alt: "Receita de curry traduzida, com a compatibilidade e a lista de ingredientes disponíveis e faltantes.",
  },
  {
    src: "/projects/smartfridge/menu.webp",
    width: 324,
    height: 711,
    title: "Menu",
    alt: "Menu lateral com atalhos para a despensa, dicas contra desperdício, conversor de medidas e favoritos.",
  },
];

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
    liveDemoUrl: "https://caes.ufac.br/login",
    repository: null,
    screenshots: caesScreenshots,
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
    liveDemoUrl: null,
    repository: { url: "https://github.com/aguiarlucas2703/Astros", label: "Ver código" },
    screenshots: null,
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
    liveDemoUrl: "https://smartfridge1.vercel.app/",
    repository: { url: "https://github.com/aguiarlucas2703/SmartFridge", label: "Ver código" },
    screenshots: smartFridgeScreenshots,
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
