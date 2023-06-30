import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from './footer/footer.component';
import { DetallesComponent } from './detalles/detalles.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DetallesComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    DetallesComponent
  ]
})
export class ComponentsModule { }
