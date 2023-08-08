import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GastosFechagasPage } from './gastos-fechagas.page';

const routes: Routes = [
  {
    path: '',
    component: GastosFechagasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GastosFechagasPageRoutingModule {}
