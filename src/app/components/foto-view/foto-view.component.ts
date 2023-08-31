import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-foto-view',
  templateUrl: './foto-view.component.html',
  styleUrls: ['./foto-view.component.scss'],
})
export class FotoViewComponent  implements OnInit {

  @Input() base64String!     : string;

  image_path!: string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.image_path = `data:image/jpeg;base64,${ this.base64String }`;
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }
}
