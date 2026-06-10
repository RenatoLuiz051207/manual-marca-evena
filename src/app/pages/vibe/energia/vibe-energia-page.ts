import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vibe-energia-page',
  standalone: true,
  templateUrl: './vibe-energia-page.html',
  styleUrl: './vibe-energia-page.css',
})
export class VibeEnergiaPage {
  constructor(private router: Router) {}

  goHome(): void { this.router.navigateByUrl('/vibe'); }
  goLeft(): void { this.router.navigateByUrl('/vibe/voz'); }
  goRight(): void { this.router.navigateByUrl('/vibe/personalidade'); }
}
