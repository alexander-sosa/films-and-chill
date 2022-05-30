import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Genre, Movie, Rating } from 'src/app/models/Movie'; 
import { User } from 'src/app/models/User';

import { MoviesService } from 'src/app/services/movies.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

import { Router } from '@angular/router';
import { Purchase, PurchaseShow } from 'src/app/models/Purchase';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  userselected?: Number;
  rols: any = [];
  response : any = [];
  currentRol?: Number;
  currentMovie?: number;
  tp?: number;

  public SetRolForm: FormGroup;
  public NewProductForm: FormGroup;
  public EditProductForm: FormGroup;
  

  movies: any = [];
  movie: Movie = {
    title: '',
    description: '',
    releaseyear: 0,
    cost: 0,
    stock: 0,
    ratingid: 0,
    genreid: 0,
    imagelink: ''
  }
 
  users: any = [];
  Users: any = [];
  aux_users: any = [];
  user: User = {
    userid: 0,
    name: '',
    lastname: '',
    permissionid: 0,
    username: ''
  } 

  genres: any = [];
  genre: Genre ={
    genreid: 0,
    genre: ''
  }

  ratings: any = [];
  rating: Rating ={
    ratingid: 0,
    rating: ''
  }

  purchases: any = [];
  purchasesDetails: any = [];
  purchasesShow: any = [];
  purchaseBD: Purchase = {
    purchaseid: 0,
    userid: 0,
    totalcost: 0,
    purchasedate: new Date(),    
    address: '',
  }

  purchase: PurchaseShow = {
    purchaseid: 0,
    user: '',
    totalcost: 0,
    purchasedate: '',
    address: '',
  }


  constructor(
    private moviesServies: MoviesService, 
    private userSevice: UserService, 
    private purchaseService: PurchaseService,
    private formBuilder: FormBuilder,
    private router: Router
    ) { 

    this.SetRolForm = this.formBuilder.group({
      IDU: [''],
      rol: ['']
    });

    
    const reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

    this.NewProductForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      releaseyear: ['', [Validators.required, Validators.min(1900)]],
      cost: ['', [Validators.required, Validators.min(10)]],
      unid: ['', [Validators.required, Validators.min(1)]],
      gender: ['', Validators.required],
      rating: ['', Validators.required],
      img: ['', Validators.pattern(reg)]

    });

    this.EditProductForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      releaseyear: ['', [Validators.required, Validators.min(1900)]],
      cost: ['', [Validators.required, Validators.min(10)]],
      unid: ['', [Validators.required, Validators.min(1)]],
      gender: ['', Validators.required],
      rating: ['', Validators.required],
      img: ['', Validators.pattern(reg)]
    });

  }

  ngOnInit(): void {
    if(localStorage.getItem('idr') != "1"){
      this.router.navigate(['/login']);
    }

    this.getInventory();
    this.getUsersList();
    this.generateRols();
    this.getGenres();
    this.getRatings();
    this.getPurchases();
    //this.preprocessingPurchases();
  }


  getValue(form: FormGroup,value:string){
    return form.get(value);
  }

  generateRols(){
    this.rols = [
      {id:1, rol: 'Admin'},
      {id:2, rol: 'Cliente'}
    ]
  }

  getGenres(){
    this.moviesServies.getGenres().subscribe(
      res => {
        this.genres = res;
      },
      err => {
        console.log(err)
      }
    );
  }

  getRatings(){
    this.moviesServies.getRatings().subscribe(
      res => {
        this.ratings = res;
      },
      err => {
        console.log(err)
      }
    );
  }

  getInventory(){
    this.moviesServies.getMovies().subscribe(
      res => {
        this.movies = res;
        this.movies = this.movies.content;
      },
      err => console.log(err)
    );
  }

  getUsersList(){
    this.userSevice.getUsers().subscribe(
      res => {
        this.response = res;
        this.users = this.response.content;
      },
      err => {
        console.log(err)
      }
    );
  }


  openDetails(m: Movie){
    this.currentMovie = m.movieid;
    document.getElementById('ID')?.setAttribute('value', String(m.movieid));
    this.EditProductForm.get('title')?.setValue(m.title);
    this.EditProductForm.get('description')?.setValue(m.description);
    this.EditProductForm.get('releaseyear')?.setValue(m.releaseyear);
    this.EditProductForm.get('cost')?.setValue(m.cost);
    this.EditProductForm.get('unid')?.setValue(m.stock);
    this.EditProductForm.get('gender')?.setValue(m.genreid);
    this.EditProductForm.get('rating')?.setValue(m.ratingid);
    this.EditProductForm.get('img')?.setValue(m.imagelink);
  }

  showUser(u: User){
    document.getElementById('IDU')?.setAttribute('value', String(u.userid));
    document.getElementById('user')?.setAttribute('value', String(u.name +' '+u.lastname));
    console.log('used per; ', u.permissionid);
    this.userselected = u.permissionid;
    this.currentRol = u.permissionid;   
    
  }

  updateRol(){
    var IDU = (document.getElementById('IDU') as HTMLInputElement).value;
    var newRol = (document.getElementById('rol') as HTMLInputElement).value;
    
    //console.log((document.getElementById('IDU') as HTMLInputElement).value);
    //console.log((document.getElementById('rol') as HTMLInputElement).value);
    if (this.currentRol == Number(newRol)) {
      console.log('sin cambios');
      Swal.fire({
        icon: 'warning',
        title: 'Error en actualización',
        text: 'El rol no se ha modificado',
      })
    }else{
      
      let data = {
        "user_editor_id": Number(localStorage.getItem("idr")),
        "user_editee_id": Number(IDU),
        "permission_id": Number(newRol) 
      }
      console.log(JSON.stringify(data));
      this.userSevice.putRol(data).subscribe(
        res => {
          console.log('notification');
          console.log('response: '+res);
          if (res != '') {
            
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Registro actualizado',
              showConfirmButton: false,
              timer: 1500
            })
            this.getUsersList();
            
          }
        },
        err =>{
          console.log('notification2');
          console.log(err);
          console.log('response: '+err.statusText);
          if (err.statusText === 'OK') {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Registro actualizado',
              showConfirmButton: false,
              timer: 1500
            })
            this.getUsersList();
            
          }
        }
      );
    }
  }

  AddProduct(){
    console.log(this.NewProductForm.value);


    this.movie.title = this.NewProductForm.get('title')?.value;
    this.movie.description = this.NewProductForm.get('description')?.value;
    this.movie.releaseyear = this.NewProductForm.get('releaseyear')?.value;
    this.movie.cost = this.NewProductForm.get('cost')?.value;
    this.movie.stock = this.NewProductForm.get('unid')?.value;
    this.movie.genreid = this.NewProductForm.get('gender')?.value;
    this.movie.ratingid = this.NewProductForm.get('rating')?.value;
    this.movie.imagelink = this.NewProductForm.get('img')?.value;

    console.log(JSON.stringify(this.movie));
    
    
    this.moviesServies.postMovie(JSON.stringify(this.movie)).subscribe(
      res => {
        /*
        console.log('notification');
        console.log('response: '+res.status);
        console.log('respuesta; '+res);
        let txt:any = Object.values(res);
        if (res.status === 201 && txt === 'Creado') {
          console.log('notification');
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Producto añadido exitosamente',
            showConfirmButton: false,
            timer: 1500
          })
          this.getInventory();
        }*/
        
      },
      err =>{
        console.log('response: '+err.status);
        console.log('Response: '+ Object.values(err));
        
        console.log('notification2');
        if (err.status === 201) {
         
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Producto añadido exitosamente',
            showConfirmButton: false,
            timer: 1500
          })
          this.getInventory();
          this.resetform(this.NewProductForm);
        }
      }
    );
    
  }

  resetform(form: FormGroup){
    form.reset();
    console.log('formulario enviado: ',form.value);
    form.setErrors(null);

  }

  EditProduct(){
    console.log('id movie; ', this.currentMovie);
    console.log(this.EditProductForm.value);

    this.movie.title = this.EditProductForm.get('title')?.value;
    this.movie.description = this.EditProductForm.get('description')?.value;
    this.movie.releaseyear = this.EditProductForm.get('releaseyear')?.value;
    this.movie.cost = this.EditProductForm.get('cost')?.value;
    this.movie.stock = this.EditProductForm.get('unid')?.value;
    this.movie.genreid = this.EditProductForm.get('gender')?.value;
    this.movie.ratingid = this.EditProductForm.get('rating')?.value;
    this.movie.imagelink = this.EditProductForm.get('img')?.value;

    console.log(JSON.stringify(this.movie));

    this.moviesServies.putMovie(JSON.stringify(this.movie), this.currentMovie).subscribe(
      res => {
        console.log('notification');
        console.log('response: '+res.headers );
        console.log('respuesta; '+Object.values(res));
        if (res != null) {
          
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Producto editado exitosamente',
            showConfirmButton: false,
            timer: 1500
          })
          this.getInventory();
        }
        
      },
      err =>{
        console.log('notification2');
        console.log('response: '+err.status);
        console.log('Response: '+ Object.values(err));
        /*
        
        if (err.status === 201) {
         
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Producto añadido exitosamente',
            showConfirmButton: false,
            timer: 1500
          })
          this.getInventory();
          this.resetform(this.NewProductForm);
        }
        */
      }
    );

  }

  deleteMovie(m: Movie){
    Swal.fire({
      title: 'Eliminar película',
      text: "¿Estas seguro de querer eliminar este producto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#E1A140',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(m);
        this.moviesServies.deleteMovie(Number(m.movieid)).subscribe(
          res => {
            console.log(res);
            if (res != undefined) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              this.getInventory();
            }
          },
          err => console.log(err)
        );
        
      }
    })
  }

  getPurchases(){
    this.purchaseService.getPurchases().subscribe(
      res => {
        this.response = res;        
        this.purchases = this.response.purchases.content; 
        this.aux_users = this.response.users;
        
        this.preprocessingPurchases();
        
      },
      err => console.log(err)
    );
  }

  

  preprocessingPurchases(){
    //const aux_array: any[] =[];    
    for (let i = 0; i < (this.purchases.length); i++) {
      //console.log("-->", aux_array)
      const e = this.purchases[i];
      const f = this.aux_users[i];   
      //var p = this.purchase;
      let aux = String(e.purchasedate).split('T',2);

      const  p = {
        purchaseid: e.purchaseid,
        user: (f.lastname).toUpperCase( ),
        totalcost: e.totalcost,
        purchasedate: aux[0],
        address: e.address,
      }

      this.purchasesShow.push(p);
      
      
    }
    
    console.log(this.purchasesShow);
  }

  showPurchase(p: PurchaseShow ){
    document.getElementById('purId')?.setAttribute('value', String(p.purchaseid));
    (<HTMLInputElement>document.getElementById('name')).value =  p.user;
    (<HTMLInputElement>document.getElementById('address')).value =  p.address;
    (<HTMLInputElement>document.getElementById('date')).value =  p.purchasedate;
    (<HTMLInputElement>document.getElementById('total')).value =  String(p.totalcost);
    this.purchaseService.getPurchasesDetails(p.purchaseid).subscribe(
      res=>{
        this.response = res;
        this.purchasesDetails = this.response.content;
        //console.log(this.purchasesDetails);

      },
      err=>console.log(err)
    );
  }

}