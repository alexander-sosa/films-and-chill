import { Component, OnInit } from '@angular/core';

import { Movie } from 'src/app/models/Movie';
import { MoviesService } from 'src/app/services/movies.service';
import { CartService } from 'src/app/services/cart.service';
import { LoginFirstService } from 'src/app/services/login-first.service';

import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})

export class MovieDetailComponent implements OnInit {

  movie_id: any;
  movie: any | Movie = [];
  actors: any;
  arrived: boolean = false;

  constructor(
    private moviesService: MoviesService, 
    private activatedRoute: ActivatedRoute, 
    private cartService: CartService,
    private loginControlService: LoginFirstService
    ) {

  }

  ngOnInit(): void {
    if(!localStorage.getItem('token')){
      this.loginControlService.loginFirstAlert();
    }
    const params = this.activatedRoute.snapshot.params;
    console.log(params.movie_id);
    if(params.movie_id){
      this.movie_id = params.movie_id;
      this.getMovie(this.movie_id);
      this.getMovieActors(this.movie_id);
    }
  }

  getMovie(movie_id: any){
    this.moviesService.getMovie(movie_id).subscribe(
      res => {
        this.movie = res;
        this.arrived = true;
        console.log(this.movie);
      },
      err => console.log(err)
    );
  }

  getMovieActors(movie_id: number){
    this.moviesService.getActors(movie_id).subscribe(
      res => {
        this.actors = res;
        console.log(this.actors);
      }
    );
  }

  addItem(movie: Movie){
    this.cartService.addToCart(movie).subscribe(
      res => {
        this.movie = res;
        this.movie.push(this.movie);
        console.log("Guardado");
      },
      err => console.log(err)
    );
  }

}
