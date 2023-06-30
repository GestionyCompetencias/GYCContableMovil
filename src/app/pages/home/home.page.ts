import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { HistorialGastosPage } from '../historial-gastos/historial-gastos.page';
import { GastoTemp } from 'src/app/interfaces/gasto';
import { DetallesComponent } from 'src/app/components/detalles/detalles.component';
import { StorageService } from 'src/app/services/storage.service';
import { DataBaseService } from 'src/app/services/data-base.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  componente: HistorialGastosPage = new HistorialGastosPage();

  ultimosGastos: GastoTemp[] = [];
  lastGastos: GastoTemp[] = [];
  totalRegistrados: number = 0;
  montoTotalRegistrado: number = 0;

  constructor(private navCtrl: NavController,
              private modalCtrl: ModalController,
              private dataBase: DataBaseService) { }



  ngOnInit() {

    this.dataBase.createOpenDataBase();
    this.dataBase.createTable();


    this.dataBase.getAll();





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

    
  }

  getMontoTotal(){
    let monto: number = 0;

    this.ultimosGastos.forEach(reg => {
      monto = parseInt(reg.monto.toString()) + monto;
    });
    this.montoTotalRegistrado = monto;
  }

  agregarGasto(){
    this.navCtrl.navigateForward('crear-gasto');
  }

  async detalles(item: GastoTemp){
    const modal = await this.modalCtrl.create({
      component: DetallesComponent,
      componentProps: item
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
  }




  

}
