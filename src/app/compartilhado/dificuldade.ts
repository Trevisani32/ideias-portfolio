import { Component, computed, input } from '@angular/core';
import { NOMES_DAS_DIFICULDADES, Nivel } from '../conteudo/tipos';

/** Dificuldade em coraçõezinhos: ♥♥♡ = 2 de 3. */
@Component({
  selector: 'app-dificuldade',
  template: `
    <span class="coracoes" role="img" [attr.aria-label]="descricao()">
      @for (cheio of coracoes(); track $index) {
        <span [class.cheio]="cheio" aria-hidden="true">♥</span>
      }
    </span>
    @if (comNome()) {
      <span class="nome">{{ nome() }}</span>
    }
  `,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--espaco-2);
      white-space: nowrap;
    }
    .coracoes {
      display: inline-flex;
      gap: 1px;
      color: var(--rosa-200);
      font-size: 0.95rem;
      line-height: 1;
    }
    .cheio {
      color: var(--rosa-500);
    }
    .nome {
      color: var(--cor-texto-suave);
      font-size: var(--tamanho-pequeno);
      font-weight: 700;
    }
  `,
})
export class Dificuldade {
  readonly nivel = input.required<Nivel>();
  /** Mostra o nome da dificuldade ao lado dos corações. */
  readonly comNome = input(false);

  protected readonly coracoes = computed(() => [1, 2, 3].map((n) => n <= this.nivel()));
  protected readonly nome = computed(() => NOMES_DAS_DIFICULDADES[this.nivel()]);
  protected readonly descricao = computed(
    () => `Dificuldade ${this.nivel()} de 3: ${this.nome().toLowerCase()}`,
  );
}
