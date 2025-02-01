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
  selector: 'app-chart-component',
  imports:[CommonModule],
  templateUrl: './chart-component.component.html',
  styleUrls: ['./chart-component.component.scss']
})
export class ChartComponentComponent implements AfterViewInit {
  chart!: Chart;
  @Input() User?: IUser;
  @Input() Type?: 'bar' | 'radar' | 'pie' | 'line' | 'doughnut';
  @Input() Month?: Date;
  @Input() paymentStatus?: PaymentStatus;
  Months: string[] = [];
  chartType: 'bar' | 'radar' | 'pie' | 'line' | 'doughnut' = 'bar';
  selectedType: string = 'bar';

  ngOnInit() {
    this.Month = this.Month ?? new Date();
    this.generateNext12Months();
  }

  ngAfterViewInit() {
    this.initialChart()
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
    this.chart = new Chart('meuGrafico', chartConfig);
  }
  getChartConfig(): any {
    this.Month?.getMonth();
    const months = this.Months;
    let data: number[] = [];

    this.User?.financial?.forEach((element) => {
      if (element.debt) {
        data.push(element.debt);
      } else {
        data.push(0);
      }
    });

    let commonData: any;

    if (this.User) {
      commonData = this.createCommonData(months, data, 'Gastos Mensais');
    }
    else if (this.paymentStatus) {
      let paidBills: number = 0;
      let unpaidBills: number = 0;

      this.paymentStatus.paidBills?.forEach((element) => {
        if (element.amount) {
          paidBills += element.amount;
        }
      });

      this.paymentStatus.unpaidBills?.forEach((element) => {
        if (element.amount) {
          unpaidBills += element.amount;
        }
      });

      commonData = this.createCommonData(['Pago', 'Não Pago'], [paidBills, unpaidBills], 'Controle Financeiro');
      commonData.datasets[0].onClick = (event: any, elements: any[]) => {
        if (elements.length > 0) {
          const clickedIndex = elements[0].index;
          if (clickedIndex === 0) {
            this.handlePaidClick();
          } else if (clickedIndex === 1) {
            this.handleUnpaidClick();
          }
        }
      };
    }

    const commonOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            font: {
              size: 14,
              weight: 'bold'
            },
            color: '#000000'
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

    switch (this.chartType) {
      case 'bar':
        return {
          type: 'bar',
          data: commonData,
          options: {
            ...commonOptions,
            scales: {
              x: {
                grid: {
                  display: false
                },
                ticks: {
                  color: '#000000'
                }
              },
              y: {
                beginAtZero: true,
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                  color: '#000000',
                  callback: (value: number) => `R$ ${value.toLocaleString('pt-BR')}`
                }
              }
            }
          }
        };

      case 'radar':
        return {
          type: 'radar',
          data: commonData,
          options: {
            ...commonOptions,
            scales: {
              r: {
                beginAtZero: true,
                angleLines: {
                  display: true,
                  color: '#000000'
                },
                ticks: {
                  color: '#000000'
                }
              }
            }
          }
        };

      case 'pie':
      case 'doughnut':
        return {
          type: this.chartType,
          data: commonData,
          options: {
            ...commonOptions,
            plugins: {
              legend: {
                position: 'right'
              }
            }
          }
        };

      case 'line':
        return {
          type: 'line',
          data: commonData,
          options: {
            ...commonOptions,
            scales: {
              x: {
                ticks: {
                  color: '#000000'
                }
              },
              y: {
                beginAtZero: true,
                ticks: {
                  color: '#000000'
                }
              }
            }
          }
        };

      default:
        throw new Error('Tipo de gráfico não suportado!');
    }
  }
  handlePaidClick() {
    console.log('Pago foi clicado!');
  }

  handleUnpaidClick() {
    console.log('Não Pago foi clicado!');
  }
  createCommonData(labels: string[], data: number[], label: string): object {
    return {
      labels: labels,
      datasets: [{
        label: label,
        data: [160, 149, 260, 275, 115, 121, 187, 161, 216, 257, 252, 136],
        backgroundColor: this.getMonthColor(new Date().getMonth()),
        borderColor: '#000000',
        borderWidth: 1.6,
        borderRadius: 10,
        hoverBackgroundColor: '#F0E68C',
        hoverBorderWidth: 2,
        barPercentage: 0.8,
        categoryPercentage: 0.9
      }]
    };
  }
  getMonthColor(month: number): string[] {
    const colors = [
      '#FFFFFF', // Janeiro
      '#181F37', // Fevereiro
      '#EB5C81', // Março
      '#D86894', // Abril
      '#A76FAC', // Maio
      '#9276B4', // Junho
      '#6D7FBE', // Julho
      '#181F37', // Agosto
      '#EB5C81', // Setembro
      '#D86894', // Outubro
      '#A76FAC', // Novembro
      '#9276B4'  // Dezembro
    ];
    return [colors[month], '#FFFFFF']; 
  }
  mudarTipoGrafico(type: string) {
    if (type && ['bar', 'radar', 'pie', 'line', 'doughnut'].includes(type)) {
      this.chartType = type as 'bar' | 'radar' | 'pie' | 'line' | 'doughnut';
      this.selectedType = type
      this.initialChart()
    }
  }

  generateNext12Months() {
    this.Months = Array.from({ length: 12 }, (_, i) => {
      const nextMonth = new Date(this.Month as Date);
      if (this.Month)
        nextMonth.setMonth(this.Month.getMonth() + i);
      return nextMonth.toLocaleString('pt-BR', { month: 'long' });
    });
  }
}
