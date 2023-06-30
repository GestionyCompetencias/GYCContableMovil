import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss'],
})
export class DetallesComponent  implements OnInit {

  @Input() tipo!        : string;
  @Input() fecha!       : string;
  @Input() motivo!      : string;
  @Input() monto!       : number;
  @Input() factura!     : string;
  @Input() observacion! : string;
  @Input() latitud!     : string;
  @Input() longitud!    : string;
  @Input() rutProveedor!: string;
  @Input() proveedor!   : string;
  @Input() photo!       : string;

  path_image!: string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.path_image = `data:image/jpeg;base64,${ this.photo }`;
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

}
