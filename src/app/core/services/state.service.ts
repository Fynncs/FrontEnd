
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { State } from '../enum/state.enum';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  private estadoSubject = new BehaviorSubject<State>(State.ORIGINAL);

  getEstado$(): Observable<State> {
    return this.estadoSubject.asObservable();
  }

  setEstado(novoEstado: State): void {
    this.estadoSubject.next(novoEstado);
  }
}
