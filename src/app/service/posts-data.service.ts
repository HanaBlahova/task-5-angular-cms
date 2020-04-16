import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post, PostForm } from '../model/post.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostsPageable } from '../model/pageable.model';

@Injectable({
  providedIn: 'root'
})
export class PostsDataService {

  url = environment.api.url;

  constructor(private http: HttpClient) { }

  getPosts(params?: any): Observable<PostsPageable> {
    return this.http.get<PostsPageable>(`${this.url}/posts`, {params: params});
  }

  getPost(slug: string): Observable<Post> {
    return this.http.get<Post>(`${this.url}/posts/${slug}`);
  }

  createPost(postData: PostForm) {
    return this.http.post(`${this.url}/posts`, postData, {observe: 'response'});
  }

  updatePost(postId: string, putData: Post) {
    return this.http.put(`${this.url}/posts/${postId}`, putData, {observe: 'response'});
  }

  deletePost(postId: string) {
    return this.http.delete(`${this.url}/posts/${postId}`, {observe: 'response'});
  }
}
