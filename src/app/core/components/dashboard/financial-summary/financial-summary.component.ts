import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-financial-summary',
  templateUrl: './financial-summary.component.html',
  styleUrls: ['./financial-summary.component.scss']
})
export class FinancialSummaryComponent implements AfterViewInit  {
  @ViewChild('myChart', { static: false }) chartRef!: ElementRef<HTMLCanvasElement>;
  constructor() {}

  Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  ngAfterViewInit() {
    const ctx = this.chartRef.nativeElement;
    ctx.height = 100;
    ctx.width = 500;

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.Months,
        datasets: [
          {
            label: 'Gasto',
            data: [6, 84, 1, 26, 1, 52, 62, 33, 82, 82, 12, 100],
            borderColor: ['#ffff'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: {
            beginAtZero: true,
            display: false,
            grid: { display: false },
            ticks: {
              stepSize: 1,
              callback: (value) => Number(value).toFixed(0),
            },
          },
          x: {
            display: 'auto',
            grid: { display: false },
            ticks: { color: '#ffff' },
          },
        },
      },
    });
  }
}
