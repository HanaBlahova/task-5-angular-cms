import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { PostComponent } from './posts/post/post.component';
import { GridComponent } from './grid/grid.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { UsersComponent } from './admin/users/users.component';
import { AdminPostsComponent } from './admin/admin-posts/admin-posts.component';
import { PostEditComponent } from './admin/post-edit/post-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    PostComponent,
    GridComponent,
    CategoriesComponent,
    UsersComponent,
    AdminPostsComponent,
    PostEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
