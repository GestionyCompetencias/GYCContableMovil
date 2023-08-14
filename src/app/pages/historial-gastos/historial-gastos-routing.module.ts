import { NgModule, ViewChildren } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialGastosPage } from './historial-gastos.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialGastosPage,
    children: [
      {
        path: "gastos-fechagas",
        loadChildren: () => import('../gastos-fechagas/gastos-fechagas.module').then((m)=>m.GastosFechagasPageModule)
      },
      {
        path: "gastos-fechareg",
        loadChildren: () => import('../gastos-fechareg/gastos-fechareg.module').then((m)=>m.GastosFecharegPageModule)
      },
      {
        path: '',
        redirectTo: '/historial-gastos/gastos-fechagas',
        pathMatch: 'full',
      },
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialGastosPageRoutingModule {}
