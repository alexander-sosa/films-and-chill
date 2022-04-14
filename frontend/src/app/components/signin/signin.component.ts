import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UserSingUp } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user: UserSingUp ={
    name: '',
    lastname: '',
    permission_id: 0,
    email: '',
    pass: ''
  }

  public signForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private userservices: UserService, 
    private router: Router, 
    private location: Location
    ) { 
      this.signForm = this.formBuilder.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(8)]],
      pass_conf: ['', [Validators.required, Validators.minLength(8)]]
    });  
  }

  ngOnInit(): void {
    
  }

  getValue(value:string){
    return this.signForm.get(value);
  }

  signin(){
    let resp:any;
    console.log(this.signForm.value);
    if(!this.getConfirm()){
      console.log('enviar');

      console.log(this.router.url);

      this.user.name = this.signForm.get('name')?.value;
      this.user.lastname = this.signForm.get('last_name')?.value;  
      if (this.router.url === '/signin/adm') {
        console.log('admin');
        this.user.permission_id = 0;
      }else if (this.router.url === '/signin/cli') {
        this.user.permission_id = 1;
      }
      this.user.email = this.signForm.get('email')?.value;
      this.user.pass = this.signForm.get('pass')?.value;    
      console.log(JSON.stringify(this.user));
      
      this.userservices.postUser(JSON.stringify(this.user)).subscribe(
        res => {
          console.log('notification');
          console.log('response: '+res.status);
          console.log('respuesta:'+ Object.values(res));
          if (res.status === 200) {
            resp = Object.values(res);
            console.log('token: '+ resp);
            this.saveLocalStorage(resp);
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Registro exitoso',
              showConfirmButton: false,
              timer: 1500
            })
            
          }
          
        },
        err =>{
          console.log('response: '+err.status);
          console.log('Response: '+ err);
          
          /*if (err.status === 200) {
            console.log('notification2');
            resp = Object.values(err);
            console.log('token: '+ resp);
            this.saveLocalStorage(resp);
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Registro exitoso',
              showConfirmButton: false,
              timer: 1500
            })
            this.location.replaceState('/'); // clears browser history so they can't navigate with back button
            this.router.navigate(['movies']);
          }*/
        }
      );

    }else{
      console.log('error');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Confirma tu contraseña'
      })
    }
    setTimeout(() => this.router.navigate(['/movies']), 1500);
  }

  getConfirm(){
    if(this.signForm.get('pass')?.value !== this.signForm.get('pass_conf')?.value){
      return true;
    }else{
      return false;
    }
  }

  saveLocalStorage(token:string){
    localStorage.setItem('token', token);
  }

}