import { Component, OnInit } from '@angular/core';
import { UsersDataService } from 'src/app/service/users-data.service';
import { User } from 'src/app/model/user.model';
import { Router } from '@angular/router';
import { UsersPageable } from 'src/app/model/pageable.model';
import { FormGroup, FormControl } from '@angular/forms';
import { ContextService } from 'src/app/service/context.service';
import { SortFilter } from 'src/app/model/sort-filter.model';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  searchForm: FormGroup;

  usersPageable: UsersPageable;
  users: User[];
  page: number; 
  total: number;
  query = {
    page: 1,
    limit: 10
  }
  roles: string[] = ['ADMIN', 'USER'];
  disabledBtn: boolean = true;

  queryParams: SortFilter;
  
  constructor(
    private usersDataService: UsersDataService, 
    private contextService: ContextService,
  ) { }

  ngOnInit(): void {

    this.searchForm = new FormGroup({
      'search': new FormControl(null)
    })

    this.usersDataService.getUsers(this.query).subscribe((data: UsersPageable) => {
      this.usersPageable = data;
      console.log(this.usersPageable.pagination);
      this.page = this.usersPageable.pagination.page;
      this.total = this.usersPageable.pagination.total;
      this.users = this.usersPageable.items
    });

    this.contextService.queryParamsUsers$.subscribe((data: SortFilter) => this.queryParams = data);
  }

  onSearch() {
    console.log(this.searchForm.get('search').value);
    if(!this.searchForm.get('search').value) {
      this.queryParams.filter = '';
      console.log(this.queryParams);
      this.contextService.queryParamsUsers$.next(this.queryParams);
      this.usersDataService.getUsers(this.query).subscribe((data: UsersPageable) => this.users = data.items)
    } else {
      this.queryParams.filter = this.contextService.toFilterString('email', this.searchForm.get('search').value);
      console.log(this.queryParams);
      this.contextService.queryParamsUsers$.next(this.queryParams);
      this.usersDataService.getUsers(this.query).subscribe((data: UsersPageable) => this.users = data.items);
    }
  };

  onDeleteUser(id:string) {
    // preparation for deleting users
  };

  pageChanged($event: any) {
    this.query.page = $event.toString();
    console.log(this.query.page);
    console.log(this.query);
    this.usersDataService.getUsers(this.query).subscribe((data: UsersPageable) => {
      this.usersPageable = data;
      console.log(this.usersPageable.pagination);
      this.page = this.usersPageable.pagination.page;
      this.users = this.usersPageable.items
    });
  };

  onChange($event: any) {
    if($event.srcElement.value === 'Roles'  ) {
      this.queryParams.filter = '';
      this.contextService.queryParamsUsers$.next(this.queryParams);
      this.usersDataService.getUsers(this.query).subscribe((data: UsersPageable) => {
        this.usersPageable = data;
        this.users = data.items;
      });
    } else {
      this.queryParams.filter = this.contextService.toFilterString('roles', $event.srcElement.value);
      this.contextService.queryParamsUsers$.next(this.queryParams);
      this.usersDataService.getUsers(this.query).subscribe((data: UsersPageable) => {
        this.usersPageable = data;
        this.users = data.items;
      });
    }
    console.log($event.srcElement.value);
  };

}
