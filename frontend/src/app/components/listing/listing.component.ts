import { Component, OnInit } from '@angular/core';

import { Movie } from 'src/app/models/Movie';

import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  /*@HostBinding('class') classes = 'row'*/

  movie: Movie = {
    movie_id: 0,
    title: '',
    description: '',
    release_year: 0,
    cost: 0,
    stock: 0,
    rating_id: 0,
    genre_id: 0,
    image_link: '',
    tuple_status: true
  }

  movies: any = [];

  constructor(private moviesService: MoviesService) { }

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
}
