import { ModelState, IFinancialData } from '@fynnc.models';

export class FinancialData extends ModelState<IFinancialData> implements IFinancialData {
  private _balance?: number;
  private _budget?: number;
  private _expenses?: number;
  private _income?: number;
  private _savings?: number;
  private _debt?: number;
  private _investment?: number;
  private _currency?: string;
  private _lastUpdated?: Date;

  constructor(financialData: IFinancialData = {} as IFinancialData) {
    super(financialData);
    this._balance = financialData.balance;
    this._budget = financialData.budget;
    this._expenses = financialData.expenses;
    this._income = financialData.income;
    this._savings = financialData.savings;
    this._debt = financialData.debt;
    this._investment = financialData.investment;
    this._currency = financialData.currency;
    this._lastUpdated = financialData.lastUpdated;
  }

  get balance(): number | undefined {
    return this._balance;
  }
  set balance(value: number) {
    this._balance = value;
  }

  get budget(): number | undefined {
    return this._budget;
  }
  set budget(value: number) {
    this._budget = value;
  }

  get expenses(): number | undefined {
    return this._expenses;
  }
  set expenses(value: number) {
    this._expenses = value;
  }

  get income(): number | undefined {
    return this._income;
  }
  set income(value: number) {
    this._income = value;
  }

  get savings(): number | undefined {
    return this._savings;
  }
  set savings(value: number) {
    this._savings = value;
  }

  get debt(): number | undefined {
    return this._debt;
  }
  set debt(value: number) {
    this._debt = value;
  }

  get investment(): number | undefined {
    return this._investment;
  }
  set investment(value: number) {
    this._investment = value;
  }

  get currency(): string | undefined {
    return this._currency;
  }
  set currency(value: string) {
    this._currency = value;
  }

  get lastUpdated(): Date | undefined {
    return this._lastUpdated;
  }
  set lastUpdated(value: Date) {
    this._lastUpdated = value;
  }

  toJSON(): Partial<IFinancialData> {
    return {
      balance: this.balance,
      budget: this.budget,
      expenses: this.expenses,
      income: this.income,
      savings: this.savings,
      debt: this.debt,
      investment: this.investment,
      currency: this.currency,
      lastUpdated: this.lastUpdated,
    };
  }
}
