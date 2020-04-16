import { Component, OnInit, Output } from '@angular/core';
import { CategoriesDataService } from 'src/app/service/categories-data.service';
import { Category } from 'src/app/model/category.model';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ContextService } from 'src/app/service/context.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {

  categories: Category[];

  
  constructor(
    private categoriesDataService: CategoriesDataService,
    private contextService: ContextService
    ) {}


  ngOnInit(): void {

    this.categoriesDataService.getCategories().subscribe((data: Category[]) => this.contextService.categories$.next(data  ));
    this.contextService.categories$.subscribe((data: Category[]) => this.categories = data);
  }


  onDeleteCategory(id: string) {
    this.categoriesDataService.deleteCategory(id).pipe(
      switchMap((res: any) => {
        console.log(res);
        return this.categoriesDataService.getCategories();
      })
    ).subscribe((data: Category[]) => this.contextService.categories$.next(data));

  };

}
