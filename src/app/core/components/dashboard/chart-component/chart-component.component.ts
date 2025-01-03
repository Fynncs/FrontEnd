import { Component, AfterViewInit } from '@angular/core';
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
  chartType: 'bar' | 'radar' | 'pie' | 'line' | 'doughnut' = 'bar'; 

  ngAfterViewInit() {
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
    const commonData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: 'Vendas Mensais',
        data: [1200, 1500, 1300, 1100, 1800, 1600, 2000, 1700, 1500, 1400, 1600, 2200],
        backgroundColor: [
          '#2C3E50' ],
        borderColor: '#000000b4',
        borderWidth: 1.5,
        borderRadius: 5,
        hoverBackgroundColor: '#F0E68C',
        hoverBorderWidth: 2,
        barPercentage: 0.8, 
        categoryPercentage: 0.9 

      }]
    };

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
          text: 'Desempenho Mensal de Vendas',
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
}
