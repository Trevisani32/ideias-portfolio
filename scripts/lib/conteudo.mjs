// Valida o conteúdo de conteudo/ e monta o que o site consome em public/conteudo/.
// As regras estão descritas em conteudo.md ("O que o script valida").

import { existsSync } from 'node:fs';
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

export const SECOES = [
  'Sobre o projeto',
  'O que você vai aprender',
  'Requisitos',
  'Antes de começar',
  'Passo a passo',
  'Checklist de entrega',
  'Para ir além',
];

export const SUBSECOES_REQUISITOS = ['Obrigatórios', 'Desafios extras'];

/** Trechos que toda ideia inclui, na seção indicada. Os de etapa aparecem nesta ordem. */
export const TRECHOS_OBRIGATORIOS = [
  { nome: 'ia-professora', secao: 'Antes de começar', etapa: false },
  { nome: 'escolher-stack', secao: 'Passo a passo', etapa: true },
  { nome: 'documentar-projeto', secao: 'Passo a passo', etapa: true },
  { nome: 'criar-repositorio', secao: 'Passo a passo', etapa: true },
  { nome: 'dividir-em-partes', secao: 'Passo a passo', etapa: true },
  { nome: 'revisar-e-testar', secao: 'Passo a passo', etapa: true },
  { nome: 'escrever-readme', secao: 'Passo a passo', etapa: true },
  { nome: 'publicar-github-pages', secao: 'Passo a passo', etapa: true },
  { nome: 'checklist-entrega', secao: 'Checklist de entrega', etapa: false },
];

export const CAMPOS_DA_IDEIA = [
  'titulo',
  'slug',
  'bloco',
  'ordem',
  'nivel',
  'icone',
  'resumo',
  'tecnologias',
  'treina',
  'status',
];

export const CAMPOS_DO_BLOCO = ['titulo', 'ordem'];

/** Páginas avulsas: arquivo em conteudo/<nome>.md e campos obrigatórios do frontmatter. */
export const PAGINAS = {
  inicio: ['titulo', 'subtitulo'],
  recado: ['titulo'],
};

export const LIMITE_RESUMO = 160;
export const LIMITE_ICONE = 8;

const STATUS = ['rascunho', 'publicada'];
const VARIAVEIS = ['titulo', 'slug'];
const TRECHOS_DE_ETAPA = TRECHOS_OBRIGATORIOS.filter((t) => t.etapa).map((t) => t.nome);
const ORDEM_PASSO_A_PASSO =
  /^escolher-stack,documentar-projeto,criar-repositorio,dividir-em-partes(,parte)+,revisar-e-testar,escrever-readme,publicar-github-pages$/;
const DESCRICAO_DA_ORDEM =
  'escolher-stack → documentar-projeto → criar-repositorio → dividir-em-partes → partes do projeto → revisar-e-testar → escrever-readme → publicar-github-pages';

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ABRE_CERCA = /^ {0,3}(`{3,}|~{3,})/;
const FECHA_CERCA = /^ {0,3}(`{3,}|~{3,})[ \t]*$/;
const H2 = /^##[ \t]+(.*?)(?:[ \t]+#+)?[ \t]*$/;
const H3 = /^###[ \t]+(.*?)(?:[ \t]+#+)?[ \t]*$/;
const MARCADOR = /^[ \t]*<!--[ \t]*trecho:[ \t]*(\S+?)[ \t]*-->[ \t]*$/;
const MENCAO_A_MARCADOR = /<!--\s*trecho:/;
const ETAPA = /^###[ \t]+Etapa\b/;
const ETAPA_NUMERADA = /^###[ \t]+Etapa[ \t]+\d/;
const ETAPA_VALIDA = /^###[ \t]+Etapa[ \t]+—[ \t]+(\S.*?)[ \t]*$/;
const PARTE = /^Parte:[ \t]+(\S.*)$/;
const PARTE_NUMERADA = /^Parte[ \t]+\d/;
const VARIAVEL = /\{\{\s*([^{}]*?)\s*\}\}/g;

/** Remove BOM e converte CRLF/CR em LF, para o resto do script só lidar com "\n". */
export function normalizar(texto) {
  return texto.replace(/^﻿/, '').replace(/\r\n?/g, '\n');
}

