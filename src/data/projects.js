export const projectStatuses = {
  ativo: { label: 'ATIVO', className: 'project-status--ativo' },
  indisponivel: {
    label: 'INDISPONÍVEL',
    className: 'project-status--indisponivel',
  },
  emConstrucao: {
    label: 'EM CONSTRUÇÃO',
    className: 'project-status--em-construcao',
  },
  finalizado: { label: 'FINALIZADO', className: 'project-status--finalizado' },
};

/**
 * Para adicionar um projeto, acrescente outro objeto seguindo este formato.
 * Preencha linguagens, ferramentas e links apenas quando tiver os dados corretos.
 */
export const projects = [
  {
    id: 'gestao-voluntarios',
    title: 'Plataforma de Gestão de Voluntários',
    category: 'Projeto acadêmico',
    summary:
      'Projeto acadêmico de gestão de voluntários, desenvolvido durante minha formação em Desenvolvimento de Software Multiplataforma.',
    details: '',
    languages: [],
    tools: [],
    repositoryUrl: '',
    applicationUrl: '',
    // Estado inicial para editar conforme a situação real do projeto.
    status: 'emConstrucao',
    icon: 'bi-people',
  },
];
