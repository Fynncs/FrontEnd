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

  ngOnInit() {
    this.Month = this.Month ?? new Date();
    this.generateNext12Months();
  }

  ngAfterViewInit() {
    if (this.Type && ['bar', 'radar', 'pie', 'line', 'doughnut'].includes(this.Type)) {
      this.chartType = this.Type;
    }

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
      
      // Adiciona onClick aos dados
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
            color: '#A0C1D1'
          }
        },
        title: {
          display: true,
          text: this.User ? 'Gastos Mensais' : 'Controle Financeiro',
          font: {
            size: 18,
            weight: 'bold'
          },
          color: '#D4EAF7'
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
                  color: '#A0C1D1'
                }
              },
              y: {
                beginAtZero: true,
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                  color: '#D4EAF7',
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
                  color: '#A0C1D1'
                },
                ticks: {
                  color: '#D4EAF7'
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
                  color: '#A0C1D1'
                }
              },
              y: {
                beginAtZero: true,
                ticks: {
                  color: '#D4EAF7'
                }
              }
            }
          }
        };
  
      default:
        throw new Error('Tipo de gráfico não suportado!');
    }
  }
  
  // Métodos de clique
  handlePaidClick() {
    console.log('Pago foi clicado!');
    // Lógica adicional para "Pago"
  }
  
  handleUnpaidClick() {
    console.log('Não Pago foi clicado!');
    // Lógica adicional para "Não Pago"
  }
  
  // Método createCommonData
  createCommonData(labels: string[], data: number[], label: string): object {
    return {
      labels: labels,
      datasets: [{
        label: label,
        data: data,
        backgroundColor: ['#2C3E50', '#8B0000'],
        borderColor: '#000000b4',
        borderWidth: 1.5,
        borderRadius: 5,
        hoverBackgroundColor: '#F0E68C',
        hoverBorderWidth: 2,
        barPercentage: 0.8,
        categoryPercentage: 0.9
      }]
    };
  }
  
  generateNext12Months() {
    this.Months = Array.from({ length: 12 }, (_, i) => {
      const nextMonth = new Date(this.Month as Date);
      if(this.Month)
      nextMonth.setMonth(this.Month.getMonth() + i);      
      return nextMonth.toLocaleString('pt-BR', { month: 'long' });
    });
  }
}
