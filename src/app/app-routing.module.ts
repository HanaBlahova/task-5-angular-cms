import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './page/posts/posts.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { AdminComponent } from './admin/admin.component';
import { GridComponent } from './page/grid/grid.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { EditCategoriesComponent } from './admin/admin-categories/edit-categories/edit-categories.component';
import { EditUsersComponent } from './admin/admin-users/edit-users/edit-users.component';
import { EditPostsComponent } from './admin/admin-posts/edit-posts/edit-posts.component';
import { PostDetailComponent } from './page/posts/post-detail/post-detail.component';
import { AdminPostsComponent } from './admin/admin-posts/admin-posts.component';
import { AdminGuard } from './auth/admin.guard';
import { LoginGuard } from './auth/login.guard';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';


const routes: Routes = [
  {path: '', component: GridComponent, pathMatch: 'full'},
  {path: 'archive', component: PostsComponent },
  {path: 'archive/:slug', component: PostDetailComponent},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [LoginGuard]},
  {path: 'admin', redirectTo: '/admin/home', pathMatch: 'full'},
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard], children: [
    {path: 'home', component: AdminHomeComponent},

    {path: 'categories', component: AdminCategoriesComponent},
    {path: 'categories/edit/:id', component: EditCategoriesComponent},
    {path: 'categories/create', component: EditCategoriesComponent},

    {path: 'users', component: AdminUsersComponent},
    {path: 'users/edit/:id', component: EditUsersComponent},
    {path: 'users/create', component: EditUsersComponent},

    {path: 'posts', component: AdminPostsComponent},
    {path: 'posts/edit/:slug', component: EditPostsComponent},
    {path: 'posts/create', component: EditPostsComponent},
  ]},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
