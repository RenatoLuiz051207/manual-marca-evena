import { DOCUMENT, ViewportScroller } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import {
  logos,
  manualNavigation,
  palette,
  SectionKey,
  sections,
  voiceExamples,
} from './guide.data';
import { StrategyExplorer } from './strategy';
import { manualFonts } from './typography.data';

@Component({
  selector: 'app-guide',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, StrategyExplorer],
  templateUrl: './guide.html',
  styleUrls: ['./guide-labs.css', './guide.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuidePage implements OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly viewportScroller = inject(ViewportScroller);
  private readonly data = toSignal(this.route.data, { initialValue: this.route.snapshot.data });
  readonly section = computed(() => {
    const key = this.data()['section'] as SectionKey;
    return sections[key] ?? sections.conceito;
  });
  readonly navigation = manualNavigation;
  readonly palette = palette;
  readonly logos = logos;
  readonly toneAudience = signal<'public' | 'b2b'>('public');
  readonly toneExample = computed(() => voiceExamples[this.toneAudience()]);
  readonly previewText = signal('Evena');
  readonly fonts = manualFonts;
  readonly previewFont = signal('poppins');
  readonly currentFont = computed(
    () => this.fonts.find((font) => font.id === this.previewFont()) ?? this.fonts[0],
  );
  readonly fontLoading = signal(false);
  readonly gankerReady = signal(false);
  readonly fontStatus = signal('');
  private loadedGanker?: FontFace;
  private destroyed = false;
  readonly previewSize = signal(80);
  readonly previewWeight = signal(600);
  readonly previewGreen = signal(false);
  readonly status = signal('');
  readonly specimen = computed(() => this.previewText().trim() || 'Evena');

  constructor() {
    this.viewportScroller.setOffset(() => {
      const header = this.document.querySelector('.site-header');
      return [0, (header?.getBoundingClientRect().height ?? 0) + 16];
    });
  }

  async navigateToSection(event: MouseEvent, anchor: string): Promise<void> {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)
      return;
    event.preventDefault();

    if (this.route.snapshot.fragment !== anchor) {
      const navigated = await this.router.navigate([], {
        relativeTo: this.route,
        fragment: anchor,
      });
      if (!navigated) return;
    }

    this.viewportScroller.scrollToAnchor(anchor);
    this.document.getElementById(anchor)?.focus({ preventScroll: true });
  }

  setText(event: Event): void {
    this.previewText.set((event.target as HTMLInputElement).value.slice(0, 96));
  }

  setFont(event: Event): void {
    const font = (event.target as HTMLSelectElement).value;
    this.selectFont(font);
  }

  selectFont(id: string): void {
    this.previewFont.set(this.fonts.some((font) => font.id === id) ? id : 'poppins');
    this.previewWeight.set(this.nearestWeight(this.previewWeight()));
  }

  setSize(event: Event): void {
    this.previewSize.set(this.clampInput(event, 32, 120));
  }

  setWeight(event: Event): void {
    this.previewWeight.set(this.nearestWeight(this.clampInput(event, 300, 700)));
  }

  async loadGankerFont(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file || this.fontLoading()) return;
    this.fontStatus.set('');
    if (!/\.(ttf|otf|woff2?)$/i.test(file.name) || file.size > 10 * 1024 * 1024) {
      this.fontStatus.set('Escolha um arquivo TTF, OTF, WOFF ou WOFF2 de até 10 MB.');
      input.value = '';
      return;
    }
    this.fontLoading.set(true);
    try {
      const face = await new FontFace('Ganker-Storm Evena', await file.arrayBuffer(), {
        weight: '400',
      }).load();
      if (this.destroyed) return;
      if (this.loadedGanker) this.document.fonts.delete(this.loadedGanker);
      this.document.fonts.add(face);
      this.loadedGanker = face;
      this.gankerReady.set(true);
      this.fontStatus.set('Fonte carregada neste laboratório. O arquivo fica no seu navegador.');
    } catch {
      this.fontStatus.set(
        'Não foi possível carregar a fonte. Confira o arquivo e tente novamente.',
      );
    } finally {
      this.fontLoading.set(false);
      input.value = '';
    }
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    if (this.loadedGanker) this.document.fonts.delete(this.loadedGanker);
  }

  private nearestWeight(weight: number): number {
    return this.currentFont().weights.reduce((nearest, option) =>
      Math.abs(option - weight) < Math.abs(nearest - weight) ? option : nearest,
    );
  }

  async copy(value: string): Promise<void> {
    this.status.set('');
    try {
      const clipboard = this.document.defaultView?.navigator.clipboard;
      if (!clipboard) throw new Error('Clipboard unavailable');
      await clipboard.writeText(value);
      this.status.set(value + ' copiado!');
    } catch {
      this.status.set(
        'A cópia automática não está disponível. Selecione ' + value + ' e copie manualmente.',
      );
    }
  }

  private clampInput(event: Event, min: number, max: number): number {
    const value = Number((event.target as HTMLInputElement).value);
    return Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : min;
  }
}
