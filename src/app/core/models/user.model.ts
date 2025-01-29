import { ModelState, IUser, IPerson } from '@fynnc.models';

export class User extends ModelState<IUser> implements IUser {
  private _id?: string | undefined;
  private _login?: string[] | undefined;
  private _oauthProvider?: string;
  private _password?: string;
  private _person?: IPerson;

  constructor(user: IUser = {} as IUser) {
    super(user);
    this._id = user.id;
    this._login = user.login;
    this._oauthProvider = user.oauthProvider;
    this._password = user.password;
    this._person = user.person;
  }

  public get id(): string | undefined {
    return this._id;
  }
  public set id(value: string | undefined) {
    this._id = value;
  }

  public get login(): string[] | undefined {
    return this._login;
  }
  public set login(value: string[] | undefined) {
    this._login = value;
  }

  public get oauthProvider(): string | undefined {
    return this._oauthProvider;
  }
  public set oauthProvider(value: string | undefined) {
    this._oauthProvider = value;
  }

  public get password(): string | undefined {
    return this._password;
  }
  public set password(value: string | undefined) {
    this._password = value;
  }

  public get person(): IPerson | undefined {
    return this._person;
  }
  public set person(value: IPerson | undefined) {
    this._person = value;
  }

  toJSON(): Partial<IUser> {
    return {
      id: this.id,
      login: this.login,
      oauthProvider: this.oauthProvider,
      password: this.password,
      person: this.person,
    };
  }
}
