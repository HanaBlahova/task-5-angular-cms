import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterForm } from '../model/form.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  regFormData: RegisterForm = {
    name: '',
    email: '',
    password: ''
  } 

  constructor() { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.maxLength(20)] ),
      'email': new FormControl(null, [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onRegisterSubmit() {
    this.updateData();
    console.log(this.regFormData);
  }

  updateData() {
    this.regFormData.name = this.registerForm.get('name').value;
    this.regFormData.email = this.registerForm.get('email').value;
    this.regFormData.password = this.registerForm.get('password').value;
  }

}