/** Divide o texto em linhas e marca as que estão dentro de blocos de código cercados. */
export function mapearLinhas(texto) {
  let cerca = null;
  const linhas = texto.split('\n').map((conteudo) => {
    if (cerca) {
      const fim = conteudo.match(FECHA_CERCA);
      if (fim && fim[1][0] === cerca[0] && fim[1].length >= cerca.length) cerca = null;
      return { conteudo, codigo: true };
    }
    const inicio = conteudo.match(ABRE_CERCA);
    if (inicio) cerca = inicio[1];
    return { conteudo, codigo: Boolean(inicio) };
  });
  return { linhas, cercaAberta: cerca !== null };
}

/** Anota em cada linha a seção "##" em que ela está (null antes da primeira). */
function comSecoes(linhas) {
  let secao = null;
  return linhas.map((linha) => {
    const titulo = linha.codigo ? null : linha.conteudo.match(H2);
    if (titulo) secao = titulo[1];
    return { ...linha, secao, ehSecao: Boolean(titulo) };
  });
}

function analisar(texto) {
  const { linhas, cercaAberta } = mapearLinhas(texto);
  return { linhas: comSecoes(linhas), cercaAberta };
}

/** Remove comentários HTML fora de blocos de código e junta linhas em branco repetidas. */
export function limparTexto(texto, rel, erros) {
  const { linhas } = mapearLinhas(texto);
  const saida = [];
  let pendentes = [];
  const descarregar = () => {
    if (!pendentes.length) return;
    const limpo = pendentes.join('\n').replace(/<!--[\s\S]*?-->/g, '');
    if (limpo.includes('<!--')) erros.push(`${rel}: comentário HTML sem fechamento ("-->")`);
    for (const conteudo of limpo.split('\n')) saida.push({ conteudo, codigo: false });
    pendentes = [];
  };
  for (const linha of linhas) {
    if (linha.codigo) {
      descarregar();
      saida.push(linha);
    } else {
      pendentes.push(linha.conteudo);
    }
  }
  descarregar();

  const emBranco = (linha) => !linha.codigo && !linha.conteudo.trim();
  return saida
    .filter((linha, i) => !emBranco(linha) || i === 0 || !emBranco(saida[i - 1]))
    .map((linha) => (emBranco(linha) ? '' : linha.conteudo))
    .join('\n');
}

function lerFrontmatter(texto, rel, erros) {
  if (!/^---[ \t]*\n/.test(texto)) {
    erros.push(`${rel}: frontmatter ausente (o arquivo deve começar com "---")`);
    return null;
  }
  if (!/\n---[ \t]*(\n|$)/.test(texto.slice(3))) {
    erros.push(`${rel}: frontmatter sem fechamento (falta a linha "---" depois dos campos)`);
    return null;
  }
  try {
    // Sem cache: o gray-matter guarda resultados por texto, o que atrapalha o modo --watch.
    const { data, content } = matter(texto, { language: 'yaml' });
    if (data === null || typeof data !== 'object' || Array.isArray(data)) {
      erros.push(`${rel}: o frontmatter deve ser uma lista de campos "nome: valor"`);
      return null;
    }
    return { dados: data, corpo: content };
  } catch (erro) {
    erros.push(`${rel}: frontmatter inválido (${erro.reason ?? erro.message})`);
    return null;
  }
}

/** Funções de validação de campos que registram o erro com o caminho do arquivo. */
function validadores(dados, rel, erros) {
  return {
    desconhecidos(permitidos) {
      for (const campo of Object.keys(dados)) {
        if (!permitidos.includes(campo)) {
          erros.push(`${rel}: campo desconhecido no frontmatter: "${campo}"`);
        }
      }
    },
    texto(campo) {
      const valor = dados[campo];
      if (typeof valor === 'string' && valor.trim()) return true;
      erros.push(`${rel}: "${campo}" é obrigatório e deve ser um texto`);
      return false;
    },
    inteiro(campo) {
      if (Number.isInteger(dados[campo]) && dados[campo] >= 1) return true;
      erros.push(`${rel}: "${campo}" deve ser um número inteiro maior que zero`);
      return false;
    },
    lista(campo, minimo, maximo) {
      const valor = dados[campo];
      const valida =
        Array.isArray(valor) && valor.every((item) => typeof item === 'string' && item.trim());
      if (!valida) {
        erros.push(`${rel}: "${campo}" deve ser uma lista de textos, ex.: [HTML, CSS]`);
      } else if (valor.length < minimo || valor.length > maximo) {
        const faixa = maximo === Infinity ? `pelo menos ${minimo}` : `de ${minimo} a ${maximo}`;
        erros.push(`${rel}: "${campo}" deve ter ${faixa} itens (tem ${valor.length})`);
      }
    },
  };
}

