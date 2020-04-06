import { Component, OnInit } from '@angular/core';
import { PostsDataService } from '../../service/posts-data.service';
import { Post } from 'src/app/model/post.model';
import { Category } from 'src/app/model/category.model';
import { CategoriesDataService } from 'src/app/service/categories-data.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: Post[];

  constructor(private postsDataService: PostsDataService) { }

  ngOnInit(): void {

    this.postsDataService.getPosts().subscribe((data: Post[]) => {
      this.posts = data;
      console.log(this.posts);
    });

  }

}
