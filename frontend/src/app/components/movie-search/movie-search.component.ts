import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/Movie';
import { CartService } from 'src/app/services/cart.service';
import { MoviesService } from 'src/app/services/movies.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {
  title: string | undefined;
  nf_title: string | undefined;
  existMoviebyTitle?: boolean;
  existMoviebyActor?: boolean;

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
  moviesbytitle: any | Movie = [];
  moviesbyactor: any | Movie = [];
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
              private activatedRoute: ActivatedRoute
              ) { }

  ngOnInit(): void {
    this.nf_title="";
    this.existMoviebyTitle = false;
    this.existMoviebyActor = false;
    const params = this.activatedRoute.snapshot.params;
    if(params.title){
      this.title = params.title; 
      this.getMovie();
    }
    this.setList();
  }

  getMovie(){
    if(this.title!=undefined){
      this.formatTitle(this.title);
      this.moviesService.getSearchMovie(this.title).subscribe(
        res => {
          
          this.response = res;
          this.moviesbytitle = this.response.byTitle.content;
          this.moviesbyactor = this.response.byName.content;
          //console.log(this.response.content);
          if(this.response.byTitle.content.length == 0){
            this.existMoviebyTitle = false;
           
          }else{
            this.existMoviebyTitle= true;
  
            // pagination control
            this.totalPages = this.response.totalPages;
            this.totalMovies = this.response.totalMovies;
            this.numberOfElements = this.response.numberOfElements;
            this.pageNumber = this.response.number;
            this.page = this.pageNumber + 1;
            this.lastPage = this.response.last;
            this.firstPage = this.response.first;
          }
          if(this.response.byName.content.length == 0){
            this.existMoviebyActor = false;
           
          }else{
            this.existMoviebyActor= true;
  
            // pagination control
            this.totalPages = this.response.totalPages;
            this.totalMovies = this.response.totalMovies;
            this.numberOfElements = this.response.numberOfElements;
            this.pageNumber = this.response.number;
            this.page = this.pageNumber + 1;
            this.lastPage = this.response.last;
            this.firstPage = this.response.first;
          }
          
        },
        err => {
          console.log(err);
          this.existMoviebyTitle = false;
          this.existMoviebyActor = false;
        }
      );
    }
  }

  formatTitle(t: string){
    var aux = t?.split("_");
    for (let i = 0; i < aux.length; i++) {
      if (i < aux.length-1) {
        this.nf_title += aux[i] + " ";
      }else{
        this.nf_title += aux[i];
      }
      
    }
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
