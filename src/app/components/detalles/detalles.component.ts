import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapViewComponent } from '../map-view/map-view.component';
import { FotoViewComponent } from '../foto-view/foto-view.component';
import { StorageService } from 'src/app/services/storage.service';
import { GastosService } from 'src/app/services/gastos.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss'],
})
export class DetallesComponent  implements OnInit {

  @Input() id!          : number;
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

  idEmpresa!: number;


  constructor(private modalCtrl: ModalController,
              private appStorage: StorageService,
              private gastoServ: GastosService) { }

  async ngOnInit() {
    const idEmp = await this.appStorage.get('empresa') || '0';
    this.idEmpresa = parseInt(idEmp);
  }

  loadImage(){
    this.gastoServ.getFotoGasto(this.idEmpresa, this.id).subscribe({
      next: resp => {
        const ruta = resp.info.data[0].ruta;
        this.showImage(ruta);
      },
      error: err => console.log(err)
    });
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
  
  async showImage(base64String: string){
    const modal = await this.modalCtrl.create({
      component: FotoViewComponent,
      componentProps: {
        base64String,
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

}
