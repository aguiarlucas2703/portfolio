import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lucas Aguiar — Desenvolvedor full-stack",
  description: "Portfólio pessoal de Lucas Aguiar dos Santos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
