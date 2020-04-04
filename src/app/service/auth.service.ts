import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RegisterForm, LoginForm } from '../model/form.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.api.url;

  constructor(private http: HttpClient) { }

  registerUser(postData: RegisterForm) {
    return this.http.post(`${this.url}/auth/sign-up`, postData, {observe: 'response'});
  }

  loginUser(postData: LoginForm) {
    return this.http.post(`${this.url}/auth/sign-in`, postData, {observe: 'response'});
  }

}
