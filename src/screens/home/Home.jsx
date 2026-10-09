import { useEffect, useRef, useState } from 'react';
import Header from '../../components/header/header.jsx';
import Dialog from '../../components/modals/Dialog.jsx';
import { projects, projectStatuses } from '../../data/projects.js';
import './Home.css';

const skills = [
  'HTML / CSS',
  'Java',
  'PHP',
  'React',
  'Python',
  'SQL',
  'MongoDB',
  'Inglês avançado',
  'Pacote Office',
  'Software e hardware',
];

const experiencias = [
  {
    cargo: 'Auxiliar Administrativo no SAME',
    empresa: 'Hospital e Maternidade Cristóvão da Gama',
    local: 'Santo André, SP',
    periodo: 'Out 2025 a Mai 2026',
    itens: [
      'Organização e controle do inventário de documentos e prontuários, com atendimento rápido a pedidos de consulta e retirada.',
      'Atendimento a pacientes e a setores internos, resolvendo solicitações e encaminhando pendências.',
      'Uso diário de sistemas e planilhas para atualizar cadastros e manter os dados precisos e dentro do prazo.',
    ],
  },
  {
    cargo: 'Aprendiz de Operações',
    empresa: 'Supermercados Baronesa (Buriti Verde)',
    local: 'Mauá, SP',
    periodo: 'Jun 2024 a Mai 2025',
    itens: [
      'Atendimento ao público e suporte operacional em ambiente de alta demanda.',
      'Agilidade nos caixas e organização do setor, resolvendo demandas imediatas.',
    ],
  },
];

function ProjectStatus({ status }) {
  const statusInfo = projectStatuses[status] || projectStatuses.emConstrucao;

  return (
    <span className={`project-status ${statusInfo.className}`}>
      {statusInfo.label}
    </span>
  );
}

