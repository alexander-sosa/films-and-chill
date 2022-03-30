import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
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
    
    
  }
}
