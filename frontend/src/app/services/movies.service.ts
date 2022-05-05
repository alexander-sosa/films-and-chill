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

  getMoviesByPage(page: number){
    return this.http.get(this.API_URL + '/movie' + '?page=' + page);
  }

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

  getActors(movie_id: number){
    return this.http.get(this.API_URL + '/movie/' + movie_id + '/actor')
  }

  postMovie(postData:any){
    return this.http.post<HttpResponse<any>>((this.API_URL + '/movie'),postData,{ 'headers': this.auth_headers });
  }

  putMovie(putData:any, movie_id: number | undefined){
    return this.http.put<HttpResponse<any>>((this.API_URL + '/movie/' + movie_id),putData,{ 'headers': this.headers });
  }

  getGenreMovies(genre_id: number){
    return this.http.get(this.API_URL + '/movie?genreId=' + genre_id );
  }

  getGenreMoviesPaginated(genre_id: number, page: number){
    return this.http.get(this.API_URL + '/movie?genreId=' + genre_id + '&page=' + page);
  }

  deleteMovie(movie_id: number){
    return this.http.delete(this.API_URL + '/movie/' + movie_id );
  }

  getPremiereMovies(){
    return this.http.get(this.API_URL + '/movie/latest');
  }

  getSearchMovie(title: string){
    return this.http.get(this.API_URL + '/movie/'+title+'/search');
  }

}
