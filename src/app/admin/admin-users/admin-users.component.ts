import { Component, OnInit } from '@angular/core';
import { UsersDataService } from 'src/app/service/users-data.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  users: User[];
  
  constructor(private usersDataService: UsersDataService) { }

  ngOnInit(): void {

    this.usersDataService.getUsers().subscribe((data: User[]) => this.users = data);
  }

  onUpdateUser() {

  };

  onDeleteUser() {

  };

}
