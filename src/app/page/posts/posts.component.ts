import { Component, OnInit } from '@angular/core';
import { PostsDataService } from '../../service/posts-data.service';
import { Post } from 'src/app/model/post.model';
import { Category } from 'src/app/model/category.model';
import { CategoriesDataService } from 'src/app/service/categories-data.service';
import { PostsPageable } from 'src/app/model/pageable.model';
import { ContextService } from 'src/app/service/context.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  postsPageable: PostsPageable;
  posts: Post[];
  p: number;
  total: number;
  query = {
    page: 1,
    limit: 6
  }
  //   sort: {
  //     enabled: true,
  //     fields: {
  //       name: 'desc'
  //     }
  //   },
  //   // filter: {
  //   //   categories: '5e978f41e6157c55e1edad6e'
  //   // }
  // }
  categories: Category[];
  filteringCategory: string;

  constructor(
    private postsDataService: PostsDataService,
    private contextService: ContextService) { }

  ngOnInit(): void {
    console.log('Hello');

    this.postsDataService.getPosts(this.query).subscribe((data: PostsPageable) => {
      this.postsPageable = data;
      this.posts = this.postsPageable.items;
      this.p = this.postsPageable.pagination.page;
      this.total = this.postsPageable.pagination.total;

      console.log(this.postsPageable);
      console.log(this.posts.length, +this.query.limit);
      console.log(this.posts);
    });

    this.contextService.categories$.subscribe((data: Category[]) => this.categories = data);

    // this.contextService.filttringCategory$.subscribe((data: string) => {
    //   this.filteringCategory = data;
    //   this.query.filter.categories = this.filteringCategory;
    // });

  }

  pageChanged($event: any) {
    this.query.page = $event.toString();
    console.log(this.query.page);
    console.log(this.query);
    this.postsDataService.getPosts(this.query).subscribe((data: PostsPageable) => {
      this.postsPageable = data;
      console.log(this.postsPageable.pagination);
      this.p = this.postsPageable.pagination.page;
      this.posts = this.postsPageable.items
    });
  };




}
