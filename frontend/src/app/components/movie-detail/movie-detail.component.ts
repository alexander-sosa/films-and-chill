import { Component, OnInit } from '@angular/core';

import { Movie } from 'src/app/models/Movie';
import { MoviesService } from 'src/app/services/movies.service';
import { CartService } from 'src/app/services/cart.service';
import { LoginFirstService } from 'src/app/services/login-first.service';

import { ActivatedRoute } from "@angular/router";

import Swal from 'sweetalert2';

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
  control?:boolean;
  cart_list: any | Movie = [];
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
      this.setList();
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
    this.CheckItemDouble(movie)

    if(!this.control){
      this.cartService.addToCart(movie).subscribe(
        res => {
          this.movie = res;
          this.movie.push(this.movie);
          console.log("Guardado");
        },
        err => console.log(err)
      );
      
      window.location.reload();
    }else{
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Esta película ya la tienes añadida al carrito',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  setList(){
    this.cartService.listCart().subscribe(
      res => {
        this.cart_list = res;
        
      },
      err => console.log(err) 
    );
  };

  CheckItemDouble(m: Movie){
    //var x;
    if (this.cart_list.length == 0){
      this.control = false;
    }else{
      this.control = false;
      for(let c of this.cart_list){
        //console.log(m.movie_id)
        if(m.movieid === c.movieid){
          //console.log('igual ');
          this.control = true;
          break;
        }
      } 
    }         
  }
}
