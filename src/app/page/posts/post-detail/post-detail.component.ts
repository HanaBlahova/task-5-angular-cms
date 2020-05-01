import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostsDataService } from 'src/app/service/posts-data.service';
import { Post } from 'src/app/model/post.model';
import { switchMap, catchError } from 'rxjs/operators';
import { Category } from 'src/app/model/category.model';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  post2: Post;
  id: string;
  postCategories: Category[];
  isLoading = false;


  constructor(
    private postsDataService: PostsDataService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {

    this.isLoading = true;
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postsDataService.getPost(params.slug).pipe(
          catchError((e: any) => {
              this.isLoading = false;
              return throwError((e));
            })
        );
      })
    ).subscribe((data: Post) => {
        this.post2 = data;
        this.postCategories = this.post2.categories;
        this.isLoading = false;
      });
    }

}
