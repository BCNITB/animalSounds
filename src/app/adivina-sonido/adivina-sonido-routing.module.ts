import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdivinaSonidoPage } from './adivina-sonido.page';

const routes: Routes = [
  {
    path: '',
    component: AdivinaSonidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdivinaSonidoPageRoutingModule {}
