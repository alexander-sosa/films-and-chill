import { Component, OnInit } from '@angular/core';

import { Movie } from 'src/app/models/Movie';

import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService) { }

  cart: any | Movie = [];

  valor: any;
  subtotal: any;
  total: any;

  ngOnInit(): void {
    this.listCart();
  }

  listCart(){
    this.cartService.listCart().subscribe(
      res => {
        this.cart = res;
        this.valor = this.cart.length;
        this.calculatePrice();
        this.total = this.subtotal + 10;
        console.log(res)
      },
      err => console.log(err)
    );
  }

  removeFromCart(movie_id: any){
    this.cartService.removeFromCart(movie_id).subscribe(
      res => {
        this.listCart();
        console.log(res);
      },
      err => {
        this.listCart();
        console.log(err);
      }
    );
  }

  removeAll(){
    this.cartService.removeAll().subscribe(
      res => {
        this.listCart();
        console.log(res);
      },
      err => {
        this.listCart();
        console.log(err);
      }
    );
    window.location.reload();
  }

  calculatePrice(){
    this.subtotal = 0;
    //this.checkDate();;
    for(let i = 0; i < this.cart.length ; i++){
      this.subtotal += this.cart[i].cost /** this.dias*/;
    }
    this.subtotal = (Math.round(this.subtotal * 100) / 100);
  }
}
