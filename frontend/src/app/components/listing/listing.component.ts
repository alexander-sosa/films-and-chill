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
  control?:boolean;

  movie: any = {
    movieid: 0,
    title: '',
    description: '',
    releaseyear: 0,
    cost: 0,
    stock: 0,
    rating: '',
    genre: '',
    imagelink: '',
    tuplestatus: true
  }

  response: any = [];
  movies: any | Movie = [];
  cart: any | Movie = [];
  cart_list: any | Movie = [];

  totalPages: number = 0;
  totalMovies: number = 0;
  numberOfElements: number = 0;
  pageNumber: number = 0;
  lastPage: boolean = false;
  firstPage: boolean = false;

  page: number = 0;

  constructor(private moviesService: MoviesService,
              private cartService: CartService,
              private router: Router) { }

  ngOnInit(): void {
    this.getMovies();
    this.setList();
    this.control = false;
    
  }

  getMovies(){
    this.moviesService.getMovies().subscribe(
      res => {
        //console.log(res);
        this.response = res;
        //console.log(this.movies.content);
        this.movies = this.response.content;
        this.totalPages = this.response.totalPages;
        this.totalMovies = this.response.totalMovies;
        this.numberOfElements = this.response.numberOfElements;
        this.pageNumber = this.response.number;
        this.page = this.pageNumber + 1;
        this.lastPage = this.response.last;
        this.firstPage = this.response.first;
      },
      err => console.log(err)
    );
  }

  addToCart(movie: Movie){
    //console.log('algo');
    //console.log('lista: ', this.cart_list);
    this.CheckItemDouble(movie)
    if(!this.control){
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

    }else{
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Esta película ya la tienes añadida al carrito',
        showConfirmButton: false,
        timer: 1500
      })
    }
    //console.log('control ', this.control);
    
  }

  StockValidation(m: Movie){
    if(m.stock != 0){
      return false;
    }else{
      return true;
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


