import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  API_URL = 'http://localhost:8080';

  tkn = 'Bearer ' + localStorage.getItem('token');

  headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

  auth_headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*')
  .set('Authorization', this.tkn);


  constructor(private http: HttpClient) {}

  getPurchases(){
    return this.http.get(this.API_URL + '/purchase', {headers: this.auth_headers});
  }

  postPurchase(postData:any){
    return this.http.post<HttpResponse<any>>((this.API_URL + '/purchase'), postData, { headers: this.auth_headers });
  }

   
}


