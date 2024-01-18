import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FilmDetailComponent} from "./film-detail.component";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
      FilmDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: FilmDetailComponent
      }
    ])
  ],
  exports: [RouterModule]
})
export class FilmDetailModule { }
