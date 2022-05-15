import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/Movie';
import { CartService } from 'src/app/services/cart.service';
import { MoviesService } from 'src/app/services/movies.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movie-popular',
  templateUrl: './movie-popular.component.html',
  styleUrls: ['./movie-popular.component.css']
})
export class MoviePopularComponent implements OnInit {
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

  aux_movies: any | Movie = [];
  movies: any | Movie = [];
  cart: any | Movie = [];
  cart_list: any | Movie = [];

  constructor(
    private moviesService: MoviesService, private cartService: CartService,  private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.SetPopular();
    this.setList();
  }

  SetPopular(){
    this.moviesService.getPopularMovies().subscribe(
      res => {
        //console.log(res);
        this.aux_movies = res;
        this.aux_movies = this.aux_movies.content;
        for (let i = 0; i < this.aux_movies.length; i++) {
          const e= this.aux_movies[i];
          //console.log(e);
          //console.log(e[1]);  
          /*for (let j = 0; j < e.length; j++) {
            const f = e[j];
            //console.log(f[1]);            
          }*/
          this.movies.push(e[1]);
        }
      },
      err => {
        console.log(err);
      }

    );
  }
  addToCart(movie: Movie){
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
  }

  setList(){
    this.cartService.listCart().subscribe(
      res => {
        this.cart_list = res;
        
      },
      err => console.log(err) 
    );
  };

  StockValidation(m: Movie){
    console.log(m.stock);
    if(m.stock != 0){
      return false;
    }else{
      return true;
    }
  }

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
