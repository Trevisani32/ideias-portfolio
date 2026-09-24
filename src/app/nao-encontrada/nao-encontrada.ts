import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nao-encontrada',
  imports: [RouterLink],
  template: `
    <span class="emoji" aria-hidden="true">🙈</span>
    <h1>Ops! Página não encontrada</h1>
    <p>O endereço não corresponde a nenhuma página ou ideia deste site.</p>
    <a class="botao" routerLink="/">Voltar para o início</a>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: var(--largura-texto);
      margin: var(--espaco-7) auto;
      padding: var(--espaco-7) var(--espaco-5);
      border-radius: 2rem;
      background: var(--gradiente-suave);
      box-shadow: var(--sombra-media);
      text-align: center;
    }
    .emoji {
      font-size: 4rem;
      line-height: 1;
    }
    h1 {
      margin: var(--espaco-4) 0 var(--espaco-2);
    }
    p {
      margin: 0 0 var(--espaco-5);
      color: var(--ameixa-700);
    }
  `,
})
export class NaoEncontrada {}
