import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FinancialData, IFinancialData, IUser, User } from '@fynnc.models';
import { ChartComponentComponent } from 'app/core/components/dashboard/chart-component/chart-component.component';
import { ExpenseCardComponent } from 'app/core/components/dashboard/expense-card/expense-card.component';
import { FinancialSummaryComponent } from 'app/core/components/entity-creation/financial-sumary/financial-summary/financial-summary.component';
import { TableComponent } from 'app/core/components/entity-creation/table/table.component';
import { TimeComponent } from 'app/core/components/entity-creation/time/time.component';
import { WalletTrackerComponent } from 'app/core/components/entity-creation/wallet-tracker/wallet-tracker/wallet-tracker.component';
import { Bill } from 'app/core/models/bill.mode';
import { IBill } from 'app/core/models/i-bill.model';
import { PaymentStatus } from 'app/core/models/payment-status.model';
export class Expense {
  value: number;
  category: string;

  constructor(data: { value: number; category: string }) {
    this.value = data.value;
    this.category = data.category;
  }
}
@Component({
  selector: 'app-cadastro-despesa',
  standalone: true,
  imports: [MatIconModule, CommonModule, ChartComponentComponent, ExpenseCardComponent, TableComponent, TimeComponent, ExpenseCardComponent, WalletTrackerComponent, FinancialSummaryComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
  templateUrl: './cadastro-despesa.component.html',
  styleUrl: './cadastro-despesa.component.scss'
})
export class CadastroDespesaComponent {
  
  constructor() {
    this.selectedDate = new Date();
  } 
  currentIndex = 0;
  itemsPerPage = 3;

  get pagedExpenses() {
    return this.expenses.slice(this.currentIndex, this.currentIndex + this.itemsPerPage);
  }

  next() {
    if (this.currentIndex + this.itemsPerPage < this.expenses.length) {
      this.currentIndex += this.itemsPerPage;
    }
  }

  prev() {
    if (this.currentIndex - this.itemsPerPage >= 0) {
      this.currentIndex -= this.itemsPerPage;
    }
  }

  user: IUser | undefined;
  expenses: Expense[] = [
    new Expense({ value: 100, category: 'Alimentação' }),
    new Expense({ value: 50, category: 'Transporte' }),
    new Expense({ value: 200, category: 'Lazer' }),
    new Expense({ value: 300, category: 'Saúde' }),
    new Expense({ value: 120, category: 'Educação' }),
    new Expense({ value: 80, category: 'Moradia' }),
    new Expense({ value: 150, category: 'Vestuário' }),
    new Expense({ value: 90, category: 'Assinaturas' }),
    new Expense({ value: 220, category: 'Viagem' }),
    new Expense({ value: 130, category: 'Entretenimento' }),
  ];
  
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
  selectedDate: Date | undefined;
  onDateChange(event: any) {
    this.selectedDate = event.value;
    console.log('Data selecionada:', this.selectedDate);
  }
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
