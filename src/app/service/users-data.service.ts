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

  queryParams: SortFilter;

  constructor(
    private http: HttpClient,
    private contextService: ContextService
    ) {

    this.contextService.queryParamsUsers$.subscribe((data: SortFilter) => {
      this.queryParams = data;
      console.log(this.queryParams);
      console.log(this.queryParams.filter);
    });
   }

  getUsers(params?: any): Observable<UsersPageable> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<UsersPageable>(`${this.url}/users?sort[${this.queryParams.sortBy}]=${this.queryParams.sortValue}${this.queryParams.filter}`, {params});
  }

  getAllUsers(params?: any): Observable<UsersPageable> {
    return this.http.get<UsersPageable>(`${this.url}/users`, {params});
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.url}/users/${userId}`);
  }

  createUser(postData: UserForm) {
    return this.http.post(`${this.url}/users`, postData, {observe: 'response'});
  }

}