function validarFrontmatterDaIdeia(dados, arquivo, blocos, rel, erros) {
  const v = validadores(dados, rel, erros);
  const slugDoArquivo = arquivo.replace(/\.md$/, '');

  v.desconhecidos(CAMPOS_DA_IDEIA);
  v.texto('titulo');

  if (v.texto('slug')) {
    if (!SLUG.test(dados.slug)) {
      erros.push(`${rel}: "slug" deve ter só letras minúsculas, números e hífens`);
    } else if (dados.slug !== slugDoArquivo) {
      erros.push(
        `${rel}: "slug" (${dados.slug}) deve ser igual ao nome do arquivo (${slugDoArquivo})`,
      );
    }
  }

  if (v.texto('bloco') && !blocos.has(dados.bloco)) {
    erros.push(`${rel}: bloco inexistente "${dados.bloco}" (crie conteudo/blocos/${dados.bloco}.md)`);
  }

  v.inteiro('ordem');

  if (![1, 2, 3].includes(dados.nivel)) erros.push(`${rel}: "nivel" deve ser 1, 2 ou 3`);

  if (v.texto('icone') && dados.icone.length > LIMITE_ICONE) {
    erros.push(`${rel}: "icone" deve ser um emoji só (até ${LIMITE_ICONE} caracteres)`);
  }

  if (v.texto('resumo') && dados.resumo.length > LIMITE_RESUMO) {
    erros.push(
      `${rel}: "resumo" tem ${dados.resumo.length} caracteres (máximo ${LIMITE_RESUMO})`,
    );
  }

  v.lista('tecnologias', 1, Infinity);
  v.lista('treina', 3, 6);

  if (!STATUS.includes(dados.status)) {
    erros.push(`${rel}: "status" deve ser "rascunho" ou "publicada"`);
  }
}

function validarSecoes(linhas, rel, erros) {
  const titulos = linhas.filter((l) => l.ehSecao).map((l) => l.secao);

  const desconhecidas = titulos.filter((t) => !SECOES.includes(t));
  const faltando = SECOES.filter((s) => !titulos.includes(s));
  const repetidas = SECOES.filter((s) => titulos.filter((t) => t === s).length > 1);

  for (const t of desconhecidas) erros.push(`${rel}: seção não permitida "## ${t}"`);
  for (const s of faltando) erros.push(`${rel}: falta a seção "## ${s}"`);
  for (const s of repetidas) erros.push(`${rel}: a seção "## ${s}" aparece mais de uma vez`);

  if (!desconhecidas.length && !faltando.length && !repetidas.length) {
    if (titulos.join('\n') !== SECOES.join('\n')) {
      erros.push(`${rel}: seções fora de ordem (a ordem é: ${SECOES.join(' → ')})`);
    }
  }

  const antes = linhas
    .filter((l) => l.secao === null)
    .map((l) => l.conteudo)
    .join('\n');
  if (antes.replace(/<!--[\s\S]*?-->/g, '').trim()) {
    erros.push(`${rel}: há texto antes de "## ${SECOES[0]}"`);
  }

  if (titulos.includes('Requisitos')) {
    const subsecoes = linhas
      .filter((l) => l.secao === 'Requisitos' && !l.codigo)
      .map((l) => l.conteudo.match(H3)?.[1])
      .filter(Boolean);
    for (const sub of SUBSECOES_REQUISITOS) {
      if (!subsecoes.includes(sub)) erros.push(`${rel}: falta "### ${sub}" em "## Requisitos"`);
    }
  }
}

function coletarMarcadores(linhas, rel, erros) {
  const marcadores = [];
  for (const linha of linhas) {
    if (linha.codigo) continue;
    const marcador = linha.conteudo.match(MARCADOR);
    if (marcador) {
      marcadores.push({ nome: marcador[1], secao: linha.secao });
    } else if (MENCAO_A_MARCADOR.test(linha.conteudo)) {
      erros.push(
        `${rel}: o marcador de trecho deve ficar sozinho na linha: "${linha.conteudo.trim()}"`,
      );
    }
  }
  return marcadores;
}

