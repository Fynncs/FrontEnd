import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-expense-card',
  imports: [CommonModule, MatIconModule,MatMenuModule],
  templateUrl: './expense-card.component.html',
  styleUrl: './expense-card.component.scss'
})
export class ExpenseCardComponent {
  barHeights: number[] = [70, 40, 80, 60, 90, 70, 40];


}
