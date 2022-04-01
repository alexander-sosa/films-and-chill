import { Injectable } from '@angular/core';
import { Movie } from '../models/Movie';

@Injectable({
  providedIn: 'root'
})

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



}