function validarMarcadores(marcadores, trechos, rel, erros) {
  for (const { nome } of marcadores) {
    if (!SLUG.test(nome)) {
      erros.push(`${rel}: nome de trecho inválido "${nome}"`);
    } else if (!trechos.has(nome)) {
      erros.push(`${rel}: trecho inexistente "${nome}" (crie conteudo/trechos/${nome}.md)`);
    }
  }

  for (const trecho of TRECHOS_OBRIGATORIOS) {
    const achados = marcadores.filter((m) => m.nome === trecho.nome);
    if (achados.length === 0) {
      erros.push(`${rel}: falta o trecho obrigatório "${trecho.nome}" em "## ${trecho.secao}"`);
    } else if (achados.length > 1) {
      erros.push(`${rel}: o trecho "${trecho.nome}" aparece ${achados.length} vezes (deve aparecer uma)`);
    } else if (achados[0].secao !== trecho.secao) {
      erros.push(`${rel}: o trecho "${trecho.nome}" deve ficar em "## ${trecho.secao}"`);
    }
  }
}

function validarPassoAPasso(linhas, rel, erros) {
  const sequencia = [];
  for (const linha of linhas) {
    if (linha.codigo || linha.secao !== 'Passo a passo') continue;
    const marcador = linha.conteudo.match(MARCADOR);
    if (marcador && TRECHOS_DE_ETAPA.includes(marcador[1])) sequencia.push(marcador[1]);
    else if (ETAPA.test(linha.conteudo)) sequencia.push('parte');
  }

  // Trechos ausentes ou repetidos já têm erro próprio; a ordem só é conferida sem eles.
  const cadaTrechoUmaVez = TRECHOS_DE_ETAPA.every(
    (nome) => sequencia.filter((item) => item === nome).length === 1,
  );
  if (!cadaTrechoUmaVez) return;

  if (!sequencia.includes('parte')) {
    erros.push(
      `${rel}: o "## Passo a passo" precisa de pelo menos uma parte ("### Etapa — Parte: Título")`,
    );
  } else if (!ORDEM_PASSO_A_PASSO.test(sequencia.join(','))) {
    erros.push(`${rel}: ordem do "## Passo a passo" deve ser: ${DESCRICAO_DA_ORDEM}`);
  }
}

/**
 * Confere o formato dos títulos de etapa. Nas ideias, toda etapa própria é uma parte
 * ("### Etapa — Parte: Título"); nos trechos, nenhuma etapa é parte.
 */
function validarFormatoDasEtapas(linhas, rel, erros, { partes }) {
  for (const linha of linhas) {
    if (linha.codigo || !ETAPA.test(linha.conteudo)) continue;
    const titulo = linha.conteudo.trim();
    const etapa = linha.conteudo.match(ETAPA_VALIDA);
    if (ETAPA_NUMERADA.test(linha.conteudo)) {
      erros.push(`${rel}: não numere a etapa, o script numera: "${titulo}"`);
    } else if (!etapa) {
      erros.push(`${rel}: etapa fora do formato "### Etapa — Título": "${titulo}"`);
    } else if (partes && PARTE_NUMERADA.test(etapa[1])) {
      erros.push(`${rel}: não numere a parte, o script numera: "${titulo}"`);
    } else if (partes && !PARTE.test(etapa[1])) {
      erros.push(`${rel}: etapa própria da ideia deve ser uma parte ("### Etapa — Parte: Título"): "${titulo}"`);
    } else if (!partes && /^Parte\b/.test(etapa[1])) {
      erros.push(`${rel}: trechos não podem ter partes: "${titulo}"`);
    }
  }
}

function validarVariaveis(texto, rel, erros) {
  for (const [, nome] of texto.matchAll(VARIAVEL)) {
    if (!VARIAVEIS.includes(nome)) {
      erros.push(`${rel}: variável desconhecida "{{${nome}}}" (use {{titulo}} ou {{slug}})`);
    }
  }
}

