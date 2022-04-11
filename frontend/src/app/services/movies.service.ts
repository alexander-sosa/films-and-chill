import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Movie } from '../models/Movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  API_URL = 'http://localhost:8080';
  headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

  constructor(private http: HttpClient) { }

  getMovies(){
    return this.http.get(this.API_URL + '/movie');
  }

  getMovie(movie_id : number){
    console.log("retrieving..." + this.API_URL + '/movie/' + movie_id)
    return this.http.get(this.API_URL + '/movie/' + movie_id);
  }

  getGenres(){
    return this.http.get(this.API_URL + '/movie/genre');
  }

  getRatings(){
    return this.http.get(this.API_URL + '/movie/rating');
  }

  postMovie(postData:any){
    return this.http.post<HttpResponse<any>>((this.API_URL + '/movie'),postData,{ 'headers': this.headers });
  }
}
