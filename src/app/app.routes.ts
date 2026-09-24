import { Routes } from '@angular/router';
import { NOME_DO_SITE } from './conteudo/tipos';
import { Layout } from './layout/layout';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        title: NOME_DO_SITE,
        loadComponent: () => import('./inicio/inicio').then((m) => m.Inicio),
      },
      {
        path: 'para-voce',
        title: `Para você · ${NOME_DO_SITE}`,
        loadComponent: () => import('./recado/recado').then((m) => m.Recado),
      },
      {
        // O título da aba é definido pela própria página, depois que o índice carrega.
        path: 'ideias/:slug',
        loadComponent: () => import('./ideia/ideia').then((m) => m.Ideia),
      },
      {
        path: '**',
        title: `Página não encontrada · ${NOME_DO_SITE}`,
        loadComponent: () =>
          import('./nao-encontrada/nao-encontrada').then((m) => m.NaoEncontrada),
      },
    ],
  },
];