function Home() {
  const projectTrackRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [hasProjectOverflow, setHasProjectOverflow] = useState(false);
  const [canScrollPrevious, setCanScrollPrevious] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    document.documentElement.classList.add('reveal-ready');

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const track = projectTrackRef.current;
    if (!track) return undefined;

    function updateProjectControls() {
      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      setHasProjectOverflow(maxScroll > 2);
      setCanScrollPrevious(track.scrollLeft > 2);
      setCanScrollNext(track.scrollLeft < maxScroll - 2);
    }

    updateProjectControls();
    track.addEventListener('scroll', updateProjectControls, { passive: true });
    window.addEventListener('resize', updateProjectControls);

    const resizeObserver =
      typeof ResizeObserver === 'function'
        ? new ResizeObserver(updateProjectControls)
        : null;
    resizeObserver?.observe(track);

    return () => {
      track.removeEventListener('scroll', updateProjectControls);
      window.removeEventListener('resize', updateProjectControls);
      resizeObserver?.disconnect();
    };
  }, []);

  function scrollProjects(direction) {
    const track = projectTrackRef.current;
    if (!track) return;

    const firstCard = track.querySelector('.project-card');
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    const cardWidth = firstCard?.getBoundingClientRect().width || track.clientWidth;
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    track.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  }

  const languages = selectedProject?.languages || [];
  const tools = selectedProject?.tools || [];

  return (
    <div className="portfolio-page">
      <Header />

      <main className="portfolio-main">
        <section className="home-hero" id="sobre" aria-labelledby="titulo-home">
          <div className="hero-copy" data-reveal>
            <p className="eyebrow">Olá, bem-vindo(a) ao meu portfólio!</p>
            <h1 id="titulo-home">
              Oi, eu sou <span>Enzo.</span>
            </h1>
            <p className="hero-lead">
              Sou estudante de Desenvolvimento de Software Multiplataforma na
              Fatec Mauá e estou em busca de uma oportunidade para aprender,
              evoluir e colocar meus conhecimentos em prática na área de
              tecnologia.
            </p>
            <a className="button-link" href="#projetos">
              Conheça meus projetos
            </a>
          </div>

          <div className="hero-aside" data-reveal aria-hidden="true">
            <span className="hero-orbit hero-orbit--one"></span>
            <span className="hero-orbit hero-orbit--two"></span>
            <span className="skill-pill skill-pill--top">Inglês avançado</span>
            <span className="skill-pill skill-pill--middle">Software e hardware</span>
            <span className="skill-pill skill-pill--bottom">Pacote Office</span>
            <span className="hero-aside-note">Aprender · construir · compartilhar</span>
          </div>

          <article className="about-card" data-reveal>
            <p className="card-kicker">Um pouco sobre mim</p>
            <p>
              Me chamo Enzo Luz Granato Barbosa, moro em Santo André, na região
              do ABC Paulista, e curso Desenvolvimento de Software
              Multiplataforma (DSM) na Fatec Mauá. Minha previsão de conclusão
              é junho de 2027.
            </p>
            <p>
              Estou em busca de uma oportunidade de estágio ou trabalho na área
              de tecnologia. Quero aprofundar meus conhecimentos e colocá-los
              em prática em um ambiente profissional, aprendendo com novos
              desafios.
            </p>
            <p>
              Tenho conhecimentos no desenvolvimento de APIs e projetos com
              Java, PHP, React e Python, além de trabalhar com bancos de dados
              SQL e MongoDB.
            </p>
          </article>
        </section>

        <section
          className="resume-section page-section"
          id="curriculo"
          aria-labelledby="titulo-curriculo"
        >
          <div className="section-heading" data-reveal>
            <p className="eyebrow">Minha trajetória</p>
            <h2 id="titulo-curriculo">Formação, experiência e habilidades</h2>
            <p>Um resumo do que venho aprendendo e construindo.</p>
          </div>

          <div className="resume-layout">
            <article className="info-card education-card" data-reveal>
              <div className="info-card-heading">
                <span className="icon-disc" aria-hidden="true">
                  <i className="bi bi-mortarboard" />
                </span>
                <div>
                  <p className="card-kicker">Formação</p>
                  <h3>Desenvolvimento de Software Multiplataforma</h3>
                </div>
              </div>
              <p className="card-meta">Fatec Mauá · 5º semestre</p>
              <p>Conclusão prevista para junho de 2027.</p>
            </article>

            <article className="info-card experience-card" data-reveal>
              <div className="info-card-heading">
                <span className="icon-disc" aria-hidden="true">
                  <i className="bi bi-briefcase" />
                </span>
                <div>
                  <p className="card-kicker">Experiência</p>
                  <h3>Experiência profissional</h3>
                </div>
              </div>
              <ol className="experience-list">
                {experiencias.map((experiencia) => (
                  <li className="experience-item" key={experiencia.cargo}>
                    <p className="card-meta">{experiencia.periodo}</p>
                    <h4>{experiencia.cargo}</h4>
                    <p className="experience-place">
                      {experiencia.empresa} · {experiencia.local}
                    </p>
                    <ul>
                      {experiencia.itens.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </article>

            <article className="info-card skills-card" data-reveal>
              <div className="info-card-heading">
                <span className="icon-disc" aria-hidden="true">
                  <i className="bi bi-code-slash" />
                </span>
                <div>
                  <p className="card-kicker">Conhecimentos</p>
                  <h3>Habilidades e ferramentas</h3>
                </div>
              </div>

              <div className="skills-group">
                <p className="skills-label">Tecnologia</p>
                <div className="tag-list">
                  {skills.slice(0, 7).map((skill) => (
                    <span className="tag" key={skill}>{skill}</span>
                  ))}
                </div>
              </div>

              <div className="skills-group">
                <p className="skills-label">Outros conhecimentos</p>
                <div className="tag-list">
                  {skills.slice(7).map((skill) => (
                    <span className="tag tag--soft" key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </section>

        <section
          className="projects-section page-section"
          id="projetos"
          aria-labelledby="titulo-projetos"
        >
          <div className="section-heading section-heading--row" data-reveal>
            <div>
              <p className="eyebrow">Trabalhos selecionados</p>
              <h2 id="titulo-projetos">Projetos</h2>
              <p>Projetos acadêmicos e pessoais que mostram meu processo de aprendizado.</p>
            </div>

            <div
              className="project-carousel-controls"
              aria-label="Navegação dos projetos"
              hidden={!hasProjectOverflow}
            >
              <button
                className="project-carousel-arrow"
                type="button"
                aria-label="Projetos anteriores"
                disabled={!canScrollPrevious}
                onClick={() => scrollProjects(-1)}
              >
                <i className="bi bi-arrow-left" aria-hidden="true"></i>
              </button>
              <button
                className="project-carousel-arrow"
                type="button"
                aria-label="Próximos projetos"
                disabled={!canScrollNext}
                onClick={() => scrollProjects(1)}
              >
                <i className="bi bi-arrow-right" aria-hidden="true"></i>
              </button>
            </div>
          </div>

          <div
            className="project-track"
            ref={projectTrackRef}
            role="list"
            aria-label="Cartões de projetos"
          >
            {projects.map((project) => {
              const technologies = [
                ...(project.languages || []),
                ...(project.tools || []),
              ];

              return (
                <article
                  className="project-card"
                  data-reveal
                  key={project.id}
                  role="listitem"
                >
                  <button
                    className="project-card__button"
                    type="button"
                    aria-haspopup="dialog"
                    onClick={() => setSelectedProject(project)}
                  >
                    <span className="project-card-topline">
                      <span className="project-label">{project.category}</span>
                      <ProjectStatus status={project.status} />
                    </span>

                    <span className="project-visual" aria-hidden="true">
                      <span className="project-visual-shape project-visual-shape--one"></span>
                      <span className="project-visual-shape project-visual-shape--two"></span>
                      <i className={`bi ${project.icon || 'bi-code-slash'}`}></i>
                    </span>

                    <span className="project-card-content">
                      <span
                        className="project-card-content__title"
                        role="heading"
                        aria-level="3"
                      >
                        {project.title}
                      </span>
                      <span className="project-card-description">
                        {project.summary}
                      </span>

                      {technologies.length > 0 && (
                        <span className="tag-list project-tags">
                          {technologies.slice(0, 4).map((technology) => (
                            <span className="tag tag--small" key={technology}>
                              {technology}
                            </span>
                          ))}
                        </span>
                      )}

                      <span className="project-link">
                        Ver detalhes
                        <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
                      </span>
                    </span>
                  </button>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <Dialog
        open={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        labelledBy="project-dialog-title"
        describedBy="project-dialog-summary"
        className="project-dialog"
      >
        {selectedProject && (
          <div className="dialog-content">
            <div className="dialog-header">
              <div className="dialog-header__copy">
                <p className="dialog-eyebrow">{selectedProject.category}</p>
                <h2 className="dialog-title" id="project-dialog-title">
                  {selectedProject.title}
                </h2>
              </div>
              <button
                className="dialog-close"
                type="button"
                aria-label="Fechar detalhes do projeto"
                onClick={() => setSelectedProject(null)}
              >
                <i className="bi bi-x-lg" aria-hidden="true"></i>
              </button>
            </div>

            <div className="project-dialog__status-row">
              <span className="project-dialog__status-label">Status do projeto</span>
              <ProjectStatus status={selectedProject.status} />
            </div>

            <p className="dialog-copy" id="project-dialog-summary">
              {selectedProject.summary}
            </p>

            {selectedProject.details && (
              <p className="dialog-copy">{selectedProject.details}</p>
            )}

            {(languages.length > 0 || tools.length > 0) && (
              <div className="project-dialog__details">
                {languages.length > 0 && (
                  <section className="dialog-section" aria-labelledby="project-languages-title">
                    <h3 id="project-languages-title">Linguagens</h3>
                    <div className="dialog-tags">
                      {languages.map((language) => (
                        <span className="dialog-tag" key={language}>{language}</span>
                      ))}
                    </div>
                  </section>
                )}

                {tools.length > 0 && (
                  <section className="dialog-section" aria-labelledby="project-tools-title">
                    <h3 id="project-tools-title">Ferramentas e tecnologias</h3>
                    <div className="dialog-tags">
                      {tools.map((tool) => (
                        <span className="dialog-tag" key={tool}>{tool}</span>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}

            {(selectedProject.repositoryUrl || selectedProject.applicationUrl) && (
              <div className="dialog-actions">
                {selectedProject.repositoryUrl && (
                  <a
                    className="dialog-link dialog-link--secondary"
                    href={selectedProject.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bi bi-github" aria-hidden="true"></i>
                    Repositório no GitHub
                  </a>
                )}
                {selectedProject.applicationUrl && (
                  <a
                    className="dialog-link"
                    href={selectedProject.applicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bi bi-box-arrow-up-right" aria-hidden="true"></i>
                    Abrir aplicação
                  </a>
                )}
              </div>
            )}
          </div>
        )}
      </Dialog>

      <footer className="contact-footer" id="contato">
        <div className="contact-footer-inner">
          <div className="contact-intro" data-reveal>
            <p className="eyebrow">Vamos conversar</p>
            <h2>Meus contatos e redes</h2>
            <p>
              Estou disposto a aprender, colaborar e conversar sobre tecnologia,
              projetos e oportunidades de início de carreira.
            </p>
          </div>

          <div className="contact-list" data-reveal>
            <a
              className="contact-item"
              href="https://github.com/EnzoLight"
              target="_blank"
              rel="noreferrer"
            >
              <span className="contact-icon"><i className="bi bi-github" aria-hidden="true"></i></span>
              <span><strong>GitHub</strong><small>github.com/EnzoLight</small></span>
            </a>

            <a
              className="contact-item"
              href="https://wa.me/5511964465116"
              target="_blank"
              rel="noreferrer"
              aria-label="Conversar pelo WhatsApp: +55 (11) 96446-5116"
            >
              <span className="contact-icon"><i className="bi bi-whatsapp" aria-hidden="true"></i></span>
              <span><strong>WhatsApp</strong><small>+55 (11) 96446-5116</small></span>
            </a>
          </div>

          <div className="footer-bottom">
            <span>Enzo Barbosa · Portfólio</span>
            <a href="#sobre">Voltar ao topo</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
