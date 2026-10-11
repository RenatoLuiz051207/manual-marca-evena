export type ApplicationFormat = 'poster' | 'post' | 'story' | 'ticket' | 'card';
export type ApplicationTheme = 'purple' | 'green' | 'photo';
export interface ApplicationModel {
  format: ApplicationFormat;
  theme: ApplicationTheme;
  title: string;
  category: string;
  date: string;
  location: string;
  call: string;
}
export interface ApplicationAssets {
  wordmark: string;
  crown: string;
  photo: string;
  font: string;
}
export const formats: readonly {
  id: ApplicationFormat;
  name: string;
  width: number;
  height: number;
  description: string;
}[] = [
  {
    id: 'poster',
    name: 'Cartaz',
    width: 1080,
    height: 1350,
    description: 'Um destaque. Um convite.',
  },
  {
    id: 'post',
    name: 'Post',
    width: 1080,
    height: 1080,
    description: 'Uma experiência para compartilhar.',
  },
  { id: 'story', name: 'Story', width: 1080, height: 1920, description: 'Presença em tela cheia.' },
  {
    id: 'ticket',
    name: 'Ingresso',
    width: 1440,
    height: 560,
    description: 'O encontro começa na chegada.',
  },
  {
    id: 'card',
    name: 'Card de evento',
    width: 1200,
    height: 800,
    description: 'Informação que ajuda a escolher.',
  },
];
const escape = (text: string): string =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
function glyphWidth(character: string): number {
  if (/\s/.test(character)) return 0.28;
  if (/[ilI.,'`:;!|]/.test(character)) return 0.27;
  if (/[mwMW@%&]/.test(character)) return 0.82;
  if (/[A-ZÁÀÂÃÉÊÍÓÔÕÚÇ]/.test(character)) return 0.64;
  if (/[0-9]/.test(character)) return 0.56;
  if (/[-–—+]/.test(character)) return 0.5;
  return 0.52;
}
function estimatedWidth(text: string, fontSize: number): number {
  return [...text].reduce((sum, character) => sum + glyphWidth(character) * fontSize, 0) - Math.max(0, [...text].length - 1) * 2.2;
}
function wrapText(text: string, fontSize: number, maxWidth: number): string[] {
  const result: string[] = [];
  let current = '';
  const pushLongWord = (word: string): void => {
    let fragment = '';
    for (const character of word) {
      if (fragment && estimatedWidth(fragment + character, fontSize) > maxWidth) {
        result.push(fragment);
        fragment = character;
      } else fragment += character;
    }
    current = fragment;
  };
  for (const word of text.trim().split(/\s+/)) {
    if (estimatedWidth(word, fontSize) > maxWidth) {
      if (current) {
        result.push(current);
        current = '';
      }
      pushLongWord(word);
      continue;
    }
    const candidate = current ? current + ' ' + word : word;
    if (current && estimatedWidth(candidate, fontSize) > maxWidth) {
      result.push(current);
      current = word;
    } else current = candidate;
  }
  if (current) result.push(current);
  return result;
}
export function renderApplication(m: ApplicationModel, a: ApplicationAssets): string {
  const format = formats.find((f) => f.id === m.format) ?? formats[0];
  const w = format.width,
    h = format.height;
  const ticket = m.format === 'ticket';
  const green = m.theme === 'green';
  const fg = green ? '#000000' : '#FFFFFF',
    bg = green ? '#00FF00' : '#2F1A67',
    accent = green ? '#2F1A67' : '#00FF00';
  const title = m.title.trim() || 'Encontros ao vivo';
  const vertical = m.format === 'story';
  const x = ticket ? 65 : 70;
  const top = ticket ? 205 : vertical ? 415 : m.format === 'card' ? 285 : 340;
  let titleSize = ticket
    ? 76
    : m.format === 'card'
      ? 86
      : m.format === 'post'
        ? 104
        : vertical
          ? 132
          : 122;
  const maxWidth = ticket ? 900 : w - 160;
  const allowedLines = ticket ? 2 : vertical ? 4 : 3;
  let titleLines = wrapText(title, titleSize, maxWidth);
  while ((titleLines.length > allowedLines || titleLines.some((line) => estimatedWidth(line, titleSize) > maxWidth)) && titleSize > 44) {
    titleSize -= 4;
    titleLines = wrapText(title, titleSize, maxWidth);
  }
  if (titleLines.length > allowedLines) {
    titleLines = titleLines.slice(0, allowedLines);
    titleLines[allowedLines - 1] = titleLines[allowedLines - 1].replace(/[.,;:!?…]*$/, '') + '…';
  }
  const titleMarkup = titleLines
    .map(
      (line, i) =>
        '<tspan x="' +
        x +
        '" dy="' +
        (i === 0 ? 0 : titleSize * 1.02) +
        '">' +
        escape(line) +
        '</tspan>',
    )
    .join('');
  const titleBottom = top + (titleLines.length - 1) * titleSize * 1.02;
  const infoY = ticket ? 385 : h - 245;
  const image = (
    uri: string,
    px: number,
    py: number,
    pw: number,
    ph: number,
    extra = '',
  ): string =>
    uri
      ? '<image href="' +
        escape(uri) +
        '" x="' +
        px +
        '" y="' +
        py +
        '" width="' +
        pw +
        '" height="' +
        ph +
        '" preserveAspectRatio="xMidYMid meet" ' +
        extra +
        '/>'
      : '';
  const logoPlate = green
    ? '<rect x="' +
      (x - 14) +
      '" y="' +
      (ticket ? 14 : 26) +
      '" width="' +
      (ticket ? 198 : 243) +
      '" height="' +
      (ticket ? 76 : 116) +
      '" rx="8" fill="#2F1A67"/>'
    : '';
  const logoMarkup =
    logoPlate + image(a.wordmark, x, ticket ? 20 : 34, ticket ? 170 : 215, ticket ? 60 : 100);
  const photo =
    m.theme === 'photo' && a.photo
      ? '<image href="' +
        escape(a.photo) +
        '" width="' +
        w +
        '" height="' +
        h +
        '" preserveAspectRatio="xMidYMid slice"/><rect width="' +
        w +
        '" height="' +
        h +
        '" fill="url(#photoShade)"/>'
      : '';
  const art = ticket
    ? '<circle cx="1150" cy="140" r="180" fill="none" stroke="' +
      accent +
      '" stroke-width="30" opacity=".25"/>'
    : m.format === 'card'
      ? '<circle cx="1090" cy="210" r="225" fill="none" stroke="' +
        accent +
        '" stroke-width="40" opacity=".22"/>'
      : '<g transform="translate(' +
        (w - 120) +
        ' ' +
        (h - 440) +
        ')" opacity="' +
        (m.theme === 'photo' ? '.18' : '.25') +
        '"><circle r="205" fill="none" stroke="' +
        accent +
        '" stroke-width="38"/><circle r="137" fill="none" stroke="' +
        accent +
        '" stroke-width="28"/><circle r="69" fill="' +
        accent +
        '"/></g>';
  const crown = green
    ? ''
    : ticket
      ? image(a.crown, 1110, 45, 220, 220, 'opacity=".75"')
      : image(a.crown, w - 230, 45, 150, 150, 'opacity=".7"');
  const footer = ticket
    ? `<path d="M1070 20v520" stroke="${fg}" stroke-opacity=".4" stroke-width="2" stroke-dasharray="9 9"/><text x="1120" y="330" font-family="EvenaPreview,sans-serif" font-size="30" fill="${fg}">AO VIVO</text><text x="1120" y="373" font-family="sans-serif" font-size="19" fill="${fg}" opacity=".7">Modelo de ingresso</text><text x="1120" y="420" font-family="monospace" font-size="18" fill="${fg}">EXEMPLO / 0001</text><text x="65" y="525" font-family="sans-serif" font-size="18" fill="${fg}">Viver é melhor ao vivo!</text>`
    : `<rect x="${x}" y="${h - 112}" width="${w - 140}" height="2" fill="${fg}" opacity=".25"/><text x="${x}" y="${h - 62}" font-size="22" font-family="sans-serif" fill="${fg}">Viver é melhor ao vivo!</text><text x="${w - 70}" y="${h - 62}" text-anchor="end" font-size="21" font-family="sans-serif" fill="${fg}">www.evena.online ↗</text>`;
  const info =
    '<text x="' +
    x +
    '" y="' +
    infoY +
    '" font-family="EvenaPreview,sans-serif" font-size="' +
    (ticket ? 35 : 42) +
    '" fill="' +
    fg +
    '">' +
    escape(m.date.trim() || 'SÁBADO · 19H') +
    '</text><text x="' +
    x +
    '" y="' +
    (infoY + 53) +
    '" font-family="sans-serif" font-size="' +
    (ticket ? 25 : 31) +
    '" fill="' +
    fg +
    '" opacity=".85">' +
    escape(m.location.trim() || 'Centro Cultural · São Paulo') +
    '</text>';
  const captionY = Math.min(titleBottom + (ticket ? 65 : 85), infoY - 65);
  const demo =
    '<text x="' +
    (ticket ? w - 42 : w - 70) +
    '" y="' +
    (ticket ? h - 35 : h - 135) +
    '" text-anchor="end" font-family="monospace" font-size="16" letter-spacing="2" fill="' +
    fg +
    '" opacity=".65">DEMONSTRAÇÃO / EVENTO FICTÍCIO</text>';
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' +
    w +
    '" height="' +
    h +
    '" viewBox="0 0 ' +
    w +
    ' ' +
    h +
    '" role="img"><title>' +
    escape(title) +
    ' — aplicação Evena</title><defs><linearGradient id="photoShade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#140a20" stop-opacity=".62"/><stop offset="1" stop-color="#140a20" stop-opacity=".97"/></linearGradient><style>' +
    (a.font
      ? '@font-face{font-family:EvenaPreview;src:url(' + a.font + ');font-weight:300 700;}'
      : '') +
    '</style></defs><rect width="' +
    w +
    '" height="' +
    h +
    '" fill="' +
    bg +
    '"/>' +
    photo +
    art +
    crown +
    logoMarkup +
    '<text x="' +
    x +
    '" y="' +
    (top - titleSize - 20) +
    '" font-family="monospace" font-size="' +
    (ticket ? 17 : 20) +
    '" letter-spacing="3" fill="' +
    accent +
    '">' +
    escape(m.category.trim().toUpperCase() || 'CULTURA EM MOVIMENTO') +
    '</text><text x="' +
    x +
    '" y="' +
    top +
    '" font-family="EvenaPreview,sans-serif" font-size="' +
    titleSize +
    '" font-weight="600" letter-spacing="-3" fill="' +
    fg +
    '">' +
    titleMarkup +
    '</text><text x="' +
    x +
    '" y="' +
    captionY +
    '" font-family="sans-serif" font-size="' +
    (ticket ? 22 : 29) +
    '" fill="' +
    fg +
    '" opacity=".8">' +
    escape(m.call.trim() || 'Descubra. Sinta. Compartilhe.') +
    '</text>' +
    info +
    footer +
    demo +
    '</svg>'
  );
}
