import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserForm } from '../model/user.model';
import { UsersPageable } from '../model/pageable.model';
import { ContextService } from './context.service';
import { SortFilter } from '../model/sort-filter.model';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  url = environment.api.url;
  // sortByU: string = 'email';
  // sortValueU: string = 'desc';
  // filterByU: string = 'roles';
  // filterValueU: string = 'ADMIN';
  // filter: string = `&filter[${this.filterByU}]=${this.filterValueU}`;
  //filter: string = ``;

  queryParams: SortFilter;
  sortBy: string;
  sortValue: string;
  filterBy: string;
  filterValue: string;
  filter: string;

  constructor(private http: HttpClient, private contextService: ContextService) {
    this.contextService.queryParamsUsers$.subscribe((data: SortFilter) => {
      this.queryParams = data;
      // this.sortBy = this.queryParams.sortBy;
      // this.sortValue = this.queryParams.sortValue;
      // this.filterBy = this.queryParams.filterBy;
      // this.filterValue = this.queryParams.filterValue;
      // this.filter = this.queryParams.filter;
      console.log(this.queryParams);
      console.log(this.queryParams.filter);
    })
   }

  getUsers(params?: any): Observable<UsersPageable> {
    return this.http.get<UsersPageable>(`${this.url}/users?sort[${this.queryParams.sortBy}]=${this.queryParams.sortValue}${this.queryParams.filter}`, {params: params});
    //return this.http.get<UsersPageable>('http://localhost:8080/api/v1/users?page=1&limit=20&sort[email]=desc&filter[email]=test@test.com');
  }

  getAllUsers(params?: any): Observable<UsersPageable> {
    return this.http.get<UsersPageable>(`${this.url}/users`, {params: params});
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.url}/users/${userId}`);
  }

  createUser(postData: UserForm) {
    return this.http.post(`${this.url}/users`, postData, {observe: 'response'});
  }

}
