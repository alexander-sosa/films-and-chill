import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Genre, Movie, Rating } from 'src/app/models/Movie'; 
import { User } from 'src/app/models/User';

import { MoviesService } from 'src/app/services/movies.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  userselected?: Number;
  rols: any = [];
  currentRol?: Number;
  currentMovie?: number;

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
  user: User = {
    user_id: 0,
    name: '',
    lastname: '',
    permission_id: 0,
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


  constructor(
    private moviesServies: MoviesService, 
    private userSevice: UserService, 
    private formBuilder: FormBuilder,
    private router: Router
    ) { 

    this.SetRolForm = this.formBuilder.group({
      IDU: [''],
      rol: ['']
    });

    
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

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
        this.users = res;
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
    document.getElementById('IDU')?.setAttribute('value', String(u.user_id));
    document.getElementById('user')?.setAttribute('value', String(u.name +' '+u.lastname));
    console.log('used per; ', u.permission_id);
    this.userselected = u.permission_id;
    this.currentRol = u.permission_id;   
    
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

}

