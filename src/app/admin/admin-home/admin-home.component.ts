import { Component, OnInit } from '@angular/core';
import { PostsDataService } from 'src/app/service/posts-data.service';
import { CategoriesDataService } from 'src/app/service/categories-data.service';
import { UsersDataService } from 'src/app/service/users-data.service';
import { Category } from 'src/app/model/category.model';
import { UsersPageable, PostsPageable } from 'src/app/model/pageable.model';
import { SortFilter } from 'src/app/model/sort-filter.model';
import { ContextService } from 'src/app/service/context.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  categoriesArr: Category[];
  totalUsers: number;
  totalPosts: number;

  queryParams: SortFilter;

  constructor(
    private postsDataService: PostsDataService,
    private categoriesDataService: CategoriesDataService,
    private usersDataService: UsersDataService,
    private contextService: ContextService
  ) { 
    this.contextService.queryParamsPostsA$.subscribe((data: SortFilter) => this.queryParams = data);
  }

  ngOnInit(): void {
    //this.queryParams.filter = '';
    this.postsDataService.getPosts(this.queryParams.sortBy, this.queryParams.sortValue, this.queryParams.filter).subscribe((data: PostsPageable) => {
      this.totalPosts = data.pagination.total;
    });
    
    this.categoriesDataService.getCategories().subscribe((data: Category[]) => this.categoriesArr = data);

    this.usersDataService.getUsers().subscribe((data: UsersPageable) => {
      this.totalUsers = data.pagination.total;
      console.log(data.items)
    });
  }

}
