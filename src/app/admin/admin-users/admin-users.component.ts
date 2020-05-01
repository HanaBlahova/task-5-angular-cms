import { Component, OnInit } from '@angular/core';
import { UsersDataService } from 'src/app/service/users-data.service';
import { User } from 'src/app/model/user.model';
import { UsersPageable } from 'src/app/model/pageable.model';
import { FormGroup, FormControl } from '@angular/forms';
import { ContextService } from 'src/app/service/context.service';
import { SortFilter } from 'src/app/model/sort-filter.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
  };
  roles: string[] = ['ADMIN', 'USER'];
  disabledBtn = true;
  queryParams: SortFilter;
  isLoading = false;

  constructor(
    private usersDataService: UsersDataService,
    private contextService: ContextService,
  ) { }

  ngOnInit(): void {

    this.searchForm = new FormGroup({
      search: new FormControl(null)
    });

    this.isLoading = true;
    this.usersDataService.getUsers(this.query).pipe(
      catchError((e: any) => {
          this.isLoading = false;
          return throwError((e));
        })
    ).subscribe((data: UsersPageable) => {
      this.usersPageable = data;
      this.page = this.usersPageable.pagination.page;
      this.total = this.usersPageable.pagination.total;
      this.users = this.usersPageable.items;
      this.isLoading = false;
    });

    this.contextService.queryParamsUsers$.subscribe((data: SortFilter) => this.queryParams = data);
  }

  onSearch() {
    this.isLoading = true;
    if (!this.searchForm.get('search').value) {
      this.queryParams.filter = '';
    } else {
      this.queryParams.filter = this.contextService.toFilterString('email', this.searchForm.get('search').value);
    }
    this.contextService.queryParamsUsers$.next(this.queryParams);
    this.usersDataService.getUsers(this.query).pipe(
      catchError((e: any) => {
          this.isLoading = false;
          return throwError((e));
        })
    ).subscribe((data: UsersPageable) => this.users = data.items);
    this.pageChanged(1);
    this.isLoading = false;
  }

  onDeleteUser(id: string) {
    // preparation for deleting users
  }

  pageChanged($event: any) {
    this.isLoading = true;
    this.query.page = $event.toString();
    this.usersDataService.getUsers(this.query).pipe(
      catchError((e: any) => {
          this.isLoading = false;
          return throwError((e));
        })
    ).subscribe((data: UsersPageable) => {
      this.usersPageable = data;
      this.page = this.usersPageable.pagination.page;
      this.users = this.usersPageable.items;
      this.isLoading = false;
    });
  }

  onChange($event: any) {
    this.isLoading = true;
    if ($event.srcElement.value === 'All'  ) {
      this.queryParams.filter = '';
    } else {
      this.queryParams.filter = this.contextService.toFilterString('roles', $event.srcElement.value);
    }
    this.contextService.queryParamsUsers$.next(this.queryParams);
    this.usersDataService.getUsers(this.query).pipe(
      catchError((e: any) => {
          this.isLoading = false;
          return throwError((e));
        })
    ).subscribe((data: UsersPageable) => {
        this.usersPageable = data;
        this.users = data.items;
        this.pageChanged(1);
        this.isLoading = false;
      });
  }
}

