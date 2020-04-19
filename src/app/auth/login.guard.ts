import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  isLoggedIn: boolean;

  constructor (
    private authService: AuthService,
    private router: Router
    ) {
      this.authService.isLoggedIn$.subscribe(data => this.isLoggedIn = data);
    }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.isLoggedIn) {
        return true;
      } else {
        this.router.navigate(['/']);
      }
    }
  
}
