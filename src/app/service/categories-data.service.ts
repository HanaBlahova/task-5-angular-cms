import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../model/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesDataService {

  url = environment.api.url;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}/categories`);
  }

  getCategory(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`${this.url}/categories/${categoryId}`);  
  }

  createCategory(postData: Category) {
    return this.http.post(`${this.url}/categories`, postData, {observe: 'response'}); 
  }

  updateCategory(categoryId: string, putData: Category) {
    return this.http.put(`${this.url}/categories/${categoryId}`, putData, {observe: 'response'}); 
  }

  deleteCategory(categoryId: string) {
    return this.http.delete(`${this.url}/categories/${categoryId}`, {observe: 'response'}); 
  }
}
