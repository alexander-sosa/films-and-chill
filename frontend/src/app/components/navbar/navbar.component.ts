import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/Movie';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cart: any | Movie = [];
  valor: any;

  // Access Control
  isLogged: boolean = false;
  isAdmin: boolean = false;

  // User data
  name: string | any = localStorage.getItem("name");
  lastname: string | any = localStorage.getItem("lastname");

  constructor(private cartService: CartService,
              private router: Router,
              private location: Location
  ) { }

  ngOnInit(): void {
    localStorage.getItem('token') ? this.isLogged = true : this.isLogged = false;
    localStorage.getItem('idr') == "1" ? this.isAdmin = true : this.isAdmin = false;

    this.listCart();
  }

  listCart(){
    if(this.isLogged){
      console.log("getting list from navbar component")
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

  logout(){
    if(this.isLogged){
      localStorage.removeItem('token');
      localStorage.removeItem('idr');
      localStorage.removeItem('name');
      localStorage.removeItem('lastname');

      this.location.replaceState('/');
      window.location.replace("http://localhost:4200/");
      //this.router.navigate(['/inventory']);
    }
  }
}
