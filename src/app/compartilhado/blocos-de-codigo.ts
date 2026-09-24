import { DOCUMENT } from '@angular/common';
import { DestroyRef, Directive, ElementRef, inject } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

const ROTULOS: Record<string, string> = {
  prompt: 'Prompt',
  bash: 'Terminal',
  sh: 'Terminal',
  shell: 'Terminal',
  console: 'Terminal',
  powershell: 'Terminal',
  html: 'HTML',
  css: 'CSS',
  scss: 'SCSS',
  js: 'JavaScript',
  javascript: 'JavaScript',
  ts: 'TypeScript',
  typescript: 'TypeScript',
  json: 'JSON',
  yaml: 'YAML',
  yml: 'YAML',
  md: 'Markdown',
  markdown: 'Markdown',
  text: 'Texto',
  txt: 'Texto',
};

const TEMPO_DO_RETORNO_MS = 2000;

export function rotuloDaLinguagem(linguagem: string | null): string {
  if (!linguagem) return 'Código';
  return ROTULOS[linguagem.toLowerCase()] ?? linguagem.toUpperCase();
}

/** Cada bloco ganha um jeitinho: prompt, terminal ou código. */
function estiloDo(rotulo: string): { classe: string; icone: string; nome: string } {
  if (rotulo === 'Prompt') return { classe: 'bloco-codigo--prompt', icone: '💬', nome: 'Prompt para a IA' };
  if (rotulo === 'Terminal') return { classe: 'bloco-codigo--terminal', icone: '⌨️', nome: rotulo };
  return { classe: '', icone: '📄', nome: rotulo };
}

function linguagemDo(codigo: Element | null): string | null {
  const classe = Array.from(codigo?.classList ?? []).find((c) => c.startsWith('language-'));
  return classe ? classe.slice('language-'.length) : null;
}

/**
 * Envolve cada <pre> do HTML renderizado numa moldura com rótulo e botão "Copiar".
 * Pode ser chamada de novo sobre o mesmo HTML: blocos já preparados são ignorados.
 */
export function prepararBlocosDeCodigo(raiz: HTMLElement, documento: Document): void {
  for (const pre of Array.from(raiz.querySelectorAll('pre'))) {
    if (pre.parentElement?.classList.contains('bloco-codigo')) continue;

    const codigo = pre.querySelector('code');
    const linguagem = linguagemDo(codigo);
    const rotulo = rotuloDaLinguagem(linguagem);

    const estilo = estiloDo(rotulo);

    const moldura = documento.createElement('div');
    moldura.className = 'bloco-codigo';
    if (estilo.classe) moldura.classList.add(estilo.classe);

    const barra = documento.createElement('div');
    barra.className = 'bloco-codigo__barra';

    const nome = documento.createElement('span');
    nome.className = 'bloco-codigo__nome';
    const icone = documento.createElement('span');
    icone.setAttribute('aria-hidden', 'true');
    icone.textContent = estilo.icone;
    const texto = documento.createElement('span');
    texto.className = 'bloco-codigo__rotulo';
    texto.textContent = estilo.nome;
    nome.append(icone, texto);

    const botao = documento.createElement('button');
    botao.type = 'button';
    botao.className = 'bloco-codigo__copiar';
    botao.textContent = 'Copiar';
    botao.setAttribute('aria-label', `Copiar ${rotulo.toLowerCase()}`);
    botao.setAttribute('aria-live', 'polite');
    botao.addEventListener('click', () => {
      const texto = (codigo ?? pre).textContent?.replace(/\n$/, '') ?? '';
      void copiar(texto, botao, documento);
    });

    barra.append(nome, botao);
    pre.parentNode?.insertBefore(moldura, pre);
    moldura.append(barra, pre);
  }
}

async function copiar(texto: string, botao: HTMLButtonElement, documento: Document) {
  const janela = documento.defaultView;
  let copiou = false;
  try {
    if (!janela?.navigator.clipboard) throw new Error('Área de transferência indisponível');
    await janela.navigator.clipboard.writeText(texto);
    copiou = true;
  } catch {
    // Alguns navegadores negam a Clipboard API; o método antigo ainda funciona com o clique.
    copiou = copiarPeloMetodoAntigo(texto, documento);
  }
  botao.textContent = copiou ? 'Copiado!' : 'Não foi possível copiar';
  janela?.setTimeout(() => (botao.textContent = 'Copiar'), TEMPO_DO_RETORNO_MS);
}

function copiarPeloMetodoAntigo(texto: string, documento: Document): boolean {
  const campo = documento.createElement('textarea');
  campo.value = texto;
  campo.setAttribute('readonly', '');
  campo.style.position = 'fixed';
  campo.style.opacity = '0';
  documento.body.append(campo);
  campo.select();
  try {
    return typeof documento.execCommand === 'function' && documento.execCommand('copy');
  } catch {
    return false;
  } finally {
    campo.remove();
  }
}

/** Aplicada em <markdown>: prepara os blocos de código sempre que o Markdown termina de renderizar. */
@Directive({ selector: 'markdown[appBlocosDeCodigo]' })
export class BlocosDeCodigo {
  constructor() {
    const markdown = inject(MarkdownComponent);
    const elemento = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const documento = inject(DOCUMENT);
    const inscricao = markdown.ready.subscribe(() =>
      prepararBlocosDeCodigo(elemento, documento),
    );
    inject(DestroyRef).onDestroy(() => inscricao.unsubscribe());
  }
}
