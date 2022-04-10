import { Component, OnInit } from '@angular/core';

import { Movie } from 'src/app/models/Movie'; 

import { MoviesService } from 'src/app/services/movies.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

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

  movies: any = [];

  constructor(private moviesServies: MoviesService) { }

  ngOnInit(): void {
    this.getInventory();
  }

  getInventory(){
    this.moviesServies.getMovies().subscribe(
      res => {
        this.movies = res;
      },
      err => console.log(err)
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

  cambiarRol(){
    console.log("Guardado Rol");
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cambio de Rol Realizado',
        showConfirmButton: false,
        timer: 2000
      })
      //setTimeout(() => window.location.reload(), 2000);
  }
}
