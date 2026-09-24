import { prepararBlocosDeCodigo, rotuloDaLinguagem } from './blocos-de-codigo';

function montar(html: string): HTMLElement {
  const raiz = document.createElement('div');
  raiz.innerHTML = html;
  document.body.append(raiz);
  return raiz;
}

describe('rotuloDaLinguagem', () => {
  it('usa rótulos conhecidos', () => {
    expect(rotuloDaLinguagem('prompt')).toBe('Prompt');
    expect(rotuloDaLinguagem('bash')).toBe('Terminal');
    expect(rotuloDaLinguagem('js')).toBe('JavaScript');
    expect(rotuloDaLinguagem('HTML')).toBe('HTML');
  });

  it('cai no nome em maiúsculas ou em "Código"', () => {
    expect(rotuloDaLinguagem('rust')).toBe('RUST');
    expect(rotuloDaLinguagem(null)).toBe('Código');
  });
});

describe('prepararBlocosDeCodigo', () => {
  let raiz: HTMLElement;
  let writeText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
    raiz = montar(
      '<p>texto</p>' +
        '<pre><code class="language-prompt">Explique isto.\n</code></pre>' +
        '<pre><code class="language-bash">git init\n</code></pre>' +
        '<pre><code>sem linguagem</code></pre>',
    );
  });

  afterEach(() => raiz.remove());

  it('envolve cada <pre> numa moldura com rótulo e botão', () => {
    prepararBlocosDeCodigo(raiz, document);
    const molduras = raiz.querySelectorAll('.bloco-codigo');
    expect(molduras.length).toBe(3);
    expect(
      Array.from(raiz.querySelectorAll('.bloco-codigo__rotulo')).map((r) => r.textContent),
    ).toEqual(['Prompt para a IA', 'Terminal', 'Código']);
    expect(molduras[0].classList).toContain('bloco-codigo--prompt');
    expect(molduras[1].classList).toContain('bloco-codigo--terminal');
    expect(molduras[2].classList.length).toBe(1);
    expect(molduras[0].querySelector('pre')).not.toBeNull();
  });

  it('não prepara o mesmo bloco duas vezes', () => {
    prepararBlocosDeCodigo(raiz, document);
    prepararBlocosDeCodigo(raiz, document);
    expect(raiz.querySelectorAll('.bloco-codigo').length).toBe(3);
    expect(raiz.querySelectorAll('.bloco-codigo__copiar').length).toBe(3);
  });

  it('copia o texto do código, sem a quebra de linha final', async () => {
    prepararBlocosDeCodigo(raiz, document);
    const botao = raiz.querySelector<HTMLButtonElement>('.bloco-codigo__copiar')!;
    botao.click();
    await vi.waitFor(() => expect(botao.textContent).toBe('Copiado!'));
    expect(writeText).toHaveBeenCalledWith('Explique isto.');
  });

  it('usa o método antigo quando a Clipboard API é negada', async () => {
    writeText.mockRejectedValue(new Error('negado'));
    const execCommand = vi.fn().mockReturnValue(true);
    Object.defineProperty(document, 'execCommand', { value: execCommand, configurable: true });
    prepararBlocosDeCodigo(raiz, document);
    const botao = raiz.querySelector<HTMLButtonElement>('.bloco-codigo__copiar')!;
    botao.click();
    await vi.waitFor(() => expect(botao.textContent).toBe('Copiado!'));
    expect(execCommand).toHaveBeenCalledWith('copy');
    expect(document.querySelector('textarea')).toBeNull();
  });

  it('avisa quando nenhum método consegue copiar', async () => {
    writeText.mockRejectedValue(new Error('negado'));
    Object.defineProperty(document, 'execCommand', {
      value: vi.fn().mockReturnValue(false),
      configurable: true,
    });
    prepararBlocosDeCodigo(raiz, document);
    const botao = raiz.querySelector<HTMLButtonElement>('.bloco-codigo__copiar')!;
    botao.click();
    await vi.waitFor(() => expect(botao.textContent).toBe('Não foi possível copiar'));
  });
});
