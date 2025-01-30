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
  barHeights: number[] = [];

  constructor() {
    this.gerarValoresAleatorios();
  }

  gerarValoresAleatorios() {
    this.barHeights = Array.from({ length: 7 }, () => Math.floor(Math.random() * 71) + 30);
  }


}
