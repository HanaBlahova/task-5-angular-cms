import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './page/posts/posts.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { AdminComponent } from './admin/admin.component';
import { PostComponent } from './page/posts/post/post.component';
import { GridComponent } from './page/grid/grid.component';
import { AdminPostsComponent } from './admin/admin-posts/admin-posts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { EditUsersComponent } from './admin/admin-users/edit-users/edit-users.component';
import { EditCategoriesComponent } from './admin/admin-categories/edit-categories/edit-categories.component';
import { EditPostsComponent } from './admin/admin-posts/edit-posts/edit-posts.component';
import { CategoryMenuComponent } from './layout/category-menu/category-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    PostComponent,
    GridComponent,
    AdminPostsComponent,
    FooterComponent,
    HeaderComponent,
    AdminCategoriesComponent,
    AdminUsersComponent,
    EditUsersComponent,
    EditCategoriesComponent,
    EditPostsComponent,
    CategoryMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
