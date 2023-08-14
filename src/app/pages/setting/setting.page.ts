import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

import { App } from '@capacitor/app';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  gpsActive: boolean = true;

  constructor(private alertCtrl: AlertController,
              private authServ: AuthService,
              private appStorage: StorageService,
              private nav: NavController) { }

  async ngOnInit() {
    const activado = await this.appStorage.get('gpsActive');
    let dataBoolean: boolean = (activado === 'true')?true:false;
    this.gpsActive = dataBoolean;

    /* this.storage.getData('gpsActive').then(data =>{
    }); */
  }

  onOffGeolocation(){
    this.gpsActive = !this.gpsActive;
    let activate = (this.gpsActive)?'true':'false';
    this.appStorage.set('gpsActive', activate);
  }

  async presentAlert(){
    const alert = await this.alertCtrl.create({
      header: 'Aviso',
      message: '¿Esta seguro(a) que desea cerrar la sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            ;
          },
        },
        {
          text: 'Salir',
          role: 'confirm',
          handler: () => {
            this.logout();
          },
        },
      ]
    });

    await alert.present();
  }


  logout(){
    this.authServ.logout();
    this.nav.navigateRoot('login');
  }

}
