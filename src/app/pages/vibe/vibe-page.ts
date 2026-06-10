import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vibe-landing-page',
  standalone: true,
  templateUrl: './vibe-page.html',
  styleUrl: './vibe-page.css',
})
export class VibePage {
  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigateByUrl('/');
  }

  open(route: string): void {
    this.router.navigateByUrl(route);
  }
}
