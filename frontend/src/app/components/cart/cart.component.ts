import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from 'src/app/models/Item';
import { Movie } from 'src/app/models/Movie';
import { CartService } from 'src/app/services/cart.service';
import { LoginFirstService } from 'src/app/services/login-first.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  name: string | undefined;
  IDU: number | undefined

  public BuyForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private loginControlService: LoginFirstService
    ) {
     
      this.BuyForm = this.formBuilder.group({
        name: ['',Validators.required],
        nit: ['', Validators.required],
        address: ['', [Validators.required, Validators.minLength(20)]]
      }); 
      
     }

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
    this.IDU = Number(localStorage.getItem('idu'));
    if(!localStorage.getItem('token')){
      this.loginControlService.loginFirstAlert();
    }
    this.name = localStorage.getItem('name')+" "+localStorage.getItem('lastname')
    this.listCart();
  }

  getValue(value:string){
    return this.BuyForm.get(value);
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
    window.location.reload();
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

  Buy(){
    Swal.fire({
      title: 'confirmación de pago',
      text: "Esta seguro de realizar el pago",
      icon: 'warning',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonColor: '#914110',
      cancelButtonColor: '#d33',
      denyButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire(
          'Transacción exitosa',
          'Pago realizado exitosamente',
          'success')
      } else if (result.isDenied) {
        Swal.fire('Transacción cancelada',
        '',
        'error')
      }
    })
  }
  //console.log("algo");
    /**
     * "userid": 1,
    "movieid": 1,
    "quantity": 1,
    "totalcost": 16.9,
    "address": "Direccion 1"
     
    for (let i = 0; i < this.items.length; i++) {
      const e = this.items[i];
      var data ={
        "userid": this.IDU,
        "movieid": e.movie.movieid,
        "quantity": e.amount,
        "totalcost": this.total,
        "address": this.BuyForm.get('address')?.value
      }
      console.log(data);
      this.cartService.buyCart(data).subscribe(
        res => {
          c=true;

        },
        err => {
          c=false;
        }
      );
      
    }*/

    /*if{c==true}{

    }*/



  
}
