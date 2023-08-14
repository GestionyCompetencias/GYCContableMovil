import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapViewComponent } from '../map-view/map-view.component';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss'],
})
export class DetallesComponent  implements OnInit {

  @Input() tipogasto!   : number;
  @Input() fecha!       : string;
  @Input() motivogasto! : string;
  @Input() monto!       : number;
  @Input() tipodoc!     : number;
  @Input() docnro!      : string;
  @Input() latitud!     : string;
  @Input() longitud!    : string;
  @Input() rutprov!     : string;
  @Input() razonsocial! : string;
  @Input() observ!      : string;


  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    
  }

  async showMap(lat: any, lng: any){
    const modal = await this.modalCtrl.create({
      component: MapViewComponent,
      componentProps: {
        latitud: lat,
        longitud: lng
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

}
