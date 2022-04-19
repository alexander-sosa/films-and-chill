import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LoginFirstService {

  constructor() { }

  loginFirstAlert(){
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Inicia sesión primero',
      showConfirmButton: false,
      timer: 1500
    })
    setTimeout(() => window.location.replace("http://localhost:4200/login"), 1000);
  }
}
