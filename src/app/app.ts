import { DOCUMENT } from '@angular/common';
import { afterNextRender, Component, inject, OnDestroy, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnDestroy {
  private readonly document = inject(DOCUMENT);
  private preferenceQuery?: MediaQueryList;
  private explicitMotionChoice = false;
  private readonly onMotionPreference = (event: MediaQueryListEvent): void => {
    if (!this.explicitMotionChoice) this.setMotion(!event.matches);
  };
  private navigated = false;
  readonly motionEnabled = signal(true);

  constructor() {
    afterNextRender(() => {
      const view = this.document.defaultView;
      if (!view) return;
      this.preferenceQuery = view.matchMedia('(prefers-reduced-motion: reduce)');
      let stored: string | null = null;
      try {
        stored = view.localStorage.getItem('evena-motion');
      } catch {
        /* Private browsing can disable storage. */
      }
      this.explicitMotionChoice = stored === 'on' || stored === 'off';
      this.setMotion(this.explicitMotionChoice ? stored === 'on' : !this.preferenceQuery.matches);
      this.preferenceQuery.addEventListener('change', this.onMotionPreference);
    });
  }

  toggleMotion(): void {
    this.explicitMotionChoice = true;
    this.setMotion(!this.motionEnabled());
    try {
      this.document.defaultView?.localStorage.setItem(
        'evena-motion',
        this.motionEnabled() ? 'on' : 'off',
      );
    } catch {
      /* Preference still works for this visit. */
    }
  }

  onRouteActivate(): void {
    if (!this.navigated) {
      this.navigated = true;
      return;
    }
    queueMicrotask(() =>
      this.document.getElementById('main-content')?.focus({ preventScroll: true }),
    );
  }

  ngOnDestroy(): void {
    this.preferenceQuery?.removeEventListener('change', this.onMotionPreference);
  }

  private setMotion(enabled: boolean): void {
    this.motionEnabled.set(enabled);
    this.document.documentElement.dataset['motion'] = enabled ? 'on' : 'off';
  }
}

export { App as AppComponent };
