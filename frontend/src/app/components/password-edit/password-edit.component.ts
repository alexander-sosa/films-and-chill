import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-password-edit',
  templateUrl: './password-edit.component.html',
  styleUrls: ['./password-edit.component.css']
})
export class PasswordEditComponent implements OnInit {

  public EditPassForm: FormGroup;

  constructor(private userSevice: UserService, 
    private formBuilder: FormBuilder,
    private router: Router) { 

      this.EditPassForm = this.formBuilder.group({

      });

    }

  ngOnInit(): void {
  }

  getValue(form: FormGroup,value:string){
    return form.get(value);
  }

  updatePass(){

  }

}
