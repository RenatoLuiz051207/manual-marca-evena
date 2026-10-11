import { IconName } from './icon';

export type ChapterId =
  | 'conceito'
  | 'proposito'
  | 'posicionamento'
  | 'vibe'
  | 'voz'
  | 'energia'
  | 'personalidade'
  | 'estetica'
  | 'cores'
  | 'tipografia'
  | 'marca'
  | 'aplicacoes'
  | 'recursos';
export interface Chapter {
  id: ChapterId;
  path: string;
  number: string;
  title: string;
  short: string;
  description: string;
  group: string;
  icon: IconName;
  tags: string;
}
export const chapters: readonly Chapter[] = [
  {
    id: 'conceito',
    path: '/conceito',
    number: '1',
    title: 'Estratégia e essência',
    short: 'Conceito',
    description: 'O Evena existe para aproximar pessoas de experiências reais, incentivando conexões, cultura e momentos memoráveis.',
    group: 'Conceito',
    icon: 'crown',
    tags: 'fundamentos essência cultura descoberta conexão',
  },
  {
    id: 'proposito',
    path: '/proposito',
    number: '1.1',
    title:
      'Descoberta, conexão e cultura.',
    short: 'Propósito',
    description: 'Facilitar o acesso a eventos e experiências em uma plataforma simples, intuitiva e acessível.',
    group: 'Conceito',
    icon: 'crown',
    tags: 'missão visão valores manifesto',
  },
  {
    id: 'posicionamento',
    path: '/posicionamento',
    number: '1.2',
    title:
      'O Evena é uma plataforma web e mobile que integra a descoberta e o planejamento de eventos.',
    short: 'Posicionamento',
    description:
      'Conecta jovens e adultos a experiências reais e oferece a organizadores um espaço para divulgar suas programações.',
    group: 'Conceito',
    icon: 'crown',
    tags: 'público organizadores diferenciais hospedagem manifesto plataforma',
  },
  {
    id: 'vibe',
    path: '/vibe',
    number: '2',
    title: 'Personalidade e tom de voz',
    short: 'Vibe',
    description:
      'A persona verbal do Evena é urbana, empática, leve e conectiva.',
    group: 'Vibe',
    icon: 'waves',
    tags: 'tom de voz energia personalidade',
  },
  {
    id: 'voz',
    path: '/vibe/voz',
    number: '2.1',
    title: 'Encontre o tom do Evena em cada situação.',
    short: 'Voz',
    description: 'Para o público final, linguagem fluida, convidativa e inspiradora. Para organizadores, clareza de dados, eficiência operacional e simplicidade técnica.',
    group: 'Vibe',
    icon: 'microphone',
    tags: 'tradutor mensagens microcopy erros b2b emoji gírias',
  },
  {
    id: 'energia',
    path: '/vibe/energia',
    number: '2.2',
    title: 'Clareza em cada contexto',
    short: 'Energia',
    description:
      'Uma comunicação convidativa para o público e objetiva para organizadores, mantendo a essência conectiva do Evena.',
    group: 'Vibe',
    icon: 'waves',
    tags: 'equalizador movimento animação intensidade presença',
  },
  {
    id: 'personalidade',
    path: '/vibe/personalidade',
    number: '2.3',
    title: 'O jeito do Evena.',
    short: 'Personalidade',
    description:
      'Uma personalidade urbana, empática, leve e conectiva, sem formalidades excessivas ou jargões corporativos.',
    group: 'Vibe',
    icon: 'heart',
    tags: 'urbana moderna energética humana espontânea cultural próxima atributos',
  },
  {
    id: 'estetica',
    path: '/estetica',
    number: '3',
    title: 'Identidade visual do Evena',
    short: 'Estética',
    description:
      'Logo e logotipo, cores e tipografia para identificar a marca e organizar a comunicação de eventos.',
    group: 'Estética',
    icon: 'palette',
    tags: 'identidade visual paleta tipografia logo',
  },
  {
    id: 'cores',
    path: '/estetica/cores',
    number: '3.1',
    title: 'Explore combinações, copie os códigos e confira o contraste.',
    short: 'Cores',
    description:
      'Roxo escuro e verde-limão, com preto, branco e cores de apoio para a comunicação de eventos.',
    group: 'Estética',
    icon: 'palette',
    tags: 'hex rgb contraste acessibilidade paleta tokens css json',
  },
  {
    id: 'tipografia',
    path: '/estetica/tipografia',
    number: '3.2',
    title: 'Tipografia',
    short: 'Tipografia',
    description:
      'Poppins é a fonte principal. Lato e Comfortaa são secundárias. Ganker-Storm traz expressão gráfica às peças de divulgação cultural.',
    group: 'Estética',
    icon: 'type',
    tags: 'fontes fredoka ganker storm tamanhos pesos alfabeto laboratório',
  },
  {
    id: 'marca',
    path: '/estetica/marca',
    number: '3.3',
    title: 'Logo e logotipo',
    short: 'Logo e logotipo',
    description:
      'A coroa é o símbolo da marca. O logotipo é a assinatura escrita. Preserve as cores, as proporções e os traços dos arquivos originais.',
    group: 'Estética',
    icon: 'crown',
    tags: 'coroa proteção mínimo usos incorretos arquivos svg png webp',
  },
  {
    id: 'aplicacoes',
    path: '/aplicacoes',
    number: '3.4',
    title: 'Aplicações da identidade',
    short: 'Aplicações',
    description: 'Modelos demonstrativos para aplicar a identidade em cartazes, posts, stories, ingressos e cards de evento.',
    group: 'Estética',
    icon: 'grid',
    tags: 'cartaz post story ingresso card exportação svg png modelos',
  },
  {
    id: 'recursos',
    path: '/recursos',
    number: '4',
    title: 'Kit da marca',
    short: 'Kit da marca',
    description:
      'Arquivos de logo e logotipo, paleta, fontes disponíveis, guia de voz e manual em PDF.',
    group: 'Recursos',
    icon: 'download',
    tags: 'downloads checklist kit zip impressão glossário',
  },
];
export const groups = ['Conceito', 'Vibe', 'Estética', 'Recursos'] as const;
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
  {"name": "Fundo do app", "hex": "#080427", "rgb": "8, 4, 39", "group": "App", "role": "Fundo principal e base do tema do aplicativo.", "ink": "#FFFFFF"},
  {"name": "Verde do app", "hex": "#63D13E", "rgb": "99, 209, 62", "group": "App", "role": "Botões, ícones ativos e indicação de disponibilidade.", "ink": "#000000"},
  {"name": "Roxo de destaque", "hex": "#7C2BDC", "rgb": "124, 43, 220", "group": "App", "role": "Bordas, destaques e elementos do mapa.", "ink": "#FFFFFF"},
] as const;
export const traits = [
  {
    name: 'Moderna',
    essence: 'Urbana',
    text: 'Entende o agora sem depender da tendência do momento.',
    sentence: 'Seu próximo encontro pode estar logo ali.',
    design: 'Composição direta, informação fácil de encontrar e poucos elementos fortes.',
    product: 'Permite descobrir experiências a partir da localização e dos interesses.',
    avoid: 'Jargões tecnológicos que afastam as pessoas.',
  },
  {
    name: 'Energética',
    essence: 'Leve',
    text: 'Tem vontade de acontecer. Usa energia na medida do contexto.',
    sentence: 'Bora viver isso ao vivo?',
    design: 'Verde em pontos de destaque e movimento com ritmo.',
    product: 'Convida à descoberta sem transformar cada ação em uma urgência.',
    avoid: 'Exclamações em excesso e animações que competem com a leitura.',
  },
  {
    name: 'Humana',
    essence: 'Empática',
    text: 'Escuta, orienta e acolhe. Fala com pessoas, não com usuários abstratos.',
    sentence: 'Não deu certo desta vez. Vamos tentar de novo?',
    design: 'Legibilidade, escolhas claras e respostas que ajudam.',
    product: 'Explica o problema e oferece um próximo passo possível.',
    avoid: 'Culpar a pessoa por um erro ou usar humor em momentos delicados.',
  },
  {
    name: 'Espontânea',
    essence: 'Leve',
    text: 'Tem naturalidade para convidar, com espaço para surpresa e curiosidade.',
    sentence: 'Que tal sair da rotina hoje?',
    design: 'Pequenos deslocamentos e composições vivas, com uma base organizada.',
    product: 'Abre espaço para experiências que a pessoa ainda não conhecia.',
    avoid: 'Forçar gírias ou usar informalidade que dificulte a compreensão.',
  },
  {
    name: 'Cultural',
    essence: 'Urbana',
    text: 'Reconhece a diversidade de quem cria, participa e faz a cultura acontecer.',
    sentence: 'Tem muita cultura acontecendo perto de você.',
    design: 'Fotografia de experiências reais e diferentes expressões culturais.',
    product: 'Dá espaço a escolas, instituições e realizadores independentes.',
    avoid: 'Reduzir cultura a um único estilo, cidade ou perfil de público.',
  },
  {
    name: 'Próxima',
    essence: 'Conectiva',
    text: 'Aproxima quem organiza de quem quer participar, com convites sem barreiras.',
    sentence: 'Chama quem faz esse momento ser melhor.',
    design: 'Hierarquia simples e caminhos fáceis de reconhecer.',
    product: 'Reúne informação para decidir e se organizar.',
    avoid: 'Formalidade distante ou intimidade que o contexto não permite.',
  },
] as const;
export const values = [
  {
    name: 'Descoberta',
    icon: 'compass' as IconName,
    description: 'Ampliar o acesso a eventos e experiências que as pessoas ainda não conhecem.',
    product: 'Organizar a descoberta por localização, faixa de preço e distância, aproximando cada pessoa de uma programação relevante.',
    communication: 'Apresentar possibilidades com informações claras sobre o que vai acontecer, onde e para quem.',
    example: 'Encontre uma experiência perto de você.',
  },
  {
    name: 'Conexão',
    icon: 'link' as IconName,
    description: 'Aproximar quem organiza de quem quer participar.',
    product: 'Reunir público e organizadores em uma plataforma simples, com espaço para publicar e encontrar programações.',
    communication: 'Convidar com empatia e explicar os próximos passos, tanto para o participante quanto para o organizador.',
    example: 'Divulgue seu evento para quem quer participar.',
  },
  {
    name: 'Cultura',
    icon: 'community' as IconName,
    description: 'Dar visibilidade às diferentes formas de viver e produzir cultura.',
    product: 'Abrir espaço para empresas de entretenimento, escolas, instituições culturais e organizadores independentes.',
    communication: 'Valorizar a programação e seus realizadores, respeitando a diversidade de públicos e experiências.',
    example: 'Conheça a programação cultural perto de você.',
  },
] as const;
export const manifesto = [
  "Acreditamos que o acesso à cultura começa quando uma experiência pode ser encontrada. Um evento precisa chegar a quem quer participar; uma pessoa precisa de informação para escolher, se organizar e estar presente.",
  "O Evena existe para aproximar esses dois lados. Reunimos descoberta e planejamento para que jovens e adultos encontrem experiências que façam sentido para seus interesses, sua localização e seu orçamento.",
  "Também abrimos espaço para quem faz a cultura acontecer: empresas de entretenimento, escolas, instituições culturais e organizadores independentes. Divulgar uma programação deve ser simples, assim como encontrar o próximo evento.",
  "Descoberta, conexão e cultura orientam nossa forma de construir o produto e conversar com as pessoas. Usamos a tecnologia para facilitar decisões e criar as condições para encontros reais.",
  "Viver é melhor ao vivo!"
] as const;

export const brandMessage = {
  primary: 'Viver é melhor ao vivo!',
  secondary: ['Descubra. Sinta. Compartilhe.', 'Feito de conexões reais.', 'Tem cultura. Tem gente. Tem Evena.'],
} as const;
