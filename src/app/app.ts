import { DOCUMENT } from '@angular/common';
import { afterNextRender, Component, HostListener, inject, OnDestroy, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Icon } from './shared/icon';
import { chapters } from './shared/manual.data';
import { ClipboardService } from './shared/clipboard.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, Icon],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnDestroy {
  private readonly document = inject(DOCUMENT);
  readonly router = inject(Router);
  readonly clipboard = inject(ClipboardService);
  readonly motionEnabled = signal(true);
  readonly menuOpen = signal(false);
  readonly progress = signal(0);
  readonly currentGroup = signal('');
  private preference?: MediaQueryList;
  private explicit = false;
  private readonly changed = (e: MediaQueryListEvent) => {
    if (!this.explicit) this.setMotion(!e.matches);
  };
  constructor() {
    afterNextRender(() => {
      this.preference = this.document.defaultView?.matchMedia('(prefers-reduced-motion: reduce)');
      let stored: string | null = null;
      try {
        stored = localStorage.getItem('evena-motion');
      } catch {}
      this.explicit = stored === 'on' || stored === 'off';
      this.setMotion(this.explicit ? stored === 'on' : !this.preference?.matches);
      this.preference?.addEventListener('change', this.changed);
    });
  }
  toggleMotion(): void {
    this.explicit = true;
    this.setMotion(!this.motionEnabled());
    try {
      localStorage.setItem('evena-motion', this.motionEnabled() ? 'on' : 'off');
    } catch {}
  }
  private setMotion(on: boolean): void {
    this.motionEnabled.set(on);
    this.document.documentElement.dataset['motion'] = on ? 'on' : 'off';
  }
  @HostListener('document:keydown', ['$event']) key(e: KeyboardEvent): void {
    if (e.key === 'Escape') this.menuOpen.set(false);
  }
  @HostListener('window:scroll') scroll(): void {
    const el = this.document.documentElement;
    const max = el.scrollHeight - el.clientHeight;
    this.progress.set(max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 0);
  }
  onRouteActivate(): void {
    this.currentGroup.set(
      chapters.find((c) => c.path === this.router.url.split('?')[0].split('#')[0])?.group ?? '',
    );
    this.menuOpen.set(false);
    this.progress.set(0);
    queueMicrotask(() =>
      this.document.getElementById('main-content')?.focus({ preventScroll: true }),
    );
  }
  ngOnDestroy(): void {
    this.preference?.removeEventListener('change', this.changed);
  }
}
export { App as AppComponent };
