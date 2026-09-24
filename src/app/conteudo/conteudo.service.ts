import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import {
  BlocoComIdeias,
  IdeiaResumo,
  Indice,
  Pagina,
  PosicaoDaIdeia,
  StatusDeCarga,
} from './tipos';

export type NomeDaPagina = 'inicio' | 'recado';

/**
 * Lê o conteúdo gerado em public/conteudo/.
 * Os caminhos são relativos (sem "/" no começo) para respeitar o baseHref do GitHub Pages.
 */
@Injectable({ providedIn: 'root' })
export class ConteudoService {
  private readonly http = inject(HttpClient);

  private readonly _indice = signal<Indice>({ blocos: [], ideias: [] });
  private readonly _status = signal<StatusDeCarga>('carregando');
  private carregando = false;

  readonly status = this._status.asReadonly();

  /** Todas as ideias, na ordem do índice (bloco e ordem sugerida). */
  readonly ideias = computed(() => this._indice().ideias);

  /** Blocos numerados, cada um com as suas ideias. Blocos sem ideias ficam de fora. */
  readonly blocos = computed<BlocoComIdeias[]>(() => {
    const { blocos, ideias } = this._indice();
    return blocos
      .map((bloco) => ({ ...bloco, ideias: ideias.filter((ideia) => ideia.bloco === bloco.id) }))
      .filter((bloco) => bloco.ideias.length > 0)
      .map((bloco, posicao) => ({ ...bloco, numero: posicao + 1 }));
  });

  /** Busca o índice uma única vez; se falhar, uma nova chamada tenta de novo. */
  carregarIndice(): void {
    if (this.carregando || this._status() === 'pronto') return;
    this.carregando = true;
    this._status.set('carregando');
    this.http.get<Indice>('conteudo/indice.json').subscribe({
      next: (indice) => {
        this._indice.set(indice);
        this._status.set('pronto');
        this.carregando = false;
      },
      error: () => {
        this._status.set('erro');
        this.carregando = false;
      },
    });
  }

  buscar(slug: string): IdeiaResumo | undefined {
    return this.ideias().find((ideia) => ideia.slug === slug);
  }

  posicao(slug: string): PosicaoDaIdeia | undefined {
    for (const bloco of this.blocos()) {
      const posicao = bloco.ideias.findIndex((ideia) => ideia.slug === slug);
      if (posicao !== -1) return { bloco, numero: posicao + 1, total: bloco.ideias.length };
    }
    return undefined;
  }

  vizinhas(slug: string): { anterior?: IdeiaResumo; proxima?: IdeiaResumo } {
    const ideias = this.ideias();
    const posicao = ideias.findIndex((ideia) => ideia.slug === slug);
    if (posicao === -1) return {};
    return { anterior: ideias[posicao - 1], proxima: ideias[posicao + 1] };
  }

  carregarCorpo(slug: string): Observable<string> {
    return this.http.get(`conteudo/ideias/${encodeURIComponent(slug)}.md`, {
      responseType: 'text',
    });
  }

  carregarPagina(nome: NomeDaPagina): Observable<Pagina> {
    return this.http.get<Pagina>(`conteudo/${nome}.json`);
  }
}
