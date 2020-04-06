import { Component, OnInit } from '@angular/core';
import { CategoriesDataService } from 'src/app/service/categories-data.service';
import { Category } from 'src/app/model/category.model';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {

  categories: Category[];
  
  constructor(private categoriesDataService: CategoriesDataService) { }

  ngOnInit(): void {

    this.categoriesDataService.getCategories().subscribe((data: Category[]) => this.categories = data);
  }

  onUpdateCategory() {

  };

  onDeleteCategory() {

  };

}
