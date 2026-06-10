import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { VibePersonalidadePage } from './pages/vibe/personalidade/vibe-personalidade-page';
import { VibeEnergiaPage } from './pages/vibe/energia/vibe-energia-page';
import { VibeVozPage } from './pages/vibe/voz/vibe-voz-page';
import { VibePage } from './pages/vibe/vibe-page';
import { PropositoPage } from './pages/conceito/proposito/proposito-page';
import { ArquetipoPage } from './pages/conceito/arquetipo/arquetipo-page';
import { PosicionamentoPage } from './pages/conceito/posicionamento/posicionamento-page';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'vibe/personalidade', component: VibePersonalidadePage },
  { path: 'vibe/energia', component: VibeEnergiaPage },
  { path: 'vibe/voz', component: VibeVozPage },
  { path: 'vibe', component: VibePage },
  { path: 'propósito', component: PropositoPage },
  { path: 'proposito', redirectTo: 'propósito', pathMatch: 'full' },
  { path: 'arquétipo', component: ArquetipoPage },
  { path: 'arquetipo', redirectTo: 'arquétipo', pathMatch: 'full' },
  { path: 'posicionamento', component: PosicionamentoPage },
  { path: '**', redirectTo: '' },
];
