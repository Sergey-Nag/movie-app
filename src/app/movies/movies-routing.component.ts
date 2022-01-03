import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './categories/category/category.component';
import { MovieComponent } from './movie/movie.component';
import { MoviesComponent } from './movies.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MoviesComponent,
  },
  {
    path: ':id',
    component: MovieComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    children: [
      {
        path: ':id',
        component: CategoryComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingComponent { }
