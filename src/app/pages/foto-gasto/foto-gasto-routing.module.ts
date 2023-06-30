import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FotoGastoPage } from './foto-gasto.page';

const routes: Routes = [
  {
    path: '',
    component: FotoGastoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FotoGastoPageRoutingModule {}
