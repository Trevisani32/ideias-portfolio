import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ConteudoService } from './conteudo.service';
import { IdeiaResumo, Indice, Nivel } from './tipos';

function ideia(slug: string, bloco: string, ordem: number, nivel: Nivel = 1): IdeiaResumo {
  return {
    slug,
    titulo: `Ideia ${slug}`,
    bloco,
    ordem,
    nivel,
    icone: '✨',
    resumo: 'Resumo.',
    tecnologias: ['HTML'],
    treina: ['Um', 'Dois', 'Três'],
    status: 'publicada',
  };
}

const INDICE: Indice = {
  blocos: [
    { id: 'primeiro', titulo: 'Primeiro bloco', descricao: 'Descrição 1.' },
    { id: 'vazio', titulo: 'Bloco sem ideias', descricao: 'Descrição 2.' },
    { id: 'segundo', titulo: 'Segundo bloco', descricao: 'Descrição 3.' },
  ],
  ideias: [ideia('a', 'primeiro', 1), ideia('b', 'primeiro', 2), ideia('c', 'segundo', 1, 3)],
};

describe('ConteudoService', () => {
  let servico: ConteudoService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    servico = TestBed.inject(ConteudoService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  function carregar(resposta: Indice = INDICE) {
    servico.carregarIndice();
    http.expectOne('conteudo/indice.json').flush(resposta);
  }

  it('começa carregando e fica pronto com o índice', () => {
    expect(servico.status()).toBe('carregando');
    carregar();
    expect(servico.status()).toBe('pronto');
    expect(servico.ideias().map((i) => i.slug)).toEqual(['a', 'b', 'c']);
  });

  it('agrupa por bloco, numera os blocos e omite blocos sem ideias', () => {
    carregar();
    const blocos = servico.blocos();
    expect(blocos.map((b) => [b.id, b.numero])).toEqual([
      ['primeiro', 1],
      ['segundo', 2],
    ]);
    expect(blocos[0].ideias.map((i) => i.slug)).toEqual(['a', 'b']);
  });

  it('com índice vazio fica pronto e sem blocos', () => {
    carregar({ blocos: [], ideias: [] });
    expect(servico.status()).toBe('pronto');
    expect(servico.blocos()).toEqual([]);
  });

  it('busca por slug e devolve undefined para slug inexistente', () => {
    carregar();
    expect(servico.buscar('b')?.titulo).toBe('Ideia b');
    expect(servico.buscar('nao-existe')).toBeUndefined();
  });

  it('informa a posição da ideia dentro do bloco', () => {
    carregar();
    const posicao = servico.posicao('b');
    expect(posicao?.bloco.id).toBe('primeiro');
    expect(posicao?.numero).toBe(2);
    expect(posicao?.total).toBe(2);
    expect(servico.posicao('c')?.bloco.numero).toBe(2);
    expect(servico.posicao('nao-existe')).toBeUndefined();
  });

  it('calcula anterior e próxima pela ordem do índice, atravessando blocos', () => {
    carregar();
    const [a, b, c] = INDICE.ideias;
    expect(servico.vizinhas('a')).toEqual({ anterior: undefined, proxima: b });
    expect(servico.vizinhas('b')).toEqual({ anterior: a, proxima: c });
    expect(servico.vizinhas('c')).toEqual({ anterior: b, proxima: undefined });
    expect(servico.vizinhas('nao-existe')).toEqual({});
  });

  it('não repete a requisição do índice', () => {
    servico.carregarIndice();
    servico.carregarIndice();
    http.expectOne('conteudo/indice.json').flush(INDICE);
    servico.carregarIndice();
    http.expectNone('conteudo/indice.json');
  });

  it('marca erro quando o índice não carrega e permite tentar de novo', () => {
    servico.carregarIndice();
    http
      .expectOne('conteudo/indice.json')
      .flush('falhou', { status: 500, statusText: 'Erro' });
    expect(servico.status()).toBe('erro');

    carregar();
    expect(servico.status()).toBe('pronto');
  });

  it('sempre confere com o servidor, para não mostrar conteúdo velho do cache', () => {
    servico.carregarIndice();
    expect(http.expectOne('conteudo/indice.json').request.cache).toBe('no-cache');

    servico.carregarCorpo('a').subscribe();
    expect(http.expectOne('conteudo/ideias/a.md').request.cache).toBe('no-cache');

    servico.carregarPagina('inicio').subscribe();
    expect(http.expectOne('conteudo/inicio.json').request.cache).toBe('no-cache');
  });

  it('busca o corpo da ideia como texto e as páginas como JSON', () => {
    let corpo = '';
    servico.carregarCorpo('a').subscribe((texto) => (corpo = texto));
    const requisicao = http.expectOne('conteudo/ideias/a.md');
    expect(requisicao.request.responseType).toBe('text');
    requisicao.flush('## Sobre o projeto');
    expect(corpo).toBe('## Sobre o projeto');

    let titulo = '';
    servico.carregarPagina('recado').subscribe((pagina) => (titulo = pagina.titulo));
    http.expectOne('conteudo/recado.json').flush({ titulo: 'Para você', corpo: 'Oi.' });
    expect(titulo).toBe('Para você');
  });
});
