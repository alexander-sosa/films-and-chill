import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Genre, Movie } from 'src/app/models/Movie';
import { CartService } from 'src/app/services/cart.service';
import { MoviesService } from 'src/app/services/movies.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movie-genre',
  templateUrl: './movie-genre.component.html',
  styleUrls: ['./movie-genre.component.css']
})
export class MovieGenreComponent implements OnInit {
  genre_id?: number;
  existGenre?: boolean;
  genre?: string;
  

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
  genres: any | Genre = [];
  cart: any | Movie = [];

  constructor(private moviesService: MoviesService, private cartService: CartService,  private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.existGenre = false;
    const params = this.activatedRoute.snapshot.params;
    if(params.genre_id){
      this.genre_id = params.genre_id;
      this.getGenre(this.genre_id);
      this.getGenreMovies(this.genre_id);
    }
  }

  getGenre(id: any){
    this.moviesService.getGenres().subscribe(
      res => {
        console.log('genres: ',res);
        this.genres = res
        //console.log('>>>' + this.genres);
        for(let g of this.genres){
          //console.log( g );
          if(g.genreid === Number(id)){
            this.genre = g.genre;
            //console.log('>>>' + this.genre);
            break;
          }
        }
      },
      err => console.log(err)
    );

    

  }

  getGenreMovies(genre_id:any){
    this.moviesService.getGenreMovies(genre_id).subscribe(
      res => {
        console.log('response: '+ res);
        this.movies = res;
        this.movies = this.movies.content;
        this.existGenre = true;
      },
      err => {
        console.log(err);
        this.existGenre = false;
      }

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
      return false;
    }else{
      return true;
    }
  }
}
