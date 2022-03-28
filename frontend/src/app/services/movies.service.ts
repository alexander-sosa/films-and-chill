import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Movie } from '../models/Movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  API_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getMovies(){
    return this.http.get(this.API_URL + '/movie');
  }
}
