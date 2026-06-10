import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  progress = 0.5;

  private stage = 1;
  private readonly maxStage = 2;
  private isStageAnimating = false;
  private touchStartY = 0;
  private removeListeners: Array<() => void> = [];
  private crownRaf = 0;
  private crownProgress = 0;
  private crownTarget = 0;
  private crownLastTime = 0;
  conceptOpen = false;
  conceptMorphed = false;
  selectedConceptPart: 'proposito' | 'arquetipos' | 'posicionamento' | '' = '';
  private conceptMorphTimer = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.margin = '0';
    this.progress = 0.5;
  }

  ngAfterViewInit(): void {
    requestAnimationFrame(() => {
      this.setupCardHoverClasses();
      this.setupConceptCrownAnimation();
      this.setupAestheticSunMoonAnimation();
    });
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    this.removeListeners.forEach((remove) => remove());
    this.removeListeners = [];

    if (this.crownRaf) {
      cancelAnimationFrame(this.crownRaf);
      this.crownRaf = 0;
    }

    if (this.conceptMorphTimer) {
      window.clearTimeout(this.conceptMorphTimer);
      this.conceptMorphTimer = 0;
    }
  }

  @HostListener('window:wheel', ['$event'])
  onWheel(event: WheelEvent): void {
    event.preventDefault();
    if (this.isStageAnimating || Math.abs(event.deltaY) < 8) return;
    this.goToStage(event.deltaY > 0 ? this.stage + 1 : this.stage - 1);
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (['ArrowDown', 'PageDown', ' '].includes(event.key)) {
      event.preventDefault();
      this.goToStage(this.stage + 1);
    }

    if (['ArrowUp', 'PageUp'].includes(event.key)) {
      event.preventDefault();
      this.goToStage(this.stage - 1);
    }
  }

  @HostListener('window:touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.touchStartY = event.touches[0]?.clientY ?? 0;
  }

  @HostListener('window:touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    const y = event.changedTouches[0]?.clientY ?? this.touchStartY;
    const delta = this.touchStartY - y;
    if (Math.abs(delta) < 35 || this.isStageAnimating) return;
    this.goToStage(delta > 0 ? this.stage + 1 : this.stage - 1);
  }
  openConcept(event?: Event): void {
    event?.preventDefault();
    event?.stopPropagation();

    if (this.conceptMorphTimer) {
      window.clearTimeout(this.conceptMorphTimer);
      this.conceptMorphTimer = 0;
    }

    this.conceptOpen = true;
    this.conceptMorphed = false;
    this.selectedConceptPart = '';

    this.conceptMorphTimer = window.setTimeout(() => {
      this.conceptMorphed = true;
      this.conceptMorphTimer = 0;
    }, 1450);
  }

  closeConcept(event?: Event): void {
    event?.preventDefault();
    event?.stopPropagation();

    if (this.conceptMorphTimer) {
      window.clearTimeout(this.conceptMorphTimer);
      this.conceptMorphTimer = 0;
    }

    this.conceptMorphed = false;
    this.conceptOpen = false;
    this.selectedConceptPart = '';
  }

  selectConceptPart(part: 'proposito' | 'arquetipos' | 'posicionamento', event?: Event): void {
    event?.preventDefault();
    event?.stopPropagation();

    const routes = {
      proposito: '/propósito',
      arquetipos: '/arquétipo',
      posicionamento: '/posicionamento',
    } as const;

    this.router.navigateByUrl(routes[part]);
  }

  openVibe(event?: Event): void {
    event?.preventDefault();
    event?.stopPropagation();

    this.router.navigateByUrl('/vibe');
  }

  goToMain(event?: Event): void {
    event?.preventDefault();
    event?.stopPropagation();

    this.goToStage(this.maxStage);
  }

  private goToStage(nextStage: number): void {
    const clampedStage = Math.max(1, Math.min(this.maxStage, nextStage));
    if (clampedStage === this.stage) return;

    this.stage = clampedStage;
    this.animatePageProgressTo(this.stage / this.maxStage);
  }

  private animatePageProgressTo(target: number): void {
    const start = this.progress;
    const change = target - start;
    const duration = 880;
    const startTime = performance.now();
    this.isStageAnimating = true;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const eased = this.easeInOutCubic(t);
      this.progress = start + change * eased;

      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        this.progress = target;
        window.setTimeout(() => {
          this.isStageAnimating = false;
        }, 80);
      }
    };

    requestAnimationFrame(tick);
  }

  private easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  private setupCardHoverClasses(): void {
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.card'));

    cards.forEach((card) => {
      let leaveTimer = 0;

      const clearLeaveTimer = () => {
        if (leaveTimer) {
          window.clearTimeout(leaveTimer);
          leaveTimer = 0;
        }
      };

      const enter = () => {
        clearLeaveTimer();
        card.classList.remove('is-leaving');
        card.classList.add('is-hovering');
      };

      const leave = () => {
        clearLeaveTimer();
        card.classList.remove('is-hovering');
        card.classList.add('is-leaving');

        leaveTimer = window.setTimeout(() => {
          card.classList.remove('is-leaving');
          leaveTimer = 0;
        }, 980);
      };

      card.addEventListener('mouseenter', enter);
      card.addEventListener('mouseleave', leave);

      this.removeListeners.push(() => {
        clearLeaveTimer();
        card.removeEventListener('mouseenter', enter);
        card.removeEventListener('mouseleave', leave);
      });
    });
  }

  private setupConceptCrownAnimation(): void {
    const card = document.querySelector<HTMLElement>('.concept-card');
    const lines = Array.from(document.querySelectorAll<SVGPathElement>('.evena-crown-line'));
    const dots = Array.from(document.querySelectorAll<SVGCircleElement>('.evena-crown-dots circle'));

    if (!card || !lines.length) return;

    const lineLengths = lines.map((line) => line.getTotalLength());
    const totalLength = lineLengths.reduce((sum, length) => sum + length, 0);
    const drawDuration = 1250;
    const eraseDuration = 980;

    this.crownProgress = 0;
    this.crownTarget = 0;

    const setDots = (active: boolean) => {
      dots.forEach((dot) => {
        dot.style.setProperty('fill', active ? '#000000' : '#ffffff', 'important');
        dot.style.setProperty('stroke', active ? '#000000' : 'transparent', 'important');
        dot.style.setProperty('transform', active ? 'scale(1.08)' : 'scale(1)', 'important');
      });
    };

    const render = () => {
      const progress = Math.max(0, Math.min(1, this.crownProgress));
      let visibleLength = totalLength * progress;

      lines.forEach((line, index) => {
        const length = lineLengths[index];
        const shown = Math.max(0, Math.min(length, visibleLength));
        const offset = length - shown;

        line.style.setProperty('fill', 'none', 'important');
        line.style.setProperty('stroke', '#000000', 'important');
        line.style.setProperty('stroke-width', '3.35', 'important');
        line.style.setProperty('stroke-linecap', 'round', 'important');
        line.style.setProperty('stroke-linejoin', 'round', 'important');
        line.style.setProperty('stroke-dasharray', `${length} ${length}`, 'important');
        line.style.setProperty('stroke-dashoffset', `${offset}`, 'important');
        line.style.setProperty('opacity', shown <= 0.001 ? '0' : '1', 'important');

        visibleLength -= length;
      });

      setDots(progress > 0.001);
    };

    const stopCrownLoop = () => {
      if (this.crownRaf) {
        cancelAnimationFrame(this.crownRaf);
        this.crownRaf = 0;
      }
      this.crownLastTime = 0;
    };

    const tick = (time: number) => {
      if (!this.crownLastTime) this.crownLastTime = time;
      const deltaMs = Math.min(40, time - this.crownLastTime);
      this.crownLastTime = time;

      const forward = this.crownTarget > this.crownProgress;
      const duration = forward ? drawDuration : eraseDuration;
      const step = deltaMs / duration;

      this.crownProgress = forward
        ? Math.min(this.crownTarget, this.crownProgress + step)
        : Math.max(this.crownTarget, this.crownProgress - step);

      render();

      if (Math.abs(this.crownProgress - this.crownTarget) > 0.001) {
        this.crownRaf = requestAnimationFrame(tick);
      } else {
        this.crownProgress = this.crownTarget;
        render();
        stopCrownLoop();
      }
    };

    const animateTo = (target: number) => {
      this.crownTarget = target;
      if (!this.crownRaf) {
        this.crownRaf = requestAnimationFrame(tick);
      }
    };

    render();

    const enter = () => animateTo(1);
    const leave = () => animateTo(0);

    card.addEventListener('mouseenter', enter);
    card.addEventListener('mouseleave', leave);

    this.removeListeners.push(() => card.removeEventListener('mouseenter', enter));
    this.removeListeners.push(() => card.removeEventListener('mouseleave', leave));
  }

  private setupAestheticSunMoonAnimation(): void {
    const card = document.querySelector<HTMLElement>('.aesthetic-card');
    const sun = document.querySelector<SVGElement>('.aesthetic-card .sun');
    const moon = document.querySelector<SVGElement>('.aesthetic-card .moon');

    if (!card || !sun || !moon) return;

    card.classList.add('aesthetic-js-ready');

    let raf = 0;
    let lastTime = 0;

    let sunX = 0;
    let moonX = -340;

    let targetSunX = 0;
    let targetMoonX = -340;

    let sunScale = 1;
    let moonScale = 1;

    let targetSunScale = 1;
    let targetMoonScale = 1;

    const apply = () => {
      sun.style.setProperty('opacity', '1', 'important');
      moon.style.setProperty('opacity', '1', 'important');

      sun.style.setProperty('transform', `translateX(${sunX}px) scale(${sunScale}) rotate(0deg)`, 'important');
      moon.style.setProperty('transform', `translateX(${moonX}px) scale(${moonScale}) rotate(0deg)`, 'important');

      // Cores fixas pedidas: sol verde e lua roxa.
      sun.style.setProperty('fill', '#00ff00', 'important');
      moon.style.setProperty('fill', '#000000', 'important');
    };

    const stop = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }

      lastTime = 0;
    };

    const tick = (time: number) => {
      if (!lastTime) lastTime = time;

      const delta = Math.min(40, time - lastTime);
      lastTime = time;

      const speed = delta / 700;
      const ease = 1 - Math.pow(1 - Math.min(1, speed), 3);
      const amount = Math.max(.09, ease);

      sunX += (targetSunX - sunX) * amount;
      moonX += (targetMoonX - moonX) * amount;
      sunScale += (targetSunScale - sunScale) * amount;
      moonScale += (targetMoonScale - moonScale) * amount;

      const done =
        Math.abs(targetSunX - sunX) < .8 &&
        Math.abs(targetMoonX - moonX) < .8 &&
        Math.abs(targetSunScale - sunScale) < .01 &&
        Math.abs(targetMoonScale - moonScale) < .01;

      if (done) {
        sunX = targetSunX;
        moonX = targetMoonX;
        sunScale = targetSunScale;
        moonScale = targetMoonScale;
        apply();

        // Deixa a lua escondida pela esquerda depois de sair pela direita,
        // pronta para entrar sempre pela esquerda no próximo hover.
        if (targetSunX === 0 && targetMoonX > 250) {
          moonX = -340;
          targetMoonX = -340;
          moonScale = 1;
          targetMoonScale = 1;
          apply();
        }

        stop();
        return;
      }

      apply();
      raf = requestAnimationFrame(tick);
    };

    const animate = () => {
      if (!raf) {
        raf = requestAnimationFrame(tick);
      }
    };

    const enter = () => {
      // Evita bug quando tira e coloca o mouse rápido:
      // a lua sempre recomeça escondida pela esquerda se ainda não chegou no centro.
      if (moonX > -40 || targetMoonX > -40) {
        moonX = -340;
        targetMoonX = -340;
        moonScale = .92;
        targetMoonScale = .92;
      }

      targetSunX = 340;
      targetMoonX = -18;
      targetSunScale = .92;
      targetMoonScale = 1;

      apply();
      animate();
    };

    const leave = () => {
      // Evita teleporte/bug visual quando sai no meio da animação:
      // se o sol ainda está visível ou indo para a direita, ele volta escondido pela esquerda.
      if (sunX > -40 || targetSunX > 0) {
        sunX = -340;
        sunScale = .92;
      }

      // Se a lua quase não apareceu, não deixa ela cruzar o card inteiro do nada.
      if (moonX < -170) {
        moonX = 340;
        moonScale = .92;
      }

      targetSunX = 0;
      targetMoonX = 340;
      targetSunScale = 1;
      targetMoonScale = .92;

      apply();
      animate();
    };

    apply();

    card.addEventListener('mouseenter', enter);
    card.addEventListener('mouseleave', leave);

    this.removeListeners.push(() => {
      card.removeEventListener('mouseenter', enter);
      card.removeEventListener('mouseleave', leave);

      if (raf) {
        cancelAnimationFrame(raf);
      }
    });
  }
}

export { Home as HomeComponent };
