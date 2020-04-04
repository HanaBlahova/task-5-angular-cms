import { Component, OnInit } from '@angular/core';
import { UsersDataService } from 'src/app/service/users-data.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  constructor(private usersDataService: UsersDataService) { }

  ngOnInit(): void {
  }

}
