import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FavoriteMoviesComponent} from "./favorite-movies.component";
import {RouterModule} from "@angular/router";
import {FilmDetailComponent} from "../film-detail/film-detail.component";



@NgModule({
  declarations: [
      FavoriteMoviesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: FavoriteMoviesComponent
      }
    ])
  ],
  exports: [RouterModule]
})
export class FavoriteMoviesModule { }
