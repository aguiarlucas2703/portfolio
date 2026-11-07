import { render, screen } from "@testing-library/react";
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
    expect(screen.getByRole("link", { name: "Projetos" })).toHaveAttribute("href", "#work");
    expect(screen.getByRole("link", { name: "Sobre" })).toHaveAttribute("href", "#about");
    expect(screen.getByRole("link", { name: "Contato" })).toHaveAttribute("href", "#contact");
  });
});
