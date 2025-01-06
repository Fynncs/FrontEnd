import { Component } from '@angular/core';
import { FinancialData, IFinancialData, IUser, User } from '@fynnc.models';
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

  fakePaymentStatusData: PaymentStatus = new PaymentStatus();
  userData: User = new User({
    id: 1,
    name: 'John',
    fullName: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+1 555-1234',
    birthDate: new Date('1990-05-15'),
    gender: 'male',
    nationality: 'American',
    maritalStatus: 'single',
    profession: 'Software Engineer',
    academicBackground: 'Bachelor in Computer Science',
    username: 'johndoe',
    password: 'password123',
  } as IUser);

  ngOnInit(): void {
    if (!this.fakePaymentStatusData.paidBills) {
      this.fakePaymentStatusData.paidBills = [];
    }
    if (!this.fakePaymentStatusData.unpaidBills) {
      this.fakePaymentStatusData.unpaidBills = [];
    }
    if (!this.userData.paymentStatus) {
      this.userData.paymentStatus = [];
    }
    if (!this.userData.financial) {
      this.userData.financial = [];
    }

    this.fakePaymentStatusData.paidBills.push(this.fakeBillData);
    this.fakePaymentStatusData.unpaidBills.push(this.fakeBillData);
    this.userData.paymentStatus.push(this.fakePaymentStatusData);
    this.userData.financial.push(this.fakeFinancialData);
    console.log(this.userData)
  }
}
