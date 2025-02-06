import { ModelState } from "../state.model";
import { ICategory } from "./i-category.model";

export class Category extends ModelState<ICategory> implements ICategory {
  private _name?: string;
  private _icon?: string;
  private _color?: string;
  private _userId?: string;
  private _status?: string;
  private _id?: string;
  private _dueDate?: string;  

  constructor(category: ICategory = {} as ICategory) {
    super(category);
    this._name = category.name;
    this._color = category.color;
    this._icon = category.icon;
    this._userId = category.userId;
    this._status = category.status;
    this._id = category.id;
  }

  get id(): string | undefined {
    return this._id;
  }

  set id(value: string | undefined) {
    this._id = value;
  }

  get name(): string | undefined {
    return this._name;
  }

  set name(value: string | undefined) {
    this._name = value;
  }

  get color(): string | undefined {
    return this._color;
  }

  set color(value: string | undefined) {
    this._color = value;
  }

  get userId(): string | undefined {
    return this._userId;
  }

  set userId(value: string | undefined) {
    this._userId = value;
  }

  get dueDate(): string | undefined {
    return this._dueDate;
  }

  set dueDate(value: string | undefined) {
    this._dueDate = value;
  }

  get status(): string | undefined {
    return this._status;
  }

  set status(value: string | undefined) {
    this._status = value;
  }
  get icon(): string | undefined {
    return this._icon;
  }

  set icon(value: string | undefined) {
    this._icon = value;
  }

  toJSON(): Partial<ICategory> {  // Corrigido para ICategory
    return {
      id: this.id,
      name: this.name,
      color: this.color,
      userId: this.userId,

      status: this.status,
    };
  }
}
