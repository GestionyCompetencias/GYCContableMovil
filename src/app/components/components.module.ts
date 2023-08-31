import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from './footer/footer.component';
import { DetallesComponent } from './detalles/detalles.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { environment } from 'src/environments/environment.prod';
import { MapViewComponent } from './map-view/map-view.component';
import { FotoViewComponent } from './foto-view/foto-view.component';

const API_KEY = environment.token_map;



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DetallesComponent,
    MapViewComponent,
    FotoViewComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    NgxMapboxGLModule.withConfig({
      accessToken: API_KEY
    })
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    DetallesComponent,
    MapViewComponent,
    FotoViewComponent
  ]
})
export class ComponentsModule { }
