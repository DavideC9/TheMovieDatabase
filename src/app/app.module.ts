import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; //import di httpClientModule


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ListFilmComponent } from './pages/list-film/list-film.component';
import { FilmDetailComponent } from './pages/film-detail/film-detail.component';
import { HomeComponent } from './pages/home/home.component';
import { MovieApiServicesService } from './service/movie-api-services.service';

import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ListFilmComponent,
    FilmDetailComponent,
    HomeComponent  //viene importato questo componente
  ],
  imports: [
    BrowserModule,
    HttpClientModule, //importo la dipendenza del mio module
    AppRoutingModule,

    ReactiveFormsModule
  ],
  providers: [MovieApiServicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
