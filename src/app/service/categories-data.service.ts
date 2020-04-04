import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesDataService {

  url = environment.api.url;

  constructor(private http: HttpClient) { }

  

}
