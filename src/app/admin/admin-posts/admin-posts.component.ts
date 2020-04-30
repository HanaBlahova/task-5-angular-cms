import { Component, OnInit } from '@angular/core';
import { PostsDataService } from 'src/app/service/posts-data.service';
import { Post } from 'src/app/model/post.model';
import { switchMap } from 'rxjs/operators';
import { PostsPageable } from 'src/app/model/pageable.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Category } from 'src/app/model/category.model';
import { ContextService } from 'src/app/service/context.service';
import { SortFilter } from 'src/app/model/sort-filter.model';

@Component({
  selector: 'app-admin-posts',
  templateUrl: './admin-posts.component.html',
  styleUrls: ['./admin-posts.component.scss']
})
export class AdminPostsComponent implements OnInit {

  searchForm: FormGroup;

  postsPageable: PostsPageable;
  posts: Post[];
  categories: Category[];
  page: number;
  total: number;
  query = {
    page: 1,
    limit: 6
  };

  queryParams: SortFilter;


  constructor(
    private postsDataService: PostsDataService,
    private contextService: ContextService
    ) {
      this.contextService.categories$.subscribe((data: Category[]) => this.categories = data);
      this.contextService.queryParamsPostsA$.subscribe((data: SortFilter) => this.queryParams = data);
    }

  ngOnInit(): void {

    this.searchForm = new FormGroup({
      search: new FormControl(null)
    });

    // Get Posts
    // this.queryParams.filter = '';
    // tslint:disable-next-line:max-line-length
    this.postsDataService.getPosts(this.queryParams.sortBy, this.queryParams.sortValue, this.queryParams.filter).subscribe((data: PostsPageable) => {
      this.postsPageable = data;
      this.posts = data.items;
      this.page = this.postsPageable.pagination.page;
      this.total = this.postsPageable.pagination.total;
      console.log(this.posts);
      console.log(this.postsPageable);
    });

  }

  onChange($event: any) {
    if ($event.srcElement.value === 'All categories') {
      this.queryParams.filter = '';
      console.log(this.queryParams);
      this.contextService.queryParamsPostsA$.next(this.queryParams);
      // tslint:disable-next-line:max-line-length
      this.postsDataService.getPosts(this.queryParams.sortBy, this.queryParams.sortValue, this.queryParams.filter, this.query).subscribe((data: PostsPageable) => {
      this.postsPageable = data;
      this.posts = data.items;
      this.pageChanged(1);
      });
    } else {
      this.queryParams.filter = this.contextService.toFilterString('categories', $event.srcElement.value);
      console.log(this.queryParams);
      this.contextService.queryParamsPostsA$.next(this.queryParams);
      // tslint:disable-next-line:max-line-length
      this.postsDataService.getPosts(this.queryParams.sortBy, this.queryParams.sortValue, this.queryParams.filter, this.query).subscribe((data: PostsPageable) => {
      this.postsPageable = data;
      this.posts = data.items;
      this.pageChanged(1);
      });
    }
  }

  onSearch() {
    if (!this.searchForm.get('search').value) {
      this.queryParams.filter = '';
      this.contextService.queryParamsPostsA$.next(this.queryParams);
      // tslint:disable-next-line:max-line-length
      this.postsDataService.getPosts(this.queryParams.sortBy, this.queryParams.sortValue, this.queryParams.filter, this.query).subscribe((data: PostsPageable) => {
        this.postsPageable = data;
        this.posts = data.items;
        this.pageChanged(1);
      });
    } else {
      this.queryParams.filter = this.contextService.toFilterString('title', this.searchForm.get('search').value);
      this.contextService.queryParamsPostsA$.next(this.queryParams);
      // tslint:disable-next-line:max-line-length
      this.postsDataService.getPosts(this.queryParams.sortBy, this.queryParams.sortValue, this.queryParams.filter, this.query).subscribe((data: PostsPageable) => {
        this.postsPageable = data;
        this.posts = data.items;
        this.pageChanged(1);
      });
    }
  }

  onDeletePost(id: string) {
    this.postsDataService.deletePost(id).pipe(
      switchMap((res: any) => {
        console.log(res);
        return this.postsDataService.getPosts(this.queryParams.sortBy, this.queryParams.sortValue, this.queryParams.filter);
      })
    ).subscribe((data: PostsPageable) => {
      this.postsPageable = data;
      this.posts = data.items;
    });
  }

  pageChanged($event: any) {
    this.query.page = $event;
    console.log(this.query.page);
    console.log(this.query);
    // tslint:disable-next-line:max-line-length
    this.postsDataService.getPosts(this.queryParams.sortBy, this.queryParams.sortValue, this.queryParams.filter, this.query).subscribe((data: PostsPageable) => {
      this.postsPageable = data;
      console.log(this.postsPageable.pagination);
      this.page = this.postsPageable.pagination.page;
      this.posts = this.postsPageable.items;
    });
  }
}
