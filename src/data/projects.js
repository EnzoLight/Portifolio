import React from "react";
import LogoCheer from "../assets/icons/LogoCheer.png";

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
    title: 'Cheer - Plataforma de Gestão de Voluntários',
    category: 'Projeto acadêmico - Gestor de Eventos',
    summary:
      'Projeto focado na gestão de voluntários e eventos beneficientes, desenvolvido durante meu 4° Semestre de Desenvolvimento de Software Multiplataforma.',
    details: 'Feito em uma API em (...), consumida pelo front em React para o web e com Kotlin para a versão mobile, o Cheer surgiu como uma ideia de facilitar e abrangir',
    languages: ['React', 'Kotlin', 'JavaScript', 'PHP' ],
    tools: ['GitHub', 'Android Studio', 'VScode'],
    repositoryUrl: '',
    applicationUrl: '',
    // Estado inicial para editar conforme a situação real do projeto.
    status: 'emConstrucao',
    icon: LogoCheer,
  },
];
