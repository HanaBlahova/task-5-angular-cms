import { Component, OnInit } from '@angular/core';
import { PostsDataService } from 'src/app/service/posts-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/model/post.model';

@Component({
  selector: 'app-admin-posts',
  templateUrl: './admin-posts.component.html',
  styleUrls: ['./admin-posts.component.scss']
})
export class AdminPostsComponent implements OnInit {

  posts: Post[];

  constructor(private postsDataService: PostsDataService, private router: Router) { }

  ngOnInit(): void {

    
    // Get Posts
    this.postsDataService.getPosts().subscribe((data: Post[]) => {
      this.posts = data;
      console.log(this.posts);
    });

    // Delete post
    this.onDeletePost();

  }

  onUpdatePost() {
    this.router.navigate(['admin/posts/id']);
  }


  onDeletePost() {

  }
}
