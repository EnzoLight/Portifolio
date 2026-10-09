import { useEffect, useRef, useState } from 'react';
import iconeBranco from '../../assets/icons/configuracoes-branco.svg';
import iconePreto from '../../assets/icons/configuracoes-preto.svg';
import Dialog from '../modals/Dialog.jsx';
import './header.css';

function Header() {
  const [tema, setTema] = useState(
    () => localStorage.getItem('tema') || 'light'
  );
  const [textoMaior, setTextoMaior] = useState(false);
  const [altoContraste, setAltoContraste] = useState(
    () => localStorage.getItem('altoContraste') === 'true'
  );
  const [estadoLibras, setEstadoLibras] = useState('inativo');
  const [configuracoesAbertas, setConfiguracoesAbertas] = useState(false);
  const [avisoAcessibilidadeAberto, setAvisoAcessibilidadeAberto] =
    useState(false);

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
    raiz.classList.toggle('alto-contraste', altoContraste);
    localStorage.setItem('altoContraste', String(altoContraste));
  }, [tema, textoMaior, altoContraste]);

  useEffect(() => {
    if (localStorage.getItem('portfolio-aviso-acessibilidade') === 'true') {
      return undefined;
    }

    const timer = window.setTimeout(
      () => setAvisoAcessibilidadeAberto(true),
      900
    );

    return () => window.clearTimeout(timer);
  }, []);

  function fecharAvisoAcessibilidade() {
    localStorage.setItem('portfolio-aviso-acessibilidade', 'true');
    setAvisoAcessibilidadeAberto(false);
  }

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

  function ativarVLibras() {
    if (estadoLibras === 'carregando') return;

    if (estadoLibras === 'carregado') {
      window.VLibrasWidget?.initBtn?.click();
      return;
    }

    setEstadoLibras('carregando');

    const script = document.createElement('script');
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.async = true;
    script.dataset.vlibrasWidget = 'true';
    script.onload = () => setEstadoLibras('carregado');
    script.onerror = () => {
      script.remove();
      setEstadoLibras('erro');
    };

    document.body.appendChild(script);
  }

  const mensagemLibras = {
    inativo: 'Carregue o widget oficial de tradução para Libras.',
    carregando: 'Carregando o widget do VLibras…',
    carregado: 'Widget pronto. Use o botão flutuante para iniciar a tradução.',
    erro: 'Não foi possível carregar. Verifique a conexão e tente novamente.',
  }[estadoLibras];

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

        <div className="settings-option">
          <label className="settings-option__label" htmlFor="alto-contraste">
            Alto contraste
          </label>

          <input
            className="accessibility-switch"
            type="checkbox"
            id="alto-contraste"
            role="switch"
            checked={altoContraste}
            aria-checked={altoContraste}
            onChange={(evento) => setAltoContraste(evento.target.checked)}
          />
        </div>

        <div className="settings-option settings-option--stacked">
          <div className="settings-option__copy">
            <span className="settings-option__label">VLibras</span>
            <span
              className="settings-option__description"
              id="status-vlibras"
              aria-live="polite"
            >
              {mensagemLibras}
            </span>
          </div>

          <button
            className={`vlibras-button vlibras-button--${estadoLibras}`}
            type="button"
            aria-describedby="status-vlibras"
            onClick={ativarVLibras}
            disabled={estadoLibras === 'carregando'}
          >
            <i className="bi bi-translate" aria-hidden="true"></i>
            {estadoLibras === 'carregando'
              ? 'Carregando…'
              : estadoLibras === 'carregado'
                ? 'Abrir VLibras'
                : estadoLibras === 'erro'
                  ? 'Tentar novamente'
                  : 'Ativar VLibras'}
          </button>
        </div>

        <button
          className="settings-info-button"
          type="button"
          onClick={() => setAvisoAcessibilidadeAberto(true)}
        >
          <i className="bi bi-info-circle" aria-hidden="true"></i>
          Sobre recursos de acessibilidade
        </button>
      </section>

      <Dialog
        open={avisoAcessibilidadeAberto}
        onClose={fecharAvisoAcessibilidade}
        labelledBy="accessibility-dialog-title"
        describedBy="accessibility-dialog-description"
        className="accessibility-dialog"
      >
        <div className="dialog-content">
          <div className="dialog-header">
            <div className="dialog-header__copy">
              <p className="dialog-eyebrow">Acessibilidade</p>
              <h2 className="dialog-title" id="accessibility-dialog-title">
                Ajuste o site para você
              </h2>
            </div>
            <button
              className="dialog-close"
              type="button"
              aria-label="Fechar aviso de acessibilidade"
              onClick={fecharAvisoAcessibilidade}
            >
              <i className="bi bi-x-lg" aria-hidden="true"></i>
            </button>
          </div>

          <p className="dialog-copy" id="accessibility-dialog-description">
            As opções de acessibilidade ficam no ícone de engrenagem, no topo da
            página. Você pode trocar o tema, aumentar o texto, ativar alto
            contraste ou carregar o VLibras.
          </p>

          <div className="dialog-actions">
            <button
              className="dialog-button"
              type="button"
              onClick={fecharAvisoAcessibilidade}
            >
              Entendi
            </button>
            <button
              className="dialog-button dialog-button--secondary"
              type="button"
              onClick={() => {
                fecharAvisoAcessibilidade();
                setConfiguracoesAbertas(true);
              }}
            >
              Abrir configurações
            </button>
          </div>
        </div>
      </Dialog>
    </header>
  );
}

export default Header;
