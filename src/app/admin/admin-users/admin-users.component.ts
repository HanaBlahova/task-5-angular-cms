import { Component, OnInit } from '@angular/core';
import { UsersDataService } from 'src/app/service/users-data.service';
import { User } from 'src/app/model/user.model';
import { Router } from '@angular/router';
import { UsersPageable } from 'src/app/model/pageable.model';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  usersPageable: UsersPageable;
  users: User[];
  p: number; 
  query = {
    page: '1',
    limit: '10'
  }
  
  constructor(private usersDataService: UsersDataService, private router: Router) { }

  ngOnInit(): void {

    this.usersDataService.getUsers().subscribe((data: UsersPageable) => {
      this.usersPageable = data;
      console.log(this.usersPageable.pagination);
      this.p = this.usersPageable.pagination.page;
      this.users = this.usersPageable.items
    });
  }

  onDeleteUser() {

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
