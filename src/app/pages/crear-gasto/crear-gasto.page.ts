import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Geolocation } from '@capacitor/geolocation';
import { AlertController, NavController } from '@ionic/angular';
import { Network } from '@capacitor/network';
import { Gasto, GastoTemp } from 'src/app/interfaces/gasto';
import { DataService } from 'src/app/services/data.service';
import { StorageService } from 'src/app/services/storage.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-crear-gasto',
  templateUrl: './crear-gasto.page.html',
  styleUrls: ['./crear-gasto.page.scss'],
})
export class CrearGastoPage implements OnInit {

  fechaAct!: string;
  preFecha: string = '';

  idEmpresa!: number;

  gpsActivo: boolean = true;

  tipoSel: any = '';
  tipoDoc: any = '';


  formGasto: FormGroup = this.fb.group({
    tipo: ['', Validators.required],
    tipoDoc: ['', Validators.required],
    fecha: ['', Validators.required],
    motivo: ['', Validators.required],
    monto: ['', Validators.required],
    factura: ['', Validators.required],
    observacion: ['', Validators.required],
    latitud: ['', Validators.required],
    longitud: ['', Validators.required],
    rut: ['', Validators.required],
    proveedor: ['', [Validators.required, Validators.minLength(3)]]
  });

  constructor(private fb: FormBuilder,
              private alertCtrl: AlertController,
              private dataServ: DataService,
              private appStorage: StorageService,
              private navCtrl: NavController) { }

  async ngOnInit() {
    const fecha = new Date();
    let mes: any = fecha.getMonth()+1;
    mes = (mes.toString().length > 1) ? mes : '0'+mes; 
    let dia: any = fecha.getDate();
    dia = (dia.toString().length > 1) ? dia : '0'+dia; 
    this.fechaAct = `${ fecha.getFullYear() }-${ mes }-${ dia }T23:59:59`;
    this.preFecha = `${ fecha.getFullYear() }-${ mes }-${ dia }T23:59:59`;

    console.log(this.preFecha);
    

    this.formGasto.get('fecha')?.reset(this.preFecha);

    const idemp = await this.appStorage.get('empresa');
    let idEmp = idemp || '0';
    this.idEmpresa = parseInt(idEmp);

    this.getCurrentLocation();
    this.preLoadGasto();
  }
  
  async preLoadGasto(){

    const gasto = await this.appStorage.get('newGasto') || '';
    if(gasto.trim().length === 0) return;

    const preGasto: GastoTemp = JSON.parse(gasto);
    console.log('gasto precargado: ', preGasto);
    
    let fecha = `${ preGasto.fecha }T23:59:59`;

    this.formGasto.get('fecha')?.reset(this.preFecha);
    this.tipoSel = preGasto.tipo;
    this.tipoDoc = preGasto.tipoDoc;
    
    this.formGasto.reset({
      'tipo': preGasto.tipo,
      'tipoDoc': preGasto.tipoDoc,
      'fecha': fecha,
      'motivo': preGasto.motivo,
      'monto': preGasto.monto,
      'factura': preGasto.factura,
      'rut': preGasto.rut,
      'proveedor': preGasto.proveedor,
      'observacion': preGasto.observacion,
    });

  }

  captureFecha( event: any ){
    let fechaSel: string = event.detail.value;
    let fd = fechaSel.substring(0, 10);
    this.formGasto.get('fecha')?.reset(fd);
  }

  captureTipo( event: any ){
    this.formGasto.get('tipo')?.reset(event.detail.value)
  }
  
  captureTipoDoc( event: any ){
    this.formGasto.get('tipoDoc')?.reset(event.detail.value)
  }

  async getCurrentLocation(){

    const isActivoGPS = await Geolocation.checkPermissions();

    if (isActivoGPS.location === 'denied' && this.gpsActivo) {
      this.presentAlert('Disculpe, le sugerimos activar su GPS para el correcto funcionamiento de la app.', 'Alerta GPS');
      this.formGasto.patchValue({
        'longitud': '0',
        'latitud': '0'
      });
      return;
    }    

    const coords = await Geolocation.getCurrentPosition();
    this.formGasto.patchValue({
      'longitud': coords.coords.longitude,
      'latitud': coords.coords.latitude
    });

  }

  async onSubmit(){
    const newGasto: GastoTemp = { ...this.formGasto.value }

    await this.appStorage.set('newGasto', JSON.stringify(newGasto));
    this.navCtrl.navigateForward('foto-gasto');
  }


  consultarProveedor(event: any){
    const rutProv = event.target.value;

    this.dataServ.getProveedorByRut(this.idEmpresa, rutProv).subscribe({
      next: resp => {
        console.log('respuesta', resp);
        
        if (resp.info.result === 1) {
          const dataProv = resp.info.data.pop();
          this.formGasto.get('proveedor')?.reset(`${dataProv.nombres} ${ dataProv.apellidos}`);
        }
      },
      error: err => console.log(err)
    });
    
  }

  async presentAlert(message: string, titulo?: string){
    const alert = this.alertCtrl.create({
      header: titulo ? 'Aviso' : titulo,
      message,
      buttons: ['Aceptar']
    });

    (await alert).present();
  }



}
