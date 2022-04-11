import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Genre, Movie, Rating } from 'src/app/models/Movie'; 
import { User } from 'src/app/models/User';

import { MoviesService } from 'src/app/services/movies.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  userselected?: Number;
  rols: any = [];
  currentRol?: Number;

  public SetRolForm: FormGroup;
  public NewProductForm: FormGroup;

  movies: any = [];
  movie: Movie = {
    movie_id: 0,
    title: '',
    description: '',
    release_year: 0,
    cost: 0,
    stock: 0,
    rating: '',
    genre: '',
    image_link: '',
    tuple_status: true
  }
 
  users: any = [];
  user: User = {
    user_id: 0,
    name: '',
    lastname: '',
    access_permission: '',
    email: '',
    pass: '',
  	tuple_status: true
  }

 

  genres: any = [];
  genre: Genre ={
    genre_id: 0,
    genre: ''
  }

  ratings: any = [];
  rating: Rating ={
    rating_id: 0,
    rating: ''
  }

  constructor(private moviesServies: MoviesService, private userSevice: UserService, private formBuilder: FormBuilder) { 
    this.SetRolForm = this.formBuilder.group({
      IDU: [''],
      rol: ['']
    });

    
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

    this.NewProductForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.minLength(100)],
      release_year: ['', [Validators.required, Validators.min(1900)]],
      cost: ['', [Validators.required, Validators.min(10)]],
      unid: ['', [Validators.required, Validators.min(1)]],
      gender: ['', Validators.required],
      rating: ['', Validators.required],
      img: ['', Validators.pattern(reg)]

    });
  }

  ngOnInit(): void {
    this.getInventory();
    this.getUsersList();
    this.generateRols();
    this.getGenres();
    this.getRatings();
  }


  getValue(value:string){
    return this.NewProductForm.get(value);
  }


  generateRols(){
    this.rols = [
      {id:0, rol: 'Admin'},
      {id:1, rol: 'Cliente'}
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
    document.getElementById('ID')?.setAttribute('value', String(m.movie_id));
    document.getElementById('title')?.setAttribute('value', String(m.title));
    document.getElementById('description')?.setAttribute('value', String(m.description));
    document.getElementById('cost')?.setAttribute('value', String(m.cost));
    document.getElementById('unid')?.setAttribute('value', String(m.stock));
    document.getElementById('gender')?.setAttribute('value', String(m.genre));
    document.getElementById('rating')?.setAttribute('value', String(m.rating));
  }

  showUser(u: User){
    document.getElementById('IDU')?.setAttribute('value', String(u.user_id));
    document.getElementById('user')?.setAttribute('value', String(u.name +' '+u.lastname));
    //document.getElementById('rol')?.setAttribute('value', String(u.access_permission));
    if(u.access_permission == 'admin'){
      this.userselected = 0;
      this.currentRol = 0
    }else if (u.access_permission == 'client') {
      this.userselected = 1;
      this.currentRol = 1;
    }
    
  }

  updateRol(){
    var IDU = (document.getElementById('IDU') as HTMLInputElement).value;
    var newRol = (document.getElementById('rol') as HTMLInputElement).value;
    var btn = document.getElementById('btnUpdate');
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
      var nr;
      switch (Number(newRol)) {
        case 0:
          nr = 'admin'; 
          break;
        
        case 1:
          nr = 'client'; 
          break;
      
        default:
          break;
      }
      let data = {
        "user_id": IDU,
        "access_permission": nr 
      }
      console.log(JSON.stringify(data));
      this.userSevice.putRol(data).subscribe(
        res => {
          console.log('response: '+res.statusText);
          if (res.status === 200) {
            console.log('notification2');
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Registro actualizado',
              showConfirmButton: false,
              timer: 1500
            })
            
          }
        },
        err =>{
          console.log(err);
          console.log('response: '+err.statusText);
          if (err.status === 200) {
            console.log('notification2');
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
    
  }

}
