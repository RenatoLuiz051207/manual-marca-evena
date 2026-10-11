import { DOCUMENT } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChapterFrame } from '../../shared/chapter';
import { Icon } from '../../shared/icon';
import { ClipboardService } from '../../shared/clipboard.service';
import {
  ApplicationAssets,
  ApplicationFormat,
  ApplicationModel,
  ApplicationTheme,
  formats,
  renderApplication,
} from './application-renderer';
export async function assetData(path: string): Promise<string> {
  const r = await fetch(path);
  if (!r.ok) throw new Error('Asset unavailable');
  const blob = await r.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
@Component({
  selector: 'ev-applications',
  standalone: true,
  imports: [ChapterFrame, RouterLink, Icon],
  templateUrl: './applications.html',
  styleUrl: './applications.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationsPage {
  private readonly document = inject(DOCUMENT);
  readonly clipboard = inject(ClipboardService);
  readonly formats = formats;
  readonly model = signal<ApplicationModel>({
    format: 'poster',
    theme: 'purple',
    title: 'Encontros ao vivo',
    category: 'Música · cultura · conexão',
    date: 'SÁBADO, 24 OUT · 19H',
    location: 'Centro Cultural · São Paulo',
    call: 'Descubra. Sinta. Compartilhe.',
  });
  readonly assets = signal<ApplicationAssets>({ wordmark: '', crown: '', photo: '', font: '' });
  readonly ready = signal(false);
  readonly exporting = signal(false);
  readonly exportStatus = signal('');
  readonly format = computed(() => formats.find((f) => f.id === this.model().format) ?? formats[0]);
  readonly svg = computed(() => renderApplication(this.model(), this.assets()));
  readonly preview = computed(
    () => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(this.svg()),
  );
  readonly examples = [
    {
      name: 'Música',
      title: 'Encontros ao vivo',
      category: 'Música · cultura · conexão',
      call: 'Descubra. Sinta. Compartilhe.',
    },
    {
      name: 'Cinema',
      title: 'Cinema sob as estrelas',
      category: 'Cinema · cultura · encontro',
      call: 'Uma história. Um novo olhar.',
    },
    {
      name: 'Cultura',
      title: 'Feira de novos encontros',
      category: 'Arte · design · cultura',
      call: 'Ideias que ganham a rua.',
    },
  ];
  constructor() {
    afterNextRender(() => {
      void this.loadAssets();
    });
  }
  private async loadAssets(): Promise<void> {
    try {
      const [wordmark, crown, photo, font] = await Promise.all([
        assetData('/assets/logos/logotipo-evena.webp'),
        assetData('/logo%20branca.png'),
        assetData('/assets/images/vibe-crowd.jpg'),
        assetData('/assets/fonts/Fredoka-VariableFont_wdth,wght.ttf'),
      ]);
      this.assets.set({ wordmark, crown, photo, font });
      this.ready.set(true);
    } catch {
      this.exportStatus.set(
        'Não foi possível abrir os arquivos visuais. Recarregue a página para exportar a composição completa.',
      );
    }
  }
  setFormat(format: ApplicationFormat): void {
    this.model.update((m) => ({ ...m, format }));
  }
  setTheme(theme: ApplicationTheme): void {
    this.model.update((m) => ({ ...m, theme }));
  }
  input(e: Event, key: 'title' | 'category' | 'date' | 'location' | 'call', limit: number): void {
    this.model.update((m) => ({
      ...m,
      [key]: (e.target as HTMLInputElement).value.slice(0, limit),
    }));
  }
  example(i: number): void {
    this.model.update((m) => ({ ...m, ...this.examples[i] }));
  }
  reset(): void {
    this.model.set({
      format: 'poster',
      theme: 'purple',
      title: 'Encontros ao vivo',
      category: 'Música · cultura · conexão',
      date: 'SÁBADO, 24 OUT · 19H',
      location: 'Centro Cultural · São Paulo',
      call: 'Descubra. Sinta. Compartilhe.',
    });
    this.exportStatus.set('');
  }
  exportSvg(): void {
    if (!this.ready()) return;
    this.clipboard.download(this.svg(), 'evena-' + this.model().format + '.svg', 'image/svg+xml');
    this.exportStatus.set(
      'SVG pronto. Os textos e elementos podem ser editados em ferramentas vetoriais.',
    );
  }
  async exportPng(): Promise<void> {
    if (this.exporting() || !this.ready()) return;
    this.exporting.set(true);
    this.exportStatus.set('');
    try {
      const image = new Image();
      image.src = this.preview();
      await image.decode();
      const canvas = this.document.createElement('canvas');
      canvas.width = this.format().width;
      canvas.height = this.format().height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas unavailable');
      ctx.drawImage(image, 0, 0);
      const blob = await new Promise<Blob>((resolve, reject) =>
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error('Export unavailable'))),
          'image/png',
        ),
      );
      const url = URL.createObjectURL(blob);
      const a = this.document.createElement('a');
      a.href = url;
      a.download = 'evena-' + this.model().format + '.png';
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      this.exportStatus.set('PNG exportado em ' + canvas.width + ' × ' + canvas.height + ' px.');
    } catch {
      this.exportStatus.set(
        'Não foi possível exportar o PNG neste navegador. Você pode baixar o SVG.',
      );
    } finally {
      this.exporting.set(false);
    }
  }
}
