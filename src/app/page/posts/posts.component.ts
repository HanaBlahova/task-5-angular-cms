import { Component, OnInit } from '@angular/core';
import { PostsDataService } from '../../service/posts-data.service';
import { Post } from 'src/app/model/post.model';
import { Category } from 'src/app/model/category.model';
import { PostsPageable } from 'src/app/model/pageable.model';
import { ContextService } from 'src/app/service/context.service';
import { SortFilter } from 'src/app/model/sort-filter.model';
import { FormGroup, FormControl } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  searchForm: FormGroup;

  postsPageable: PostsPageable;
  posts: Post[];
  page: number;
  total: number;
  query = {
    page: 1,
    limit: 6
  };
  queryParams: SortFilter;
  categories: Category[];
  isLoading = false;

  constructor(
    private postsDataService: PostsDataService,
    private contextService: ContextService) {
      this.contextService.queryParamsPosts$.subscribe((data: SortFilter) => this.queryParams = data);
      this.queryParams.filter = '';
      this.contextService.queryParamsPosts$.next(this.queryParams);
      this.contextService.categories$.subscribe((data: Category[]) => this.categories = data);
     }

  ngOnInit(): void {

    this.searchForm = new FormGroup({
      search: new FormControl(null)
    });

    this.isLoading = true;
    this.postsDataService.getPosts(this.queryParams.sortBy, this.queryParams.sortValue, this.queryParams.filter, this.query).pipe(
      catchError((e: any) => {
          this.isLoading = false;
          return throwError((e));
        })
    ).subscribe((data: PostsPageable) => {
      this.postsPageable = data;
      this.posts = this.postsPageable.items;
      this.page = this.postsPageable.pagination.page;
      this.total = this.postsPageable.pagination.total;
      this.isLoading = false;
    });

  }

  categoryFilter($event: any) {
    this.isLoading = true;
    if (!$event) {
      this.queryParams.filter = '';
    } else {
      this.queryParams.filter = this.contextService.toFilterString('categories', $event);
    }
    this.contextService.queryParamsPosts$.next(this.queryParams);
    this.postsDataService.getPosts(this.queryParams.sortBy, this.queryParams.sortValue, this.queryParams.filter, this.query).pipe(
        catchError((e: any) => {
            this.isLoading = false;
            return throwError((e));
          })
      ).subscribe((data: PostsPageable) => {
      this.postsPageable = data;
      this.posts = data.items;
      this.pageChanged(1);
      this.isLoading = false;
      });
  }

  onSearch() {
    this.isLoading = true;
    if (!this.searchForm.get('search').value) {
      this.queryParams.filter = '';
    } else {
      this.queryParams.filter = this.contextService.toFilterString('title', this.searchForm.get('search').value);
    }
    this.contextService.queryParamsPosts$.next(this.queryParams);
    this.postsDataService.getPosts(this.queryParams.sortBy, this.queryParams.sortValue, this.queryParams.filter, this.query).pipe(
      catchError((e: any) => {
          this.isLoading = false;
          return throwError((e));
        })
    ).subscribe((data: PostsPageable) => {
      this.postsPageable = data;
      this.posts = data.items;
      this.pageChanged(1);
      this.isLoading = false;
    });
  }

  pageChanged($event: any) {
    this.isLoading = true;
    this.query.page = $event.toString();
    this.postsDataService.getPosts(this.queryParams.sortBy, this.queryParams.sortValue, this.queryParams.filter, this.query).pipe(
      catchError((e: any) => {
          this.isLoading = false;
          return throwError((e));
        })
    ).subscribe((data: PostsPageable) => {
      this.postsPageable = data;
      this.page = this.postsPageable.pagination.page;
      this.posts = this.postsPageable.items;
      this.isLoading = false;
    });
  }

}
