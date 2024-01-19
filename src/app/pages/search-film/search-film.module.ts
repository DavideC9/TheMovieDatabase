import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {SearchFilmComponent} from "./search-film.component";
import {RouterLink, RouterModule} from "@angular/router";
import {MatPaginatorModule} from "@angular/material/paginator";


const router = [

];

@NgModule({
  declarations: [SearchFilmComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterLink,
        RouterModule.forChild([
            {
                path: '',
                component: SearchFilmComponent
            }
        ]),
        MatPaginatorModule
    ],
  exports: [RouterModule]
})
export class SearchFilmModule { }
