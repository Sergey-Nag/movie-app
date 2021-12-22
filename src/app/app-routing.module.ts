import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthorizeComponent } from './authorize/authorize.component';

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
    loadChildren: () => import('./home/home.module').then(module => module.HomeModule),
  },
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
