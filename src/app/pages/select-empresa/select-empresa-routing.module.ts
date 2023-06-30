import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectEmpresaPage } from './select-empresa.page';

const routes: Routes = [
  {
    path: '',
    component: SelectEmpresaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectEmpresaPageRoutingModule {}
