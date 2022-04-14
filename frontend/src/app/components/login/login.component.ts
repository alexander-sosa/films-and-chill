import { Location } from '@angular/common';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
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
    username: '',
    pass: ''
  }

  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private userservices: UserService, 
    private router: Router, 
    private location: Location
    ) { 
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

    
    this.user.username = this.loginForm.get('email')?.value;
    this.user.pass = this.loginForm.get('pass')?.value;    

    let data = {
      "username": this.loginForm.get('email')?.value,
      "password": this.loginForm.get('pass')?.value
    }

    let resp:any;

    console.log(JSON.stringify(this.user));
    
    this.userservices.postLogin(data).subscribe(
      res => {
        //console.log(res.ok);
        console.log('Response: '+ res);
        console.log('respuesta: '+Object.values(res));
        resp = Object.values(res);
        console.log('token: '+ resp[0]);
        this.saveLocalStorage(resp[0], resp[1], resp[2], resp[3]);
        
        if (JSON.parse(JSON.stringify(res)) !='') {
          console.log('notification2');
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Inicion de sesión Exitoso',
            showConfirmButton: false,
            timer: 1500
          })
          switch(resp[1]){
            case 1:
              console.log("Redirecting to...")
              this.location.replaceState('/');
              setTimeout(() => window.location.replace("http://localhost:4200/inventory"), 1000);
              break;
            case 2:
              console.log("Movies...")
              this.location.replaceState('/'); // clears browser history so they can't navigate with back button
              setTimeout(() => window.location.replace("http://localhost:4200/movies"), 1000);
              break;
          }
          //this.location.replaceState('/'); // clears browser history so they can't navigate with back button
          //this.router.navigate(['movies']);
        }
      },
      err =>{
        console.log('response: '+err.status);
        if(err.status === 401){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Datos incorrectos'
          })
        }
 
      }
    );    
  }

  saveLocalStorage(token:string, idr:number, name:string, lastname:string){
    localStorage.setItem('token', token);
    localStorage.setItem('idr', String(idr));
    localStorage.setItem('name', name);
    localStorage.setItem('lastname', lastname);
  }
}
