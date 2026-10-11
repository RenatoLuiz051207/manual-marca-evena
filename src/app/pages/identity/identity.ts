import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ChapterFrame } from '../../shared/chapter';
import { Icon } from '../../shared/icon';
import { ChapterId, chapters, palette } from '../../shared/manual.data';
import { ClipboardService } from '../../shared/clipboard.service';

export function paletteTokenName(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function contrastRatio(foreground: string, background: string): number {
  const luminance = (hex: string): number => {
    const v = hex.replace('#', '');
    const rgb = [0, 2, 4]
      .map((i) => parseInt(v.slice(i, i + 2), 16) / 255)
      .map((c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
    return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
  };
  const a = luminance(foreground),
    b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}
interface PreviewFont {
  id: string;
  name: string;
  family: string;
  role: string;
  description: string;
  weights: readonly number[];
}
export const fonts: readonly PreviewFont[] = [
  {
    id: 'poppins',
    name: 'Poppins',
    family: 'Poppins Evena',
    role: 'Principal',
    description: 'Títulos, informações de eventos e comunicação principal do Evena.',
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
    id: 'fredoka',
    name: 'Fredoka',
    family: 'Fredoka Evena',
    role: 'Interface do manual',
    description: 'Fonte mantida nos cards e nas animações do manual.',
    weights: [300, 400, 500, 600, 700],
  },
  {
    id: 'ganker',
    name: 'Ganker-Storm',
    family: 'Evena Ganker Storm',
    role: 'Expressiva',
    description: 'Expressão gráfica em títulos curtos e peças de divulgação cultural.',
    weights: [400],
  },
];
export const brandAssets = [
  { name: 'Coroa preta', kind: 'symbol', path: '/assets/logos/coroa-preta.png', filename: 'evena-coroa-preta.png', format: 'PNG', surface: '#F8F9FA' },
  {
    name: 'Coroa colorida',
    kind: 'symbol',
    path: '/evena-logo.svg',
    filename: 'evena-coroa-colorida.svg',
    format: 'SVG',
    surface: '#121212',
  },
  {
    name: 'Coroa verde',
    kind: 'symbol',
    path: '/logo%20verde.png',
    filename: 'evena-coroa-verde.png',
    format: 'PNG',
    surface: '#140A20',
  },
  {
    name: 'Coroa branca',
    kind: 'symbol',
    path: '/logo%20branca.png',
    filename: 'evena-coroa-branca.png',
    format: 'PNG',
    surface: '#2F1A67',
  },
  {
    name: 'Logotipo',
    kind: 'wordmark',
    path: '/assets/logos/logotipo-evena.webp',
    filename: 'evena-logotipo.webp',
    format: 'WEBP',
    surface: '#F8F9FA',
  },
] as const;
@Component({
  selector: 'ev-identity',
  standalone: true,
  imports: [ChapterFrame, RouterLink, Icon],
  templateUrl: './identity.html',
  styleUrl: './identity.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentityPage {
  private readonly route = inject(ActivatedRoute);
  private readonly data = toSignal(this.route.data, { initialValue: this.route.snapshot.data });
  readonly id = computed(() => this.data()['section'] as ChapterId);
  readonly pages = chapters.filter((c) => c.group === 'Estética' && c.id !== 'estetica');
  readonly palette = palette;
  readonly contrastPalette = palette;
  readonly supportPalette = palette.filter(color => color.group === 'Apoio');
  readonly appPalette = palette.filter(color => color.group === 'App');
  readonly clipboard = inject(ClipboardService);
  readonly foreground = signal('#FFFFFF');
  readonly background = signal('#2F1A67');
  readonly ratio = computed(() => contrastRatio(this.foreground(), this.background()));
  readonly contrast = computed(() => this.ratio().toFixed(2));
  readonly combinations = [
    { name: 'Assinatura', bg: '#2F1A67', fg: '#FFFFFF' },
    { name: 'Convite', bg: '#00FF00', fg: '#000000' },
    { name: 'Informação', bg: '#F8F9FA', fg: '#121212' },
    { name: 'Palco', bg: '#121212', fg: '#00FF00' },
  ];
  readonly fonts = fonts;
  readonly fontId = signal('poppins');
  readonly font = computed(() => fonts.find((f) => f.id === this.fontId()) ?? fonts[0]);
  readonly fontText = signal('Viver é melhor ao vivo!');
  readonly fontSize = signal(56);
  readonly fontWeight = signal(600);
  readonly fontGreen = signal(false);
  readonly specimen = computed(() => this.fontText().trim() || 'Evena');
  readonly presets = [
    { name: 'Título de evento', text: 'Encontros ao vivo.', id: 'poppins', size: 56, weight: 600 },
    {
      name: 'Descrição',
      text: 'Confira a data, o local e as informações do evento.',
      id: 'lato',
      size: 32,
      weight: 400,
    },
    { name: 'Chamada', text: 'Descubra eventos perto de você.', id: 'comfortaa', size: 48, weight: 600 },
  ];
  readonly assets = brandAssets;
  readonly assetKind = signal<'all' | 'symbol' | 'wordmark'>('all');
  readonly filteredAssets = computed(() =>
    brandAssets.filter((a) => this.assetKind() === 'all' || a.kind === this.assetKind()),
  );
  readonly logoBackground = signal('original');
  readonly logoSize = signal(300);
  setColor(e: Event, kind: 'foreground' | 'background'): void {
    this[kind].set((e.target as HTMLSelectElement).value);
  }
  chooseCombination(i: number): void {
    this.background.set(this.combinations[i].bg);
    this.foreground.set(this.combinations[i].fg);
  }
  tokens(): string {
    const groups = ['Principal', 'Apoio', 'App'] as const;
    const lines = groups.flatMap((group) => {
      const colors = palette.filter((color) => color.group === group);
      return colors.length
        ? ['  /* ' + group + ' */', ...colors.map((color) => '  --evena-' + paletteTokenName(color.name) + ': ' + color.hex + ';')]
        : [];
    });
    return ':root {\n' + lines.join('\n') + '\n}\n';
  }
  exportColors(kind: 'css' | 'json'): void {
    this.clipboard.download(
      kind === 'css'
        ? this.tokens()
        : JSON.stringify(
            palette.map((c) => ({ name: c.name, hex: c.hex, rgb: c.rgb, group: c.group, role: c.role, ink: c.ink })),
            null,
            2,
          ),
      'evena-paleta.' + kind,
      kind === 'css' ? 'text/css' : 'application/json',
    );
  }
  selectFont(id: string): void {
    this.fontId.set(id);
    this.fontWeight.set(this.nearestWeight(this.fontWeight()));
  }
  textInput(e: Event): void {
    this.fontText.set((e.target as HTMLInputElement).value.slice(0, 96));
  }
  sizeInput(e: Event): void {
    this.fontSize.set(Math.max(24, Math.min(120, Number((e.target as HTMLInputElement).value))));
  }
  weightLabel(weight: number): string {
    return ({ 300: 'Light', 400: 'Regular', 500: 'Medium', 600: 'Semi Bold', 700: 'Bold' } as Record<number, string>)[weight] ?? 'Regular';
  }
  weightInput(e: Event): void {
    this.fontWeight.set(this.nearestWeight(Number((e.target as HTMLSelectElement).value)));
  }
  setPreset(i: number): void {
    const p = this.presets[i];
    this.selectFont(p.id);
    this.fontText.set(p.text);
    this.fontSize.set(p.size);
    this.fontWeight.set(p.weight);
  }
  reset(): void {
    this.fontId.set('poppins');
    this.fontText.set('Viver é melhor ao vivo!');
    this.fontSize.set(56);
    this.fontWeight.set(600);
    this.fontGreen.set(false);
  }
  fontCss(): string {
    return (
      'font-family: "' +
      this.font().family +
      '", sans-serif;\nfont-size: ' +
      this.fontSize() +
      'px;\nfont-weight: ' +
      this.fontWeight() +
      ';\nline-height: 1.15;'
    );
  }
  private nearestWeight(w: number): number {
    return this.font().weights.reduce((a, b) => (Math.abs(b - w) < Math.abs(a - w) ? b : a));
  }
  setLogoBg(e: Event): void {
    this.logoBackground.set((e.target as HTMLSelectElement).value);
  }
  setLogoSize(e: Event): void {
    this.logoSize.set(Number((e.target as HTMLInputElement).value));
  }
}
