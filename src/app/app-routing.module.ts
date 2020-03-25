import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { GridComponent } from './grid/grid.component';
import { PostComponent } from './posts/post/post.component';


const routes: Routes = [
  {path: '', component: GridComponent, pathMatch: 'full'},
  {path: 'posts', component: PostsComponent, children: [
    {path: ':slug', component: PostComponent}
  ]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin', component: AdminComponent, children: [
    {path: 'categories', component: AdminComponent},
    {path: 'users', component: AdminComponent},
    {path: 'posts', component: AdminComponent},
    {path: 'posts/:id', component: AdminComponent},
  ]},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