function validarTrecho(nome, texto, erros) {
  const rel = `conteudo/trechos/${nome}.md`;
  if (!SLUG.test(nome)) {
    erros.push(`${rel}: nome de arquivo inválido (use letras minúsculas, números e hífens)`);
  }
  if (!texto.trim()) erros.push(`${rel}: trecho vazio`);

  const { linhas, cercaAberta } = mapearLinhas(texto);
  if (cercaAberta) erros.push(`${rel}: bloco de código sem fechamento`);

  for (const linha of linhas) {
    if (linha.codigo) continue;
    if (H2.test(linha.conteudo)) {
      erros.push(`${rel}: trechos não podem ter seções "##": "${linha.conteudo.trim()}"`);
    }
    if (MENCAO_A_MARCADOR.test(linha.conteudo)) {
      erros.push(`${rel}: trechos não podem incluir outros trechos`);
    }
  }

  validarFormatoDasEtapas(linhas, rel, erros, { partes: false });
  validarVariaveis(texto, rel, erros);

  const obrigatorio = TRECHOS_OBRIGATORIOS.find((t) => t.nome === nome);
  const temEtapa = linhas.some((l) => !l.codigo && ETAPA.test(l.conteudo));
  if (obrigatorio?.etapa && !temEtapa) {
    erros.push(`${rel}: este trecho é uma etapa e precisa de um título "### Etapa — Título"`);
  }
  if (obrigatorio && !obrigatorio.etapa && temEtapa) {
    erros.push(`${rel}: este trecho entra em "## ${obrigatorio.secao}" e não pode ter etapas`);
  }
}

function expandirTrechos(corpo, trechos) {
  const { linhas } = mapearLinhas(corpo);
  return linhas
    .map((linha) => {
      if (linha.codigo) return linha.conteudo;
      const marcador = linha.conteudo.match(MARCADOR);
      return marcador && trechos.has(marcador[1])
        ? `\n${trechos.get(marcador[1]).trim()}\n`
        : linha.conteudo;
    })
    .join('\n');
}

/** Depois de expandir os trechos, nenhuma etapa pode ter ficado fora do Passo a passo. */
function validarEtapasNaSecao(texto, rel, erros) {
  for (const linha of analisar(texto).linhas) {
    if (!linha.codigo && ETAPA.test(linha.conteudo) && linha.secao !== 'Passo a passo') {
      erros.push(`${rel}: etapa fora do "## Passo a passo": "${linha.conteudo.trim()}"`);
    }
  }
}

function substituirVariaveis(texto, valores) {
  return texto.replace(VARIAVEL, (trecho, nome) =>
    Object.hasOwn(valores, nome) ? valores[nome] : trecho,
  );
}

/** Numera etapas e partes do Passo a passo: "### Etapa 5 — Parte 1: Título". */
function numerarEtapas(texto) {
  let etapa = 0;
  let parte = 0;
  return analisar(texto)
    .linhas.map((linha) => {
      if (linha.codigo || linha.secao !== 'Passo a passo') return linha.conteudo;
      const encontrada = linha.conteudo.match(ETAPA_VALIDA);
      if (!encontrada) return linha.conteudo;
      const ehParte = encontrada[1].match(PARTE);
      const titulo = ehParte ? `Parte ${++parte}: ${ehParte[1]}` : encontrada[1];
      return `### Etapa ${++etapa} — ${titulo}`;
    })
    .join('\n');
}

function processarBloco({ arquivo, texto }, erros) {
  const rel = `conteudo/blocos/${arquivo}`;
  const id = arquivo.replace(/\.md$/, '');
  if (!SLUG.test(id)) {
    erros.push(`${rel}: nome de arquivo inválido (use letras minúsculas, números e hífens)`);
  }
  const lido = lerFrontmatter(normalizar(texto), rel, erros);
  if (!lido) return null;

  const v = validadores(lido.dados, rel, erros);
  v.desconhecidos(CAMPOS_DO_BLOCO);
  v.texto('titulo');
  v.inteiro('ordem');

  const descricao = limparTexto(lido.corpo, rel, erros).trim();
  if (!descricao) erros.push(`${rel}: escreva uma descrição curta do bloco depois do frontmatter`);

  return { rel, id, titulo: lido.dados.titulo, ordem: lido.dados.ordem, descricao };
}

