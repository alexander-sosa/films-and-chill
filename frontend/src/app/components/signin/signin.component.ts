import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public signForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
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
