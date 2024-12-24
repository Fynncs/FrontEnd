import { ModeloEstado, IUsuario } from '@fynnc.models';

export class Usuario extends ModeloEstado<IUsuario> implements IUsuario {
  private _id?: number;
  private _nome?: string;
  private _nomeCompleto?: string;
  private _email?: string;
  private _telefone?: string;
  private _dataNascimento?: Date;
  private _sexo?: 'masculino' | 'feminino' | 'outro' | 'não informado';
  private _nacionalidade?: string;
  private _estadoCivil?:
    | 'solteiro'
    | 'casado'
    | 'divorciado'
    | 'viúvo'
    | 'outro';
  private _profissao?: string;
  private _formacaoAcademica?: string;
  private _username?: string;
  private _senha?: string;

  constructor(usuario: IUsuario) {
    super(usuario);
    this._id = usuario.id;
    this._nome = usuario.nome;
    this._nomeCompleto = usuario.nomeCompleto;
    this._email = usuario.email;
    this._telefone = usuario.telefone;
    this._dataNascimento = usuario.dataNascimento;
    this._sexo = usuario.sexo;
    this._nacionalidade = usuario.nacionalidade;
    this._estadoCivil = usuario.estadoCivil;
    this._profissao = usuario.profissao;
    this._formacaoAcademica = usuario.formacaoAcademica;
    this._username = usuario.username;
    this._senha = usuario.senha;
  }

  get id(): number | undefined {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }

  get nome(): string | undefined {
    return this._nome;
  }
  set nome(value: string) {
    this._nome = value;
  }

  get nomeCompleto(): string | undefined {
    return this._nomeCompleto;
  }
  set nomeCompleto(value: string) {
    this._nomeCompleto = value;
  }

  get email(): string | undefined  {
    return this._email;
  }
  set email(value: string) {
    this._email = value;
  }

  get telefone(): string | undefined {
    return this._telefone;
  }
  set telefone(value: string) {
    this._telefone = value;
  }

  get dataNascimento(): Date | undefined {
    return this._dataNascimento;
  }
  set dataNascimento(value: Date) {
    this._dataNascimento = value;
  }

  get sexo(): 'masculino' | 'feminino' | 'outro' | 'não informado' | undefined {
    return this._sexo;
  }
  set sexo(value: 'masculino' | 'feminino' | 'outro' | 'não informado') {
    this._sexo = value;
  }

  get nacionalidade(): string | undefined {
    return this._nacionalidade;
  }
  set nacionalidade(value: string) {
    this._nacionalidade = value;
  }

  get estadoCivil(): 'solteiro' | 'casado' | 'divorciado' | 'viúvo' | 'outro'| undefined  {
    return this._estadoCivil;
  }
  set estadoCivil(
    value: 'solteiro' | 'casado' | 'divorciado' | 'viúvo' | 'outro'
  ) {
    this._estadoCivil = value;
  }

  get profissao(): string | undefined {
    return this._profissao;
  }
  set profissao(value: string | undefined) {
    this._profissao = value;
  }

  get formacaoAcademica(): string | undefined {
    return this._formacaoAcademica;
  }
  set formacaoAcademica(value: string | undefined) {
    this._formacaoAcademica = value;
  }

  get username(): string | undefined {
    return this._username;
  }
  set username(value: string | undefined) {
    this._username = value;
  }

  get senha(): string | undefined {
    return this._senha;
  }
  set senha(value: string | undefined) {
    this._senha = value;
  }
  JSON(): Partial<IUsuario> {
    return {
      id: this.id,
      nome: this.nome,
      nomeCompleto: this.nomeCompleto,
      email: this.email,
      telefone: this.telefone,
      dataNascimento: this.dataNascimento,
      sexo: this.sexo,
      nacionalidade: this.nacionalidade,
      estadoCivil: this.estadoCivil,
      ...(this.profissao !== undefined && { profissao: this.profissao }),
      ...(this.formacaoAcademica !== undefined && {
        formacaoAcademica: this.formacaoAcademica,
      }),
      ...(this.username !== undefined && { username: this.username }),
      ...(this.senha !== undefined && { senha: this.senha }),
    };
  }
}
