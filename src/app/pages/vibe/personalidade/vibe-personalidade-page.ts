import { AfterViewInit, Component, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vibe-personalidade-page',
  standalone: true,
  templateUrl: './vibe-personalidade-page.html',
  styleUrl: './vibe-personalidade-page.css'
})
export class VibePersonalidadePage implements AfterViewInit, OnDestroy {
  selectedTrait = 'Humana';
  navBottom = 32;
  private navCheckInterval?: number;

  traitText: Record<string, string> = {
    'Moderna': 'Atual, visual, digital e intuitiva, sem parecer distante.',
    'Energética': 'Com movimento, cor e vontade de acontecer.',
    'Humana': 'Feita para pessoas, encontros e memórias.',
    'Espontânea': 'Leve, natural e sem parecer forçada.',
    'Cultural': 'Ligada a eventos, expressões, lugares e vivências.',
    'Próxima': 'Fala com o público de forma simples e acolhedora.'
  };

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    setTimeout(() => this.updateNavPosition());
    this.navCheckInterval = window.setInterval(() => this.updateNavPosition(), 60);
  }

  ngOnDestroy(): void {
    if (this.navCheckInterval) {
      window.clearInterval(this.navCheckInterval);
    }
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.updateNavPosition();
  }

  @HostListener('document:scroll')
  onDocumentScroll(): void {
    this.updateNavPosition();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.updateNavPosition();
  }

  private updateNavPosition(): void {
    const marker = document.querySelector('.poster-strip') as HTMLElement | null;
    const defaultBottom = 32;
    const safeGap = 150;

    if (!marker) {
      this.navBottom = defaultBottom;
      return;
    }

    const markerTop = marker.getBoundingClientRect().top;
    const neededBottom = window.innerHeight - markerTop + safeGap;

    this.navBottom = Math.max(defaultBottom, neededBottom);
  }

  goHome(): void {
    this.router.navigateByUrl('/vibe');
  }

  goLeft(): void {
    this.router.navigateByUrl('/vibe/energia');
  }

  goRight(): void {
    this.router.navigateByUrl('/vibe/voz');
  }

  setTrait(trait: string): void {
    this.selectedTrait = trait;
  }
}
