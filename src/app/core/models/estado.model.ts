// 📁 models/modelo-estado.model.ts

import { BehaviorSubject, Observable } from 'rxjs';
import { Estado } from '../enum/estado.enum';

export class ModeloEstado<T extends Record<string, any>> {
  private _dados: T;
  private _proxy: T;
  private _estado: Estado;
  private _estadoSubject: BehaviorSubject<Estado>;
  private _atributosModificados: Set<keyof T>;

  constructor(dados: T, estado: Estado = Estado.ORIGINAL) {
    this._dados = { ...dados };
    this._estado = estado;
    this._estadoSubject = new BehaviorSubject<Estado>(this._estado);
    this._atributosModificados = new Set<keyof T>();

    this._proxy = this._criarProxy(this._dados);
  }

  private _criarProxy(obj: T): T {
    return new Proxy(obj, {
      set: (target, propriedade, valor) => {
        if (typeof propriedade === 'string' && propriedade in target) {
          if (target[propriedade as keyof T] !== valor) {
            this._atributosModificados.add(propriedade as keyof T);
            target[propriedade as keyof T] = valor;
  
            if (this._estado === Estado.ORIGINAL) {
              this.marcarComoModificado();
            }
          }
        }
        return true;
      }
    });
  }
  
  get dados(): T {
    return this._proxy;
  }

  get estado$(): Observable<Estado> {
    return this._estadoSubject.asObservable();
  }

  get estado(): Estado {
    return this._estado;
  }

  private setEstado(novoEstado: Estado) {
    this._estado = novoEstado;
    this._estadoSubject.next(novoEstado);
  }

  marcarComoNovo(): void {
    this.setEstado(Estado.NOVO);
  }

  marcarComoModificado(): void {
    if (this._estado !== Estado.NOVO && this._estado !== Estado.EXCLUIDO) {
      this.setEstado(Estado.MODIFICADO);
    }
  }

  marcarComoExcluido(): void {
    if (this._estado === Estado.NOVO) {
      throw new Error('Itens novos não podem ser marcados como excluídos.');
    }
    this.setEstado(Estado.EXCLUIDO);
  }

  restaurar(): void {
    if (this._estado === Estado.EXCLUIDO) {
      this.setEstado(Estado.ORIGINAL);
    }
    this._atributosModificados.clear();
  }

  getAtributosModificados(): (keyof T)[] {
    return Array.from(this._atributosModificados);
  }

  limparAtributosModificados(): void {
    this._atributosModificados.clear();
  }

  isNovo(): boolean {
    return this._estado === Estado.NOVO;
  }

  isModificado(): boolean {
    return this._estado === Estado.MODIFICADO;
  }

  isExcluido(): boolean {
    return this._estado === Estado.EXCLUIDO;
  }

  isOriginal(): boolean {
    return this._estado === Estado.ORIGINAL;
  }
}
