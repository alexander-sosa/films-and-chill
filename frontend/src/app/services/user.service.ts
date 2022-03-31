import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  postUser(postData:any){
    return this.http.post((this.API_URL + '/user'),postData);
  }

  getMovies(){
    return this.http.get(this.API_URL + '/movie');
  }

  getMovie(movie_id : number){
    console.log("retrieving..." + this.API_URL + '/movie/' + movie_id)
    return this.http.get(this.API_URL + '/movie/' + movie_id);
  }
}
