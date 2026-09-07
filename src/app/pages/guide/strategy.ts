import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { audiences, brandValues, manifesto, platformFeatures } from './strategy.data';

@Component({
  selector: 'app-strategy-explorer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './strategy.html',
  styleUrl: './strategy.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StrategyExplorer {
  private readonly document = inject(DOCUMENT);
  readonly section = input.required<'conceito' | 'proposito' | 'posicionamento'>();
  readonly values = brandValues;
  readonly selectedValue = signal(0);
  readonly currentValue = computed(() => this.values[this.selectedValue()]);
  readonly selectedAudience = signal<'public' | 'organizers'>('public');
  readonly currentAudience = computed(() => audiences[this.selectedAudience()]);
  readonly features = platformFeatures;
  readonly selectedFeature = signal(0);
  readonly currentFeature = computed(() => this.features[this.selectedFeature()]);
  readonly manifesto = manifesto;
  readonly fullManifesto = signal(false);
  readonly copyStatus = signal('');

  async copyManifesto(): Promise<void> {
    this.copyStatus.set('');
    try {
      const clipboard = this.document.defaultView?.navigator.clipboard;
      if (!clipboard) throw new Error('Clipboard unavailable');
      await clipboard.writeText(
        this.manifesto.join('\n\n') + '\n\nEvena — feita de conexões reais.',
      );
      this.copyStatus.set('Manifesto copiado.');
    } catch {
      this.fullManifesto.set(true);
      this.copyStatus.set('Selecione o texto do manifesto e copie manualmente.');
    }
  }
}
