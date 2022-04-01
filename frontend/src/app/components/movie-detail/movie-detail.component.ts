import { Component, OnInit } from '@angular/core';

import { Movie } from 'src/app/models/Movie';
import { MoviesService } from 'src/app/services/movies.service';
import { CartService } from 'src/app/services/cart.service';

import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})

export class MovieDetailComponent implements OnInit {

  movie: any | Movie = [];
  movie_id: any;
  arrived: boolean = false;

  constructor(private moviesService: MoviesService, private activatedRoute: ActivatedRoute, private cartService: CartService) {

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
        this.arrived = true;
        // console.log("Movie: " + this.movie[0].title)
      },
      err => console.log(err)
    );
  }

  addItem(item: Movie){
    this.cartService.addItem(item);
  }

}
