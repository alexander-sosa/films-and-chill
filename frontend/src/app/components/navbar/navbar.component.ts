import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/Movie';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cart: any | Movie = [];

  valor: any;

  constructor(private cartService: CartService,
              private router: Router) { }

  ngOnInit(): void {
    this.listCart();
  }

  listCart(){
    this.cartService.listCart().subscribe(
      res => {
        this.cart = res;
        this.valor = this.cart.length;
      },
      err => {
        this.cart = err;
        this.valor = this.cart.length;
        console.log(err)
      }
    );
  }
}
