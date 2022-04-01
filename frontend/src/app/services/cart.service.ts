import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Movie } from '../models/Movie';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  API_URL = 'http://localhost:8080';

  constructor(private http:HttpClient) { }

  listCart(){
    return this.http.get(this.API_URL + '/cart');
  }

  addToCart(movie: Movie | undefined){
    return this.http.post<HttpResponse<any>>(this.API_URL + '/cart', movie);
  }

  removeFromCart(movie_id: number | undefined){
    return this.http.delete(this.API_URL + '/cart/'+ movie_id);
  }

  removeAll(){
    return this.http.delete(this.API_URL + '/cart');
  }
}
