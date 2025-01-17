import { Component, OnInit } from '@angular/core';
import { UsersDataService } from 'src/app/service/users-data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User, UserForm } from 'src/app/model/user.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent implements OnInit {

  userForm: FormGroup;
  user: User;
  newFormData: UserForm;
  updFormData: User;
  exist: boolean;

  constructor(
    private usersDataService: UsersDataService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {

    this.userForm = new FormGroup({
      // tslint:disable-next-line:max-line-length
      email: new FormControl(null, [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
      password: new FormControl(null)
    });

    this.route.params.pipe(
      switchMap((params: Params) => {
        if (params.id) {
          return this.usersDataService.getUser(params.id);
        } else {
          return of(null);
        }
      })).subscribe((data: User) => {
        this.user = data;
        if (this.user) {
            this.exist = true;
            this.userForm.patchValue({
             email: this.user.email,
           });
        }
      });
    }

  onUserSubmit() {
    this.newFormData = {
      email: this.userForm.get('email').value,
      password: this.userForm.get('password').value
    };
    return this.usersDataService.createUser(this.newFormData).subscribe((res: any) => {
      if (res.body.message === 'Duplicate email.') {
        alert('Duplicated email!');
      } else {
        this.router.navigate(['/admin/users']);
      }
    });
  }

}
