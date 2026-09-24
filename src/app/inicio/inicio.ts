import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { BlocosDeCodigo } from '../compartilhado/blocos-de-codigo';
import { Dificuldade } from '../compartilhado/dificuldade';
import { carregando, comEstado } from '../conteudo/carga';
import { ConteudoService } from '../conteudo/conteudo.service';
import { Pagina } from '../conteudo/tipos';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink, MarkdownComponent, BlocosDeCodigo, Dificuldade],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
})
export class Inicio {
  protected readonly conteudo = inject(ConteudoService);
  protected readonly pagina = toSignal(comEstado(this.conteudo.carregarPagina('inicio')), {
    initialValue: carregando<Pagina>(),
  });
  protected readonly primeiraIdeia = computed(() => this.conteudo.ideias()[0]);
}
