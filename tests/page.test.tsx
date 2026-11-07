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
    expect(within(navigation).getByRole("link", { name: "Contato" })).toHaveAttribute("href", "#contact");
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
