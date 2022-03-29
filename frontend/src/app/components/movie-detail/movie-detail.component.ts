import { Component, OnInit } from '@angular/core';

import { Movie } from 'src/app/models/Movie';
import { MoviesService } from 'src/app/services/movies.service';

import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})

export class MovieDetailComponent implements OnInit {

  movie: any | Movie = [];
  movie_id: any;

  constructor(private moviesService: MoviesService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if(params.movie_id){
      this.movie_id = params.movie_id;
      this.getMovie(this.movie_id)
    }
  }

  getMovie(movie_id: any){
    this.moviesService.getMovie(movie_id).subscribe(
      res => {
        this.movie = res;
        // console.log("Movie: " + this.movie[0].title)
      },
      err => console.log(err)
    );
  }

}
