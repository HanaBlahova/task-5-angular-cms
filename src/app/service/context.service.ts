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

  filttringCategory$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  queryParamsUsers$: BehaviorSubject<SortFilter> = new BehaviorSubject<SortFilter>({
    sortBy: 'email',
    sortValue: 'desc',
    // filterBy: 'email',
    // filterValue: 'dixie14@seznam.cz',
    filter: ''
  });

  queryParamsPostsA$: BehaviorSubject<SortFilter> = new BehaviorSubject<SortFilter>({
    sortBy: 'name',
    sortValue: 'asc',
    // filterBy: 'email',
    // filterValue: 'dixie14@seznam.cz',
    filter: ''
  });

  queryParamsPosts$: BehaviorSubject<SortFilter> = new BehaviorSubject<SortFilter>({
    sortBy: 'name',
    sortValue: 'asc',
    // filterBy: 'email',
    // filterValue: 'dixie14@seznam.cz',
    filter: ''
  });

  // sortByU: string = 'email';
  // sortValueU: string = 'desc';
  // filterByU: string = 'roles';
  // filterValueU: string = 'ADMIN';

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
