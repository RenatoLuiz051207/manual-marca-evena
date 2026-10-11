import {
  ApplicationAssets,
  ApplicationModel,
  formats,
  renderApplication,
} from './application-renderer';
const assets: ApplicationAssets = { wordmark: '', crown: '', photo: '', font: '' };
const model: ApplicationModel = {
  format: 'poster',
  theme: 'purple',
  title: 'Música & encontros',
  category: 'Cultura',
  date: 'Sábado · 19h',
  location: 'São Paulo',
  call: 'Bora viver ao vivo?',
};
describe('Exportação das aplicações', () => {
  it('produz SVG válido no tamanho de cada formato', () => {
    for (const format of formats) {
      const svg = renderApplication({ ...model, format: format.id }, assets);
      const doc = new DOMParser().parseFromString(svg, 'image/svg+xml');
      expect(doc.querySelector('parsererror')).toBeNull();
      expect(doc.documentElement.getAttribute('width')).toBe(String(format.width));
      expect(doc.documentElement.getAttribute('height')).toBe(String(format.height));
      expect(doc.querySelector('title')?.textContent).toContain('Música & encontros');
    }
  });
  it('quebra títulos longos em linhas limitadas e afasta a etiqueta de demonstração do topo', () => {
    const svg = renderApplication(
      { ...model, format: 'post', title: 'Festival Internacional de Música e Cultura Contemporânea' },
      assets,
    );
    const doc = new DOMParser().parseFromString(svg, 'image/svg+xml');
    expect(doc.querySelector('parsererror')).toBeNull();
    const title = doc.querySelector('text[font-family="EvenaPreview,sans-serif"]');
    expect(title?.querySelectorAll('tspan').length).toBeLessThanOrEqual(3);
    const demo = [...doc.querySelectorAll('text')].find((node) => node.textContent?.includes('DEMONSTRAÇÃO'));
    expect(Number(demo?.getAttribute('y'))).toBeGreaterThan(900);
    const unbroken = renderApplication({ ...model, format: 'post', title: 'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW' }, assets);
    const unbrokenDoc = new DOMParser().parseFromString(unbroken, 'image/svg+xml');
    const unbrokenTitle = unbrokenDoc.querySelector('text[font-family="EvenaPreview,sans-serif"]');
    expect(unbrokenDoc.querySelector('parsererror')).toBeNull();
    expect(unbrokenTitle?.querySelectorAll('tspan').length).toBeLessThanOrEqual(3);
  });
  it('mantém conteúdo digitado como texto e preserva a identificação da demonstração', () => {
    const svg = renderApplication(
      { ...model, title: '<script>alert("oi")</script>', location: 'Local & cultura' },
      assets,
    );
    const doc = new DOMParser().parseFromString(svg, 'image/svg+xml');
    expect(doc.querySelector('parsererror')).toBeNull();
    expect(doc.querySelector('script')).toBeNull();
    expect(doc.documentElement.textContent).toContain('Local & cultura');
    expect(doc.documentElement.textContent).toContain('DEMONSTRAÇÃO / EVENTO FICTÍCIO');
  });
});
