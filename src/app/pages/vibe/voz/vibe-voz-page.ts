import { AfterViewInit, Component, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vibe-voz-page',
  standalone: true,
  templateUrl: './vibe-voz-page.html',
  styleUrl: './vibe-voz-page.css'
})
export class VibeVozPage implements AfterViewInit, OnDestroy {
  mode: 'evena' | 'formal' = 'evena';
  navBottom = 32;
  private navCheckInterval?: number;

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
    const marker = document.querySelector('.word-marquee') as HTMLElement | null;
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
    this.router.navigateByUrl('/vibe/personalidade');
  }

  goRight(): void {
    this.router.navigateByUrl('/vibe/energia');
  }

  setMode(mode: 'evena' | 'formal'): void {
    this.mode = mode;
  }
}
