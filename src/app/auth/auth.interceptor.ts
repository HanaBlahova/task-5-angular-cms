import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  isLoggedIn: boolean;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) {
    this.authService.isLoggedIn$.subscribe(data => this.isLoggedIn = data);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('test2');
    if (this.isLoggedIn) {
      request = request.clone({
          headers: request.headers.set(
            'Authorization',
            this.cookieService.get('token')
          )
      });
    }
    return next.handle(request).pipe(
      catchError((e: any) => {
        if (e.status === 401) {
          this.authService.logoutUser();
        }
        return throwError((e));
      })
    );
  }
}
