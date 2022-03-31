import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user: User ={
    name: '',
    lastname: '',
    access_permission: '',
    email: '',
    pass: '',
  	tuple_status: true
  }

  public signForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userservices: UserService, private router: Router) { 
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
    console.log(this.signForm.value);
    if(!this.getConfirm()){
      console.log('enviar');

      console.log(this.router.url);

      this.user.name = this.signForm.get('name')?.value;
      this.user.lastname = this.signForm.get('last_name')?.value;  
      if (this.router.url === '/signin/adm') {
        console.log('admin');
        this.user.access_permission = 'admin';
      }else if (this.router.url === '/signin/cli') {
        this.user.access_permission = 'client';
      }
      this.user.email = this.signForm.get('email')?.value;
      this.user.pass = this.signForm.get('pass')?.value;    
      console.log(JSON.stringify(this.user));
      
      this.userservices.postUser(JSON.stringify(this.user)).subscribe(
        res => {
          console.log(res);
        }
      );

    }else{
      console.log('error');
    }
    
  }

  getConfirm(){
    if(this.signForm.get('pass')?.value !== this.signForm.get('pass_conf')?.value){
      return true;
    }else{
      return false;
    }
  }

}
