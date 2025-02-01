import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-table',
  imports: [CommonModule, MatIconModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  gastos = [
    {
      categoria: 'Alimentação',
      dataVencimento: '15/02/2025',
      valor: 126.00,
      status: 'Aguardando'
    }
  ];
  calcularTempoRestante(dataVencimento: string): string {
    const hoje = new Date();
    const vencimento = new Date(dataVencimento.split("/").reverse().join("-"));
    const diff = vencimento.getTime() - hoje.getTime();

    if (diff <= 0) {
      return 'Vencido';
    }

    const diasRestantes = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${diasRestantes} dias restantes`;
  }
}
