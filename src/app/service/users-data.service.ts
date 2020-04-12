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

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UsersPageable> {
    return this.http.get<UsersPageable>(`${this.url}/users`);
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.url}/users/${userId}`);
  }

  createUser(postData: UserForm) {
    return this.http.post(`${this.url}/users`, postData, {observe: 'response'});
  }

}
