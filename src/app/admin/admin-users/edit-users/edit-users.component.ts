import { Component, OnInit } from '@angular/core';
import { UsersDataService } from 'src/app/service/users-data.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent implements OnInit {

  constructor(private usersDataService: UsersDataService) { }

  ngOnInit(): void {
  }

}
