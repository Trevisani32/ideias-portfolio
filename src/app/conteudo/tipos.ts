export type Nivel = 1 | 2 | 3;

/** Uma ideia do índice (public/conteudo/indice.json, gerado por scripts/gerar-conteudo.mjs). */
export interface IdeiaResumo {
  slug: string;
  titulo: string;
  /** id do bloco a que a ideia pertence. */
  bloco: string;
  /** Posição dentro do bloco (a ordem sugerida). */
  ordem: number;
  /** Dificuldade de 1 a 3. */
  nivel: Nivel;
  /** Um emoji que representa a ideia. */
  icone: string;
  resumo: string;
  tecnologias: string[];
  treina: string[];
  status: 'publicada' | 'rascunho';
}

/** Um grupo de ideias em ordem progressiva. */
export interface Bloco {
  id: string;
  titulo: string;
  descricao: string;
}

export interface Indice {
  blocos: Bloco[];
  ideias: IdeiaResumo[];
}

export interface BlocoComIdeias extends Bloco {
  /** 1, 2, 3... na ordem em que os blocos aparecem. */
  numero: number;
  ideias: IdeiaResumo[];
}

export interface PosicaoDaIdeia {
  bloco: BlocoComIdeias;
  /** Posição da ideia no bloco, começando em 1. */
  numero: number;
  total: number;
}

/** Página avulsa (conteudo/inicio.md, conteudo/recado.md). */
export interface Pagina {
  titulo: string;
  subtitulo?: string;
  corpo: string;
}

export type StatusDeCarga = 'carregando' | 'pronto' | 'erro';

export const NOMES_DAS_DIFICULDADES: Record<Nivel, string> = {
  1: 'Iniciante',
  2: 'Intermediária',
  3: 'Desafiadora',
};

export const NOME_DO_SITE = 'Ideias de Portfólio';
