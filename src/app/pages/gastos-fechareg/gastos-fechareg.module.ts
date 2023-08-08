import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GastosFecharegPageRoutingModule } from './gastos-fechareg-routing.module';

import { GastosFecharegPage } from './gastos-fechareg.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    GastosFecharegPageRoutingModule
  ],
  declarations: [GastosFecharegPage]
})
export class GastosFecharegPageModule {}
