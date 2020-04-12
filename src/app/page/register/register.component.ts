import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterForm } from '../../model/form.model';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  regFormData: RegisterForm = {
    //name: '',
    email: '',
    password: ''
  } 

  isLoggedIn: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      //'name': new FormControl(null, [Validators.required, Validators.maxLength(20)] ),
      'email': new FormControl(null, [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

    this.authService.isLoggedIn$.subscribe((data:boolean) => this.isLoggedIn = data);
  }

  onRegisterSubmit() {
    
    //this.regFormData.name = this.registerForm.get('name').value;
    this.regFormData.email = this.registerForm.get('email').value;
    this.regFormData.password = this.registerForm.get('password').value;

    this.authService.registerUser(this.regFormData).subscribe((res: any) => {
      if(this.isLoggedIn) {
        this.router.navigate(['/archive']);
      }
    });
  }


}
