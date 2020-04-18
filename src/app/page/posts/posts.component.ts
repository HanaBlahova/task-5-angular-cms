import { Component, OnInit } from '@angular/core';
import { PostsDataService } from '../../service/posts-data.service';
import { Post } from 'src/app/model/post.model';
import { Category } from 'src/app/model/category.model';
import { PostsPageable } from 'src/app/model/pageable.model';
import { ContextService } from 'src/app/service/context.service';
import { SortFilter } from 'src/app/model/sort-filter.model';

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
  queryParams: SortFilter;

  categories: Category[];
  filteringCategory: string;

  constructor(
    private postsDataService: PostsDataService,
    private contextService: ContextService) { }

  ngOnInit(): void {

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

    this.contextService.queryParamsPosts$.subscribe((data: SortFilter) => this.queryParams = data);

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
