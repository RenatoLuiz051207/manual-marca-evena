export type SectionKey = 'conceito' | 'proposito' | 'posicionamento' | 'vibe' | 'estetica';

export interface ManualEntry {
  title: string;
  text: string;
  path?: string;
}

export interface ManualSection {
  id: SectionKey;
  number: string;
  label: string;
  lead: string;
  entries: readonly ManualEntry[];
  next: { label: string; path: string };
}

export const sections: Record<SectionKey, ManualSection> = {
  conceito: {
    id: 'conceito',
    number: '1',
    label: 'Conceito',
    lead: 'Os fundamentos da Evena: por que a marca existe, o que busca e para quem é feita.',
    entries: [
      {
        title: 'Propósito',
        text: 'Propósito, missão, visão e valores da Evena.',
        path: '/propósito',
      },
      {
        title: 'Posicionamento',
        text: 'A atuação da plataforma e seu público-alvo.',
        path: '/posicionamento',
      },
    ],
    next: { label: 'Propósito', path: '/propósito' },
  },
  proposito: {
    id: 'proposito',
    number: '1.1',
    label: 'Propósito',
    lead: 'A Evena existe para aproximar pessoas de experiências reais, incentivando conexões, cultura e momentos memoráveis.',
    entries: [
      {
        title: 'Missão',
        text: 'Facilitar o acesso a eventos e experiências, conectando organizadores e público em uma única plataforma simples, intuitiva e acessível.',
      },
      {
        title: 'Visão',
        text: 'Ser a principal plataforma de descoberta de eventos do Brasil e a referência nacional em conexão entre pessoas, cultura e experiências ao vivo.',
      },
      {
        title: 'Valores',
        text: 'Descoberta, conexão e cultura.',
      },
    ],
    next: { label: 'Posicionamento', path: '/posicionamento' },
  },
  posicionamento: {
    id: 'posicionamento',
    number: '1.2',
    label: 'Posicionamento',
    lead: 'A Evena é uma plataforma web e mobile que integra a descoberta e o planejamento de eventos. Conecta jovens e adultos a experiências reais e oferece a organizadores um espaço para divulgar suas programações.',
    entries: [],
    next: { label: 'Vibe', path: '/vibe' },
  },
  vibe: {
    id: 'vibe',
    number: '2',
    label: 'Vibe',
    lead: 'Personalidade verbal e orientações de tom de voz para a comunicação da Evena.',
    entries: [
      {
        title: 'Personalidade da marca',
        text: 'A persona verbal da Evena é urbana, empática, leve e conectiva.',
      },
      {
        title: 'Tom de voz · público final',
        text: 'Linguagem fluida, convidativa e inspiradora, sem formalidades excessivas ou jargões corporativos.',
      },
      {
        title: 'Tom de voz · institucional e B2B',
        text: 'Mantém a essência conectiva, com ênfase na clareza de dados, na eficiência operacional e na simplicidade técnica da ferramenta.',
      },
    ],
    next: { label: 'Estética', path: '/estetica' },
  },
  estetica: {
    id: 'estetica',
    number: '3',
    label: 'Estética',
    lead: 'Cores, tipografia, arquivos de logo e exemplos de aplicação da identidade visual da Evena.',
    entries: [],
    next: { label: 'Voltar à página principal', path: '/' },
  },
};

export const manualNavigation = [
  { label: 'Conceito', path: '/conceito', number: '1', child: false },
  { label: 'Propósito', path: '/propósito', number: '1.1', child: true },
  { label: 'Posicionamento', path: '/posicionamento', number: '1.2', child: true },
  { label: 'Vibe', path: '/vibe', number: '2', child: false },
  { label: 'Estética', path: '/estetica', number: '3', child: false },
] as const;

export const palette = [
  {
    name: 'Roxo Escuro',
    hex: '#2F1A67',
    rgb: '47, 26, 103',
    group: 'Principal',
    role: 'Assinatura visual em páginas de eventos, materiais institucionais e comunicação de organizadores.',
    ink: '#FFFFFF',
  },
  {
    name: 'Verde-Limão',
    hex: '#00FF00',
    rgb: '0, 255, 0',
    group: 'Principal',
    role: 'Destaque para convites, datas e informações importantes na divulgação de eventos.',
    ink: '#000000',
  },
  {
    name: 'Preto',
    hex: '#000000',
    rgb: '0, 0, 0',
    group: 'Principal',
    role: 'Informações de programação, preços e locais em materiais de fundo claro.',
    ink: '#FFFFFF',
  },
  {
    name: 'Branco',
    hex: '#FFFFFF',
    rgb: '255, 255, 255',
    group: 'Principal',
    role: 'Texto em fundos escuros e respiro visual em agendas e páginas de eventos.',
    ink: '#000000',
  },
  {
    name: 'Roxo de apoio',
    hex: '#4C007D',
    rgb: '76, 0, 125',
    group: 'Apoio',
    role: 'Variação para peças de divulgação e composições culturais junto à paleta principal.',
    ink: '#FFFFFF',
  },
  {
    name: 'Preto suave',
    hex: '#121212',
    rgb: '18, 18, 18',
    group: 'Apoio',
    role: 'Textos de apoio e descrições longas de eventos em superfícies claras.',
    ink: '#FFFFFF',
  },
  {
    name: 'Off-White',
    hex: '#F8F9FA',
    rgb: '248, 249, 250',
    group: 'Apoio',
    role: 'Fundo neutro para programação, informações de acesso e detalhes de eventos.',
    ink: '#121212',
  },
] as const;

export const voiceExamples = {
  public: {
    context: 'Convite para o público final',
    text: 'Descubra eventos perto de você e escolha sua próxima experiência.',
  },
  b2b: {
    context: 'Apresentação para organizadores',
    text: 'Conecte seu evento ao público em uma plataforma simples, intuitiva e acessível.',
  },
} as const;

export const logos = [
  {
    name: 'Coroa colorida',
    path: '/evena-logo.svg',
    filename: 'evena-logo.svg',
    background: 'light',
  },
  {
    name: 'Coroa verde',
    path: '/logo%20verde.png',
    filename: 'logo verde.png',
    background: 'dark',
  },

  {
    name: 'Coroa branca',
    path: '/logo%20branca.png',
    filename: 'logo branca.png',
    background: 'purple',
  },
  {
    name: 'Logotipo',
    path: '/assets/logos/logotipo-evena.webp',
    filename: 'logotipo-evena.webp',
    background: 'light',
  },
] as const;
