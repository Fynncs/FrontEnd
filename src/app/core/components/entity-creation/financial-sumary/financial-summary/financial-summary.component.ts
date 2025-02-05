import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-financial-summary',
  templateUrl: './financial-summary.component.html',
  styleUrls: ['./financial-summary.component.scss']
})
export class FinancialSummaryComponent implements OnInit {
  constructor() {}

  Month: Date = new Date(); // Inicializa a data com a data atual
  Months: string[] = [];

  ngOnInit(): void {
    this.generateNext12Months();
    this.createChart();
  }

  createChart(): void {
    var ctx = document.getElementById('myChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line', 
      data: {
        labels: this.Months, // Corrigido aqui para usar diretamente o array `Months`
        datasets: [{
          label: 'Vendas',
          data: [12, 19, 3], // Dados para o gráfico
          borderColor: 'rgb(75, 192, 192)', // Cor da linha
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false // Isso desativa a legenda
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: false // Isso desativa a grade (grid) de fundo no eixo Y
            }
          },
          x: {
            grid: {
              display: false // Isso desativa a grade (grid) de fundo no eixo X
            }
          }
        }
      }
    });
  }
  
  

  generateNext12Months(): void {
    this.Months = Array.from({ length: 12 }, (_, i) => {
      const nextMonth = new Date(this.Month);
      nextMonth.setMonth(this.Month.getMonth() + i);
      return nextMonth.toLocaleString('pt-BR', { month: 'long' });
    });
  }
}
