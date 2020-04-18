import { Component, OnInit } from '@angular/core';
import { PostsDataService } from 'src/app/service/posts-data.service';
import { CategoriesDataService } from 'src/app/service/categories-data.service';
import { UsersDataService } from 'src/app/service/users-data.service';
import { Post } from 'src/app/model/post.model';
import { User } from 'src/app/model/user.model';
import { Category } from 'src/app/model/category.model';
import { UsersPageable, PostsPageable } from 'src/app/model/pageable.model';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  categoriesArr: Category[];
  totalUsers: number;
  totalPosts: number;

  constructor(
    private postsDataService: PostsDataService,
    private categoriesDataService: CategoriesDataService,
    private usersDataService: UsersDataService,
  ) { }

  ngOnInit(): void {

    this.postsDataService.getPosts().subscribe((data: PostsPageable) => {
      this.totalPosts = data.pagination.total;
    });
    this.categoriesDataService.getCategories().subscribe((data: Category[]) => this.categoriesArr = data);

    this.usersDataService.getUsers().subscribe((data: UsersPageable) => {
      this.totalUsers = data.pagination.total;
      console.log(data.items)
    });
  }

}
