import { Component, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraResultType, CameraSource, ImageOptions, Photo } from '@capacitor/camera';
import { Device } from '@capacitor/device';
import { Network } from '@capacitor/network';
import { IonModal, LoadingController, NavController } from '@ionic/angular';
import { Gasto, GastoApi, GastoTemp } from 'src/app/interfaces/gasto';
import { GastosService } from 'src/app/services/gastos.service';
import { StorageService } from 'src/app/services/storage.service';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Preferences } from '@capacitor/preferences';

const BASE_URL = environment.base_url;

@Component({
  selector: 'app-foto-gasto',
  templateUrl: './foto-gasto.page.html',
  styleUrls: ['./foto-gasto.page.scss'],
})
export class FotoGastoPage implements OnInit {
  _header = new HttpHeaders()
                    .set('x-token', localStorage.getItem('token') || '')  
                    .set('Content-Type', 'application/json');

  @ViewChild(IonModal) modal!: IonModal;

  _gastoDefault: Gasto = {
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

  file!: File;

  gastosLocales: GastoTemp[] = [];

  capturada: boolean = false;
  imagenCapturada: string | undefined = '';
  image_path!: string;

  constructor(private loadingCtrl: LoadingController,
              private appStorage: StorageService,
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

    
    const idEmp = await this.appStorage.get('empresa') || '0';
    const idus = await this.appStorage.get('usuario') || '0';
    this.idEmpresa = parseInt(idEmp);
    this.usuario = parseInt(idus);
  }
  
  async takePicture(){
    const imgOptions: ImageOptions = {
      quality: 60,
      source: CameraSource.Prompt,
      resultType: CameraResultType.Base64,
      saveToGallery:  true,
    }

    Camera.getPhoto(imgOptions).then(async (imageData)=>{
      this.capturada = true;
      this.image_path = `data:image/jpeg;base64,${ imageData.base64String }`;
      this.imagenCapturada = imageData.base64String;
      const base64Response = await  fetch(`data:image/jpeg;base64,${ imageData.base64String }`);
      const blob = await base64Response.blob();
      this.file = this.blobToFile(blob, 'evidencia_gasto');
    });

    //const image = await Camera.getPhoto(imgOptions);
    //this.capturada = true;
    
    //this.imagenCapturada = image.webPath;

    //await this.readAsBase64(image);

    //this.image_path = `data:image/jpeg;base64,${ image.base64String }`; 
    //const base64Response = await  fetch(image.webPath!);

    //const blob = await base64Response.blob();
    //this.blobToFile(blob, 'evidencia_gasto');
    
  }
  
  blobToFile(theBlob: Blob, fileName: string){
    return new File([theBlob], fileName, { lastModified: new Date().getTime(), type: theBlob.type });
  }
  
  /* private async readAsBase64(photo: Photo) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    this.file = this.blobToFile(blob, 'evidencia_gasto');
  } */


  async registrarGasto(){
    this.showLoading();

    const status = await Network.getStatus();
    let gastoTemp: string = '';
    let gastoLoc: string = '';

    gastoTemp = await this.appStorage.get('newGasto') || this._gastoDefault;
    gastoLoc = await this.appStorage.get('gastosLocales') || '[]';

    const gasto: GastoTemp = JSON.parse(gastoTemp);
    
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
    
    if (status.connected) {  
      console.log('Gasto:', newGasto);
      
      this.gastosServ.crearGasto(newGasto, this.idEmpresa).subscribe({
        next: async resp => {
          //alert(JSON.stringify(resp));
          if (resp.info.result == 1) {
            const idGasto = resp.info.extra1;

            const datos = {
              IdGas: idGasto,
              Img64: this.imagenCapturada
            }
            
            this.gastosServ.uploadFoto(this.idEmpresa, datos).subscribe({
              next: result => {
                //alert(JSON.stringify(result));
                this.appStorage.remove('newGasto');
                this.modal.backdropDismiss = false;
                this.modal.present();
                this.loadingCtrl.dismiss();
              },
              error: err => alert(JSON.stringify(err))
            });
          }else{
            alert(JSON.stringify(resp))
          }
        },
        error: err => {
          console.log(err);
          alert(JSON.stringify(err));
        }
      });
    } else {
      
      const arrGastos: GastoApi[] = JSON.parse(gastoLoc);
      newGasto.photo = this.imagenCapturada;
      arrGastos.push(newGasto);
      await this.appStorage.set('gastos', JSON.stringify(arrGastos));
      await this.appStorage.remove('newGasto');
      this.loadingCtrl.dismiss();
      this.modal.backdropDismiss = false;
      this.modal.present();
    }

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
