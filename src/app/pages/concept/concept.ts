import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ChapterFrame } from '../../shared/chapter';
import { Icon } from '../../shared/icon';
import { ChapterId, brandMessage, chapters, manifesto, values } from '../../shared/manual.data';
import { ClipboardService } from '../../shared/clipboard.service';
@Component({
  selector: 'ev-concept',
  standalone: true,
  imports: [ChapterFrame, RouterLink, Icon],
  templateUrl: './concept.html',
  styleUrl: './concept.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConceptPage {
  private readonly route = inject(ActivatedRoute);
  private readonly data = toSignal(this.route.data, { initialValue: this.route.snapshot.data });
  readonly id = computed(() => this.data()['section'] as ChapterId);
  readonly chapters = chapters.filter((c) => c.group === 'Conceito' && c.id !== 'conceito');
  readonly values = values;
  readonly valueIndex = signal(0);
  readonly value = computed(() => values[this.valueIndex()]);
  readonly audience = signal<'public' | 'organizer'>('public');
  readonly expanded = signal(false);
  readonly manifesto = manifesto;
  readonly brandMessage = brandMessage;
  readonly clipboard = inject(ClipboardService);
  readonly audiences = {
    public: {
      name: 'Jovens e adultos',
      subtitle: 'Jovens e adultos',
      needs: [
        'Descobrir a programação de um estado ou de uma região, considerando a distância geográfica.',
        'Comparar possibilidades considerando a faixa de preço e a distância.',
        'Planejar a experiência, incluindo estimativas de hospedagem nos arredores quando necessário.',
      ],
      challenge: 'Pessoas que procuram eventos e experiências e precisam de informação para decidir onde ir e como se organizar.',
      help: 'Escolher uma experiência com mais contexto e menos informação espalhada. As estimativas de hospedagem apoiam o planejamento; não representam reserva ou preço garantido.',
    },
    organizer: {
      name: 'Organizadores e instituições',
      subtitle: 'Organizadores e instituições',
      needs: [
        'Criar uma conta e divulgar eventos diretamente na plataforma.',
        'Apresentar informações úteis para quem pretende participar.',
        'Conectar a programação a pessoas interessadas em experiências ao vivo.',
      ],
      challenge: 'Empresas de entretenimento, escolas, instituições culturais e organizadores autônomos que querem dar visibilidade à própria programação.',
      help: 'Centralizar a divulgação em um ambiente voltado à descoberta de eventos.',
    },
  };
}
