import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User ={
    email: '',
    pass: ''
  }

  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userservices: UserService, private router: Router, private location: Location) { 
      this.loginForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(8)]]
    });

  }

  ngOnInit(): void {
  }

  getValue(value:string){
    return this.loginForm.get(value);
  }

  login(){
    console.log(this.loginForm.value);
    console.log(this.router.url);

    
    this.user.email = this.loginForm.get('email')?.value;
    this.user.pass = this.loginForm.get('pass')?.value;    
    console.log(JSON.stringify(this.user));
    
    this.userservices.postUser(JSON.stringify(this.user)).subscribe(
      res => {},
      err =>{
        console.log('response: '+err.status);
        if (err.status === 200) {
          console.log('notification2');
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Inicion de sesión Exitoso',
            showConfirmButton: false,
            timer: 1500
          })
          this.location.replaceState('/'); // clears browser history so they can't navigate with back button
          this.router.navigate(['movies']);
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Datos incorrectos'
          })
        }
      }
    );
    
    
  }
}
