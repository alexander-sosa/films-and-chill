import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/Movie';
import { CartService } from 'src/app/services/cart.service';
import { MoviesService } from 'src/app/services/movies.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movie-premieres',
  templateUrl: './movie-premieres.component.html',
  styleUrls: ['./movie-premieres.component.css']
})
export class MoviePremieresComponent implements OnInit {

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


  movies: any | Movie = [];
  cart: any | Movie = [];
  cart_list: any | Movie = [];

  constructor(
    private moviesService: MoviesService, private cartService: CartService,  private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.SetPremieres();
    this.setList();
  }

  SetPremieres(){
    this.moviesService.getPremiereMovies().subscribe(
      res => {
        console.log('response: '+ res);
        this.movies = res;
        this.movies = this.movies.content;
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
