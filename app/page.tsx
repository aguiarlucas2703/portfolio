import { education, profile, projects, stackGroups } from "../src/content/site";
import { GitBranch, Mail } from "lucide-react";
import { BackToTop } from "./components/BackToTop";
import { LegoshiWalk } from "./components/LegoshiWalk";
import { ProjectGallery } from "./components/ProjectGallery";
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

        <LegoshiWalk />

        <section className="work section-shell" id="work" aria-labelledby="work-title">
          <div className="section-heading">
            <p className="eyebrow">Projetos selecionados</p>
            <h2 id="work-title">
              Projetos em que já <em>trabalhei.</em>
            </h2>
          </div>
          <div className="work-list">
            {projects.map((project) => (
              <article className="work-project" key={project.title}>
                <div className="work-project-heading">
                  <span className="work-number">{project.number}</span>
                  <div>
                    <p className="eyebrow">{project.context}</p>
                    <h3>{project.title}</h3>
                    <p className="work-summary">{project.summary}</p>
                  </div>
                  <div className="project-links">
                    {project.screenshots?.length ? (
                      <ProjectGallery project={project.title} screenshots={project.screenshots} />
                    ) : null}
                    {project.liveDemoUrl && (
                      <a
                        className="project-link"
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Acessar aplicação: ${project.title} (abre em nova aba)`}
                      >
                        Acessar aplicação <span aria-hidden="true">↗</span>
                      </a>
                    )}
                    {project.repository ? (
                      <a
                        className="project-link"
                        href={project.repository.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.repository.label}: ${project.title} (abre em nova aba)`}
                      >
                        {project.repository.label} <span aria-hidden="true">↗</span>
                      </a>
                    ) : (
                      <span className="work-status">Repositório privado</span>
                    )}
                  </div>
                </div>
                <div className="work-project-details">
                  <div>
                    <p className="eyebrow">Minha contribuição</p>
                    <ul className="work-contributions">
                      {project.contributions.map((contribution) => (
                        <li key={contribution}>{contribution}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="eyebrow">Tecnologias</p>
                    <ul className="work-technologies">
                      {project.technologies.map((technology) => (
                        <li key={technology}>{technology}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about section-shell" id="about" aria-labelledby="about-title">
          <div className="section-heading">
            <h2 id="about-title">
              Sobre e <em>stack</em>
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
          <h2 id="education-title">Formação</h2>
          <figure className="education-quote">
            <blockquote cite="https://prefeitura.sp.gov.br/web/cultura/w/bibliotecas/bibliotecas_bairro/bibliotecas_a_l/claricelispector/5154">
              <p>“Renda-se, como eu me rendi. Mergulhe no que você não conhece como eu mergulhei.”</p>
            </blockquote>
            <figcaption>— Clarice Lispector</figcaption>
          </figure>
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
            <p className="eyebrow">Vamos conversar?</p>
            <h2>
              Uma ideia boa pode surgir de uma pergunta que pode parecer <em>boba.</em>
            </h2>
            <p className="contact-invitation">Algum projeto em mente? Entre em contato!</p>
          </div>
          <div className="footer-meta">
            <div className="contact-links" aria-label="Formas de contato">
              <a className="contact-link" href={`mailto:${profile.email}`}>
                <Mail aria-hidden="true" focusable="false" size={19} strokeWidth={1.6} />
                <span>{profile.email}</span>
              </a>
              <a
                className="contact-link"
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub de Lucas Aguiar (abre em nova aba)"
              >
                <GitBranch aria-hidden="true" focusable="false" size={19} strokeWidth={1.6} />
                <span>GitHub</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
            <span>© 2026 Lucas Aguiar</span>
          </div>
        </footer>
        <BackToTop />
      </div>
    </main>
  );
}
