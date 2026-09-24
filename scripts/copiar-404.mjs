// Copia index.html para 404.html no build de produção.
// O GitHub Pages serve o 404.html para rotas que ele não conhece (ex.: F5 em /ideias/<slug>);
// como é uma cópia do index.html, o Angular carrega e o roteador mostra a página certa.

import { copyFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pasta = path.join(raiz, 'dist', 'ideias-portfolio', 'browser');
const indice = path.join(pasta, 'index.html');

if (!existsSync(indice)) {
  console.error(`Não encontrei ${path.relative(raiz, indice)}. O build terminou?`);
  process.exit(1);
}

copyFileSync(indice, path.join(pasta, '404.html'));
console.log('404.html criado a partir do index.html.');