function processarIdeia({ arquivo, texto }, trechos, blocos, erros) {
  const rel = `conteudo/ideias/${arquivo}`;
  const lido = lerFrontmatter(normalizar(texto), rel, erros);
  if (!lido) return null;

  const { dados, corpo } = lido;
  validarFrontmatterDaIdeia(dados, arquivo, blocos, rel, erros);

  const { linhas, cercaAberta } = analisar(corpo);
  if (cercaAberta) erros.push(`${rel}: bloco de código sem fechamento`);
  validarSecoes(linhas, rel, erros);
  validarMarcadores(coletarMarcadores(linhas, rel, erros), trechos, rel, erros);
  validarPassoAPasso(linhas, rel, erros);
  validarFormatoDasEtapas(linhas, rel, erros, { partes: true });
  validarVariaveis(corpo, rel, erros);

  let final = expandirTrechos(corpo, trechos);
  validarEtapasNaSecao(final, rel, erros);
  final = substituirVariaveis(final, {
    titulo: String(dados.titulo ?? ''),
    slug: String(dados.slug ?? ''),
  });
  final = limparTexto(final, rel, erros);
  final = numerarEtapas(final);

  const meta = Object.fromEntries(CAMPOS_DA_IDEIA.map((campo) => [campo, dados[campo]]));
  return { rel, meta, corpo: `${final.trim()}\n` };
}

function processarPagina(nome, texto, erros) {
  const rel = `conteudo/${nome}.md`;
  if (texto === null || texto === undefined) {
    erros.push(`${rel}: arquivo não existe`);
    return null;
  }
  const lido = lerFrontmatter(normalizar(texto), rel, erros);
  if (!lido) return null;

  const v = validadores(lido.dados, rel, erros);
  v.desconhecidos(PAGINAS[nome]);
  for (const campo of PAGINAS[nome]) v.texto(campo);

  const corpo = limparTexto(lido.corpo, rel, erros).trim();
  if (!corpo) erros.push(`${rel}: escreva o texto da página depois do frontmatter`);

  return {
    ...Object.fromEntries(PAGINAS[nome].map((campo) => [campo, lido.dados[campo]])),
    corpo: `${corpo}\n`,
  };
}

function comoMapa(entradas) {
  return new Map(
    [...(entradas instanceof Map ? entradas : Object.entries(entradas))].map(([nome, texto]) => [
      nome,
      normalizar(texto),
    ]),
  );
}

/**
 * Valida e monta o conteúdo, sem tocar no disco.
 * - ideias e blocos: listas de { arquivo, texto }
 * - trechos: Map (ou objeto) nome → texto
 * - paginas (opcional): { inicio, recado } com o texto de cada arquivo (null se não existir)
 */
export function processarConteudo({ ideias, trechos, blocos, paginas, comRascunhos = false }) {
  const erros = [];

  const mapaDeTrechos = comoMapa(trechos);
  for (const [nome, texto] of mapaDeTrechos) validarTrecho(nome, texto, erros);
  for (const { nome } of TRECHOS_OBRIGATORIOS) {
    if (!mapaDeTrechos.has(nome)) {
      erros.push(`conteudo/trechos/${nome}.md: trecho padrão obrigatório não existe`);
    }
  }

  const listaDeBlocos = blocos.map((bloco) => processarBloco(bloco, erros)).filter(Boolean);
  if (!blocos.length) erros.push('conteudo/blocos/: crie pelo menos um bloco');
  avisarRepetidos(
    listaDeBlocos.filter((b) => Number.isInteger(b.ordem)),
    (b) => b.ordem,
    (ordem) => `"ordem" ${ordem} repetida entre blocos`,
    erros,
  );
  const mapaDeBlocos = new Map(listaDeBlocos.map((bloco) => [bloco.id, bloco]));

  const resultados = ideias
    .map((ideia) => processarIdeia(ideia, mapaDeTrechos, mapaDeBlocos, erros))
    .filter(Boolean);

  avisarRepetidos(
    resultados.filter((r) => Number.isInteger(r.meta.ordem) && typeof r.meta.bloco === 'string'),
    (r) => `${r.meta.bloco}|${r.meta.ordem}`,
    (chave) => {
      const [bloco, ordem] = chave.split('|');
      return `"ordem" ${ordem} repetida no bloco "${bloco}"`;
    },
    erros,
  );

  const ordemDoBloco = (id) => mapaDeBlocos.get(id)?.ordem ?? Infinity;
  const incluidas = resultados
    .filter(({ meta }) => comRascunhos || meta.status === 'publicada')
    .sort(
      (a, b) =>
        ordemDoBloco(a.meta.bloco) - ordemDoBloco(b.meta.bloco) ||
        a.meta.ordem - b.meta.ordem ||
        a.meta.slug.localeCompare(b.meta.slug),
    );

  const blocosComIdeias = listaDeBlocos
    .filter((bloco) => incluidas.some(({ meta }) => meta.bloco === bloco.id))
    .sort((a, b) => a.ordem - b.ordem)
    .map(({ id, titulo, descricao }) => ({ id, titulo, descricao }));

  const paginasProcessadas = {};
  if (paginas) {
    for (const nome of Object.keys(PAGINAS)) {
      paginasProcessadas[nome] = processarPagina(nome, paginas[nome], erros);
    }
  }

  return {
    erros: [...new Set(erros)],
    indice: { blocos: blocosComIdeias, ideias: incluidas.map(({ meta }) => meta) },
    corpos: new Map(incluidas.map(({ meta, corpo }) => [meta.slug, corpo])),
    paginas: paginasProcessadas,
  };
}

