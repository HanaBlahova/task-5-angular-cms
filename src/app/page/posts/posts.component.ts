import { Component, OnInit } from '@angular/core';
import { PostsDataService } from '../../service/posts-data.service';
import { Post } from 'src/app/model/post.model';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: Post[];
  subscription: Subscription;

  constructor(private postsDataService: PostsDataService) { }

  ngOnInit(): void {

    this.showPosts();
    //this.posts = this.postsDataService.getPosts().subscribe((data: Post[]) => this.posts = data);

    console.log(this.posts);
  }

  showPosts() {
    this.postsDataService.getPosts().subscribe((data: Post[]) => {
      this.posts = data;
      console.log(this.posts);
    }
    );
  };

}
