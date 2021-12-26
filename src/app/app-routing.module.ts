import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthorizeComponent } from './authorize/authorize.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: AuthorizeComponent,
  },
  {
    path: 'auth',
    component: AuthorizeComponent,
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'movies',
    loadChildren: () => import('./movies/movies.module').then(module => module.MoviesModule),
  }
  // {
  //   path: 'popular',
  //   component: HomeComponent,
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