/** Registra um erro em cada arquivo cuja chave se repete em outro. */
function avisarRepetidos(itens, chave, descricao, erros) {
  const grupos = new Map();
  for (const item of itens) {
    const valor = chave(item);
    grupos.set(valor, [...(grupos.get(valor) ?? []), item.rel]);
  }
  for (const [valor, rels] of grupos) {
    if (rels.length < 2) continue;
    for (const rel of rels) {
      const outros = rels.filter((outro) => outro !== rel).join(', ');
      erros.push(`${rel}: ${descricao(valor)} (também em ${outros})`);
    }
  }
}

async function lerMarkdowns(diretorio) {
  if (!existsSync(diretorio)) return [];
  const nomes = (await readdir(diretorio))
    .filter((nome) => nome.endsWith('.md') && !nome.startsWith('_'))
    .sort();
  return Promise.all(
    nomes.map(async (arquivo) => ({
      arquivo,
      texto: normalizar(await readFile(path.join(diretorio, arquivo), 'utf8')),
    })),
  );
}

async function lerSeExistir(caminho) {
  return existsSync(caminho) ? normalizar(await readFile(caminho, 'utf8')) : null;
}

/** Lê conteudo/ a partir da raiz do projeto. Arquivos que começam com "_" são ignorados. */
export async function lerConteudo(raiz) {
  const pasta = path.join(raiz, 'conteudo');
  const ideias = await lerMarkdowns(path.join(pasta, 'ideias'));
  const blocos = await lerMarkdowns(path.join(pasta, 'blocos'));
  const trechos = new Map(
    (await lerMarkdowns(path.join(pasta, 'trechos'))).map(({ arquivo, texto }) => [
      arquivo.replace(/\.md$/, ''),
      texto,
    ]),
  );
  const paginas = {};
  for (const nome of Object.keys(PAGINAS)) {
    paginas[nome] = await lerSeExistir(path.join(pasta, `${nome}.md`));
  }
  return { ideias, blocos, trechos, paginas };
}

/**
 * Valida conteudo/ e grava public/conteudo/. Se houver erro, não grava nada
 * (o que já estava gerado continua valendo).
 */
export async function gerarConteudo({ raiz, comRascunhos = false }) {
  const lido = await lerConteudo(raiz);
  const { erros, indice, corpos, paginas } = processarConteudo({ ...lido, comRascunhos });
  if (erros.length) return { erros, indice: { blocos: [], ideias: [] } };

  const saida = path.join(raiz, 'public', 'conteudo');
  const pastaIdeias = path.join(saida, 'ideias');
  await mkdir(pastaIdeias, { recursive: true });

  // Sobrescreve em vez de apagar a pasta: no Windows o servidor de desenvolvimento
  // pode estar com a pasta aberta, e apagar tudo falharia.
  const esperados = new Set(['indice.json', 'ideias']);
  await writeFile(path.join(saida, 'indice.json'), `${JSON.stringify(indice, null, 2)}\n`);
  for (const [nome, pagina] of Object.entries(paginas)) {
    esperados.add(`${nome}.json`);
    await writeFile(path.join(saida, `${nome}.json`), `${JSON.stringify(pagina, null, 2)}\n`);
  }
  for (const [slug, corpo] of corpos) {
    await writeFile(path.join(pastaIdeias, `${slug}.md`), corpo);
  }

  for (const arquivo of await readdir(pastaIdeias)) {
    if (!corpos.has(arquivo.replace(/\.md$/, ''))) {
      await rm(path.join(pastaIdeias, arquivo), { recursive: true, force: true });
    }
  }
  for (const arquivo of await readdir(saida)) {
    if (!esperados.has(arquivo)) await rm(path.join(saida, arquivo), { recursive: true, force: true });
  }

  return { erros: [], indice };
}
