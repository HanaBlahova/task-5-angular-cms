import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginForm } from '../model/form.model';

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
  } 

  constructor() { }


  ngOnInit(): void {
    this.loginForm = new FormGroup ({
      'email': new FormControl(null, [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onLoginSubmit() {
    this.updateData();
    console.log(this.logFormData);
  }

  updateData() {
    this.logFormData.email = this.loginForm.get('email').value;
    this.logFormData.password = this.loginForm.get('password').value;
  }

}
