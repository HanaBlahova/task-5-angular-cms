import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  isLoggedIn: boolean;
  isAdmin: boolean;
  user: User;

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }


  ngOnInit(): void {
    
    this.authService.isLoggedIn$.subscribe(data => {
      this.isLoggedIn = data;
    });
    this.authService.user$.subscribe(data => this.user = data);
    this.authService.isAdmin$.subscribe(data => this.isAdmin = data);
    
  }

  onLogout() {
    this.authService.logoutUser();
  };
  

}
