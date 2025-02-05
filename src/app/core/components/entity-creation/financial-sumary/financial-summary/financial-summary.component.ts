import { Component, AfterViewInit } from '@angular/core';
import { Chart, LineElement, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement } from 'chart.js';

@Component({
  selector: 'app-financial-summary',
  templateUrl: './financial-summary.component.html',
  styleUrls: ['./financial-summary.component.scss']
})
export class FinancialSummaryComponent implements AfterViewInit {

  ngAfterViewInit() {
    console.log("Inicializando o gráfico...");
    this.initialChart();
  }
  async initialChart() {
    Chart.register(
      LineElement,
      Title,
      Tooltip,
      Legend,
      CategoryScale,
      LinearScale,
      PointElement
    );
    const chartConfig = this.getChartConfig();
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    
    new Chart(ctx, chartConfig);
  }

  getChartConfig(): any {
    const commonData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'Financial Data',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: '#42A5F5',
        backgroundColor: 'rgba(66, 165, 245, 0.2)',
        fill: true,
      }]
    };
  
    const commonOptions = {
      responsive: true,
      plugins: {

        tooltip: {
          mode: 'index',
          intersect: false
        },
        legend: {
          display: false  // Desabilita a exibição da legenda
        }
      },
      interaction: {
        mode: 'nearest',
        intersect: false,  // Desabilita o destaque dos pontos
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
              color: '#000000',
              display: false  // Remove os rótulos do eixo X (meses)
            },
            grid: {
              display: false  // Remove as linhas de fundo do eixo X
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: '#000000',
              display: false  // Remove os valores e a linha do eixo Y
            },
            grid: {
              display: false  // Remove as linhas de fundo do eixo Y
            }
          }
        }
      }
    };
  }
  
}
