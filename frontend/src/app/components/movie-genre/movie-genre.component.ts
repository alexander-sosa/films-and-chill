import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/Movie';
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

  constructor(private moviesService: MoviesService, private cartService: CartService, private router: Router,  private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if(params.movie_id){
      this.genre_id = params.movie_id;
      this.getGenreMovies(this.genre_id);
      //this.getMovieActors(this.movie_id);
    }
    //this.getMovies();
  }

  getGenreMovies(movie_id:any){
    this.moviesService.getGenreMovies(movie_id).subscribe(
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
}
