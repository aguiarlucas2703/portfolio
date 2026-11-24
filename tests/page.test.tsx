import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "../app/page";

describe("portfolio home", () => {
  it("apresenta o nome e a especialidade de Lucas", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /lucas aguiar/i })).toBeInTheDocument();
    expect(screen.getByText(/desenvolvedor full-stack/i)).toBeInTheDocument();
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

  it("apresenta o CAES, seu contexto, contribuições e tecnologias", () => {
    render(<Home />);
    const caesCard = screen.getByRole("heading", { name: "CAES" }).closest("article");
    expect(caesCard).not.toBeNull();
    const caes = within(caesCard!);
    expect(screen.getByText(/Capacitação Web Full-stack WebAcademy/)).toBeInTheDocument();
    expect(caes.getByText(/endpoints REST para consulta, criação, atualização e remoção de estudantes/i)).toBeInTheDocument();
    expect(caes.getByText(/Repositório privado/)).toBeInTheDocument();
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
    expect(screen.getByRole("link", { name: /Ver código: SmartFridge/i })).toHaveAttribute(
      "href",
      "https://github.com/aguiarlucas2703/SmartFridge",
    );
    expect(screen.getByText(/quantidade de ingredientes coincidentes/i)).toBeInTheDocument();
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
    expect(screen.getByText(/Sistemas de Informação/)).toBeInTheDocument();
    expect(screen.getByText(/2022–2026/)).toBeInTheDocument();
    expect(screen.getByText("Inteligência Artificial para Engenharia de Testes de Software")).toBeInTheDocument();
    expect(screen.getByText("Em andamento")).toBeInTheDocument();
  });

  it("mantém a camada de fumaça interativa no hero", () => {
    render(<Home />);
    expect(screen.getByTestId("hero-smoke")).toHaveAttribute("aria-hidden", "true");
  });

  it("mostra um controle acessível para voltar ao topo após rolar", async () => {
    render(<Home />);

    expect(screen.queryByRole("button", { name: "Voltar ao topo" })).not.toBeInTheDocument();
    Object.defineProperty(window, "scrollY", { configurable: true, value: 600 });
    window.dispatchEvent(new Event("scroll"));

    expect(await screen.findByRole("button", { name: "Voltar ao topo" })).toBeInTheDocument();
  });
});
