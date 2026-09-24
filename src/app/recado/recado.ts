import { Component, ViewEncapsulation, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MarkdownComponent } from 'ngx-markdown';
import { carregando, comEstado } from '../conteudo/carga';
import { ConteudoService } from '../conteudo/conteudo.service';
import { Pagina } from '../conteudo/tipos';

/**
 * Página "Para você": o recado escrito em conteudo/recado.md, com cara de cartinha.
 * Sem encapsulamento, para o estilo alcançar os parágrafos gerados pelo Markdown
 * (as classes .mesa e .carta só existem aqui).
 */
@Component({
  selector: 'app-recado',
  imports: [MarkdownComponent],
  templateUrl: './recado.html',
  styleUrl: './recado.scss',
  encapsulation: ViewEncapsulation.None,
})
export class Recado {
  protected readonly pagina = toSignal(
    comEstado(inject(ConteudoService).carregarPagina('recado')),
    { initialValue: carregando<Pagina>() },
  );
}
