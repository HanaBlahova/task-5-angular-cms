import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Category, CategoryForm } from '../model/category.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesDataService {

  url = environment.api.url;

  constructor(
    private httpService: HttpService,
    ) { }

  getCategories(): Observable<Category[]> {
    return this.httpService.get<Category[]>(`${this.url}/categories`);
  }

  getCategory(categoryId: string): Observable<Category> {
    return this.httpService.get<Category>(`${this.url}/categories/${categoryId}`);
  }

  createCategory(postData: CategoryForm) {
    return this.httpService.post(`${this.url}/categories`, postData, {observe: 'response'});
  }

  updateCategory(categoryId: string, putData: Category) {
    return this.httpService.put(`${this.url}/categories/${categoryId}`, putData, {observe: 'response'});
  }

  deleteCategory(categoryId: string) {
    return this.httpService.delete(`${this.url}/categories/${categoryId}`, {observe: 'response'});
  }
}
