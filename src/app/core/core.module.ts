import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalLoginOrRegistrationComponent } from './components/modal-login/modal-loginOrRegistration.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ModalLoginOrRegistrationComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class CoreModule { }
