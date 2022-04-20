import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { Timestamp } from "rxjs";

@Component({
  selector: 'app-use-profile',
  templateUrl: './use-profile.component.html',
  styleUrls: ['./use-profile.component.css']
})
export class UseProfileComponent implements OnInit {
  todayNumber: number = Date.now();
  todayDate : Date = new Date();
  todayString : string = new Date().toDateString();
  todayISOString : string = new Date().toISOString();

  userselected?: Number;
  rols: any = [];
  currentRol?: Number;
  IDU?: Number;

  public EditUserForm: FormGroup;
  public SetRolForm: FormGroup;

  users: any = [];
  user: User = {
    user_id: 0,
    name: '',
    lastname: '',
    permission_id: 0,
    username: ''
  }
  current_user: User = {
    user_id: 0,
    name: '',
    lastname: '',
    permission_id: 0,
    username: ''
  }

  constructor(
    private userSevice: UserService, 
    private formBuilder: FormBuilder,
    private router: Router
    ) { 
      this.SetRolForm = this.formBuilder.group({
        IDU: [''],
        rol: ['']
      });
    

    this.EditUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(8)]],
    });

  }

  ngOnInit(): void {
    this.IDU = Number(localStorage.getItem("idu"));
    this.getUserInfo();
    this.generateRols();
  }

  getValue(form: FormGroup,value:string){
    return form.get(value);
  }

  generateRols(){
    this.rols = [
      {id:1, rol: 'Admin'},
      {id:2, rol: 'Cliente'}
    ]
  }

  getUserInfo(){
    
    this.userSevice.getUser(Number(this.IDU)).subscribe(
      res => {
        this.current_user = res;
        //console.log(this.current_user);
        this.showUserInfo(this.current_user);
      },
      err => {
        console.log(err)
      }
    );
  }

  showUserInfo(u: User){
    console.log('user:', u);
    document.getElementById('IDUser')?.setAttribute('value', String(u.user_id));
    this.EditUserForm.get('name')?.setValue(u.name);
    this.EditUserForm.get('last_name')?.setValue(u.lastname);
    this.EditUserForm.get('email')?.setValue(u.username);
    this.userselected = u.permission_id;
    this.currentRol = u.permission_id;

  }

  updateUser(){
    const current = new Date();

    current.setHours(0)

    current.setMinutes(0)

    current.setSeconds(0)

    current.setMilliseconds(0)
    const timestamp = current.getTime();


    
    var IDU = (document.getElementById('IDUser') as HTMLInputElement).value;
    var newRol = (document.getElementById('rol') as HTMLInputElement).value;
   

    let data = {
      "name": this.EditUserForm.get('name')?.value,
      "lastname": this.EditUserForm.get('last_name')?.value,
      "permission_id": Number(newRol),
      "username": this.EditUserForm.get('email')?.value,
      "pass": this.EditUserForm.get('pass')?.value,
      "tuple_status": true,
      "last_update": this.todayISOString
      //lastupdate": "2022-03-31T02:58:38.000+00:00"

    } 

    console.log('data: '+ JSON.stringify(data));

    this.userSevice.putUser(data, Number(IDU)).subscribe(
      res => {
        console.log('notification');
        console.log('response: '+res);
        /*if (res != '') {
          
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Registro actualizado',
            showConfirmButton: false,
            timer: 1500
          })
          this.getUsersList();
          
        }*/
      },
      err =>{
        console.log('notification2');
        console.log(err);
        //console.log('response: '+ );
        /*if (err.statusText === 'OK') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Registro actualizado',
            showConfirmButton: false,
            timer: 1500
          })
          this.getUsersList();*/
      }
          
    );

    
  }


}
