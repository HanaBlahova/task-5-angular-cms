import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category.model';
import { CategoriesDataService } from 'src/app/service/categories-data.service';
import { PostsDataService } from 'src/app/service/posts-data.service';
import { ContextService } from 'src/app/service/context.service';

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss']
})
export class CategoryMenuComponent implements OnInit {

  categories: Category[];

  constructor(
    private categoriesDataService: CategoriesDataService,
    private postsDataService: PostsDataService,
    private contextService: ContextService) { }

  ngOnInit(): void {

    this.categoriesDataService.getCategories().subscribe((data: Category[]) => this.categories = data);

  }

  categoryFilter($event: any) {
    let event = $event.toElement.text;
    this.contextService.filttringCategory$.next(event);
  }

}
