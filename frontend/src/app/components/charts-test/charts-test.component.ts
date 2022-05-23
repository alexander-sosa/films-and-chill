import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType, ChartOptions} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-charts-test',
  templateUrl: './charts-test.component.html',
  styleUrls: ['./charts-test.component.css']
})
export class ChartsTestComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  // -----------------------------------------------------------------------------------
  // BAR CHART
  // -----------------------------------------------------------------------------------

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    ]
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40 ];

    this.chart?.update();
  }



  // -----------------------------------------------------------------------------------
  // PIE CHART
  // -----------------------------------------------------------------------------------
  @ViewChild(BaseChartDirective) pieChart: BaseChartDirective | undefined;

   // Pie
   public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [ [ 'Download', 'Sales' ], [ 'In', 'Store', 'Sales' ], 'Mail Sales' ],
    datasets: [ {
      data: [ 300, 500, 100 ]
    } ]
  };
  
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [ DataLabelsPlugin ];

  // events
  public pieChartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public pieChartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }

  changeLabels(): void {
    console.log("Trying to change labels...")
    const words = [ 'hen', 'variable', 'embryo', 'instal', 'pleasant', 'physical', 'bomber', 'army', 'add', 'film',
      'conductor', 'comfortable', 'flourish', 'establish', 'circumstance', 'chimney', 'crack', 'hall', 'energy',
      'treat', 'window', 'shareholder', 'division', 'disk', 'temptation', 'chord', 'left', 'hospital', 'beef',
      'patrol', 'satisfied', 'academy', 'acceptance', 'ivory', 'aquarium', 'building', 'store', 'replace', 'language',
      'redeem', 'honest', 'intention', 'silk', 'opera', 'sleep', 'innocent', 'ignore', 'suite', 'applaud', 'funny' ];
    const randomWord = () => words[Math.trunc(Math.random() * words.length)];
    this.pieChartData.labels = new Array(3).map(_ => randomWord());

    this.pieChart?.update();
  }

  addSlice(): void {
    if (this.pieChartData.labels) {
      this.pieChartData.labels.push([ 'Line 1', 'Line 2', 'Line 3' ]);
    }

    this.pieChartData.datasets[0].data.push(400);

    this.pieChart?.update();
  }

  removeSlice(): void {
    if (this.pieChartData.labels) {
      this.pieChartData.labels.pop();
    }

    this.pieChartData.datasets[0].data.pop();

    this.pieChart?.update();
  }

  changeLegendPosition(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.position = this.pieChartOptions.plugins.legend.position === 'left' ? 'top' : 'left';
    }

    this.pieChart?.render();
  }

  toggleLegend(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.display = !this.pieChartOptions.plugins.legend.display;
    }

    this.pieChart?.render();
  }



  // -----------------------------------------------------------------------------------
  // LINE CHART
  // -----------------------------------------------------------------------------------
  @ViewChild(BaseChartDirective) lineChart: BaseChartDirective | undefined;

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.4
      }
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales:{
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: { display: true },
    }
  };

  public lineChartLabels: string[] = [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ];
  public lineChartType: ChartType = 'line';

  public lineChartData: ChartData<'bar'> = {
    labels: this.lineChartLabels,
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
    ]
  };

  // events
  public lineChartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public lineChartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }
}
