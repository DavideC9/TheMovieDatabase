import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoriesComponent} from "./categories.component";
import {RouterModule} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {NgbCarousel, NgbSlide} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [CategoriesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CategoriesComponent
      }
    ]),
    MatCardModule,
    NgbCarousel,
    NgbSlide
  ],
  exports: [RouterModule]
})
export class CategoriesModule { }
