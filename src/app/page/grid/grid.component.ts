import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category.model';
import { ContextService } from 'src/app/service/context.service';
import { PostsPageable } from 'src/app/model/pageable.model';
import { Post } from 'src/app/model/post.model';
import { SortFilter } from 'src/app/model/sort-filter.model';
import { PostsDataService } from 'src/app/service/posts-data.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  postsPageable: PostsPageable;
  posts: Post[];
  query = {
    page: 1,
    limit: 40
  };
  queryParams: SortFilter;
  categories: Category[];
  isLoading = false;


  constructor(
    private postsDataService: PostsDataService,
    private contextService: ContextService
  ) {
    this.contextService.queryParamsPostsGrid$.subscribe((data: SortFilter) => this.queryParams = data);
    this.queryParams.filter = '';
    this.contextService.queryParamsPostsGrid$.next(this.queryParams);
    this.contextService.categories$.subscribe((data: Category[]) => this.categories = data);
   }

  ngOnInit(): void {

    this.isLoading = true;
    this.postsDataService.getPosts(this.queryParams.sortBy, this.queryParams.sortValue, this.queryParams.filter, this.query).pipe(
      catchError((e: any) => {
          this.isLoading = false;
          return throwError((e));
        })
    ).subscribe((data: PostsPageable) => {
      this.postsPageable = data;
      this.posts = this.postsPageable.items;
      this.isLoading = false;
    });

    this.contextService.categories$.subscribe((data: Category[]) => this.categories = data);
  }

  categoryFilter($event: any) {
    this.isLoading = true;
    if (!$event) {
      this.queryParams.filter = '';
    } else {
      this.queryParams.filter = this.contextService.toFilterString('categories', $event);
    }
    this.contextService.queryParamsPostsGrid$.next(this.queryParams);
    this.postsDataService.getPosts(this.queryParams.sortBy, this.queryParams.sortValue, this.queryParams.filter, this.query).pipe(
      catchError((e: any) => {
          this.isLoading = false;
          return throwError((e));
        })
    ).subscribe((data: PostsPageable) => {
    this.postsPageable = data;
    this.posts = data.items;
    this.isLoading = false;
    });
  }

}
