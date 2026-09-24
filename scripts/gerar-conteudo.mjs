// Valida conteudo/ e gera public/conteudo/ (índice + corpos finais das ideias).
// Uso: node scripts/gerar-conteudo.mjs [--com-rascunhos] [--watch]

import { watch } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { gerarConteudo } from './lib/conteudo.mjs';

const argumentos = process.argv.slice(2);
const comRascunhos = argumentos.includes('--com-rascunhos');
const observar = argumentos.includes('--watch');
const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

async function gerar() {
  const { erros, indice } = await gerarConteudo({ raiz, comRascunhos });
  if (erros.length) {
    const problemas = erros.length === 1 ? '1 problema' : `${erros.length} problemas`;
    console.error(`\nConteúdo inválido (${problemas}):`);
    for (const erro of erros) console.error(`  - ${erro}`);
    console.error('\nRegras em conteudo.md, seção "O que o script valida".\n');
    return false;
  }
  const rascunhos = indice.ideias.filter((ideia) => ideia.status === 'rascunho').length;
  const detalhe = comRascunhos ? ` (${rascunhos} em rascunho)` : ' (só publicadas)';
  console.log(
    `Conteúdo gerado: ${indice.ideias.length} ideia(s) em ${indice.blocos.length} bloco(s)${detalhe}.`,
  );
  return true;
}

const ok = await gerar();

if (!observar) {
  process.exitCode = ok ? 0 : 1;
} else {
  console.log('Observando conteudo/ (Ctrl+C para sair)...');
  let agendado;
  watch(path.join(raiz, 'conteudo'), { recursive: true }, () => {
    clearTimeout(agendado);
    agendado = setTimeout(() => gerar().catch((erro) => console.error(erro)), 150);
  });
}
