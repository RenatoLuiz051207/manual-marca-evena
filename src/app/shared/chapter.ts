import { ChangeDetectionStrategy, Component, computed, input, inject, viewChild, ElementRef, afterNextRender, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { chapters, ChapterId, groups } from './manual.data';
import { Icon } from './icon';
import { ManualNavigationState } from './manual-navigation-state';
@Component({
  selector: 'ev-chapter',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, Icon],
  templateUrl: './chapter.html',
  styleUrl: './chapter.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterFrame implements OnDestroy {
  private readonly navigationState = inject(ManualNavigationState);
  private readonly sidebar = viewChild<ElementRef<HTMLElement>>('sidebar');

  constructor() {
    afterNextRender(() => {
      const element = this.sidebar()?.nativeElement;
      if (element) element.scrollTop = this.navigationState.sidebarScrollTop;
    });
  }

  rememberSidebarScroll(): void {
    const element = this.sidebar()?.nativeElement;
    if (element && element.scrollHeight > element.clientHeight) {
      this.navigationState.sidebarScrollTop = element.scrollTop;
    }
  }

  ngOnDestroy(): void {
    this.rememberSidebarScroll();
  }

  readonly id = input.required<ChapterId>();
  readonly chapters = chapters;
  readonly groups = groups;
  readonly chapter = computed(() => chapters.find((c) => c.id === this.id()) ?? chapters[0]);
  readonly index = computed(() => chapters.findIndex((c) => c.id === this.id()));
  readonly previous = computed(() => chapters[this.index() - 1]);
  readonly next = computed(() => chapters[this.index() + 1]);
  groupItems(group: string) {
    return chapters.filter((c) => c.group === group);
  }
}
