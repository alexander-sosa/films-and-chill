import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Movie } from 'src/app/models/Movie';

import { MoviesService } from 'src/app/services/movies.service';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  /*@HostBinding('class') classes = 'row'*/
  buttonDisabled?: boolean;

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

  constructor(private moviesService: MoviesService,
              private cartService: CartService,
              private router: Router) { }

  ngOnInit(): void {
    this.getMovies();
    this.buttonDisabled = false;
  }

  getMovies(){
    this.moviesService.getMovies().subscribe(
      res => {
        this.movies = res;
      },
      err => console.log(err)
    );
  }

  addToCart(movie: Movie){
    this.cartService.addToCart(movie).subscribe(
      res => {
        this.movie = res;
        this.cart.push(this.movie);
      },
      err => {
        if(err.status == 200){
          console.log("Guardado");
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Película añadida al carrito',
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(() => window.location.reload(), 1500);
          //this.router.navigateByUrl("/movie");
        }
      }
    );
  }

  StockValidation(m: Movie){
    console.log(m.stock);
    if(m.stock != 0){
      //this.buttonDisabled = false;;
      return false;
    }else{
      //this.buttonDisabled = false;
      return true;
    }
  }
}
