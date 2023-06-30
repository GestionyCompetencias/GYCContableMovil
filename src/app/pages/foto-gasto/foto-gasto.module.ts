import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FotoGastoPageRoutingModule } from './foto-gasto-routing.module';

import { FotoGastoPage } from './foto-gasto.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FotoGastoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [FotoGastoPage]
})
export class FotoGastoPageModule {}
