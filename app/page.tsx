import { education, profile, stackGroups } from "../src/content/site";
import { BackToTop } from "./components/BackToTop";
import { SmokeCanvas } from "./components/SmokeCanvas";

export default function Home() {
  return (
    <main id="top">
      <a className="skip-link" href="#content">
        Ir para o conteúdo
      </a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Voltar ao início">
          {profile.shortName}
        </a>
        <nav aria-label="Navegação principal">
          <a href="#work">Projetos</a>
          <a href="#about">Sobre</a>
          <a href="#education">Formação</a>
          <a href="#contact">Contato</a>
        </nav>
      </header>

      <div id="content">
        <section className="hero" aria-labelledby="hero-title">
          <SmokeCanvas />
          <div className="hero-vignette" aria-hidden="true" />
          <div className="hero-inner section-shell">
            <div className="hero-copy">
              <p className="eyebrow">Portfólio pessoal · 2026</p>
              <h1 id="hero-title">
                Lucas <em>Aguiar</em>
              </h1>
              <p className="hero-intro">{profile.intro}</p>
              <a className="text-link" href="#work">
                Conhecer o trabalho <span aria-hidden="true">↘</span>
              </a>
            </div>
            <div className="hero-index" aria-hidden="true">
              <span>01</span>
              <i />
              <span>06</span>
            </div>
          </div>
        </section>

        <section className="manifesto section-shell" aria-labelledby="manifesto-title">
          <p className="eyebrow">Uma primeira direção</p>
          <h2 id="manifesto-title">
            Código com intenção, interfaces com <em>presença.</em>
          </h2>
        </section>

        <section className="work section-shell" id="work" aria-labelledby="work-title">
          <div className="section-heading">
            <p className="eyebrow">Projetos selecionados</p>
            <h2 id="work-title">
              O trabalho entra <em>aqui.</em>
            </h2>
          </div>
          <div className="work-placeholder">
            <span className="work-number">01</span>
            <div>
              <h3>Primeiro case em curadoria</h3>
              <p>
                Esta área será preenchida com um projeto real, seu contexto,
                decisões técnicas e resultado.
              </p>
            </div>
            <span className="work-status">Em construção</span>
          </div>
        </section>

        <section className="about section-shell" id="about" aria-labelledby="about-title">
          <div className="section-heading">
            <p className="eyebrow">Sobre e stack</p>
            <h2 id="about-title">
              Em <em>movimento.</em>
            </h2>
          </div>
          <div className="about-grid">
            <p className="about-copy">
              Sou Lucas, desenvolvedor full-stack. Gosto de compreender o
              produto por inteiro e construir soluções que equilibram
              interface, lógica e qualidade.
            </p>
            <div className="stack-list">
              {stackGroups.map((group) => (
                <div className="stack-group" key={group.label}>
                  <h3>{group.label}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="education section-shell"
          id="education"
          aria-labelledby="education-title"
        >
          <div className="section-heading">
            <p className="eyebrow">Formação</p>
            <h2 id="education-title">
              Uma base para seguir <em>evoluindo.</em>
            </h2>
          </div>
          <div className="education-list">
            {education.map((item) => (
              <article className="education-item" key={item.title}>
                <p className="education-type">{item.type}</p>
                <div>
                  <h3>{item.title}</h3>
                  {"institution" in item ? (
                    <p className="education-institution">{item.institution}</p>
                  ) : null}
                </div>
                <p className="education-status">{item.status}</p>
              </article>
            ))}
          </div>
        </section>

        <footer className="footer section-shell" id="contact">
          <div>
            <p className="eyebrow">Vamos conversar</p>
            <h2>
              Um projeto começa com uma <em>boa pergunta.</em>
            </h2>
          </div>
          <div className="footer-meta">
            <a className="text-link" href="mailto:seu-email@exemplo.com">
              seu-email@exemplo.com <span aria-hidden="true">↗</span>
            </a>
            <span>© 2026 Lucas Aguiar</span>
          </div>
        </footer>
        <BackToTop />
      </div>
    </main>
  );
}
