import { useEffect, useRef, useState } from 'react';
import iconeBranco from '../../assets/icons/configuracoes-branco.svg';
import iconePreto from '../../assets/icons/configuracoes-preto.svg';
import './header.css';

function Header() {
  const [tema, setTema] = useState(
    () => localStorage.getItem('tema') || 'light'
  );
  const [textoMaior, setTextoMaior] = useState(false);
  const [configuracoesAbertas, setConfiguracoesAbertas] = useState(false);

  const headerRef = useRef(null);
  const iconeRef = useRef(null);

  const iconeConfiguracoes =
    tema === 'dark' ? iconeBranco : iconePreto;

  useEffect(() => {
    const raiz = document.documentElement;

    raiz.dataset.theme = tema;
    raiz.dataset.bsTheme = tema;
    localStorage.setItem('tema', tema);
    raiz.classList.toggle('texto-maior', textoMaior);
  }, [tema, textoMaior]);

  // Fecha o painel clicando fora dele ou pressionando Esc
  useEffect(() => {
    if (!configuracoesAbertas) return;

    function fecharAoClicarFora(evento) {
      if (!headerRef.current?.contains(evento.target)) {
        setConfiguracoesAbertas(false);
      }
    }

    function fecharComEsc(evento) {
      if (evento.key === 'Escape') {
        setConfiguracoesAbertas(false);
      }
    }

    document.addEventListener('pointerdown', fecharAoClicarFora);
    document.addEventListener('keydown', fecharComEsc);

    return () => {
      document.removeEventListener('pointerdown', fecharAoClicarFora);
      document.removeEventListener('keydown', fecharComEsc);
    };
  }, [configuracoesAbertas]);

  function alternarConfiguracoes() {
    iconeRef.current?.animate(
      [{ transform: 'rotate(0deg)' }, { transform: 'rotate(75deg)' }],
      { duration: 350, easing: 'ease-in-out' }
    );

    setConfiguracoesAbertas((abertas) => !abertas);
  }

  function alternarTema() {
    setTema((atual) => (atual === 'dark' ? 'light' : 'dark'));
  }

  return (
    <header className="site-header" ref={headerRef}>
      <nav className="site-nav" aria-label="Navegação principal">
        <div className="site-nav__links">
          <a className="site-nav__link" href="#sobre">Sobre mim</a>
          <a className="site-nav__link" href="#curriculo">Currículo</a>
          <a className="site-nav__link" href="#projetos">Projetos</a>
          <a className="site-nav__link" href="#contato">Contato</a>
        </div>

        <button
          className={`settings-button ${
            configuracoesAbertas ? 'is-open' : ''
          }`}
          type="button"
          aria-expanded={configuracoesAbertas}
          aria-controls="painel-configuracoes"
          aria-label={
            configuracoesAbertas
              ? 'Fechar configurações'
              : 'Abrir configurações'
          }
          onClick={alternarConfiguracoes}
        >
          <img
            ref={iconeRef}
            className="settings-icon"
            src={iconeConfiguracoes}
            alt=""
            aria-hidden="true"
          />
        </button>
      </nav>

      <section
        className="settings-panel"
        id="painel-configuracoes"
        aria-label="Configurações"
        hidden={!configuracoesAbertas}
      >
        <div className="settings-panel__heading">
          <h2>Configurações</h2>

          <button
            className="settings-close"
            type="button"
            aria-label="Fechar configurações"
            onClick={() => setConfiguracoesAbertas(false)}
          >
            <i className="bi bi-x-lg" aria-hidden="true"></i>
          </button>
        </div>

        <div className="settings-option">
          <span className="settings-option__label">Tema</span>

          <button
            className={`theme-switch ${tema === 'dark' ? 'is-dark' : ''}`}
            type="button"
            role="switch"
            aria-checked={tema === 'dark'}
            aria-label={`Alternar para o tema ${ 
              tema === 'dark' ? 'claro' : 'escuro'
            }`}
            onClick={alternarTema}
          >
            <span className="theme-switch__track" aria-hidden="true">
              <span className="theme-switch__thumb">
                <i
                  className={`bi ${
                    tema === 'dark' ? 'bi-moon-fill' : 'bi-sun-fill'
                  }`}
                ></i>
              </span>
            </span>

            {/* <span>{tema === 'dark' ? 'Escuro' : 'Claro'}</span> */}
          </button>
        </div>

        <div className="settings-option">
          <label className="settings-option__label" htmlFor="texto-maior">
            Aumentar o tamanho do texto
          </label>

          <input
            className="accessibility-switch"
            type="checkbox"
            id="texto-maior"
            role="switch"
            checked={textoMaior}
            onChange={(evento) => setTextoMaior(evento.target.checked)}
          />
        </div>
      </section>
    </header>
  );
}

export default Header;
