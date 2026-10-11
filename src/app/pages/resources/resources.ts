import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChapterFrame } from '../../shared/chapter';
import { Icon } from '../../shared/icon';
@Component({
  selector: 'ev-resources',
  standalone: true,
  imports: [ChapterFrame, Icon, RouterLink],
  templateUrl: './resources.html',
  styleUrl: './resources.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcesPage {
  readonly checklist = [
    'Logo original, com cores, proporções e traços preservados.',
    'Paleta da marca e contraste de texto conferidos.',
    'Nome do evento, data, local, preço e informações de acesso revisados.',
    'Tom de voz adequado ao público e ao momento.',
    'Informações claras sobre o que vai acontecer, onde e para quem.',
    'Informações revisadas e links conferidos.',
    'Composição verificada no celular e no tamanho de uso.',
    'Direitos de uso dos materiais conferidos.',
  ];
  readonly checked = signal<readonly number[]>([]);
  readonly count = computed(() => this.checked().length);
  readonly glossary = [
    { word: 'Símbolo', definition: 'Elemento visual que representa a marca: a coroa.' },
    { word: 'Logotipo', definition: 'Assinatura escrita do nome Evena.' },
    {
      word: 'Área de proteção',
      definition: 'Folga mínima em todos os lados da coroa. X corresponde a 1/5 da altura do símbolo.',
    },
    { word: 'Tom de voz', definition: 'A forma como a marca adapta sua expressão ao contexto.' },
    {
      word: 'Hierarquia',
      definition: 'Ordem visual que ajuda a entender o conteúdo e o próximo passo.',
    },
    {
      word: 'SVG',
      definition: 'Formato vetorial, adequado para redimensionar e editar elementos.',
    },
    { word: 'PNG', definition: 'Formato de imagem com suporte a transparência.' },
    { word: 'WEBP', definition: 'Formato de imagem usado no arquivo original do logotipo.' },
  ];
  constructor() {
    afterNextRender(() => {
      try {
        const v = JSON.parse(localStorage.getItem('evena-review') ?? '[]');
        if (Array.isArray(v))
          this.checked.set([
            ...new Set(
              v.filter(
                (n: unknown): n is number =>
                  typeof n === 'number' &&
                  Number.isInteger(n) &&
                  n >= 0 &&
                  n < this.checklist.length,
              ),
            ),
          ]);
      } catch {}
    });
  }
  toggle(i: number): void {
    this.checked.update((v) => (v.includes(i) ? v.filter((n) => n !== i) : [...v, i]));
    this.save();
  }
  reset(): void {
    this.checked.set([]);
    this.save();
  }
  private save(): void {
    try {
      localStorage.setItem('evena-review', JSON.stringify(this.checked()));
    } catch {}
  }
}
