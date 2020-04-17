import { Component, OnInit } from '@angular/core';
import { UsersDataService } from 'src/app/service/users-data.service';
import { User } from 'src/app/model/user.model';
import { Router } from '@angular/router';
import { UsersPageable } from 'src/app/model/pageable.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  usersPageable: UsersPageable;
  users: User[];
  p: number; 
  total: number;
  query = {
    page: 1,
    limit: 10
  }
  roles: string[] = ['ADMIN', 'USER'];

  disabledBtn: boolean = true;

  searchForm: FormGroup;
  
  constructor(
    private usersDataService: UsersDataService, 
    private router: Router
  ) { }

  ngOnInit(): void {

    this.searchForm = new FormGroup({
      'search': new FormControl(null)
    })

    this.usersDataService.getUsers(this.query).subscribe((data: UsersPageable) => {
      this.usersPageable = data;
      console.log(this.usersPageable.pagination);
      this.p = this.usersPageable.pagination.page;
      this.total = this.usersPageable.pagination.total;
      this.users = this.usersPageable.items
    });
  }

  onSearch($event: any) {
    console.log($event);
  };

  onDeleteUser(id:string) {

  };

  pageChanged($event: any) {
    this.query.page = $event.toString();
    console.log(this.query.page);
    console.log(this.query);
    this.usersDataService.getUsers(this.query).subscribe((data: UsersPageable) => {
      this.usersPageable = data;
      console.log(this.usersPageable.pagination);
      this.p = this.usersPageable.pagination.page;
      this.users = this.usersPageable.items
    });
  }

}
