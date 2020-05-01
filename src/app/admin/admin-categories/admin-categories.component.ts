import { Component, OnInit, Output } from '@angular/core';
import { CategoriesDataService } from 'src/app/service/categories-data.service';
import { Category } from 'src/app/model/category.model';
import { switchMap, catchError } from 'rxjs/operators';
import { ContextService } from 'src/app/service/context.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {

  categories: Category[];
  isLoading = false;

  constructor(
    private categoriesDataService: CategoriesDataService,
    private contextService: ContextService
    ) {}


  ngOnInit(): void {

    this.isLoading = true;
    this.categoriesDataService.getCategories().pipe(
      catchError((e: any) => {
          this.isLoading = false;
          return throwError((e));
        }
    )).subscribe((data: Category[]) => {
      this.contextService.categories$.next(data);
      this.isLoading = false;
    });

    this.contextService.categories$.subscribe((data: Category[]) => {
      this.categories = data;
    });
  }

  onDeleteCategory(id: string) {
    this.isLoading = true;
    this.categoriesDataService.deleteCategory(id).pipe(
      switchMap((res: any) => {
        console.log(res);
        return this.categoriesDataService.getCategories();
      }),
      catchError((e: any) => {
          this.isLoading = false;
          return throwError((e));
      })
    ).subscribe((data: Category[]) => {
      this.contextService.categories$.next(data);
      this.isLoading = false;
    });
  }

}
