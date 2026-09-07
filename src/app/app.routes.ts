import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

const guide = () => import('./pages/guide/guide').then((module) => module.GuidePage);

export const routes: Routes = [
  { path: '', component: Home, title: 'Evena — Manual da marca' },
  {
    path: 'conceito',
    loadComponent: guide,
    data: { section: 'conceito' },
    title: 'Conceito — Evena',
  },
  {
    path: 'propósito',
    loadComponent: guide,
    data: { section: 'proposito' },
    title: 'Propósito — Evena',
  },
  { path: 'proposito', redirectTo: 'propósito', pathMatch: 'full' },
  { path: 'arquétipo', redirectTo: 'conceito', pathMatch: 'full' },
  { path: 'arquetipo', redirectTo: 'conceito', pathMatch: 'full' },
  { path: 'arquetipos', redirectTo: 'conceito', pathMatch: 'full' },
  {
    path: 'posicionamento',
    loadComponent: guide,
    data: { section: 'posicionamento' },
    title: 'Posicionamento — Evena',
  },
  { path: 'vibe/voz', redirectTo: 'vibe', pathMatch: 'full' },
  { path: 'vibe/energia', redirectTo: 'vibe', pathMatch: 'full' },
  { path: 'vibe/personalidade', redirectTo: 'vibe', pathMatch: 'full' },
  { path: 'vibe', loadComponent: guide, data: { section: 'vibe' }, title: 'Vibe — Evena' },
  {
    path: 'estetica',
    loadComponent: guide,
    data: { section: 'estetica' },
    title: 'Estética — Evena',
  },
  { path: 'estética', redirectTo: 'estetica', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
