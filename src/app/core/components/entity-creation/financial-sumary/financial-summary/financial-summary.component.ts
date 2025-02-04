import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-financial-summary',
  imports: [CommonModule],
  templateUrl: './financial-summary.component.html',
  styleUrl: './financial-summary.component.scss'
})
export class FinancialSummaryComponent {
  @Input() expenses: { value: number }[] = [];
  @Input() totalBudget: number = 5000; 
  totalExpenses: number = 0;
  availableBalance: number = 0;

  ngOnChanges(): void {
    this.calculateSummary();
  }

  private calculateSummary(): void {
    this.totalExpenses = this.expenses.reduce((sum, expense) => sum + expense.value, 0);
    this.availableBalance = this.totalBudget - this.totalExpenses;
  }
}
