import { Component, OnInit } from '@angular/core';
import { PostsDataService } from 'src/app/service/posts-data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post, PostForm } from 'src/app/model/post.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ContextService } from 'src/app/service/context.service';
import { Category } from 'src/app/model/category.model';

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
  categories: Category[];
  //postCategories: Category[];

    constructor(
      private postsDataService: PostsDataService,
      private contextService: ContextService,
      private route: ActivatedRoute,
      private router: Router
    ) { }

ngOnInit(): void {

  this.postForm = new FormGroup({
    'title': new FormControl(null, Validators.required),
    'perex': new FormControl(null, Validators.required),
    'content': new FormControl(null, Validators.required),
    'image': new FormControl(null),
    'categories': new FormControl(null)
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
    //this.postCategories = this.post.categories;
    if(this.post) {
      this.postForm.patchValue({
        'title': this.post.title,
        'perex': this.post.perex,
        'content': this.post.content,
        'image': this.post.img,
        'categories': this.post.categories.map((data) => data._id)
      });
    }
  })

  this.contextService.categories$.subscribe((data: Category[]) => this.categories = data)


}

onPostSubmit() {
  let img: string = this.postForm.get('image').value;
    if(img === null || img === '' || img === undefined) {
      img = 'https://9auileboys-flywheel.netdna-ssl.com/wp-content/uploads/2019/03/news.jpg'
    } else if (this.post.img !== null) {
      img = this.post.img;
    } else {
      img;
    };
    console.log(img);

  if (this.post) {
    this.updFormData = {
      title: this.postForm.get('title').value,
      perex: this.postForm.get('perex').value,
      content: this.postForm.get('content').value,
      img: img,
      _id: this.post._id,
      slug: this.post.slug,
      categories: this.postForm.get('categories').value
    }
    console.log(this.updFormData.img);
    return this.postsDataService.updatePost(this.post._id, this.updFormData).subscribe(responseData => this.router.navigate(['/admin/posts']));
  } else {
    this.newFormData = {
      title: this.postForm.get('title').value,
      perex: this.postForm.get('perex').value,
      content: this.postForm.get('content').value,
      img: img,
      categories: this.postForm.get('categories').value
    }
    return this.postsDataService.createPost(this.newFormData).subscribe(responseData =>  this.router.navigate(['/admin/posts']));
  }
};

}





