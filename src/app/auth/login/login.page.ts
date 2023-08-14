import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController } from "@ionic/angular";

import { Auth } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isSubmited: boolean = false;

  dataUser: any = {};

  formAuth: FormGroup = this.fb.group({
    usuraio: ['', Validators.required],
    contra: ['', Validators.required] 
  });
  
  constructor(private auth: AuthService,
              private fb: FormBuilder,
              private nav: NavController,
              private appStorage: StorageService,
              private alertController: AlertController,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  noValido(campo: string){
    return this.formAuth.get(campo)?.errors && this.isSubmited; 
  }

  async ingresar(){
    this.isSubmited = true;
    this.showLoading();

    if( this.formAuth.invalid ) return;

    const auth: Auth = { ...this.formAuth.value }

    this.auth.validateUser(auth).subscribe({
      next: async (resp) => {
        this.loadingCtrl.dismiss();
        if (resp.info.result === 1) {
          const dataLogin = await resp.info.data.pop();
          //await this.getDatauser(dataLogin.idUsu);

          await this.appStorage.set('x-token', dataLogin.token );
          await this.appStorage.set('usuario', dataLogin.idUsu );
          await this.appStorage.set('rutUser', auth.usuraio );
          /* await Preferences.set({ key: 'x-token', value: dataLogin.token });
          await Preferences.set({ key: 'idUser', value: dataLogin.idUsu });
          await Preferences.set({ key: 'rutUser', value: auth.usuraio }); */

          if (dataLogin.usuarioEmpresas.length > 1) {
            this.nav.navigateRoot('select-empresa');
          } else {
            await this.appStorage.set('empresa', dataLogin.usuarioEmpresas[0].idempre);
            //await Preferences.set({ key: 'idEmpresa', value: dataLogin.usuarioEmpresas[0].idempre });
            //localStorage.setItem('idEmpresa', dataLogin.usuarioEmpresas[0].idempre);
            this.nav.navigateRoot('home');
          }
        } else {
          this.presentAlert('Credenciales de Acceso invalidas!!!');
        }
      },
      error: err => {
        this.loadingCtrl.dismiss();
        console.log(err)
      }
    })
  }

  getDatauser(idUser: number){

    console.log(idUser);
    
    this.auth.dataUser(idUser).subscribe({
      next: resp => {
        this.dataUser = resp.info.data.pop();
        Preferences.set({ key: 'idEmpresa', value: this.dataUser.usuario });
      }, error: err => console.log(err)
    });
  }


  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Validando Datos por favor espere...',
    });

    loading.present();
  }

}
