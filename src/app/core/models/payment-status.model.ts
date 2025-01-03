import { IBill } from "./i-bill.model";
import { IPaymentStatus } from "./i-payment-status.model";
import { ModelState } from "./state.model";


export class PaymentStatus extends ModelState<IPaymentStatus> implements IPaymentStatus {   
  private _paidBills?: IBill[];
  private _unpaidBills?: IBill[];


  constructor(paymentStatus: IPaymentStatus = {} as IPaymentStatus) {
    super(paymentStatus);
    this._paidBills = paymentStatus.paidBills;
    this._unpaidBills = paymentStatus.unpaidBills;
  }
  get paidBills(): IBill[] | undefined {
    return this._paidBills;
  }

  set paidBills(value: IBill[] | undefined) {
    this._paidBills = value;
  }

  get unpaidBills(): IBill[] | undefined {
    return this._unpaidBills;
  }

  set unpaidBills(value: IBill[] | undefined) {
    this._unpaidBills = value;
  }

  toJSON(): Partial<IPaymentStatus> {
    return {
      paidBills: this.paidBills,
      unpaidBills: this.unpaidBills,
    };
  }
}
