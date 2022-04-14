import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/models/Movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-genre-listing',
  templateUrl: './genre-listing.component.html',
  styleUrls: ['./genre-listing.component.css']
})
export class GenreListingComponent implements OnInit {
  genres: Genre | any = [];

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.getGenres();
  }

  getGenres(){
    this.moviesService.getGenres().subscribe(
      res => {
        this.genres = res;
        console.log(this.genres);
      },
      err => {
        console.log("Error while getting genres...");
        console.log(err);
      }
    );
  }

}
