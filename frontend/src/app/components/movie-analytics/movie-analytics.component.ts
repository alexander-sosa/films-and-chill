import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnalyticsService } from 'src/app/services/analytics.service';

@Component({
  selector: 'app-movie-analytics',
  templateUrl: './movie-analytics.component.html',
  styleUrls: ['./movie-analytics.component.css']
})

export class MovieAnalyticsComponent implements OnInit {
  response?: any;

  constructor(private analyticsService: AnalyticsService,
              private router: Router) { }

  ngOnInit(): void {
    this.getMovieAnalytics();
    
  }

  getMovieAnalytics(){
    this.analyticsService.getMovieAnalytics().subscribe(
      res => {
        this.response = res;
        this.response = this.response.content;
        this.printMovies();
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

}
