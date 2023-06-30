import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule),
    canActivate: [GuestGuard]
  },
  {
    path: 'reset-pass',
    loadChildren: () => import('./auth/reset-pass/reset-pass.module').then( m => m.ResetPassPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'setting',
    loadChildren: () => import('./pages/setting/setting.module').then( m => m.SettingPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'historial-gastos',
    loadChildren: () => import('./pages/historial-gastos/historial-gastos.module').then( m => m.HistorialGastosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'detalle-gasto',
    loadChildren: () => import('./pages/detalle-gasto/detalle-gasto.module').then( m => m.DetalleGastoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'crear-gasto',
    loadChildren: () => import('./pages/crear-gasto/crear-gasto.module').then( m => m.CrearGastoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'foto-gasto',
    loadChildren: () => import('./pages/foto-gasto/foto-gasto.module').then( m => m.FotoGastoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'select-empresa',
    loadChildren: () => import('./pages/select-empresa/select-empresa.module').then( m => m.SelectEmpresaPageModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
