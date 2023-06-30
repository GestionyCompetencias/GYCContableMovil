import { Component, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraResultType, CameraSource, ImageOptions } from '@capacitor/camera';
import { Network } from '@capacitor/network';
import { IonModal, LoadingController, NavController } from '@ionic/angular';
import { Gasto, GastoTemp } from 'src/app/interfaces/gasto';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-foto-gasto',
  templateUrl: './foto-gasto.page.html',
  styleUrls: ['./foto-gasto.page.scss'],
})
export class FotoGastoPage implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;

  _gastoDerfault: Gasto = {
    factura: '',
    fecha: '',
    latitud: '',
    longitud: '',
    monto: 0,
    motivo: '',
    observacion: '',
    tipo: '',
    rutProveedor: '',
    proveedor: ''
  }

  gastosLocales: GastoTemp[] = [];

  capturada: boolean = false;
  imagenCapturada!: any;
  image_path!: string;
  
  constructor(private loadingCtrl: LoadingController,
              private storage: StorageService,
              private nav: NavController) { }
  
  ngOnInit() {
  }
  
  async takePicture(){
    const imgOptions: ImageOptions = {
      quality: 80,
      source: CameraSource.Prompt,
      resultType: CameraResultType.Uri,
      saveToGallery:  true,
    }

    const image = await Camera.getPhoto(imgOptions);

    this.imagenCapturada = image.webPath;
    this.image_path = this.imagenCapturada;
  }

  async registrarGasto(){
    this.showLoading();
    const status = await Network.getStatus();
    let gastoTemp: string = '';
    let gastoLoc: string = '';
    await this.storage.getData('newGasto').then(data => gastoTemp = data || this._gastoDerfault);
    await this.storage.getData('gastosLocales').then(data => gastoLoc = data || '[]');
    const gasto = JSON.parse(gastoTemp);
    //console.log(gastoTemp);

    const newGasto: Gasto = { ...gasto }

    if (status.connected) {
      //console.log(newGasto);
      this.gastosLocales = JSON.parse(gastoLoc);
      this.gastosLocales.push({ photo: this.imagenCapturada, ...newGasto});
      this.storage.set('gastosLocales', JSON.stringify(this.gastosLocales));
      
    } else {
      let gastos: any;
      this.storage.getData('gastos').then( data => gastos = data || '' );
      const arrGastos: GastoTemp[] = JSON.parse(gastos);
      arrGastos.push({ photo: this.imagenCapturada, ...newGasto});
      this.storage.set('gastos', JSON.stringify(arrGastos));
    }

    this.storage.remove('newGasto');
    this.loadingCtrl.dismiss();
    this.modal.backdropDismiss = false;
    this.modal.present();
  
    console.log('Network status:', status);
  }
  
  irAlHome(){
    this.modal.dismiss();
    this.nav.navigateRoot('home');
  }
  
  nuevoGasto(){
    this.modal.dismiss();
    this.nav.navigateRoot('crear-gasto');
  }


  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Procesando Datos por favor espere...',
      duration: 3000
    });

    loading.present();
  }


}
