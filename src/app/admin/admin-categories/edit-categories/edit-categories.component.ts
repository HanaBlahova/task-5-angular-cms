import { Component, OnInit } from '@angular/core';
import { CategoriesDataService } from 'src/app/service/categories-data.service';

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.scss']
})
export class EditCategoriesComponent implements OnInit {

  constructor(private categoriesDataService: CategoriesDataService) { }

  ngOnInit(): void {
  }

}
