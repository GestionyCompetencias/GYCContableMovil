import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearGastoPageRoutingModule } from './crear-gasto-routing.module';

import { CrearGastoPage } from './crear-gasto.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearGastoPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [CrearGastoPage]
})
export class CrearGastoPageModule {}
