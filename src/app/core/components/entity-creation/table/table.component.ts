import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-table',
  imports: [CommonModule, MatIconModule, MatSelectModule ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  //gastos: { categoria: string | undefined; dataVencimento: string | undefined; valor: number | undefined ; status: string | undefined }[] = [];
  gastos = [
    {
      categoria: 'Transporte',
      dataVencimento: '20/02/2025',
      valor: 75.50,
      status: 'Pago'
    },
    {
      categoria: 'Saúde',
      dataVencimento: '10/03/2025',
      valor: 230.00,
      status: 'Aguardando'
    },
    {
      categoria: 'Educação',
      dataVencimento: '05/04/2025',
      valor: 450.90,
      status: 'Vencido'
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
