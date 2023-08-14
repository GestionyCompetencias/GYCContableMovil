import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GastosFecharegPage } from './gastos-fechareg.page';

const routes: Routes = [
  {
    path: '',
    component: GastosFecharegPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GastosFecharegPageRoutingModule {}
