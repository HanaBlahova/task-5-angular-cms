import { Component, OnInit, Input } from '@angular/core';
import { PostsDataService } from 'src/app/service/posts-data.service';
import { Post } from 'src/app/model/post.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input('post') post: Post;

  constructor(private postsDataService: PostsDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    
  }

 


}
