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
    ctx.height = 100;
    ctx.width = 500;
    new Chart(ctx, {
      type: 'line', 
      data: {
        labels: this.Months, 
        datasets: [{
          label: 'Gasto',
          data: [6, 84, 1, 26, 1, 52, 62, 33, 82, 82, 12, 100. ], 
          borderColor: ['#ffff'], 
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false 
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            display: false,
            grid: {
              display: false 
            },
            ticks: {
              stepSize: 1, 
              callback: function(value) {
                return Number(value).toFixed(0);
              }
            }
          },
          x: {
            display: 'auto',
            grid: {
              display: false 
            },
            ticks: {
              color: '#ffff' // Cor das labels no eixo X
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
