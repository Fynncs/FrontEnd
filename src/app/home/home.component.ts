import { Component } from '@angular/core';
import { FinancialData, IFinancialData } from '@fynnc.models';
import { ChartComponentComponent } from 'app/core/components/dashboard/chart-component/chart-component.component';
import { Bill } from 'app/core/models/bill.mode';
import { IBill } from 'app/core/models/i-bill.model';
import { IPaymentStatus } from 'app/core/models/i-payment-status.model';
import { PaymentStatus } from 'app/core/models/payment-status.model';

@Component({
  selector: 'app-home',
  imports: [
    ChartComponentComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  fakeFinancialData: FinancialData = new FinancialData({
    balance: 1500.75,
    budget: 2000,
    expenses: 500.25,
    income: 2500,
    savings: 1000,
    debt: 300,
    investment: 700,
    currency: 'USD',
    lastUpdated: new Date('2024-08-12T10:30:00Z')
  } as IFinancialData);
  fakeBillData: Bill = new Bill({
    id: 1,
    description: "Pagamento de serviço de consultoria",
    amount: 350.75,
    dueDate: "2024-08-15",
    status: "Pendente"
  } as IBill);
  fakePaymentStatusData: PaymentStatus = new PaymentStatus({
    paidBills: this.fakeBillData,
    unpaidBills: this.fakeBillData,
  } as unknown as IPaymentStatus);
}
