import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Genre, Movie, MovieCreate, Rating } from 'src/app/models/Movie'; 
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
  public EditProductForm: FormGroup;

  movies: any = [];
  movie: Movie = {
    movie_id: 0,
    title: '',
    description: '',
    release_year: 0,
    cost: 0,
    stock: 0,
    rating_id: 0,
    genre_id: 0,
    image_link: ''
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
    genre_id: 0,
    genre: ''
  }

  ratings: any = [];
  rating: Rating ={
    rating_id: 0,
    rating: ''
  }

  newMovie: MovieCreate ={
    title: '',
    description: '',
    release_year: 0,
    cost: 0,
    stock: 0,
    rating_id: 0,
    genre_id: 0,
    image_link: ''
  }

  constructor(private moviesServies: MoviesService, private userSevice: UserService, private formBuilder: FormBuilder) { 
    this.SetRolForm = this.formBuilder.group({
      IDU: [''],
      rol: ['']
    });

    
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

    this.NewProductForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      release_year: ['', [Validators.required, Validators.min(1900)]],
      cost: ['', [Validators.required, Validators.min(10)]],
      unid: ['', [Validators.required, Validators.min(1)]],
      gender: ['', Validators.required],
      rating: ['', Validators.required],
      img: ['', Validators.pattern(reg)]

    });

    this.EditProductForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
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


  getValue(form: FormGroup,value:string){
    return form.get(value);
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
    this.EditProductForm.get('title')?.setValue(m.title);
    this.EditProductForm.get('description')?.setValue(m.description);
    this.EditProductForm.get('release_year')?.setValue(m.release_year);
    this.EditProductForm.get('cost')?.setValue(m.cost);
    this.EditProductForm.get('unid')?.setValue(m.stock);
    this.EditProductForm.get('gender')?.setValue(m.genre_id);
    this.EditProductForm.get('rating')?.setValue(m.rating_id);
    this.EditProductForm.get('img')?.setValue(m.image_link);
  }

  showUser(u: User){
    document.getElementById('IDU')?.setAttribute('value', String(u.user_id));
    document.getElementById('user')?.setAttribute('value', String(u.name +' '+u.lastname));
    //document.getElementById('rol')?.setAttribute('value', String(u.access_permission));
    this.userselected = u.permission_id;
    this.currentRol = u.permission_id;
    
    
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


    this.newMovie.title = this.NewProductForm.get('title')?.value;
    this.newMovie.description = this.NewProductForm.get('description ')?.value;
    this.newMovie.release_year = this.NewProductForm.get('release_year')?.value;
    this.newMovie.cost = this.NewProductForm.get('cost')?.value;
    this.newMovie.stock = this.NewProductForm.get('unid')?.value;
    this.newMovie.genre_id = this.NewProductForm.get('gender')?.value;
    this.newMovie.rating_id = this.NewProductForm.get('rating')?.value;
    this.newMovie.image_link = this.NewProductForm.get('img')?.value;

    console.log(JSON.stringify(this.newMovie));
    
    
    this.moviesServies.postMovie(JSON.stringify(this.newMovie)).subscribe(
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

  }

}

