import React from "react";
import LogoCheer from "../assets/icons/LogoCheer.png";
import LogoStarline from "../assets/icons/LogoStarline.jpg";

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
    details: 'A aplicação conta com uma database em PostgreSQL e uma API em PHP, está API é consumida pelo frontend dos dois modelos do projeto, sendo o primeiro feito em React para o web e o segundo voltado para mobile feito com Kotlin. O Cheer surgiu como uma ideia de facilitar e abrangir o processo de voluntariado, tanto por parte da instituição quanto por parte dos voluntários, através de uma facilidade de inscrição para um evento e a confirmação da lista de voluntários por parte da instituição.',
    languages: ['React', 'Kotlin', 'JavaScript', 'PHP', 'SQL' ],
    tools: ['GitHub', 'Android Studio', 'VScode', 'PostgreSQL'],
    repositoryUrl: 'https://github.com/Cheer-Gestao-de-voluntarios',
    applicationUrl: '',
    // Estado inicial para editar conforme a situação real do projeto.
    status: 'ativo',
    icon: LogoCheer,
  },
  {
    id: 'gestao-fila',
    title: 'Starline - Sistema de Fila',
    category: 'Projeto acadêmico - Gestor de Fila',
    summary: 'Projeto desenvolvido para o aprendizado de VB.NET, visa gerir uma fila. Por mais que tenha sido uma aplicação relativamente simples, foi realmente divertido entender o funcionamento e a lógica por trás desse sistema.',
    details: 'A aplicação mantém uma lógica de distribuição que chama com certa prioridade as senhas preferenciais, isso levando em consideração as senhas comuns que também foram criadas. ',
    languages: ['Visual Basic .NET', 'SQL' ],
    tools: ['GitHub', 'VScode', 'Microdoft Azure'],
    repositoryUrl: 'https://github.com/EnzoLight/Starline',
    applicationUrl: '',
    status: 'finalizado',
    icon: LogoStarline,
  }
];
