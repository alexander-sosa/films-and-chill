import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnalyticsService } from 'src/app/services/analytics.service';

import { ChartConfiguration, ChartData, ChartEvent, ChartType, ChartOptions} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-movie-analytics',
  templateUrl: './movie-analytics.component.html',
  styleUrls: ['./movie-analytics.component.css']
})

export class MovieAnalyticsComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  response?: any;
  quantities?: any = [];
  titles?: any = [];
  maxValue?: number = 0;

  constructor(private analyticsService: AnalyticsService,
              private router: Router) { }


  ngOnInit(): void {
    this.setData();
    
  }

  setData(){
    this.analyticsService.getMovieAnalytics().subscribe(
      res=>{
        this.response = res;
        this.response = this.response.content;
        for (const data of this.response) {
          this.quantities.push(Number(data[0]));
          this.titles.push((data[1].title));
        }
        this.setchart();
        
      },
      err=>console.log(err)
    );
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
        min: 0,
        max: 50,
        ticks: {
          stepSize: 1
       }
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
    labels: this.titles,
    datasets: [
      { 
        data: this.quantities, 
        label: 'Compras realizadas',
        backgroundColor: '#000000' 
      }
    ]
  };

   // events
   public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }

  public setchart(): void {
    this.barChartData.datasets[0].data = this.quantities;
    this.maxValue = Math.max(...this.quantities);
    this.chart?.update();
  }

/*   getMovieAnalytics(){
    this.analyticsService.getMovieAnalytics().subscribe(
      res => {
        this.response = res;
        this.response = this.response.content;
        //this.printMovies();
        this.processMovies();
      },
      err => {
        console.log(err)
      }
    );
  }

  printMovies(){
    console.log(this.response);
    this.response.forEach((element: any) => {
      console.log("Count: " + element[0] + "\nBody: " + element[1])
    });
  }

  processMovies(){
    let max = 0;
    for(let data of this.response){
      this.quantities.push(data[0]);
      this.titles.push(data[1].title);
      if(data[0] > max) max = data[0];
    }
    this.maxValue = max;
    console.log('max:' + this.maxValue);
    console.log(this.quantities);
    console.log(this.titles);
    this.setChart();
  }
 */
}
