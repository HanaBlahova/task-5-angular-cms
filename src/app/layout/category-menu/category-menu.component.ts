import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category.model';
import { CategoriesDataService } from 'src/app/service/categories-data.service';

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss']
})
export class CategoryMenuComponent implements OnInit {

  categories: Category[];

  constructor(private categoriesDataService: CategoriesDataService) { }

  ngOnInit(): void {

    this.categoriesDataService.getCategories().subscribe((data: Category[]) => this.categories = data);

  }

}
