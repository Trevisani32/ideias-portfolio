import { Component, computed, effect, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { of, switchMap } from 'rxjs';
import { BlocosDeCodigo } from '../compartilhado/blocos-de-codigo';
import { Dificuldade } from '../compartilhado/dificuldade';
import { carregando, comEstado } from '../conteudo/carga';
import { ConteudoService } from '../conteudo/conteudo.service';
import { NOME_DO_SITE } from '../conteudo/tipos';
import { NaoEncontrada } from '../nao-encontrada/nao-encontrada';

@Component({
  selector: 'app-ideia',
  imports: [RouterLink, MarkdownComponent, BlocosDeCodigo, Dificuldade, NaoEncontrada],
  templateUrl: './ideia.html',
  styleUrl: './ideia.scss',
})
export class Ideia {
  private readonly conteudo = inject(ConteudoService);
  private readonly titulo = inject(Title);

  /** Vem do parâmetro da rota /ideias/:slug. */
  readonly slug = input.required<string>();

  protected readonly status = this.conteudo.status;
  protected readonly ideia = computed(() => this.conteudo.buscar(this.slug()));
  protected readonly posicao = computed(() => this.conteudo.posicao(this.slug()));
  protected readonly vizinhas = computed(() => this.conteudo.vizinhas(this.slug()));

  /** Só busca o corpo de ideias que estão no índice (evita 404 para endereços inválidos). */
  private readonly slugEncontrado = computed(() => this.ideia()?.slug);
  protected readonly corpo = toSignal(
    toObservable(this.slugEncontrado).pipe(
      switchMap((slug) =>
        slug ? comEstado(this.conteudo.carregarCorpo(slug)) : of(carregando<string>()),
      ),
    ),
    { initialValue: carregando<string>() },
  );

  constructor() {
    effect(() => {
      if (this.status() !== 'pronto') return;
      const ideia = this.ideia();
      this.titulo.setTitle(
        ideia ? `${ideia.titulo} · ${NOME_DO_SITE}` : `Página não encontrada · ${NOME_DO_SITE}`,
      );
    });
  }
}
