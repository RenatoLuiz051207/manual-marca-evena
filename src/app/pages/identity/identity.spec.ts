import { contrastRatio, paletteTokenName } from './identity';
describe('Contraste entre cores', () => {
  it('reconhece os extremos conhecidos de contraste', () => {
    expect(contrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21, 8);
    expect(contrastRatio('#2F1A67', '#2F1A67')).toBe(1);
    expect(contrastRatio('#000000', '#00FF00')).toBeCloseTo(15.304, 3);
  });
  it('mantém o resultado quando texto e fundo são invertidos', () => {
    expect(contrastRatio('#2F1A67', '#FFFFFF')).toBeCloseTo(contrastRatio('#FFFFFF', '#2F1A67'), 8);
    expect(contrastRatio('#FFFFFF', '#00FF00')).toBeLessThan(3);
  });
});

describe('Tokens da paleta', () => {
  it('gera nomes consistentes para CSS', () => {
    expect(paletteTokenName('Roxo Escuro')).toBe('roxo-escuro');
    expect(paletteTokenName('Verde-Limão')).toBe('verde-limao');
    expect(paletteTokenName('Fundo do app')).toBe('fundo-do-app');
  });
});
