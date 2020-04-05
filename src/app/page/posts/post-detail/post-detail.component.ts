import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostsDataService } from 'src/app/service/posts-data.service';
import { Post } from 'src/app/model/post.model';
import { pipe } from 'rxjs'; 
import { map } from 'rxjs/operators'; 

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  post2: Post;
  id: string;

  @Input('post') post: Post;
  
  constructor(private postsDataService: PostsDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    console.log(this.post);

    this.route.params.subscribe(
      (params: Params) => {
        this.showPost(params['slug']);
      });
    
  }

  showPost(id: string) {
    this.postsDataService.getPost(id).subscribe((data: Post) => {
      this.post2 = data;
      console.log(this.post2);
    });
  }


}
