import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RegisterForm, LoginForm } from '../model/form.model';
import { BehaviorSubject, of } from 'rxjs';
import { User } from '../model/user.model';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import * as JWT from 'jwt-decode';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  user: User;

  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isAdmin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  url = environment.api.url;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
    ) { 
      this.loadUser();
    }

  registerUser(postData: RegisterForm) {
    return this.http.post(`${this.url}/auth/sign-up`, postData).pipe(
      map((response: any) => {
        if(response.token) {
          this.user$.next(JWT(response.token));
          this.cookieService.set('token', response.token);
          this.isLoggedIn$.next(true);
        }
      })
    )
  };

  loginUser(postData: LoginForm) {
    return this.http.post(`${this.url}/auth/sign-in`, postData).pipe(
      map((response: any) => {
        if(response.token) {
          this.user$.next(JWT(response.token));
          this.cookieService.set('token', response.token);
          console.log(response.token);
          this.isLoggedIn$.next(true);
          this.verifyAdmin();
        }
      })
    )
  };

  loadUser() {
    if(this.cookieService.get('token')) {
      this.user$.next(JWT(this.cookieService.get('token')));
      this.isLoggedIn$.next(true);
      this.verifyAdmin();
    }
  }


  logoutUser() {
    this.user$.next(null);
    this.isLoggedIn$.next(false);
    this.isAdmin$.next(false);
    this.router.navigate(['/login']);
    this.cookieService.deleteAll();
  }

  verifyAdmin() {
    this.user$.subscribe(data => this.user = data);
    if(this.user.roles[0] === 'ADMIN') {
    this.isAdmin$.next(true);
    }
  };


}
