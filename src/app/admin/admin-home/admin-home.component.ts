import { Component, OnInit } from '@angular/core';
import { PostsDataService } from 'src/app/service/posts-data.service';
import { CategoriesDataService } from 'src/app/service/categories-data.service';
import { UsersDataService } from 'src/app/service/users-data.service';
import { Post } from 'src/app/model/post.model';
import { User } from 'src/app/model/user.model';
import { Category } from 'src/app/model/category.model';
import { UsersPageable } from 'src/app/model/pageable.model';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  postsArr: Post[];
  categoriesArr: Category[];
  usersArr: User[];
  usersPageable: UsersPageable;

  constructor(
    private postsDataService: PostsDataService,
    private categoriesDataService: CategoriesDataService,
    private usersDataService: UsersDataService,
  ) { }

  ngOnInit(): void {

    this.postsDataService.getPosts().subscribe((data: Post[]) => this.postsArr = data);
    this.categoriesDataService.getCategories().subscribe((data: Category[]) => this.categoriesArr = data);
    this.usersDataService.getUsers().subscribe((data: UsersPageable) => {
      this.usersPageable = data;
      this.usersArr = this.usersPageable.items;
    });
  }

}