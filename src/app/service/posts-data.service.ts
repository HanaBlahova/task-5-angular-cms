import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post, PostForm } from '../model/post.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostsPageable } from '../model/pageable.model';
import { SortFilter } from '../model/sort-filter.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PostsDataService {

  url = environment.api.url;

  queryParamsA: SortFilter;
  queryParams: SortFilter;
  queryParamsGrid: SortFilter;

  constructor(
    private httpService: HttpService,
    private http: HttpClient
    ) { }

  getPosts(sortBy: string, sortValue: string, filter: string, params?: any): Observable<PostsPageable> {
    return this.httpService.get<PostsPageable>(`${this.url}/posts?sort[${sortBy}]=${sortValue}${filter}`, {params});
  }

  getPost(slug: string): Observable<Post> {
    return this.httpService.get<Post>(`${this.url}/posts/${slug}`);
  }

  createPost(postData: PostForm) {
    return this.http.post(`${this.url}/posts`, postData, {observe: 'response'});
  }

  updatePost(postId: string, putData: Post) {
    return this.httpService.put(`${this.url}/posts/${postId}`, putData, {observe: 'response'});
  }

  deletePost(postId: string) {
    return this.httpService.delete(`${this.url}/posts/${postId}`, {observe: 'response'});
  }
}
