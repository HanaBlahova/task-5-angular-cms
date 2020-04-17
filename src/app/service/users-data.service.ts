import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserForm } from '../model/user.model';
import { UsersPageable } from '../model/pageable.model';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  url = environment.api.url;
  sortBy: string = 'email';
  sortValue: string = 'desc';
  filterBy: string = 'email';
  filterValue: string = 'test@test.com';
  //filter: string = `&filter[${this.filterBy}]=${this.filterValue}`;
  filter: string = ``;

  constructor(private http: HttpClient) { }

  getUsers(params?: any): Observable<UsersPageable> {
    return this.http.get<UsersPageable>(`${this.url}/users?sort[${this.sortBy}]=${this.sortValue}${this.filter}`, {params: params});
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
