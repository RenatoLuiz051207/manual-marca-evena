import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type IconName =
  | 'arrow'
  | 'back'
  | 'down'
  | 'search'
  | 'close'
  | 'menu'
  | 'check'
  | 'copy'
  | 'sun'
  | 'play'
  | 'pause'
  | 'crown'
  | 'community'
  | 'book'
  | 'microphone'
  | 'compass'
  | 'spark'
  | 'waves'
  | 'grid'
  | 'heart'
  | 'ticket'
  | 'download'
  | 'external'
  | 'type'
  | 'palette'
  | 'link'
  | 'reset';
const paths: Record<IconName, string> = {
  arrow: 'M5 12h14m-6-6 6 6-6 6',
  back: 'M19 12H5m6-6-6 6 6 6',
  down: 'M6 9l6 6 6-6',
  search: 'M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
  close: 'M6 6l12 12M6 18 18 6',
  menu: 'M4 6h16M4 12h16M4 18h16',
  check: 'M5 12l4 4L19 6',
  copy: 'M9 9h12v12H9zM15 5V3H3v12h2',
  sun: 'M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  play: 'M8 5l12 7-12 7z',
  pause: 'M8 5v14M16 5v14',
  crown: 'M3 8l5 3 4-7 4 7 5-3-2 13H5zM5 17h14',
  microphone: 'M9 5a3 3 0 0 1 6 0v7a3 3 0 0 1-6 0zM5 10v2a7 7 0 0 0 14 0v-2M12 19v3M8 22h8',
  compass: 'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0M16 8l-3 5-5 3 3-5z',
  spark: 'M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z',
  waves: 'M4 9v6M8 5v14M12 2v20M16 6v12M20 9v6',
  grid: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
  heart:
    'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z',
  ticket: 'M3 5h18v5a2 2 0 0 0 0 4v5H3v-5a2 2 0 0 0 0-4zM15 5v3M15 11v2M15 16v3',
  download: 'M12 3v12M6 9l6 6 6-6M4 17v4h16v-4',
  external: 'M14 3h7v7M21 3l-9 9M10 3H3v18h18v-7',
  type: 'M2 19 7 5l5 14M4 14h6M21 19v-8M21 14a4 4 0 1 0 0 2',
  book: 'M12 5v16M12 5C8 2 4 3 2 4v15c4-2 7-1 10 2 3-3 6-4 10-2V4c-2-1-6-2-10 1',
  community: 'M12 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4M6 5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M18 5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9 13v-3a3 3 0 0 1 6 0v3M3 12v-1a3 3 0 0 1 6-1M21 12v-1a3 3 0 0 0-6-1M2 15l5 3 5-1 5 1 5-3M2 15v4l5 3h10l5-3v-4M7 18l5 2 5-2',
  palette:
    'M12 2a10 10 0 1 0 0 20h1a2 2 0 0 0 0-4h-1a2 2 0 0 1 0-4h5a5 5 0 0 0 5-5c0-4-5-7-10-7M7 7h.01M12 5h.01M17 8h.01M5 12h.01',
  link: 'M10 13a5 5 0 0 0 7 .1l3-3a5 5 0 0 0-7-7l-2 2M14 11a5 5 0 0 0-7-.1l-3 3a5 5 0 0 0 7 7l2-2',
  reset: 'M3 10a9 9 0 1 1 2 8M3 3v7h7',
};
@Component({
  selector: 'ev-icon',
  standalone: true,
  template:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path [attr.d]="path()" /></svg>',
  styles: [
    ':host{display:inline-flex;width:1.2em;height:1.2em;flex-shrink:0;vertical-align:middle}svg{width:100%;height:100%}',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Icon {
  readonly name = input<IconName>('arrow');
  path(): string {
    return paths[this.name()];
  }
}
