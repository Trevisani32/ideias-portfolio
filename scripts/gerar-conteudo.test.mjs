import assert from 'node:assert/strict';
import { cp, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { after, describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  CAMPOS_DA_IDEIA,
  LIMITE_RESUMO,
  gerarConteudo,
  lerConteudo,
  limparTexto,
  processarConteudo,
} from './lib/conteudo.mjs';

const aqui = path.dirname(fileURLToPath(import.meta.url));
const FIXTURE = path.join(aqui, 'fixtures', 'valido');
const RAIZ_DO_PROJETO = path.resolve(aqui, '..');

const base = await lerConteudo(FIXTURE);
const textoDe = (arquivo) => base.ideias.find((ideia) => ideia.arquivo === arquivo).texto;

/** Troca, acrescenta ou remove (null) itens de uma lista de { arquivo, texto }. */
function comTrocas(lista, trocas) {
  const mapa = new Map(lista.map((item) => [item.arquivo, item.texto]));
  for (const [arquivo, texto] of Object.entries(trocas)) {
    if (texto === null) mapa.delete(arquivo);
    else mapa.set(arquivo, texto);
  }
  return [...mapa].map(([arquivo, texto]) => ({ arquivo, texto }));
}

/** Processa a fixture trocando ideias, blocos, trechos ou páginas. */
function processar({ ideias = {}, blocos = {}, trechos = {}, paginas = {}, comRascunhos = true } = {}) {
  const mapaDeTrechos = new Map(base.trechos);
  for (const [nome, texto] of Object.entries(trechos)) {
    if (texto === null) mapaDeTrechos.delete(nome);
    else mapaDeTrechos.set(nome, texto);
  }
  return processarConteudo({
    ideias: comTrocas(base.ideias, ideias),
    blocos: comTrocas(base.blocos, blocos),
    trechos: mapaDeTrechos,
    paginas: { ...base.paginas, ...paginas },
    comRascunhos,
  });
}

/** Troca um trecho da ideia alfa e devolve os erros. */
function errosDaAlfaCom(de, para) {
  const original = textoDe('alfa.md');
  assert.ok(original.includes(de), `trecho não encontrado na fixture: ${de}`);
  return processar({ ideias: { 'alfa.md': original.replace(de, para) } }).erros;
}

function esperaErro(erros, trecho) {
  assert.ok(
    erros.some((erro) => erro.includes(trecho)),
    `esperava um erro contendo "${trecho}", mas veio:\n${erros.join('\n') || '(nenhum erro)'}`,
  );
}

describe('conteúdo válido', () => {
  test('gera o índice por bloco e ordem, com rascunhos', () => {
    const { erros, indice } = processar();
    assert.deepEqual(erros, []);
    assert.deepEqual(
      indice.ideias.map((ideia) => ideia.slug),
      ['beta', 'alfa', 'gama'],
    );
    assert.deepEqual(indice.blocos, [
      { id: 'bloco-a', titulo: 'Bloco A', descricao: 'Descrição do bloco A.' },
      { id: 'bloco-b', titulo: 'Bloco B', descricao: 'Descrição do bloco B.' },
    ]);
    assert.deepEqual(Object.keys(indice.ideias[0]), CAMPOS_DA_IDEIA);
    assert.equal(indice.ideias[0].icone, '☕');
  });

  test('sem rascunhos, só entram as publicadas', () => {
    const { erros, indice, corpos } = processar({ comRascunhos: false });
    assert.deepEqual(erros, []);
    assert.deepEqual(
      indice.ideias.map((ideia) => ideia.slug),
      ['alfa', 'gama'],
    );
    assert.equal(corpos.has('beta'), false);
  });

  test('bloco sem ideia publicada não entra no índice', () => {
    const { erros, indice } = processar({
      comRascunhos: false,
      ideias: { 'gama.md': textoDe('gama.md').replace('status: publicada', 'status: rascunho') },
    });
    assert.deepEqual(erros, []);
    assert.deepEqual(
      indice.blocos.map((bloco) => bloco.id),
      ['bloco-a'],
    );
  });

  test('só rascunhos no build de produção gera índice vazio, sem erro', () => {
    const rascunho = (texto) => texto.replace('status: publicada', 'status: rascunho');
    const { erros, indice } = processar({
      comRascunhos: false,
      ideias: { 'alfa.md': rascunho(textoDe('alfa.md')), 'gama.md': rascunho(textoDe('gama.md')) },
    });
    assert.deepEqual(erros, []);
    assert.deepEqual(indice, { blocos: [], ideias: [] });
  });

  test('sem nenhuma ideia, o índice fica vazio', () => {
    const { erros, indice } = processar({
      ideias: { 'alfa.md': null, 'beta.md': null, 'gama.md': null },
    });
    assert.deepEqual(erros, []);
    assert.deepEqual(indice, { blocos: [], ideias: [] });
  });

  test('inclui os trechos e substitui as variáveis, inclusive dentro de código', () => {
    const corpo = processar().corpos.get('alfa');
    assert.match(corpo, /Converse com a IA professora sobre Alfa\./);
    assert.match(corpo, /Pense na stack de Alfa\.\n\nStack específica\./);
    assert.match(corpo, /github\.com\/seu-usuario\/alfa\.git/);
    assert.match(corpo, /Texto sobre Alfa\./);
    assert.doesNotMatch(corpo, /\{\{/);
  });

  test('numera etapas e partes do Passo a passo', () => {
    const corpo = processar().corpos.get('alfa');
    assert.deepEqual(corpo.match(/^### Etapa \d+ — .+$/gm), [
      '### Etapa 1 — Escolher a stack',
      '### Etapa 2 — Documentar o projeto',
      '### Etapa 3 — Criar o repositório',
      '### Etapa 4 — Dividir em partes',
      '### Etapa 5 — Parte 1: Primeira parte',
      '### Etapa 6 — Parte 2: Segunda parte',
      '### Etapa 7 — Revisar e testar',
      '### Etapa 8 — Escrever o README',
      '### Etapa 9 — Publicar no GitHub Pages',
    ]);
    assert.match(corpo, /^### Etapa — isto não é etapa$/m, 'o conteúdo de código não é numerado');
  });

  test('remove comentários, mas preserva os que estão dentro de código', () => {
    const corpo = processar().corpos.get('alfa');
    assert.doesNotMatch(corpo, /Instrução para quem escreve/);
    assert.doesNotMatch(corpo, /trecho:/);
    assert.match(corpo, /<!-- comentário dentro de código fica -->/);
    assert.doesNotMatch(corpo, /\n{3,}/);
    assert.ok(corpo.startsWith('## Sobre o projeto'));
  });

  test('CRLF e BOM produzem o mesmo resultado que LF', () => {
    const crlf = `﻿${textoDe('alfa.md').replace(/\n/g, '\r\n')}`;
    const { erros, corpos } = processar({ ideias: { 'alfa.md': crlf } });
    assert.deepEqual(erros, []);
    assert.equal(corpos.get('alfa'), processar().corpos.get('alfa'));
  });

  test('monta as páginas Início e Recado', () => {
    const { paginas } = processar();
    assert.deepEqual(paginas.inicio, {
      titulo: 'Início de teste',
      subtitulo: 'Subtítulo de teste.',
      corpo: 'Texto da página inicial.\n',
    });
    assert.deepEqual(paginas.recado, { titulo: 'Recado de teste', corpo: 'Um recado.\n' });
  });

  test('ignora arquivos que começam com "_"', () => {
    assert.equal(
      base.ideias.some((ideia) => ideia.arquivo.startsWith('_')),
      false,
    );
  });

  test('o modelo conteudo/_modelo.md passa na validação com o conteúdo do projeto', async () => {
    const modelo = await readFile(path.join(RAIZ_DO_PROJETO, 'conteudo', '_modelo.md'), 'utf8');
    const { trechos, blocos } = await lerConteudo(RAIZ_DO_PROJETO);
    const { erros } = processarConteudo({
      ideias: [{ arquivo: 'nome-da-ideia.md', texto: modelo }],
      trechos,
      blocos,
      comRascunhos: true,
    });
    assert.deepEqual(erros, []);
  });

  test('o conteúdo do projeto é válido', async () => {
    const { erros } = processarConteudo({ ...(await lerConteudo(RAIZ_DO_PROJETO)), comRascunhos: true });
    assert.deepEqual(erros, []);
  });
});

describe('frontmatter da ideia', () => {
  test('ausente', () => {
    esperaErro(processar({ ideias: { 'alfa.md': '## Sobre o projeto\n' } }).erros, 'frontmatter ausente');
  });

  test('sem fechamento', () => {
    esperaErro(
      processar({ ideias: { 'alfa.md': '---\ntitulo: Alfa\n\n## Sobre o projeto\n' } }).erros,
      'frontmatter sem fechamento',
    );
  });

  test('YAML malformado', () => {
    esperaErro(errosDaAlfaCom('titulo: Alfa', 'titulo: Alfa: com dois-pontos'), 'frontmatter inválido');
  });

  test('campo desconhecido (inclusive o antigo tempoEstimado)', () => {
    esperaErro(errosDaAlfaCom('titulo: Alfa', 'titulo: Alfa\ntempoEstimado: 1 hora'), 'campo desconhecido no frontmatter: "tempoEstimado"');
  });

  test('campo obrigatório ausente', () => {
    esperaErro(errosDaAlfaCom('resumo: Ideia de teste alfa.\n', ''), '"resumo" é obrigatório');
  });

  test('slug diferente do nome do arquivo', () => {
    esperaErro(errosDaAlfaCom('slug: alfa', 'slug: outro'), 'deve ser igual ao nome do arquivo');
  });

  test('slug com caracteres inválidos', () => {
    esperaErro(errosDaAlfaCom('slug: alfa', 'slug: Alfa_1'), 'só letras minúsculas');
  });

  test('bloco inexistente', () => {
    esperaErro(errosDaAlfaCom('bloco: bloco-a', 'bloco: bloco-z'), 'bloco inexistente "bloco-z"');
  });

  test('nível fora de 1 a 3', () => {
    esperaErro(errosDaAlfaCom('nivel: 1', 'nivel: 4'), '"nivel" deve ser 1, 2 ou 3');
    esperaErro(errosDaAlfaCom('nivel: 1', 'nivel: "1"'), '"nivel" deve ser 1, 2 ou 3');
  });

  test('ícone ausente ou longo demais', () => {
    esperaErro(errosDaAlfaCom('icone: "☕"\n', ''), '"icone" é obrigatório');
    esperaErro(errosDaAlfaCom('icone: "☕"', 'icone: "um texto longo"'), '"icone" deve ser um emoji só');
  });

  test('ordem inválida', () => {
    esperaErro(errosDaAlfaCom('ordem: 2', 'ordem: 1.5'), '"ordem" deve ser um número inteiro');
  });

  test('ordem repetida no mesmo bloco', () => {
    const erros = errosDaAlfaCom('ordem: 2', 'ordem: 1');
    esperaErro(erros, 'conteudo/ideias/alfa.md: "ordem" 1 repetida no bloco "bloco-a" (também em conteudo/ideias/beta.md)');
    esperaErro(erros, 'conteudo/ideias/beta.md: "ordem" 1 repetida no bloco "bloco-a" (também em conteudo/ideias/alfa.md)');
  });

  test('a mesma ordem em blocos diferentes é permitida', () => {
    assert.equal(textoDe('gama.md').includes('ordem: 1'), true);
    assert.equal(textoDe('beta.md').includes('ordem: 1'), true);
    assert.deepEqual(processar().erros, []);
  });

  test('resumo longo demais', () => {
    const longo = 'a'.repeat(LIMITE_RESUMO + 1);
    esperaErro(errosDaAlfaCom('resumo: Ideia de teste alfa.', `resumo: ${longo}`), '"resumo" tem 161 caracteres');
  });

  test('treina fora de 3 a 6 itens', () => {
    esperaErro(errosDaAlfaCom('treina: [Um, Dois, Três]', 'treina: [Um, Dois]'), '"treina" deve ter de 3 a 6 itens');
  });

  test('tecnologias que não são lista', () => {
    esperaErro(errosDaAlfaCom('tecnologias: [HTML, CSS]', 'tecnologias: HTML'), '"tecnologias" deve ser uma lista');
  });

  test('status inválido', () => {
    esperaErro(errosDaAlfaCom('status: publicada', 'status: pronta'), '"status" deve ser');
  });
});

describe('blocos (grupos de ideias)', () => {
  test('sem título', () => {
    esperaErro(
      processar({ blocos: { 'bloco-b.md': '---\nordem: 2\n---\n\nDescrição.\n' } }).erros,
      'conteudo/blocos/bloco-b.md: "titulo" é obrigatório',
    );
  });

  test('ordem repetida entre blocos', () => {
    esperaErro(
      processar({ blocos: { 'bloco-b.md': '---\ntitulo: B\nordem: 1\n---\n\nDescrição.\n' } }).erros,
      '"ordem" 1 repetida entre blocos',
    );
  });

  test('sem descrição', () => {
    esperaErro(
      processar({ blocos: { 'bloco-b.md': '---\ntitulo: B\nordem: 2\n---\n' } }).erros,
      'escreva uma descrição curta do bloco',
    );
  });

  test('pasta de blocos vazia', () => {
    esperaErro(
      processar({ blocos: { 'bloco-a.md': null, 'bloco-b.md': null } }).erros,
      'crie pelo menos um bloco',
    );
  });
});

describe('páginas', () => {
  test('início sem subtítulo', () => {
    esperaErro(
      processar({ paginas: { inicio: '---\ntitulo: Oi\n---\n\nTexto.\n' } }).erros,
      'conteudo/inicio.md: "subtitulo" é obrigatório',
    );
  });

  test('recado ausente', () => {
    esperaErro(processar({ paginas: { recado: null } }).erros, 'conteudo/recado.md: arquivo não existe');
  });

  test('recado sem texto', () => {
    esperaErro(
      processar({ paginas: { recado: '---\ntitulo: Oi\n---\n\n<!-- só comentário -->\n' } }).erros,
      'conteudo/recado.md: escreva o texto da página',
    );
  });
});

describe('seções', () => {
  test('seção ausente', () => {
    esperaErro(errosDaAlfaCom('## Para ir além\n\n- Mais.\n', ''), 'falta a seção "## Para ir além"');
  });

  test('seção antiga não é mais permitida', () => {
    esperaErro(
      errosDaAlfaCom('## Passo a passo', '## Como usar a IA neste projeto\n\n## Passo a passo'),
      'seção não permitida "## Como usar a IA neste projeto"',
    );
  });

  test('seção repetida', () => {
    esperaErro(
      errosDaAlfaCom('## Para ir além\n\n- Mais.', '## Para ir além\n\n- Mais.\n\n## Para ir além'),
      'aparece mais de uma vez',
    );
  });

  test('seções fora de ordem', () => {
    const trocado = textoDe('alfa.md')
      .replace('## Sobre o projeto', '## TEMP')
      .replace('## O que você vai aprender', '## Sobre o projeto')
      .replace('## TEMP', '## O que você vai aprender');
    esperaErro(processar({ ideias: { 'alfa.md': trocado } }).erros, 'seções fora de ordem');
  });

  test('texto antes da primeira seção', () => {
    esperaErro(
      errosDaAlfaCom('## Sobre o projeto', 'Texto solto.\n\n## Sobre o projeto'),
      'há texto antes de "## Sobre o projeto"',
    );
  });

  test('Requisitos sem as subseções', () => {
    esperaErro(errosDaAlfaCom('### Desafios extras', '### Outros'), 'falta "### Desafios extras"');
  });

  test('bloco de código sem fechamento', () => {
    esperaErro(errosDaAlfaCom('- Mais.', '- Mais.\n\n```js\nconst x = 1;'), 'bloco de código sem fechamento');
  });

  test('comentário HTML sem fechamento', () => {
    esperaErro(errosDaAlfaCom('- Mais.', '- Mais.\n\n<!-- sem fim'), 'comentário HTML sem fechamento');
  });
});

describe('trechos', () => {
  test('trecho inexistente', () => {
    esperaErro(
      errosDaAlfaCom('## Para ir além\n', '## Para ir além\n\n<!-- trecho: nao-existe -->\n'),
      'trecho inexistente "nao-existe"',
    );
  });

  test('trecho obrigatório ausente', () => {
    esperaErro(errosDaAlfaCom('<!-- trecho: checklist-entrega -->', ''), 'falta o trecho obrigatório "checklist-entrega"');
  });

  test('trecho obrigatório repetido', () => {
    esperaErro(
      errosDaAlfaCom('<!-- trecho: ia-professora -->', '<!-- trecho: ia-professora -->\n\n<!-- trecho: ia-professora -->'),
      'aparece 2 vezes',
    );
  });

  test('trecho obrigatório na seção errada', () => {
    esperaErro(
      errosDaAlfaCom('<!-- trecho: checklist-entrega -->\n', '\n## Para ir além\n'),
      'falta o trecho obrigatório "checklist-entrega"',
    );
    const trocado = textoDe('alfa.md')
      .replace('<!-- trecho: ia-professora -->', '')
      .replace('- Mais.', '- Mais.\n\n<!-- trecho: ia-professora -->');
    esperaErro(
      processar({ ideias: { 'alfa.md': trocado } }).erros,
      'o trecho "ia-professora" deve ficar em "## Antes de começar"',
    );
  });

  test('trechos do Passo a passo fora de ordem', () => {
    const trocado = textoDe('alfa.md')
      .replace('<!-- trecho: documentar-projeto -->', '<!-- trecho: TEMP -->')
      .replace('<!-- trecho: criar-repositorio -->', '<!-- trecho: documentar-projeto -->')
      .replace('<!-- trecho: TEMP -->', '<!-- trecho: criar-repositorio -->');
    esperaErro(processar({ ideias: { 'alfa.md': trocado } }).erros, 'ordem do "## Passo a passo"');
  });

  test('parte antes da divisão em partes', () => {
    esperaErro(
      errosDaAlfaCom('<!-- trecho: criar-repositorio -->', '### Etapa — Parte: Cedo demais\n\n<!-- trecho: criar-repositorio -->'),
      'ordem do "## Passo a passo"',
    );
  });

  test('Passo a passo sem nenhuma parte', () => {
    const original = textoDe('alfa.md');
    const inicio = original.indexOf('### Etapa — Parte: Primeira parte');
    const fim = original.indexOf('<!-- trecho: revisar-e-testar -->');
    const semPartes = original.slice(0, inicio) + original.slice(fim);
    esperaErro(processar({ ideias: { 'alfa.md': semPartes } }).erros, 'pelo menos uma parte');
  });

  test('marcador que não está sozinho na linha', () => {
    esperaErro(
      errosDaAlfaCom('<!-- trecho: ia-professora -->', 'Veja: <!-- trecho: ia-professora -->'),
      'deve ficar sozinho na linha',
    );
  });

  test('trecho padrão que não existe na pasta', () => {
    esperaErro(
      processar({ trechos: { 'checklist-entrega': null } }).erros,
      'conteudo/trechos/checklist-entrega.md: trecho padrão obrigatório não existe',
    );
  });

  test('trecho com seção "##"', () => {
    esperaErro(processar({ trechos: { 'ia-professora': '## Título\n\nTexto.' } }).erros, 'trechos não podem ter seções');
  });

  test('trecho que inclui outro trecho', () => {
    esperaErro(
      processar({ trechos: { 'ia-professora': 'Texto.\n\n<!-- trecho: escolher-stack -->' } }).erros,
      'trechos não podem incluir outros trechos',
    );
  });

  test('trecho de etapa sem título de etapa', () => {
    esperaErro(processar({ trechos: { 'revisar-e-testar': 'Só texto.' } }).erros, 'precisa de um título "### Etapa — Título"');
  });

  test('trecho fora do Passo a passo com etapa', () => {
    esperaErro(
      processar({ trechos: { 'ia-professora': '### Etapa — Intrusa\n\nTexto.' } }).erros,
      'não pode ter etapas',
    );
  });

  test('trecho com parte', () => {
    esperaErro(
      processar({ trechos: { 'revisar-e-testar': '### Etapa — Parte: Intrusa\n\nTexto.' } }).erros,
      'trechos não podem ter partes',
    );
  });

  test('trecho vazio', () => {
    esperaErro(processar({ trechos: { 'ia-professora': '\n\n' } }).erros, 'trecho vazio');
  });
});

describe('variáveis, etapas e partes', () => {
  test('variável desconhecida na ideia', () => {
    esperaErro(errosDaAlfaCom('Texto sobre {{titulo}}.', 'Texto sobre {{nome}}.'), 'variável desconhecida "{{nome}}"');
  });

  test('variável desconhecida no trecho', () => {
    esperaErro(
      processar({ trechos: { 'ia-professora': 'Use {{ferramenta}}.' } }).erros,
      'conteudo/trechos/ia-professora.md: variável desconhecida "{{ferramenta}}"',
    );
  });

  test('etapa numerada à mão', () => {
    esperaErro(
      errosDaAlfaCom('### Etapa — Parte: Primeira parte', '### Etapa 5 — Parte: Primeira parte'),
      'não numere a etapa',
    );
  });

  test('parte numerada à mão', () => {
    esperaErro(
      errosDaAlfaCom('### Etapa — Parte: Primeira parte', '### Etapa — Parte 1: Primeira parte'),
      'não numere a parte',
    );
  });

  test('etapa própria que não é parte', () => {
    esperaErro(
      errosDaAlfaCom('### Etapa — Parte: Primeira parte', '### Etapa — Primeira parte'),
      'etapa própria da ideia deve ser uma parte',
    );
  });

  test('etapa fora do formato', () => {
    esperaErro(
      errosDaAlfaCom('### Etapa — Parte: Primeira parte', '### Etapa - Parte: Primeira parte'),
      'fora do formato',
    );
  });

  test('etapa fora do Passo a passo', () => {
    esperaErro(errosDaAlfaCom('- Mais.', '- Mais.\n\n### Etapa — Parte: Perdida'), 'etapa fora do "## Passo a passo"');
  });
});

describe('limparTexto', () => {
  test('junta linhas em branco repetidas fora de código', () => {
    const erros = [];
    assert.equal(limparTexto('a\n\n\n\nb\n```\n\n\n\n```', 'x', erros), 'a\n\nb\n```\n\n\n\n```');
    assert.deepEqual(erros, []);
  });
});

describe('gerarConteudo (disco)', () => {
  const temporarias = [];
  after(async () => {
    for (const pasta of temporarias) await rm(pasta, { recursive: true, force: true });
  });

  async function copiaDaFixture() {
    const pasta = await mkdtemp(path.join(os.tmpdir(), 'ideias-portfolio-'));
    temporarias.push(pasta);
    await cp(FIXTURE, pasta, { recursive: true });
    return pasta;
  }

  test('grava índice, páginas e corpos; remove o que saiu', async () => {
    const raiz = await copiaDaFixture();
    const saida = path.join(raiz, 'public', 'conteudo');
    await cp(path.join(raiz, 'conteudo', 'inicio.md'), path.join(saida, 'inicio.md'), { recursive: true });

    assert.deepEqual((await gerarConteudo({ raiz, comRascunhos: true })).erros, []);
    assert.deepEqual((await readdir(path.join(saida, 'ideias'))).sort(), ['alfa.md', 'beta.md', 'gama.md']);
    assert.deepEqual((await readdir(saida)).sort(), ['ideias', 'indice.json', 'inicio.json', 'recado.json']);

    assert.deepEqual((await gerarConteudo({ raiz, comRascunhos: false })).erros, []);
    assert.deepEqual((await readdir(path.join(saida, 'ideias'))).sort(), ['alfa.md', 'gama.md']);

    const indice = JSON.parse(await readFile(path.join(saida, 'indice.json'), 'utf8'));
    assert.deepEqual(
      indice.ideias.map((ideia) => ideia.slug),
      ['alfa', 'gama'],
    );
    const inicio = JSON.parse(await readFile(path.join(saida, 'inicio.json'), 'utf8'));
    assert.equal(inicio.titulo, 'Início de teste');
  });

  test('com erro, não grava nada e mantém o que já existia', async () => {
    const raiz = await copiaDaFixture();
    await gerarConteudo({ raiz, comRascunhos: true });
    const indiceAntes = await readFile(path.join(raiz, 'public', 'conteudo', 'indice.json'), 'utf8');

    await writeFile(path.join(raiz, 'conteudo', 'ideias', 'alfa.md'), 'sem frontmatter\n');
    const { erros } = await gerarConteudo({ raiz, comRascunhos: true });
    esperaErro(erros, 'conteudo/ideias/alfa.md: frontmatter ausente');

    const indiceDepois = await readFile(path.join(raiz, 'public', 'conteudo', 'indice.json'), 'utf8');
    assert.equal(indiceDepois, indiceAntes);
  });
});
