import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})

export class UserService {

  API_URL = 'http://localhost:8080';

  tkn = 'Bearer ' + localStorage.getItem('token');

  headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

  auth_headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*')
  .set('Authorization', this.tkn);

  constructor(private http: HttpClient) { }

  postUser(postData:any){
    return this.http.post<HttpResponse<any>>((this.API_URL + '/user'),postData,{ 'headers': this.headers });
    /*return this.httpClient.get(this.baseURL + 'users/' + userName + '/repos', { 'headers': headers })*/
  }

  postLogin(postData:any){
    return this.http.post<HttpResponse<any>>((this.API_URL + '/auth'),postData,{ 'headers': this.headers });
    /*return this.httpClient.get(this.baseURL + 'users/' + userName + '/repos', { 'headers': headers })*/
  }

  getUsers(){
    return this.http.get(this.API_URL + '/user', {headers: this.auth_headers});
  }

  putRol(putData:any){
    return this.http.put<any>((this.API_URL + '/user/permission'),putData,{ 'headers': this.auth_headers });
  }

 
}