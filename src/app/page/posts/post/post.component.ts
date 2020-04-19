import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/model/post.model';
import { Category } from 'src/app/model/category.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input('post') post: Post;
  postCategories: Category[];


  constructor( ) { }

  ngOnInit(): void {
    this.postCategories = this.post.categories;
  }

 


}
