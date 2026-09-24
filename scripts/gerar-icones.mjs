// Gera public/favicon.ico (16, 32 e 48 px) e public/apple-touch-icon.png (180 px)
// a partir de public/favicon.svg. Rode depois de mudar o SVG:
//
//   npm install --no-save @resvg/resvg-js
//   node scripts/gerar-icones.mjs
//
// O renderizador não fica no package.json porque só é usado quando o ícone muda.

import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

let Resvg;
try {
  ({ Resvg } = await import('@resvg/resvg-js'));
} catch {
  console.error('Instale o renderizador antes: npm install --no-save @resvg/resvg-js');
  process.exit(1);
}

const publico = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'public');
const svg = readFileSync(path.join(publico, 'favicon.svg'), 'utf8');

const png = (fonte, tamanho) =>
  new Resvg(fonte, { fitTo: { mode: 'width', value: tamanho } }).render().asPng();

// ICO com imagens PNG dentro (aceito por todos os navegadores atuais).
const tamanhos = [16, 32, 48];
const imagens = tamanhos.map((tamanho) => png(svg, tamanho));
const cabecalho = Buffer.alloc(6 + 16 * imagens.length);
cabecalho.writeUInt16LE(0, 0); // reservado
cabecalho.writeUInt16LE(1, 2); // tipo: ícone
cabecalho.writeUInt16LE(imagens.length, 4);
let deslocamento = cabecalho.length;
imagens.forEach((imagem, i) => {
  const entrada = 6 + 16 * i;
  cabecalho.writeUInt8(tamanhos[i], entrada); // largura
  cabecalho.writeUInt8(tamanhos[i], entrada + 1); // altura
  cabecalho.writeUInt16LE(1, entrada + 4); // planos
  cabecalho.writeUInt16LE(32, entrada + 6); // bits por pixel
  cabecalho.writeUInt32LE(imagem.length, entrada + 8);
  cabecalho.writeUInt32LE(deslocamento, entrada + 12);
  deslocamento += imagem.length;
});
writeFileSync(path.join(publico, 'favicon.ico'), Buffer.concat([cabecalho, ...imagens]));

// Atalho no celular: o sistema arredonda os cantos sozinho, então o fundo vai até a borda.
const semCantos = svg.replace(/(<rect[^>]*?)\srx="[^"]*"/, '$1');
writeFileSync(path.join(publico, 'apple-touch-icon.png'), png(semCantos, 180));

console.log('favicon.ico e apple-touch-icon.png gerados a partir de public/favicon.svg.');
