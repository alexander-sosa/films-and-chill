import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { HttpClient, HttpResponse } from '@angular/common/http';
=======
>>>>>>> 5f6770d8bb1c0511adac16c3970a264fa6c23e42
import { Movie } from '../models/Movie';

@Injectable({
  providedIn: 'root'
})
<<<<<<< HEAD
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
=======

export class CartService {

  cart: any|Movie[] = [];

  constructor() { }

  getCart(){
    return this.cart;
  }

  addItem(item: Movie){
    this.cart.push(item);
    console.log("Added item");
  }



>>>>>>> 5f6770d8bb1c0511adac16c3970a264fa6c23e42
}
