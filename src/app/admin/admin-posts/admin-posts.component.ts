import { Component, OnInit } from '@angular/core';
import { PostsDataService } from 'src/app/service/posts-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/model/post.model';
import { switchMap } from 'rxjs/operators';
import { PostsPageable } from 'src/app/model/pageable.model';

@Component({
  selector: 'app-admin-posts',
  templateUrl: './admin-posts.component.html',
  styleUrls: ['./admin-posts.component.scss']
})
export class AdminPostsComponent implements OnInit {

  postsPageable: PostsPageable;
  posts: Post[];
  p: number;
  total: number;
  query = {
    page: 1,
    limit: 6
  }

  constructor(private postsDataService: PostsDataService, private router: Router) { }

  ngOnInit(): void {

    // Get Posts
    this.postsDataService.getPosts().subscribe((data: PostsPageable) => {
      this.postsPageable = data;
      this.posts = data.items;
      this.p = this.postsPageable.pagination.page;
      this.total = this.postsPageable.pagination.total;
      console.log(this.posts);
      console.log(this.postsPageable);
    });

  }

  onDeletePost(id: string) {
    this.postsDataService.deletePost(id).pipe(
      switchMap((res: any) => {
        console.log(res);
        return this.postsDataService.getPosts();
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
    this.postsDataService.getPosts(this.query).subscribe((data: PostsPageable) => {
      this.postsPageable = data;
      console.log(this.postsPageable.pagination);
      this.p = this.postsPageable.pagination.page;
      this.posts = this.postsPageable.items
    });
  }
}
