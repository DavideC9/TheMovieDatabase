import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalLoginComponent } from './components/modal-login/modal-login.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ModalLoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class CoreModule { }
