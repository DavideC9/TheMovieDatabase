import { AuthComponent } from './auth/auth.component';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; //import di httpClientModule
// import { HttpInterceptorComponent } from './http-interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ListFilmComponent } from './pages/list-film/list-film.component';
import { FilmDetailComponent } from './pages/film-detail/film-detail.component';
import { HomeComponent } from './pages/home/home.component';
import { MovieApiServicesService } from './service/movie-api-services.service';

import {ReactiveFormsModule} from "@angular/forms";
import { CategoriesComponent } from './pages/categories/categories.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ListFilmComponent,
    FilmDetailComponent,
    HomeComponent,
    CategoriesComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, //importo la dipendenza del mio module
    AppRoutingModule,

    ReactiveFormsModule
  ],
  providers: [MovieApiServicesService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpInterceptorComponent,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
