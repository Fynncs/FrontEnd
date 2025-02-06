import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, Input } from '@angular/core';
import { IUser } from '@fynnc.models';
import { PaymentStatus } from 'app/core/models/payment-status.model';
import {
  Chart,
  LinearScale,
  BarElement,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  BarController,
  BubbleController,
  RadarController,
  DoughnutController,
  ScatterController,
  PointElement,
  LineElement,
  LineController,
  ArcElement,
  RadialLinearScale,
  PieController
} from 'chart.js';

@Component({
  selector: 'app-financial-summary',
  templateUrl: './financial-summary.component.html',
  styleUrls: ['./financial-summary.component.scss']
})
export class FinancialSummaryComponent implements AfterViewInit  {
  chart!: Chart;
  // @Input() User?: IUser;
  // @Input() Type?: 'bar' | 'radar' | 'pie' | 'line' | 'doughnut';
  @Input() Month?: Date;
  // @Input() paymentStatus?: PaymentStatus;
  Months: string[] = [];
  // chartType: 'bar' | 'radar' | 'pie' | 'line' | 'doughnut' = 'bar';
  // selectedType: string = 'bar';

  ngOnInit() {
    this.Month = this.Month ?? new Date();
    this.generateNext12Months();
  }

  ngAfterViewInit() {
    this.initialChart();
  }

  async initialChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    Chart.register(
      LinearScale,
      BarElement,
      ScatterController,
      CategoryScale,
      Title,
      Tooltip,
      Legend,
      BarController,
      BubbleController,
      RadarController,
      PointElement,
      LineElement,
      PieController,
      LineController,
      DoughnutController,
      ArcElement,
      RadialLinearScale
    );

    const chartConfig = this.getChartConfig();
    this.chart = new Chart('myChart', chartConfig);
  }

  getChartConfig(): any {
    this.Month?.getMonth();
    const months = this.Months;
    let data: number[] = [];
    let commonData: any;
    commonData = this.createCommonData(months, data, 'Gastos Mensais');
    const commonOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
          position: 'top',
          labels: {
            font: {
              size: 14,
              weight: 'bold'
            },
            color: '#ffff'
            
          }
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              return `R$ ${context.raw.toLocaleString('pt-BR')}`;
            }
          },
          backgroundColor: '#19202b',
          titleColor: '#A0C1D1',
          bodyColor: '#D4EAF7'
        }
      },
      animation: {
        duration: 1000,
        easing: 'easeInOutQuad'
      },
      onClick: (event: any, elements: any[]) => {
        if (commonData.datasets[0].onClick) {
          commonData.datasets[0].onClick(event, elements);
        }
      }
    };

    return {
      type: 'line',
      data: commonData,
      options: {
        
        ...commonOptions,
        scales: {
          x: {
            ticks: {
              font: {
                size: 13, 
              },
              
              color: '#ffff'
            },
            grid: {
              display: false,
              borderColor: 'transparent'
            },
          },
          y: {
            beginAtZero: true,
            display: false,
            grid: {
              display: false 
            },
            ticks: {
              stepSize: 1, 
              callback: function(value: any) {
                return Number(value).toFixed(0);
              }
            }
          },
        }
      }
    };
  }

  createCommonData(labels: string[], data: number[], label: string): object {
    return {
      labels: labels,
      datasets: [{
        label: label,
        data: [6, 84, 1, 26, 1, 52, 62, 33, 82, 82, 12, 100],
        backgroundColor: "#ffff",
        borderColor: '#ffff',
        borderWidth: 1.0,
        hoverBorderWidth: 2,
      }]
    };
  }
  generateNext12Months() {
    this.Months = Array.from({ length: 12 }, (_, i) => {
      const nextMonth = new Date(this.Month as Date);
      if (this.Month) nextMonth.setMonth(this.Month.getMonth() + i);
      return nextMonth.toLocaleString('pt-BR', { month: 'long' });
    });
  }
}