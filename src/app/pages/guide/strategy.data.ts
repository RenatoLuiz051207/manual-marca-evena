export const brandValues = [
  {
    name: 'Descoberta',
    description: 'Ampliar o acesso a eventos e experiências que as pessoas ainda não conhecem.',
    product:
      'Organizar a descoberta por localização, faixa de preço e distância, aproximando cada pessoa de uma programação relevante.',
    communication:
      'Apresentar possibilidades com informações claras sobre o que vai acontecer, onde e para quem.',
  },
  {
    name: 'Conexão',
    description: 'Aproximar quem organiza de quem quer participar.',
    product:
      'Reunir público e organizadores em uma plataforma simples, com espaço para publicar e encontrar programações.',
    communication:
      'Convidar com empatia e explicar os próximos passos, tanto para o participante quanto para o organizador.',
  },
  {
    name: 'Cultura',
    description: 'Dar visibilidade às diferentes formas de viver e produzir cultura.',
    product:
      'Abrir espaço para empresas de entretenimento, escolas, instituições culturais e organizadores independentes.',
    communication:
      'Valorizar a programação e seus realizadores, respeitando a diversidade de públicos e experiências.',
  },
] as const;

export const audiences = {
  public: {
    label: 'Jovens e adultos',
    description:
      'Pessoas que procuram eventos e experiências e precisam de informação para decidir onde ir e como se organizar.',
    needs: [
      'Descobrir a programação de um estado ou de uma região.',
      'Comparar possibilidades considerando preço e distância.',
      'Planejar a experiência, incluindo estimativas de hospedagem quando necessário.',
    ],
    benefit: 'Escolher uma experiência com mais contexto e menos informação espalhada.',
  },
  organizers: {
    label: 'Organizadores e instituições',
    description:
      'Empresas de entretenimento, escolas, instituições culturais e organizadores autônomos que querem dar visibilidade à própria programação.',
    needs: [
      'Criar uma conta e divulgar eventos diretamente na plataforma.',
      'Apresentar informações úteis para quem pretende participar.',
      'Conectar a programação a pessoas interessadas em experiências ao vivo.',
    ],
    benefit: 'Centralizar a divulgação em um ambiente voltado à descoberta de eventos.',
  },
} as const;

export const platformFeatures = [
  {
    name: 'Descobrir eventos',
    title: 'Localização como ponto de partida',
    text: 'A Evena centraliza a descoberta de eventos em uma aplicação web e mobile. A visualização por estado e distância geográfica ajuda o público a encontrar experiências dentro do seu contexto.',
    details: ['Eventos por estado', 'Distância geográfica', 'Descoberta em uma plataforma'],
  },
  {
    name: 'Planejar o orçamento',
    title: 'Preço também faz parte da escolha',
    text: 'A faixa de preço entra na descoberta para ajudar cada pessoa a comparar alternativas e escolher uma experiência compatível com seu planejamento.',
    details: ['Filtro por faixa de preço', 'Comparação de alternativas', 'Informação para decidir'],
  },
  {
    name: 'Considerar a hospedagem',
    title: 'Uma visão além do evento',
    text: 'Estimativas de custos de hotéis e hospedagens nos arredores enriquecem o planejamento de quem precisa se deslocar. São referências para organizar a experiência, sem representar uma reserva ou um preço garantido.',
    details: ['Hospedagens nos arredores', 'Estimativas de custo', 'Apoio ao planejamento'],
  },
  {
    name: 'Divulgar a programação',
    title: 'Espaço para quem realiza',
    text: 'Organizadores podem criar suas contas e divulgar a própria programação. Essa participação direta amplia a variedade de eventos e contribui para o crescimento da plataforma.',
    details: ['Contas de organizadores', 'Publicação de programações', 'Diversidade cultural'],
  },
] as const;

export const manifesto = [
  'Acreditamos que o acesso à cultura começa quando uma experiência pode ser encontrada. Um evento precisa chegar a quem quer participar; uma pessoa precisa de informação para escolher, se organizar e estar presente.',
  'A Evena existe para aproximar esses dois lados. Reunimos descoberta e planejamento para que jovens e adultos encontrem experiências que façam sentido para seus interesses, sua localização e seu orçamento.',
  'Também abrimos espaço para quem faz a cultura acontecer: empresas de entretenimento, escolas, instituições culturais e organizadores independentes. Divulgar uma programação deve ser simples, assim como encontrar o próximo evento.',
  'Descoberta, conexão e cultura orientam nossa forma de construir o produto e conversar com as pessoas. Usamos a tecnologia para facilitar decisões e criar as condições para encontros reais.',
] as const;
