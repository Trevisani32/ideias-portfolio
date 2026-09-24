import { Observable, catchError, map, of, startWith } from 'rxjs';
import { StatusDeCarga } from './tipos';

/** Estado de uma busca para a tela: carregando → pronto (com valor) | erro. */
export interface Carga<T> {
  estado: StatusDeCarga;
  valor?: T;
}

export function carregando<T>(): Carga<T> {
  return { estado: 'carregando' };
}

export function comEstado<T>(busca: Observable<T>): Observable<Carga<T>> {
  return busca.pipe(
    map((valor): Carga<T> => ({ estado: 'pronto', valor })),
    catchError(() => of<Carga<T>>({ estado: 'erro' })),
    startWith(carregando<T>()),
  );
}
