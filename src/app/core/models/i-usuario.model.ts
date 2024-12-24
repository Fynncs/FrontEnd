import { ModeloEstado } from "@fynnc.models";

export interface IUsuario  extends ModeloEstado<IUsuario>{
    id?: number;
    nome?: string;
    nomeCompleto?: string;
    email?: string;
    telefone?: string;
    dataNascimento?: Date;
    sexo?: 'masculino' | 'feminino' | 'outro' | 'não informado';
    nacionalidade?: string;
    estadoCivil?: 'solteiro' | 'casado' | 'divorciado' | 'viúvo' | 'outro';
    profissao?: string;
    formacaoAcademica?: string;
    username?: string;
    senha?: string;
  }
  