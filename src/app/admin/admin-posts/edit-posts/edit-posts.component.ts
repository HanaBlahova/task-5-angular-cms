import { Component, OnInit } from '@angular/core';
import { PostsDataService } from 'src/app/service/posts-data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-posts',
  templateUrl: './edit-posts.component.html',
  styleUrls: ['./edit-posts.component.scss']
})
export class EditPostsComponent implements OnInit {

  postForm: FormGroup;

  constructor(private postsDataService: PostsDataService) { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'perex': new FormControl(null, Validators.required),
      'content': new FormControl(null, Validators.required),
      'image': new FormControl(null, Validators.required)
    });
  }

  onPostSubmit() {

  };

}
