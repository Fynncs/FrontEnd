import { IBill } from "./i-bill.model";
import { ModelState } from "./state.model";


export class Bill extends ModelState<IBill> implements IBill {
  private _id?: number;
  private _description?: string;
  private _amount?: number;
  private _dueDate?: string;
  private _status?: string;

  constructor(bill: IBill = {} as IBill) {
    super(bill);
    this._id = bill.id;
    this._description = bill.description;
    this._amount = bill.amount;
    this._dueDate = bill.dueDate;
    this._status = bill.status;
  }

  get id(): number | undefined {
    return this._id;
  }

  set id(value: number | undefined) {
    this._id = value;
  }

  get description(): string | undefined {
    return this._description;
  }

  set description(value: string | undefined) {
    this._description = value;
  }

  get amount(): number | undefined {
    return this._amount;
  }

  set amount(value: number | undefined) {
    this._amount = value;
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

  toJSON(): Partial<IBill> {
    return {
      id: this.id,
      description: this.description,
      amount: this.amount,
      dueDate: this.dueDate,
      status: this.status,
    };
  }
}
