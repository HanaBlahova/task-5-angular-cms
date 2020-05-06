import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginForm } from '../../model/form.model';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/service/alert.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  logFormData: LoginForm = {
    email: '',
    password: ''
  };


  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.loginForm = new FormGroup ({
      // tslint:disable-next-line:max-line-length
      email: new FormControl(null, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onLoginSubmit() {
    this.logFormData.email = this.loginForm.get('email').value;
    this.logFormData.password = this.loginForm.get('password').value;

    this.authService.loginUser(this.logFormData).subscribe(
      res => this.router.navigate(['/']),
    );
  }

}
