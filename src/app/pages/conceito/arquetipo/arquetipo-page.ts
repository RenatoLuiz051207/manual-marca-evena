import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-arquetipo-page',
  standalone: true,
  templateUrl: './arquetipo-page.html',
  styleUrl: './arquetipo-page.css',
})
export class ArquetipoPage {
  activeCard = '';

  constructor(private router: Router) {}
  toggleCard(card: string): void {
    this.activeCard = this.activeCard === card ? '' : card;
  }

  goHome(): void { this.router.navigateByUrl('/'); }
  goLeft(): void { this.router.navigateByUrl('/propósito'); }
  goRight(): void { this.router.navigateByUrl('/posicionamento'); }
}
