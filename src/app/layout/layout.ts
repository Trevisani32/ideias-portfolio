import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ConteudoService } from '../conteudo/conteudo.service';
import { NOME_DO_SITE } from '../conteudo/tipos';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  protected readonly conteudo = inject(ConteudoService);
  protected readonly nomeDoSite = NOME_DO_SITE;

  constructor() {
    this.conteudo.carregarIndice();
  }
}
