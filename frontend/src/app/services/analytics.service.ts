import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  API_URL = 'http://localhost:8080';
  tkn = 'Bearer ' + localStorage.getItem('token');

  headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');
  auth_headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*')
  .set('Authorization', this.tkn);

  constructor(private http: HttpClient) { }

  getMovieAnalytics(){
    return this.http.get(this.API_URL + '/movie/report', {headers: this.auth_headers});
  }
}
