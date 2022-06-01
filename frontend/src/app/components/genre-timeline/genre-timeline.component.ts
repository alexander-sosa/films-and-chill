import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { MoviesService } from 'src/app/services/movies.service';

import { ChartConfiguration, ChartData, ChartEvent, ChartType, ChartOptions} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-genre-timeline',
  templateUrl: './genre-timeline.component.html',
  styleUrls: ['./genre-timeline.component.css']
})

export class GenreTimelineComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  genre_id: number = -1;
  existGenre?: boolean;
  genre?: string;
  response?: any;
  genreResponse?: any;

  quantities?: any = [];
  dates?: any = [];

  constructor(private analyticsService: AnalyticsService,
              private activatedRoute: ActivatedRoute,
              private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.existGenre = false;
    const param = this.activatedRoute.snapshot.params;
    if(param.genre_id){
      this.genre_id = param.genre_id;

      //this.moviesService.getGenres()
      this.analyticsService.getGenreTimeline(this.genre_id).subscribe(
        res => {
          this.response = res;
          this.response = this.response.content;

          for(let data of this.response){
            this.quantities.push(Number(data[0]));
            const aux = data[1].purchasedate.split('T',2);
            this.dates.push(aux[0]);
          }
          this.setchart();
        }, 
        err => console.log(err)
      );
    }
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    elements: {
      line:{
        tension: 0.4
      }
    },
    scales: {
      x: {},
      y: {
        min: 0,
        max: 15,
        ticks: {
          stepSize: 1
       }
      }
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            size: 14,
            family: 'Verdana'
          }
        }
      },
      datalabels: {
        font: {
          size: 14,
          family: 'Verdana'
        },
        anchor: 'end',
        align: 'end'
      }
    }
  };

  public barChartType: ChartType = 'line';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: this.dates,
    datasets: [
      { 
        data: this.quantities, 
        label: 'Compras realizadas',
        borderColor: '#E1A140',
        backgroundColor: '#914110',
        
        
      }
    ]
  };

  public setchart(): void {
    this.barChartData.datasets[0].data = this.quantities;
    this.chart?.update();
  }

}
