import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from "rxjs/operators";
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken = localStorage.getItem('id_token');
  user: any;

  loggedIn = new BehaviorSubject(false);
  constructor(private http: HttpClient) {
    if(this.authToken) {
      this.loggedIn.next(true);
    }
   }

  registerUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'appication/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
                // .pipe(map(res => res.json()));
                 .pipe(map(res => res));
  }
  
  authenticateUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'appication/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
            // .pipe(map(res => res.json()));
            .pipe(map(res => res));
  }

  getProfile() {
    let headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authToken
    });
    this.loadToken();
    return this.http.get('http://localhost:3000/users/profile', {headers: headers})
            // .pipe(map(res => res.json()));
            .pipe(map(res => res));
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    this.authToken = localStorage.getItem('id_token');
  }

  loadIn() {
    return new JwtHelperService();
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
