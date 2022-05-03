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
  genre_id: number = -1;
  existGenre?: boolean;
  genre?: string;
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
  genres: any | Genre = [];
  cart: any | Movie = [];
  cart_list: any | Movie = [];

  // pagination control
  totalPages: number = 0;
  totalMovies: number = 0;
  numberOfElements: number = 0;
  pageNumber: number = 0;
  lastPage: boolean = false;
  firstPage: boolean = false;
  page: number = 0;

  constructor(private moviesService: MoviesService,
              private cartService: CartService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.existGenre = false;
    const params = this.activatedRoute.snapshot.params;
    if(params.genre_id){
      this.genre_id = params.genre_id;
      this.getGenre(this.genre_id);
      this.getGenreMovies(this.genre_id);
      this.setList();
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
        // console.log('response: '+ res);
        this.response = res;
        this.movies = this.response.content;
        this.existGenre = true;

        // pagination control
        this.totalPages = this.response.totalPages;
        this.totalMovies = this.response.totalMovies;
        this.numberOfElements = this.response.numberOfElements;
        this.pageNumber = this.response.number;
        this.page = this.pageNumber + 1;
        this.lastPage = this.response.last;
        this.firstPage = this.response.first;
      },
      err => {
        console.log(err);
        this.existGenre = false;
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

  getMoviesByPagePrev(page?: any | undefined){
    page--;
    if(page < 0) return;
    console.log("Getting page..." + page)
    this.pageNumber--;
    this.moviesService.getGenreMoviesPaginated(this.genre_id, page).subscribe(
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

  getMoviesByPageNext(page?: any | undefined){
    page++;
    if(page > this.totalPages) return;
    console.log("Getting page..." + page)
    this.pageNumber--;
    this.moviesService.getGenreMoviesPaginated(this.genre_id, page).subscribe(
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
}
