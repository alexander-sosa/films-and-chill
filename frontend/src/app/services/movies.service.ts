import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Movie } from '../models/Movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  API_URL = 'http://localhost:8080';

  tkn = 'Bearer ' + localStorage.getItem('token');

  headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

  auth_headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*')
  .set('Authorization', this.tkn);

  constructor(private http: HttpClient) { }

  getMovies(){
    return this.http.get(this.API_URL + '/movie');
  }

  getMovie(movie_id : number){
    //console.log("retrieving..." + this.API_URL + '/movie/' + movie_id)
    return this.http.get(this.API_URL + '/movie/' + movie_id, {headers: this.auth_headers});
  }

  getGenres(){
    return this.http.get(this.API_URL + '/movie/genre', {headers: this.auth_headers});
  }

  getRatings(){
    return this.http.get(this.API_URL + '/movie/rating', {headers: this.auth_headers});
  }

  postMovie(postData:any){
    return this.http.post<HttpResponse<any>>((this.API_URL + '/movie'),postData,{ 'headers': this.auth_headers });
  }
}
