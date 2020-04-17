import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../model/category.model';
import { CategoriesDataService } from './categories-data.service';
import { PostsPageable } from '../model/pageable.model';
import { Post } from '../model/post.model';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  categories$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>(null);

  filttringCategory$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private categoriesDataService: CategoriesDataService
    ) { 
      this.categoriesDataService.getCategories().subscribe((data: Category[]) => {
        this.categories$.next(data);
        console.log(data);
      });
    }
}
