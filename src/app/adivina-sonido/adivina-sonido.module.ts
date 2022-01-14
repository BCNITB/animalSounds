import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdivinaSonidoPageRoutingModule } from './adivina-sonido-routing.module';

import { AdivinaSonidoPage } from './adivina-sonido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AdivinaSonidoPageRoutingModule
  ],
  declarations: [AdivinaSonidoPage]
})
export class AdivinaSonidoPageModule {}
