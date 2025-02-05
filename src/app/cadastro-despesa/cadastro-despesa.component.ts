import { Component } from '@angular/core';
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


@Component({
  selector: 'app-cadastro-despesa',
  imports: [ChartComponentComponent, ExpenseCardComponent, TableComponent, TimeComponent, ExpenseCardComponent, WalletTrackerComponent, FinancialSummaryComponent],
  templateUrl: './cadastro-despesa.component.html',
  styleUrl: './cadastro-despesa.component.scss'
})
export class CadastroDespesaComponent {
  constructor() {
    // Inicia a data selecionada, caso necessário
    this.selectedDate = new Date();
  }
  user: IUser | undefined;
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
  currentIndex = 0;
  itemsPerMove = 3; // Move 3 itens por vez

  moveCarousel(direction: number) {
    const totalItems = 6; // Número total de itens
    const newIndex = this.currentIndex + direction * this.itemsPerMove;

    if (newIndex >= 0 && newIndex <= totalItems - this.itemsPerMove) {
      this.currentIndex = newIndex;
    }

    const carousel = document.querySelector('.carousel') as HTMLElement;
    carousel.style.transform = `translateX(-${this.currentIndex * 33.33}%)`;
  }
}
