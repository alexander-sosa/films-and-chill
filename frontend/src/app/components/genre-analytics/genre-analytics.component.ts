import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnalyticsService } from 'src/app/services/analytics.service';

import { ChartConfiguration, ChartData, ChartEvent, ChartType, ChartOptions} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-genre-analytics',
  templateUrl: './genre-analytics.component.html',
  styleUrls: ['./genre-analytics.component.css']
})
export class GenreAnalyticsComponent implements OnInit {
  @ViewChild(BaseChartDirective) pieChart: BaseChartDirective | undefined;

  response?: any;
  quantities?: any = [];
  genres?: any = [];
  ids?: any = [];
  clickObject?: any;

  constructor(private analyticsService: AnalyticsService,
              private router: Router) { }

  ngOnInit(): void {
    this.setData();
  }

  setData(){
    this.analyticsService.getGenreAnalytics().subscribe(
      res => {
        this.response = res;
        for(let data of this.response){
          this.quantities.push(data.purchases_nbr);
          this.genres.push(data.genre.genre);
          this.ids.push(data.genre.genreid);
        }
        //console.log(this.quantities);
        //console.log(this.genres);
        this.setchart();
      },
      err => console.log(err)
    );
  }

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: 'Verdana'
          }
        }
        
      },
      datalabels: {
        color: 'white',
        font: {
          size: 14,
          family: 'Verdana'
        },
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: this.genres,
    datasets: [ {
      data: this.quantities,
      backgroundColor: ['#E1A140', '#532200', '#A47551', '#914110', '#523A28'],
      hoverBackgroundColor: '#CDCDCD',
      hoverBorderColor: '#CDCDCD'
    } ]
  };

  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [ DataLabelsPlugin ];

  public pieChartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(active);
    if(active != undefined){
      this.clickObject = active[0];
      //console.log(this.clickObject.index);
      //console.log(this.genres[this.clickObject.index]);
      let id = this.ids[this.clickObject.index];
      //console.log(id);
      this.router.navigateByUrl('/genre-timeline/' + id);
    }
  }

  public setchart(): void {
    this.pieChartData.datasets[0].data = this.quantities;
    this.pieChart?.update();
  }
}
