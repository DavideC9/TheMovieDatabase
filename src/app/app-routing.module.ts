import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListFilmComponent } from './pages/list-film/list-film.component';
import { FilmDetailComponent } from './pages/film-detail/film-detail.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'list-film',component:ListFilmComponent},
  {path:'film-detail/:id',component:FilmDetailComponent},
  {path:'categories', component:CategoriesComponent},
  { path: 'register', component: AuthComponent },
  { path: 'login', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
