export interface ManualFont {
  id: string;
  name: string;
  family: string;
  role: string;
  description: string;
  weights: readonly number[];
}

export const manualFonts: readonly ManualFont[] = [
  {
    id: 'poppins',
    name: 'Poppins',
    family: 'Poppins Evena',
    role: 'Principal',
    description: 'Títulos, informações de eventos e comunicação principal da Evena.',
    weights: [400, 500, 600, 700],
  },
  {
    id: 'lato',
    name: 'Lato',
    family: 'Lato Evena',
    role: 'Secundária',
    description: 'Textos informativos, descrições de eventos e instruções de acesso.',
    weights: [400, 700],
  },
  {
    id: 'comfortaa',
    name: 'Comfortaa',
    family: 'Comfortaa Evena',
    role: 'Secundária',
    description: 'Textos de apoio e composições com formas arredondadas.',
    weights: [300, 400, 500, 600, 700],
  },
  {
    id: 'ganker',
    name: 'Ganker-Storm',
    family: 'Ganker-Storm Evena',
    role: 'Expressiva',
    description: 'Expressão gráfica em títulos curtos e peças de divulgação cultural.',
    weights: [400],
  },
  {
    id: 'fredoka',
    name: 'Fredoka',
    family: 'Fredoka Evena',
    role: 'Interface do manual',
    description: 'Fonte mantida nos cards e nas animações do manual.',
    weights: [300, 400, 500, 600, 700],
  },
];
