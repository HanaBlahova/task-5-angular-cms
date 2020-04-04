import { Component, OnInit } from '@angular/core';
import { CategoriesDataService } from 'src/app/service/categories-data.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {

  constructor(private categoriesDataService: CategoriesDataService) { }

  ngOnInit(): void {
  }

}
