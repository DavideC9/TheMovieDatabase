import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'; //import di httpClientModule
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavComponent} from './core/components/nav/nav.component';
import {SearchFilmComponent} from './pages/search-film/search-film.component';
import {FilmDetailComponent} from './pages/film-detail/film-detail.component';
import {HomeComponent} from './pages/home/home.component';
import {MovieApiServicesService} from './core/services/movie-api-services.service';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CategoriesComponent} from './pages/categories/categories.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CoreModule} from "./core/core.module";
import {FavoriteMoviesComponent} from './pages/favorite-movies/favorite-movies.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {HttpAuthInterceptor} from "./core/interceptors/http-auth-interceptor.service";
import {PagesModule} from "./pages/pages.module";



@NgModule({
    declarations: [
        AppComponent,
        NavComponent,

    ],
    imports: [
        CoreModule,
        BrowserModule,
        HttpClientModule, //importo la dipendenza del mio module
        AppRoutingModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        NgbModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        FormsModule,
        PagesModule
    ],
    providers: [MovieApiServicesService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpAuthInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
