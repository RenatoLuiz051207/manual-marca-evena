import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posicionamento-page',
  standalone: true,
  templateUrl: './posicionamento-page.html',
  styleUrl: './posicionamento-page.css',
})
export class PosicionamentoPage {
  activeCard = '';

  constructor(private router: Router) {}
  toggleCard(card: string): void {
    this.activeCard = this.activeCard === card ? '' : card;
  }

  goHome(): void { this.router.navigateByUrl('/'); }
  goLeft(): void { this.router.navigateByUrl('/arquétipo'); }
  goRight(): void { this.router.navigateByUrl('/propósito'); }
}
