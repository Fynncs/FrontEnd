import { Estado } from '../enum/estado.enum';
/**
 * Interface ModeloEstado
 * Contrato básico para qualquer classe de modelo com estado.
 */
export interface IModeloEstado<T> {
  dados: T;
  estado: Estado;
  getAtributosModificados(): (keyof T)[];
  limparAtributosModificados(): void;
  marcarComoNovo(): void;
  marcarComoModificado(): void;
  marcarComoExcluido(): void;
  restaurar(): void;
}
