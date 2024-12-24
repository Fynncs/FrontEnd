import { BehaviorSubject, Observable } from 'rxjs';
import { Estado } from '../enum/estado.enum';
import { IModeloEstado } from './i-estado.model';

/**
 * Classe genérica para gerenciar o estado de um modelo.
 * Permite rastrear modificações, controlar estados e notificar mudanças através de observáveis.
 *
 * @template T Tipo do modelo representado pela classe.
 */
export class ModeloEstado<T extends Record<string, any>> implements IModeloEstado<T> {
  /** Dados originais do modelo. */
  private _dados: T;

  /** Proxy que intercepta modificações nos dados. */
  private _proxy: T;

  /** Estado atual do modelo (ORIGINAL, NOVO, MODIFICADO, EXCLUIDO). */
  private _estado: Estado;

  /** Observable que notifica mudanças de estado. */
  private _estadoSubject: BehaviorSubject<Estado>;

  /** Conjunto que armazena os atributos modificados. */
  private _atributosModificados: Set<keyof T>;

  /**
   * Cria uma instância de ModeloEstado.
   * @param {T} dados - Dados iniciais do modelo.
   * @param {Estado} [estado=Estado.ORIGINAL] - Estado inicial do modelo.
   */
  constructor(dados: T, estado: Estado = Estado.ORIGINAL) {
    this._dados = { ...dados };
    this._estado = estado;
    this._estadoSubject = new BehaviorSubject<Estado>(this._estado);
    this._atributosModificados = new Set<keyof T>();

    this._proxy = this._criarProxy(this._dados);
  }

  /**
   * Cria um Proxy para interceptar alterações nos dados do modelo.
   * @param {T} obj - Objeto original do modelo.
   * @returns {T} Proxy do objeto do modelo.
   * @private
   */
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

  /**
   * Obtém os dados do modelo através do Proxy.
   * @returns {T} Dados do modelo.
   */
  get dados(): T {
    return this._proxy;
  }

  /**
   * Retorna um Observable que notifica mudanças no estado do modelo.
   * @returns {Observable<Estado>} Observable do estado.
   */
  get estado$(): Observable<Estado> {
    return this._estadoSubject.asObservable();
  }

  /**
   * Retorna o estado atual do modelo.
   * @returns {Estado} Estado atual do modelo.
   */
  get estado(): Estado {
    return this._estado;
  }

  /**
   * Altera o estado atual do modelo e notifica os observadores.
   * @param {Estado} novoEstado - Novo estado a ser definido.
   * @private
   */
  private setEstado(novoEstado: Estado): void {
    this._estado = novoEstado;
    this._estadoSubject.next(novoEstado);
  }

  /**
   * Marca o modelo como NOVO.
   */
  marcarComoNovo(): void {
    this.setEstado(Estado.NOVO);
  }

  /**
   * Marca o modelo como MODIFICADO, se aplicável.
   */
  marcarComoModificado(): void {
    if (this._estado !== Estado.NOVO && this._estado !== Estado.EXCLUIDO) {
      this.setEstado(Estado.MODIFICADO);
    }
  }

  /**
   * Marca o modelo como EXCLUIDO, se permitido.
   * @throws {Error} Lança um erro se o modelo estiver no estado NOVO.
   */
  marcarComoExcluido(): void {
    if (this._estado === Estado.NOVO) {
      throw new Error('Itens novos não podem ser marcados como excluídos.');
    }
    this.setEstado(Estado.EXCLUIDO);
  }

  /**
   * Restaura o modelo ao estado ORIGINAL.
   * Limpa os atributos modificados.
   */
  restaurar(): void {
    if (this._estado === Estado.EXCLUIDO) {
      this.setEstado(Estado.ORIGINAL);
    }
    this._atributosModificados.clear();
  }

  /**
   * Obtém uma lista dos atributos modificados no modelo.
   * @returns {(keyof T)[]} Lista de atributos modificados.
   */
  getAtributosModificados(): (keyof T)[] {
    return Array.from(this._atributosModificados);
  }

  /**
   * Limpa todos os atributos marcados como modificados.
   */
  limparAtributosModificados(): void {
    this._atributosModificados.clear();
  }

  /**
   * Verifica se o estado atual é NOVO.
   * @returns {boolean} Verdadeiro se o estado for NOVO.
   */
  isNovo(): boolean {
    return this._estado === Estado.NOVO;
  }

  /**
   * Verifica se o estado atual é MODIFICADO.
   * @returns {boolean} Verdadeiro se o estado for MODIFICADO.
   */
  isModificado(): boolean {
    return this._estado === Estado.MODIFICADO;
  }

  /**
   * Verifica se o estado atual é EXCLUIDO.
   * @returns {boolean} Verdadeiro se o estado for EXCLUIDO.
   */
  isExcluido(): boolean {
    return this._estado === Estado.EXCLUIDO;
  }

  /**
   * Verifica se o estado atual é ORIGINAL.
   * @returns {boolean} Verdadeiro se o estado for ORIGINAL.
   */
  isOriginal(): boolean {
    return this._estado === Estado.ORIGINAL;
  }
}
