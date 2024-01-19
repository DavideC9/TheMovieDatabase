import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchFilmComponent} from "./search-film/search-film.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
    {
        path: 'home',
        loadChildren: () =>
            import('./home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'search-film',
        loadChildren: () =>
            import('./search-film/search-film.module').then(m => m.SearchFilmModule)
    },
    {
        path: 'film-detail/:id',
        loadChildren: () =>
            import('./film-detail/film-detail.module').then(m => m.FilmDetailModule)
    },
    {
        path: 'favorite-movies',
        loadChildren: () =>
            import('./favorite-movies/favorite-movies.module').then(m => m.FavoriteMoviesModule)
    },
    {
        path: 'categories',
        loadChildren: () =>
            import('./categories/categories.module').then(m => m.CategoriesModule)
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {
}
