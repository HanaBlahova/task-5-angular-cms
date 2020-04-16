import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../model/category.model';
import { CategoriesDataService } from './categories-data.service';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  categories$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>(null);

  constructor(
    private categoriesDataService: CategoriesDataService
    ) { 
      this.categoriesDataService.getCategories().subscribe((data: Category[]) => {
        this.categories$.next(data);
        console.log(data);
      });
    }
}
