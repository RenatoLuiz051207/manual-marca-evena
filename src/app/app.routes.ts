import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
const concept = () => import('./pages/concept/concept').then((m) => m.ConceptPage);
const expression = () => import('./pages/expression/expression').then((m) => m.ExpressionPage);
const identity = () => import('./pages/identity/identity').then((m) => m.IdentityPage);
const applications = () => import('./pages/applications/applications').then((m) => m.ApplicationsPage);
export const routes: Routes = [
  { path: '', component: Home, title: 'Evena — Viver é melhor ao vivo!' },
  {
    path: 'conceito',
    loadComponent: concept,
    data: { section: 'conceito' },
    title: 'Conceito — Evena',
  },
  {
    path: 'proposito',
    loadComponent: concept,
    data: { section: 'proposito' },
    title: 'Propósito — Evena',
  },
  { path: 'arquetipos', redirectTo: 'conceito', pathMatch: 'full' },
  {
    path: 'posicionamento',
    loadComponent: concept,
    data: { section: 'posicionamento' },
    title: 'Posicionamento — Evena',
  },
  { path: 'vibe', loadComponent: expression, data: { section: 'vibe' }, title: 'Vibe — Evena' },
  { path: 'vibe/voz', loadComponent: expression, data: { section: 'voz' }, title: 'Voz — Evena' },
  {
    path: 'vibe/energia',
    loadComponent: expression,
    data: { section: 'energia' },
    title: 'Energia — Evena',
  },
  {
    path: 'vibe/personalidade',
    loadComponent: expression,
    data: { section: 'personalidade' },
    title: 'Personalidade — Evena',
  },
  {
    path: 'estetica',
    loadComponent: identity,
    data: { section: 'estetica' },
    title: 'Estética — Evena',
  },
  {
    path: 'estetica/cores',
    loadComponent: identity,
    data: { section: 'cores' },
    title: 'Cores — Evena',
  },
  {
    path: 'estetica/tipografia',
    loadComponent: identity,
    data: { section: 'tipografia' },
    title: 'Tipografia — Evena',
  },
  {
    path: 'estetica/marca',
    loadComponent: identity,
    data: { section: 'marca' },
    title: 'Logo e logotipo — Evena',
  },
  {
    path: 'aplicacoes',
    loadComponent: applications,
    data: { section: 'aplicacoes' },
    title: 'Aplicações da identidade — Evena',
  },
  {
    path: 'recursos',
    loadComponent: () => import('./pages/resources/resources').then((m) => m.ResourcesPage),
    title: 'Kit da marca — Evena',
  },
  {
    path: 'leitura',
    loadComponent: () => import('./pages/resources/reading').then((m) => m.ReadingPage),
    title: 'Manual para levar — Evena',
  },
  { path: 'propósito', redirectTo: 'proposito', pathMatch: 'full' },
  { path: 'arquétipo', redirectTo: 'conceito', pathMatch: 'full' },
  { path: 'arquetipo', redirectTo: 'conceito', pathMatch: 'full' },
  { path: 'estética', redirectTo: 'estetica', pathMatch: 'full' },
  { path: 'conceito/proposito', redirectTo: 'proposito', pathMatch: 'full' },
  { path: 'conceito/arquetipos', redirectTo: 'conceito', pathMatch: 'full' },
  { path: 'conceito/posicionamento', redirectTo: 'posicionamento', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
