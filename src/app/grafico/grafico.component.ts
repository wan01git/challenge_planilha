import { Component, Input } from '@angular/core';
import { ApexOptions } from 'ng-apexcharts';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrl: './grafico.component.scss',
})
export class GraficoComponent {
  @Input() data: any;
  indicadoresVitaisOptions: ApexOptions | undefined;
  chart = {
    series: [
      {
        name: 'Ativas',
        data: [] as any,
      },
      {
        name: 'Canceladas',
        data: [] as any,
      },
    ],
  };
  constructor() {}

  ngOnChanges(): void {
    this.chart.series[0].data = [];
    this.chart.series[1].data = [];

    this.buildChart();
  }

  buildChart(): void {
    // console.log('dados pag grafico', this.dados, '\nteste', this.teste);
    this.chart.series[0].data = [];
    this.chart.series[1].data = [];
    for (const x of this.data) {
      if (x.status === 'Ativa') {
        this.chart.series[0].data.push([x.IDassinante, x.valor.toFixed(2)]);
      } else {
        this.chart.series[1].data.push([x.IDassinante, x.valor.toFixed(2)]);
      }
    }
    this.indicadoresVitaisOptions = {
      chart: {
        animations: {
          speed: 400,
          animateGradually: {
            enabled: true,
          },
        },
        fontFamily: 'inherit',
        foreColor: 'inherit',
        width: '100%',
        height: '100%',
        type: 'area',
        sparkline: {
          enabled: false,
        },
      },
      colors: ['#0acf97', '#BF4300', '#6c757d', '#ff679b'],
      fill: {
        colors: ['#CED9FB', '#AECDFD'],
        opacity: 0.5,
        type: 'solid',
      },
      series: this.chart.series,
      stroke: {
        curve: 'smooth',
        width: 3,
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        followCursor: true,
        theme: 'dark',
        x: {
          format: 'MMM dd, yyyy',
        },
        y: {},
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        labels: {},
      },
    };
  }
}
