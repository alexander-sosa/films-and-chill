import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Movie } from '../models/Movie';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  API_URL = 'http://localhost:8080';
  tkn = 'Bearer ' + localStorage.getItem('token');
  
  auth_headers = new HttpHeaders()
  .set('Access-Control-Allow-Origin', '*')
  .set('Authorization', this.tkn);
  
  constructor(private http:HttpClient) { }

  listCart(){
    return this.http.get(this.API_URL + '/cart', {headers: this.auth_headers});
  }

  addToCart(movie: Movie | undefined){
    return this.http.post<HttpResponse<any>>(this.API_URL + '/cart', movie, {headers: this.auth_headers});
  }

  removeFromCart(movie_id: number | undefined){
    return this.http.delete(this.API_URL + '/cart/'+ movie_id, {headers: this.auth_headers});
  }

  removeAll(){
    return this.http.delete(this.API_URL + '/cart', {headers: this.auth_headers});
  }

  buyCart(cart: any){
    return this.http.post<HttpResponse<any>>(this.API_URL + '/purchase', cart, {headers: this.auth_headers});
  }
}
