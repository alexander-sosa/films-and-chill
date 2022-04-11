import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Movie } from '../models/Movie';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  API_URL = 'http://localhost:8080';
  tkn = 'Bearer ' + localStorage.getItem('token');
  
  headers = new HttpHeaders()
  .set('Access-Control-Allow-Origin', '*')
  //.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  //.set('Accept', 'application/json')
  .set('Authorization', this.tkn);
  
  /*
  headers = new HttpHeaders({
    Authorization: this.tkn
  });
  */

  constructor(private http:HttpClient) { }

  listCart(){
    console.log("Attempting auth: ")
    console.log(this.headers)
    return this.http.get(this.API_URL + '/cart', {headers: this.headers});
  }

  addToCart(movie: Movie | undefined){
    return this.http.post<HttpResponse<any>>(this.API_URL + '/cart', movie, {headers: this.headers});
  }

  removeFromCart(movie_id: number | undefined){
    return this.http.delete(this.API_URL + '/cart/'+ movie_id, {headers: this.headers});
  }

  removeAll(){
    return this.http.delete(this.API_URL + '/cart', {headers: this.headers});
  }

  intercept(req: HttpRequest<any>, next: HttpHandler){
    if(localStorage.getItem('token')){
      req = req.clone({
        setHeaders: {
          //Authorization: localStorage.getItem('token');

        }
      });
    }
    else{
      console.log("No token")
    }
  }
}
