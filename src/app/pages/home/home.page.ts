import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { HistorialGastosPage } from '../historial-gastos/historial-gastos.page';
import { GastoApi, GastoTemp } from 'src/app/interfaces/gasto';
import { DetallesComponent } from 'src/app/components/detalles/detalles.component';
import { StorageService } from 'src/app/services/storage.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { GastosService } from 'src/app/services/gastos.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  ultimosGastos: GastoApi[] = [];
  lastGastos: GastoApi[] = [];
  totalRegistrados: number = 0;
  montoTotalRegistrado: number = 0;

  idEmpresa!: number;

  


  constructor(private navCtrl: NavController,
              private modalCtrl: ModalController,
              private appStorage: StorageService,
              private gastoServ: GastosService) { }



  async ngOnInit() {

    const idEmp = await this.appStorage.get('empresa') || '0';
    this.idEmpresa = parseInt(idEmp);



     /* this.storageServ.getData('gastosLocales').then(data => {
      console.log('gastos', data);
      const ultGastos = data || '[]';
      this.ultimosGastos = JSON.parse(ultGastos);
      this.totalRegistrados = this.ultimosGastos.length;
  
      this.getMontoTotal();
      let index = 0;
      this.ultimosGastos.forEach(item => {
        if (index < 5) {
          this.lastGastos.push(item);
        }
        index++;
      })
    }); */

    await this.getAllGastos();
  }

  getMontoTotal(){
    let monto: number = 0;

    this.ultimosGastos.forEach(reg => {
      monto = parseInt(reg.monto.toString()) + monto;
    });
    this.montoTotalRegistrado = monto;
  }

  getAllGastos(){
    this.gastoServ.getAll(this.idEmpresa).subscribe({
      next: resp => {
        this.ultimosGastos = resp.info.data || [];
        this.totalRegistrados = this.ultimosGastos.length;
        this.ultimosGastos.sort((a, b) => b.id - a.id);
        console.log(this.ultimosGastos);
        
        this.getMontoTotal();
        let index = 0;
        this.ultimosGastos.forEach(item => {
          if (index < 5) {
            this.lastGastos.push(item);
          }
          index++;
        });
      },
      error: err => console.log(err)
    })
  }

  agregarGasto(){
    this.navCtrl.navigateForward('crear-gasto');
  }

  async detalles(item: GastoApi){
    const modal = await this.modalCtrl.create({
      component: DetallesComponent,
      componentProps: item
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
  }

  loadHistory(){
    this.navCtrl.navigateForward('historial-gastos');
  }



  
  

}
