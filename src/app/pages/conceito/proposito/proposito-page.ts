import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proposito-page',
  standalone: true,
  templateUrl: './proposito-page.html',
  styleUrl: './proposito-page.css',
})
export class PropositoPage {
  activeCard = '';

  constructor(private router: Router) {}
  toggleCard(card: string): void {
    this.activeCard = this.activeCard === card ? '' : card;
  }

  goHome(): void { this.router.navigateByUrl('/'); }
  goLeft(): void { this.router.navigateByUrl('/posicionamento'); }
  goRight(): void { this.router.navigateByUrl('/arquétipo'); }
}
