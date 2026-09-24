import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideMarkdown } from 'ngx-markdown';
import { ConteudoService } from '../conteudo/conteudo.service';
import { Indice } from '../conteudo/tipos';
import { Ideia } from './ideia';

const INDICE: Indice = {
  blocos: [{ id: 'primeiros', titulo: 'Primeiros projetos', descricao: 'Descrição.' }],
  ideias: [
    {
      slug: 'alfa',
      titulo: 'Alfa',
      bloco: 'primeiros',
      ordem: 1,
      nivel: 1,
      icone: '☕',
      resumo: 'Resumo da alfa.',
      tecnologias: ['HTML', 'CSS'],
      treina: ['Um', 'Dois', 'Três'],
      status: 'publicada',
    },
    {
      slug: 'beta',
      titulo: 'Beta',
      bloco: 'primeiros',
      ordem: 2,
      nivel: 2,
      icone: '🧠',
      resumo: 'Resumo da beta.',
      tecnologias: ['JavaScript'],
      treina: ['Um', 'Dois', 'Três'],
      status: 'rascunho',
    },
  ],
};

describe('Ideia', () => {
  let http: HttpTestingController;
  let fixture: ComponentFixture<Ideia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ideia],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideMarkdown(),
      ],
    }).compileComponents();
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  async function abrir(slug: string) {
    fixture = TestBed.createComponent(Ideia);
    fixture.componentRef.setInput('slug', slug);
    TestBed.inject(ConteudoService).carregarIndice();
    http.expectOne('conteudo/indice.json').flush(INDICE);
    await fixture.whenStable();
    fixture.detectChanges();
  }

  async function atualizar() {
    await fixture.whenStable();
    fixture.detectChanges();
  }

  const texto = () => ((fixture.nativeElement as HTMLElement).textContent ?? '').replace(/\s+/g, ' ');

  it('mostra "não encontrada" para slug fora do índice, sem buscar o corpo', async () => {
    await abrir('nao-existe');
    expect(texto()).toContain('Página não encontrada');
    http.expectNone('conteudo/ideias/nao-existe.md');
    expect(TestBed.inject(Title).getTitle()).toBe('Página não encontrada · Ideias de Portfólio');
  });

  it('mostra a capa com posição e dificuldade, busca o corpo e renderiza o Markdown', async () => {
    await abrir('alfa');
    expect(texto()).toContain('Alfa');
    expect(texto()).toContain('Bloco 1 · Primeiros projetos · Ideia 1 de 2');
    expect(texto()).toContain('Iniciante');
    expect(texto()).toContain('Resumo da alfa.');
    expect(texto()).toContain('Carregando…');

    http.expectOne('conteudo/ideias/alfa.md').flush('## Sobre o projeto\n\nTexto da alfa.');
    await atualizar();

    expect(texto()).toContain('Texto da alfa.');
    expect(texto()).toContain('Próxima →');
    expect(TestBed.inject(Title).getTitle()).toBe('Alfa · Ideias de Portfólio');
  });

  it('mostra erro se o corpo não carrega, mantendo a capa', async () => {
    await abrir('beta');
    http.expectOne('conteudo/ideias/beta.md').flush('x', { status: 404, statusText: 'Not Found' });
    await atualizar();

    expect(texto()).toContain('Beta');
    expect(texto()).toContain('Rascunho');
    expect(texto()).toContain('Não foi possível carregar as ideias.');
    expect(texto()).toContain('← Anterior');
  });
});
