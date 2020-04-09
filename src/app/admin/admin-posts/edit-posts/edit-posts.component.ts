import { Component, OnInit } from '@angular/core';
import { PostsDataService } from 'src/app/service/posts-data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post, PostForm } from 'src/app/model/post.model';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-edit-posts',
  templateUrl: './edit-posts.component.html',
  styleUrls: ['./edit-posts.component.scss']
})
export class EditPostsComponent implements OnInit {

  post: Post;
  postForm: FormGroup;
  newFormData: PostForm;
  updFormData: Post;

    constructor(
      private postsDataService: PostsDataService,
      private route: ActivatedRoute
    ) { }

ngOnInit(): void {

  this.postForm = new FormGroup({
    'title': new FormControl(null, Validators.required),
    'perex': new FormControl(null, Validators.required),
    'content': new FormControl(null, Validators.required),
    'image': new FormControl(null, Validators.required)
  });

  this.route.params.pipe(
    switchMap((params: Params) => {
      if(params.slug) {
        return this.postsDataService.getPost(params.slug);
      } else {
        return of(null);
      }
    })
  ).subscribe((data: Post) => {
    this.post = data;
    if(this.post) {
      this.postForm.patchValue({
        'title': this.post.title,
        'perex': this.post.perex,
        'content': this.post.content,
        'image': this.post.image,
      });
    }
  })


}

onPostSubmit() {
  if (this.post) {
    this.updFormData = {
      title: this.postForm.get('title').value,
      perex: this.postForm.get('perex').value,
      content: this.postForm.get('content').value,
      image: this.postForm.get('image').value,
      _id: this.post._id,
      slug: this.post.slug
    }
    return this.postsDataService.updatePost(this.post.slug, this.updFormData).subscribe(responseData => console.log(responseData));
  } else {
    this.newFormData = {
      title: this.postForm.get('title').value,
      perex: this.postForm.get('perex').value,
      content: this.postForm.get('content').value,
      image: this.postForm.get('image').value,
    }
    return this.postsDataService.createPost(this.newFormData).subscribe(responseData => console.log(responseData));
  }
};

}





