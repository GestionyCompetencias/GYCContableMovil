import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialGastosPageRoutingModule } from './historial-gastos-routing.module';

import { HistorialGastosPage } from './historial-gastos.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialGastosPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
  ],
  declarations: [HistorialGastosPage]
})
export class HistorialGastosPageModule {}
