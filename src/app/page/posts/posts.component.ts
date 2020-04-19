import { Component, OnInit } from '@angular/core';
import { PostsDataService } from '../../service/posts-data.service';
import { Post } from 'src/app/model/post.model';
import { Category } from 'src/app/model/category.model';
import { PostsPageable } from 'src/app/model/pageable.model';
import { ContextService } from 'src/app/service/context.service';
import { SortFilter } from 'src/app/model/sort-filter.model';
import { FormGroup, FormControl } from '@angular/forms';

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
  }
  queryParams: SortFilter;

  categories: Category[];

  constructor(
    private postsDataService: PostsDataService,
    private contextService: ContextService) {
      this.contextService.queryParamsPosts$.subscribe((data: SortFilter) => this.queryParams = data);
      this.contextService.categories$.subscribe((data: Category[]) => this.categories = data);
     }

  ngOnInit(): void {

    this.searchForm = new FormGroup({
      'search': new FormControl(null)
    })

    //this.queryParams.filter = '';
    this.postsDataService.getPosts(this.queryParams.sortBy, this.queryParams.sortValue, this.queryParams.filter, this.query).subscribe((data: PostsPageable) => {
      console.log(data);
      this.postsPageable = data;
      this.posts = this.postsPageable.items;
      this.page = this.postsPageable.pagination.page;
      this.total = this.postsPageable.pagination.total;

      console.log(this.postsPageable);
      console.log(this.posts.length, +this.query.limit);
      console.log(this.posts);
    });

  }

  categoryFilter($event: any) {
    if(!$event) {
      this.queryParams.filter = '';
      this.contextService.queryParamsPosts$.next(this.queryParams);
      this.postsDataService.getPosts(this.queryParams.sortBy, this.queryParams.sortValue, this.queryParams.filter, this.query).subscribe((data: PostsPageable) => {
      this.postsPageable = data;
      this.posts = data.items;
      })
    } else {
      this.queryParams.filter = this.contextService.toFilterString('categories', $event);
      this.contextService.queryParamsPosts$.next(this.queryParams);
      this.postsDataService.getPosts(this.queryParams.sortBy, this.queryParams.sortValue, this.queryParams.filter, this.query).subscribe((data: PostsPageable) => {
      this.postsPageable = data;
      this.posts = data.items;
      })
    }
  };

  onSearch() {
    if(!this.searchForm.get('search').value) {
      this.queryParams.filter = '';
      this.contextService.queryParamsPosts$.next(this.queryParams);
      this.postsDataService.getPosts(this.queryParams.sortBy, this.queryParams.sortValue, this.queryParams.filter,  this.query).subscribe((data: PostsPageable) => {
        this.postsPageable = data;
        this.posts = data.items;
      })
    } else {
      this.queryParams.filter = this.contextService.toFilterString('title', this.searchForm.get('search').value);
      this.contextService.queryParamsPosts$.next(this.queryParams);
      this.postsDataService.getPosts(this.queryParams.sortBy, this.queryParams.sortValue, this.queryParams.filter, this.query).subscribe((data: PostsPageable) => {
        this.postsPageable = data;
        this.posts = data.items;
      })
    }
  };

  pageChanged($event: any) {
    this.query.page = $event.toString();
    console.log(this.query.page);
    console.log(this.query);
    this.postsDataService.getPosts(this.queryParams.sortBy, this.queryParams.sortValue, this.queryParams.filter, this.query).subscribe((data: PostsPageable) => {
      this.postsPageable = data;
      console.log(this.postsPageable.pagination);
      this.page = this.postsPageable.pagination.page;
      this.posts = this.postsPageable.items
    });
  };

}
