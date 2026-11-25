import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Home from "../app/page";

function mockGalleryDialog(project: string) {
  const dialog = screen.getByRole("heading", { name: project }).closest("article")!.querySelector("dialog")!;
  dialog.showModal = vi.fn(() => {
    dialog.setAttribute("open", "");
    within(dialog).getByRole("button", { name: "Fechar galeria" }).focus();
  });
  dialog.close = vi.fn(() => {
    dialog.removeAttribute("open");
    dialog.dispatchEvent(new Event("close"));
  });
}

describe("portfolio home", () => {
  it("apresenta o nome e a especialidade de Lucas", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /lucas aguiar/i })).toBeInTheDocument();
    expect(screen.getByText(/desenvolvedor full-stack/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        "Sou desenvolvedor web full-stack, formado em Sistemas de Informação. Construo aplicações com uma visão do produto como um todo, da lógica à interface, sempre atento à experiência de quem usa.",
      ),
    ).toBeInTheDocument();
  });

  it("oferece navegação para as seções principais", () => {
    render(<Home />);
    const navigation = screen.getByRole("navigation", { name: "Navegação principal" });
    expect(within(navigation).getByRole("link", { name: "Projetos" })).toHaveAttribute("href", "#work");
    expect(within(navigation).getByRole("link", { name: "Sobre" })).toHaveAttribute("href", "#about");
    expect(within(navigation).getByRole("link", { name: "Formação" })).toHaveAttribute("href", "#education");
    expect(within(navigation).getByRole("link", { name: "Contato" })).toHaveAttribute("href", "#contact");
  });

  it("mostra e-mail e GitHub com links corretos na área de contato", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: "lucasaguiar2703@gmail.com" })).toHaveAttribute(
      "href",
      "mailto:lucasaguiar2703@gmail.com",
    );
    const github = screen.getByRole("link", { name: "GitHub de Lucas Aguiar (abre em nova aba)" });
    expect(github).toHaveAttribute("href", "https://github.com/aguiarlucas2703");
    expect(github).toHaveAttribute("target", "_blank");
    expect(github).toHaveAttribute("rel", "noopener noreferrer");
    expect(github.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("exibe os títulos, a citação e o convite escolhidos para as seções", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: "Projetos em que já trabalhei." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Sobre e stack" })).toBeInTheDocument();

    const formation = within(screen.getByRole("region", { name: "Formação" }));
    expect(formation.getByRole("blockquote")).toHaveTextContent(
      "Renda-se, como eu me rendi. Mergulhe no que você não conhece como eu mergulhei.",
    );
    expect(formation.getByText("— Clarice Lispector")).toBeInTheDocument();

    expect(screen.getByText("Vamos conversar?")).toBeInTheDocument();
    expect(screen.getByRole("heading", {
      name: "Uma ideia boa pode surgir de uma pergunta que pode parecer boba.",
    })).toBeInTheDocument();
    expect(screen.getByText("Algum projeto em mente? Entre em contato!")).toBeInTheDocument();
  });

  it("apresenta o CAES, seu contexto, contribuições e tecnologias", () => {
    render(<Home />);
    const caesCard = screen.getByRole("heading", { name: "CAES" }).closest("article");
    expect(caesCard).not.toBeNull();
    const caes = within(caesCard!);
    expect(screen.getByText(/Capacitação Web Full-stack WebAcademy/)).toBeInTheDocument();
    expect(caes.getByText(/endpoints REST para consulta, criação, atualização e remoção de estudantes/i)).toBeInTheDocument();
    expect(caes.getByText(/Repositório privado/)).toBeInTheDocument();
    const caesDemo = caes.getByRole("link", { name: /Acessar aplicação: CAES/i });
    expect(caesDemo).toHaveAttribute("href", "https://caes.ufac.br/login");
    expect(caesDemo).toHaveAttribute("target", "_blank");
    expect(caesDemo).toHaveAttribute("rel", "noopener noreferrer");
    expect(caes.getByText("Spring Boot")).toBeInTheDocument();
    expect(caes.getByText("Angular")).toBeInTheDocument();
  });

  it("apresenta Astros e SmartFridge com links para os repositórios públicos", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: "Astros" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Ver código: Astros/i })).toHaveAttribute(
      "href",
      "https://github.com/aguiarlucas2703/Astros",
    );
    expect(screen.getByText(/acompanhamento da posição da ISS/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "SmartFridge" })).toBeInTheDocument();
    const smartFridgeDemo = screen.getByRole("link", { name: /Acessar aplicação: SmartFridge/i });
    expect(smartFridgeDemo).toHaveAttribute("href", "https://smartfridge1.vercel.app/");
    expect(smartFridgeDemo).toHaveAttribute("target", "_blank");
    expect(smartFridgeDemo).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByRole("link", { name: /Ver código: SmartFridge/i })).toHaveAttribute(
      "href",
      "https://github.com/aguiarlucas2703/SmartFridge",
    );
    expect(screen.getByText(/quantidade de ingredientes coincidentes/i)).toBeInTheDocument();
  });

  it("carrega uma captura por vez e apenas depois de abrir a galeria do SmartFridge", async () => {
    const user = userEvent.setup();
    const { container } = render(<Home />);
    mockGalleryDialog("SmartFridge");

    expect(container.querySelector(".project-gallery-image")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Ver telas do SmartFridge" }));
    const gallery = within(screen.getByRole("dialog", { name: "Telas do SmartFridge" }));
    expect(gallery.getByRole("img")).toHaveAttribute("src", "/projects/smartfridge/boas-vindas.webp");
    expect(gallery.getByText("1 de 6")).toBeInTheDocument();

    await user.click(gallery.getByRole("button", { name: "Próxima tela" }));
    expect(gallery.getByRole("img")).toHaveAttribute("src", "/projects/smartfridge/inicio.webp");
    expect(gallery.getByText("2 de 6")).toBeInTheDocument();
    await user.keyboard("{ArrowLeft}");
    expect(gallery.getByText("1 de 6")).toBeInTheDocument();

    await user.click(gallery.getByRole("button", { name: "Fechar galeria" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(container.querySelector(".project-gallery-image")).not.toBeInTheDocument();
  });

  it("mostra as três capturas horizontais do CAES e permite ampliar a tela atual", async () => {
    const user = userEvent.setup();
    const { container } = render(<Home />);
    mockGalleryDialog("CAES");

    expect(container.querySelector(".project-gallery-image")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Ver telas do CAES" }));
    const dialog = screen.getByRole("dialog", { name: "Telas do CAES" });
    expect(dialog).toHaveAttribute("data-layout", "landscape");
    const gallery = within(dialog);
    const enlarge = gallery.getByRole("link", { name: /Ampliar imagem/ });
    expect(enlarge).toHaveAttribute("target", "_blank");
    expect(enlarge).toHaveAttribute("rel", "noopener noreferrer");

    const files = ["portal-de-editais", "analise-socioeconomica", "processos-seletivos"];
    for (const [index, file] of files.entries()) {
      const path = `/projects/caes/${file}.webp`;
      expect(gallery.getByRole("img")).toHaveAttribute("src", path);
      expect(enlarge).toHaveAttribute("href", path);
      expect(gallery.getByText(`${index + 1} de 3`)).toBeInTheDocument();
      if (index < files.length - 1) {
        await user.click(gallery.getByRole("button", { name: "Próxima tela" }));
      }
    }
  });

  it("inclui Kotlin entre as tecnologias já utilizadas", () => {
    render(<Home />);
    const technologiesGroup = screen
      .getByRole("heading", { name: "Tecnologias que já utilizei" })
      .parentElement;
    expect(technologiesGroup).not.toBeNull();
    expect(within(technologiesGroup!).getByText("Kotlin")).toBeInTheDocument();
  });

  it("apresenta a graduação e a pós-graduação", () => {
    render(<Home />);
    expect(screen.getByText("Universidade Federal do Acre")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Sistemas de Informação" })).toBeInTheDocument();
    expect(screen.getByText(/2022–2026/)).toBeInTheDocument();
    expect(screen.getByText("Inteligência Artificial para Engenharia de Testes de Software")).toBeInTheDocument();
    expect(screen.getByText("Em andamento")).toBeInTheDocument();
  });

  it("mantém a camada de fumaça interativa no hero", () => {
    render(<Home />);
    expect(screen.getByTestId("hero-smoke")).toHaveAttribute("aria-hidden", "true");
  });

  it("mostra a caminhada do Legoshi sem legenda no lugar do manifesto", () => {
    const { container } = render(<Home />);
    expect(container.querySelector("canvas.legoshi-sprite")).toBeInTheDocument();
    expect(screen.queryByText(/Legoshi|Beastars/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Código com intenção/)).not.toBeInTheDocument();
  });

  it("mostra um controle acessível para voltar ao topo após rolar", async () => {
    render(<Home />);

    expect(screen.queryByRole("button", { name: "Voltar ao topo" })).not.toBeInTheDocument();
    Object.defineProperty(window, "scrollY", { configurable: true, value: 600 });
    window.dispatchEvent(new Event("scroll"));

    expect(await screen.findByRole("button", { name: "Voltar ao topo" })).toBeInTheDocument();
  });
});
