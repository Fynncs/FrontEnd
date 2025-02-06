import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
export class Expense {
  value: number;
  category: string;
  icon: string;

  constructor(data: { value: number; category: string; icon: string }) {
    this.value = data.value;
    this.category = data.category;
    this.icon = data.icon;
  }
}
@Component({
  selector: 'app-expense-card',
  imports: [CommonModule, MatIconModule,MatMenuModule],
  templateUrl: './expense-card.component.html',
  styleUrl: './expense-card.component.scss'
})
export class ExpenseCardComponent {
  barHeights: number[] = [];
  @Input() category: Expense | undefined;
  
  ngOnInit(){
    console.log(this.category)
  }

  constructor() {
    this.gerarValoresAleatorios();
  }

  gerarValoresAleatorios() {
    this.barHeights = Array.from({ length: 7 }, () => Math.floor(Math.random() * 71) + 30);
  }


}
