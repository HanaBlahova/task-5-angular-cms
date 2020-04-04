import { Component, OnInit } from '@angular/core';
import { PostsDataService } from '../../service/posts-data.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  constructor(private postsDataService: PostsDataService) { }

  ngOnInit(): void {
  }

}
