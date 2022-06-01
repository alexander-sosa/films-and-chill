import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { MoviesService } from 'src/app/services/movies.service';

import { ChartConfiguration, ChartData, ChartEvent, ChartType, ChartOptions} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-movie-timeline',
  templateUrl: './movie-timeline.component.html',
  styleUrls: ['./movie-timeline.component.css']
})
export class MovieTimelineComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  movie_id: number = -1;
  existMovie?: boolean;
  movie?: string;
  response?: any;
  movieResponse?: any;

  quantities?: any = [];
  dates?: any = [];

  constructor(private analyticsService: AnalyticsService,
              private activatedRoute: ActivatedRoute,
              private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.existMovie = false;
    const param = this.activatedRoute.snapshot.params;
    if(param.movie_id){
      this.movie_id = param.movie_id;

      this.moviesService.getMovie(this.movie_id).subscribe(
        res => {
          this.movieResponse = res;
          this.movie = this.movieResponse.title;
        },
        err => console.log(err)
      );
      this.analyticsService.getMovieTimeline(this.movie_id).subscribe(
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
      },
      datalabels: {
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
