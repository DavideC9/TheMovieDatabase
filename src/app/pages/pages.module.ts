import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PagesRoutingModule} from './pages-routing.module';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {HomeModule} from "./home/home.module";
import {SearchFilmModule} from "./search-film/search-film.module";
import {FavoriteMoviesModule} from "./favorite-movies/favorite-movies.module";
import {FilmDetailModule} from "./film-detail/film-detail.module";
import {CategoriesModule} from "./categories/categories.module";


@NgModule({
    declarations: [

    ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        MatSnackBarModule,
        HomeModule,
        SearchFilmModule,
        FavoriteMoviesModule,
        FilmDetailModule,
        CategoriesModule


    ]
})
export class PagesModule {
}
