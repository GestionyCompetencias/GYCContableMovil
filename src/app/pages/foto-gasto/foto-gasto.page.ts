import { Component, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraResultType, CameraSource, ImageOptions } from '@capacitor/camera';
import { Device } from '@capacitor/device';
import { Network } from '@capacitor/network';
import { IonModal, LoadingController, NavController } from '@ionic/angular';
import { Gasto, GastoApi, GastoTemp } from 'src/app/interfaces/gasto';
import { GastosService } from 'src/app/services/gastos.service';
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
    rut: '',
    proveedor: ''
  }

  dispositivo_id: any;
  usuario: any;
  idEmpresa!: number;

  fechaAct!: string;
  hora!: string;

  gastosLocales: GastoTemp[] = [];

  capturada: boolean = false;
  imagenCapturada!: any;
  image_path!: string;
  
  constructor(private loadingCtrl: LoadingController,
              private storage: StorageService,
              private gastosServ: GastosService,
              private nav: NavController) { }
  
  async ngOnInit() {
    this.dispositivo_id = await Device.getId();
    console.log(this.dispositivo_id);
    const fecha = new Date();
    let mes: any = fecha.getMonth()+1;
    mes = (mes.toString().length > 1) ? mes : '0'+mes; 
    let dia: any = fecha.getDate();
    dia = (dia.toString().length > 1) ? dia : '0'+dia; 
    let h: any = fecha.getHours();
    h = (h.toString().length > 1) ? h : '0'+h; 
    let m: any = fecha.getMinutes();
    m = (m.toString().length > 1) ? m : '0'+m; 
    let s: any = fecha.getSeconds();
    s = (s.toString().length > 1) ? s : '0'+s; 
    this.fechaAct = `${ fecha.getFullYear() }-${ mes }-${ dia }`;
    this.hora = `${ h }:${ m }:${ s }`;

    
    await this.storage.getData('idEmpresa').then(data => {
      const idEmp = data || '0';
      this.idEmpresa = parseInt(idEmp);
    });
    
    await this.storage.getData('rutUser').then(data => {
      const user = data;
      this.usuario = user;
    });
  }
  
  async takePicture(){
    const imgOptions: ImageOptions = {
      quality: 80,
      source: CameraSource.Prompt,
      resultType: CameraResultType.Uri,
      saveToGallery:  true,
    }

    const image = await Camera.getPhoto(imgOptions);

    this.imagenCapturada = await image.webPath;
    this.image_path = this.imagenCapturada;
    this.capturada = true;
  }

  async registrarGasto(){
    this.showLoading();

    const status = await Network.getStatus();
    let gastoTemp: string = '';
    let gastoLoc: string = '';
    await this.storage.getData('newGasto').then(data => gastoTemp = data || JSON.stringify(this._gastoDerfault));
    await this.storage.getData('gastosLocales').then(data => gastoLoc = data || '[]');
    const gasto: GastoTemp = JSON.parse(gastoTemp);
    
    if (status.connected) {
      const newGasto: GastoApi = { 
        id: 0,
        aprobado: 0,
        dispositivo: this.dispositivo_id.identifier,
        fecha: gasto.fecha.substring(0, 10),
        tipodoc: gasto.tipoDoc,
        docnro: gasto.factura,
        latitud: gasto.latitud,
        longitud: gasto.longitud,
        monto: gasto.monto,
        motivogasto: gasto.motivo,
        motivo: '',
        observ: gasto.observacion,
        rutprov: gasto.rut,
        razonsocial: gasto.proveedor,
        tipogasto: gasto.tipo,
        usuario: this.usuario,
        fregistro: this.fechaAct,
        habilitado: 0,
        origen: 0,
        hregistro: this.hora
      }

      console.log('Gasto:', newGasto);
      
      this.gastosServ.crearGasto(newGasto, this.idEmpresa).subscribe({
        next: resp => {
          if (resp.info.result == 1) {
            
          }
        },
        error: err => console.log(err)
      });
    } else {
      let gastos: any;
      const newGasto: GastoTemp = {...gasto};
      this.storage.getData('gastos').then( data => gastos = data || '' );
      const arrGastos: GastoTemp[] = JSON.parse(gastos);
      newGasto.photo = this.imagenCapturada;
      arrGastos.push(newGasto);
      this.storage.set('gastos', JSON.stringify(arrGastos));
    }

    this.storage.remove('newGasto');
    this.loadingCtrl.dismiss();
    this.modal.backdropDismiss = false;
    this.modal.present();
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
