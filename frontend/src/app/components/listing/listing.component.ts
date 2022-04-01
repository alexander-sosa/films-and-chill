import { Component, OnInit } from '@angular/core';

import { Movie } from 'src/app/models/Movie';

import { MoviesService } from 'src/app/services/movies.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  /*@HostBinding('class') classes = 'row'*/

  movie: any = {
    movie_id: 0,
    title: '',
    description: '',
    release_year: 0,
    cost: 0,
    stock: 0,
    rating: '',
    genre: '',
    image_link: '',
    tuple_status: true
  }

  movies: any | Movie = [];
  cart: any | Movie = [];

<<<<<<< HEAD
  constructor(private moviesService: MoviesService,
              private cartService: CartService) { }
=======
  constructor(private moviesService: MoviesService, private cartService: CartService) { }
>>>>>>> 5f6770d8bb1c0511adac16c3970a264fa6c23e42

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(){
    this.moviesService.getMovies().subscribe(
      res => {
        this.movies = res;
      },
      err => console.log(err)
    );
  }

<<<<<<< HEAD
  addToCart(movie: Movie){
    this.cartService.addToCart(movie).subscribe(
      res => {
        this.movie = res;
        this.cart.push(this.movie);
        console.log("Guardado");
      },
      err => console.log(err)
    );
=======
  addItem(item: Movie){
    this.cartService.addItem(item);
    //this.getCart();
  }
  
  getCart(){
    console.log(this.cartService.getCart())
>>>>>>> 5f6770d8bb1c0511adac16c3970a264fa6c23e42
  }
}
