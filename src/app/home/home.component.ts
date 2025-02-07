import { Component } from '@angular/core';
import { FinancialData, IFinancialData, IUser, User } from '@fynnc.models';
import { ChartComponentComponent } from 'app/core/components/dashboard/chart-component/chart-component.component';
import { Bill } from 'app/core/models/bill.mode';
import { IBill } from 'app/core/models/i-bill.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { PaymentStatus } from 'app/core/models/payment-status.model';
import { environment } from 'environments/environment';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatNativeDateModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  isDevelopment = environment.isDevelopment;
  constructor() {
  }
}
