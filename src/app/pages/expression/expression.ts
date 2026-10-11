import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ChapterFrame } from '../../shared/chapter';
import { Icon } from '../../shared/icon';
import { chapters, ChapterId, traits } from '../../shared/manual.data';
import { ClipboardService } from '../../shared/clipboard.service';
import { energyLevels, situations } from './expression.data';
@Component({
  selector: 'ev-expression',
  standalone: true,
  imports: [ChapterFrame, RouterLink, Icon],
  templateUrl: './expression.html',
  styleUrl: './expression.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpressionPage {
  private readonly route = inject(ActivatedRoute);
  private readonly data = toSignal(this.route.data, { initialValue: this.route.snapshot.data });
  readonly id = computed(() => this.data()['section'] as ChapterId);
  readonly pages = chapters.filter((c) => c.group === 'Vibe' && c.id !== 'vibe');
  readonly situation = signal(0);
  readonly audience = signal<'public' | 'b2b'>('public');
  readonly situations = situations;
  readonly example = computed(() => situations[this.situation()]);
  readonly brandText = computed(() => this.example()[this.audience()]);
  readonly clipboard = inject(ClipboardService);
  readonly tone = signal(50);
  readonly toneLevel = computed(() =>
    this.tone() < 25 ? 0 : this.tone() < 55 ? 1 : this.tone() < 80 ? 2 : 3,
  );
  readonly toneExamples = [
    {
      name: 'Informativa',
      text: 'Encontre eventos perto de você.',
      context: 'Navegação e instruções',
    },
    {
      name: 'Convidativa',
      text: 'Descubra sua próxima experiência ao vivo.',
      context: 'Descoberta e apresentação',
    },
    {
      name: 'Espontânea',
      text: 'Bora encontrar um rolê perto de você?',
      context: 'Convites para o público final',
    },
    {
      name: 'De campanha',
      text: 'Menos scroll. Mais encontro. Partiu viver ao vivo?',
      context: 'Peças curtas e campanhas',
    },
  ];
  readonly energy = signal(1);
  readonly energyLevels = energyLevels;
  readonly level = computed(() => energyLevels[this.energy()]);
  readonly traitIndex = signal(0);
  readonly traits = traits;
  readonly trait = computed(() => traits[this.traitIndex()]);
  selectSituation(e: Event): void {
    this.situation.set(Number((e.target as HTMLSelectElement).value));
  }
  setTone(e: Event): void {
    this.tone.set(Math.max(0, Math.min(100, Number((e.target as HTMLInputElement).value))));
  }
}
