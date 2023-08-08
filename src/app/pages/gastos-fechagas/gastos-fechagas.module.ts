import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GastosFechagasPageRoutingModule } from './gastos-fechagas-routing.module';

import { GastosFechagasPage } from './gastos-fechagas.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    GastosFechagasPageRoutingModule
  ],
  declarations: [GastosFechagasPage]
})
export class GastosFechagasPageModule {}
