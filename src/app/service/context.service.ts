import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../model/category.model';
import { CategoriesDataService } from './categories-data.service';
import { SortFilter } from '../model/sort-filter.model';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  categories$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>(null);

  queryParamsUsers$: BehaviorSubject<SortFilter> = new BehaviorSubject<SortFilter>({
    sortBy: 'email',
    sortValue: 'desc',
    filter: ''
  });

  queryParamsPostsA$: BehaviorSubject<SortFilter> = new BehaviorSubject<SortFilter>({
    sortBy: 'title',
    sortValue: 'asc',
    filter: ''
  });

  queryParamsPosts$: BehaviorSubject<SortFilter> = new BehaviorSubject<SortFilter>({
    sortBy: 'title',
    sortValue: 'asc',
    filter: ''
  });

  queryParamsPostsGrid$: BehaviorSubject<SortFilter> = new BehaviorSubject<SortFilter>({
    sortBy: 'createdAt',
    sortValue: 'desc',
    filter: ''
  });

  constructor(
    private categoriesDataService: CategoriesDataService
    ) {
      this.categoriesDataService.getCategories().subscribe((data: Category[]) => {
        this.categories$.next(data);
        console.log(data);
      });
    }

    toFilterString(filterBy: string, filterValue: string) {
      return `&filter[${filterBy}]=${filterValue}`;
    }
}
