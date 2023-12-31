import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Preferences } from '@capacitor/preferences';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { DetallesComponent } from 'src/app/components/detalles/detalles.component';
import { GastoApi } from 'src/app/interfaces/gasto';
import { GastosService } from 'src/app/services/gastos.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-gastos-fechagas',
  templateUrl: './gastos-fechagas.page.html',
  styleUrls: ['./gastos-fechagas.page.scss'],
})
export class GastosFechagasPage implements OnInit {

  fechaAct!: string;
  preFecha: string = '';

  gastos: GastoApi[] = [];

  idEmpresa!: number;

  //filterForm!: FormGroup;
  filterForm: FormGroup = this.fb.group({
    fechaReg: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
              private appStorage: StorageService,
              private gastoServ: GastosService,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private modalCtrl: ModalController) { }

  async ngOnInit() {
    const fecha = new Date();
    let mes: any = fecha.getMonth()+1;
    mes = (mes.toString().length > 1) ? mes : '0'+mes; 
    let dia: any = fecha.getDate();
    dia = (dia.toString().length > 1) ? dia : '0'+dia; 
    this.fechaAct = `${ fecha.getFullYear() }-${ mes }-${ dia }T23:59:59`;
    this.preFecha = `${ fecha.getFullYear() }-${ mes }-${ dia }T23:59:59`;
    this.filterForm.get('fechaReg')?.reset(this.preFecha);
    let idEmp = await this.appStorage.get('empresa') || '0';
    this.idEmpresa = parseInt(idEmp);
  }


  filterFechaFactura(){
    this.loading();
    const fechaFilter = this.filterForm.get('fechaReg')?.value.substring(0, 10);
    this.gastoServ.getGatsosByFechDoc(this.idEmpresa, fechaFilter, fechaFilter).subscribe({
      next: resp => {
        this.loadingCtrl.dismiss();
        if (resp.info.result === 1) {
          this.gastos = resp.info.data || [];
        } else {
          this.presentAlert(resp.info.mensaje);
        }
      },
      error: err => console.log(err)
    });
  }

  async loading(){
    const load = await this.loadingCtrl.create({
      message: 'Espere Cargando Informacón...',
      spinner:'bubbles'
    });

    load.present();
  }

  async presentAlert(message: string){

    const alert = await this.alertCtrl.create({
      header: 'Aviso',
      message,
      buttons:['Aceptar']
    });
    await alert.present();
  }

  captureFecha( event: any ){
    let fechaSel: string = event.detail.value;
    let fd = fechaSel.substring(0, 10);
    this.filterForm.get('fechaReg')?.reset(fd);
  }

  async detalles(item: GastoApi){
    const modal = await this.modalCtrl.create({
      component: DetallesComponent,
      componentProps: item
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
  }
}
