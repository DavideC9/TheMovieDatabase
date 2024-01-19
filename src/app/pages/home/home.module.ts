import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterModule} from "@angular/router";
import {HomeComponent} from "./home.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {NgbCarousel, NgbSlide} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        MatPaginatorModule,
        RouterLink,
        RouterModule.forChild([
            {
                path: '',
                component: HomeComponent
            }
        ]),
        NgbCarousel,
        NgbSlide
    ],
    exports: [RouterModule]
})
export class HomeModule {
}
