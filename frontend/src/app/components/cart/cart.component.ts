import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/Item';
import { Movie } from 'src/app/models/Movie';
import { CartService } from 'src/app/services/cart.service';
import { LoginFirstService } from 'src/app/services/login-first.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    private cartService: CartService,
    private loginControlService: LoginFirstService
    ) { }

  cart: any | Movie = [];
  items: any | Item = [];

  valor: any;
  subtotal: any;
  total: any;

  item: Item = {
    movie: null,
    amount: 1
  }

  ngOnInit(): void {
    if(!localStorage.getItem('token')){
      this.loginControlService.loginFirstAlert();
    }
    this.listCart();
  }

  listCart(){
    console.log("getting list from cart component")
    this.cartService.listCart().subscribe(
      res => {
        this.cart = res;
        this.valor = this.cart.length;
        this.chargeItems();
        console.log(this.items);
        this.calculatePrice();
        console.log(res)
      },
      err => console.log(err)
    );
  }

  chargeItems(){
    this.items = [];
    for(let i = 0; i < this.cart.length ; i++){
      this.item = {
        movie: this.cart[i],
        amount: 1
      }
      this.items[i] = this.item;
    }
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
    for(let i = 0; i < this.cart.length ; i++){
      this.subtotal += this.cart[i].cost * this.items[i].amount;
      console.log(this.subtotal);
    }
    this.subtotal = (Math.round(this.subtotal * 100) / 100);
    this.total = this.subtotal;
  }
}
