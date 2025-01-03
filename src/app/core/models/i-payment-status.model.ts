import { IBill } from "./i-bill.model";
import { ModelState } from "./state.model";

export interface IPaymentStatus extends ModelState<IPaymentStatus>{
    paidBills?: IBill[];
    unpaidBills?: IBill[];
  }