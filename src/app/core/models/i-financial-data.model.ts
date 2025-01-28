import { ModelState } from "./state.model";

export interface IFinancialData extends ModelState<IFinancialData> {
    balance?: number;
    budget?: number;
    expenses?: number;
    income?: number;
    savings?: number;
    debt?: number;
    investment?: number;
    currency?: string;
    lastUpdated?: Date;
  }
  