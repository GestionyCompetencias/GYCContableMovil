import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController } from "@ionic/angular";

import { Auth } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isSubmited: boolean = false;

  formAuth: FormGroup = this.fb.group({
    usuraio: ['', Validators.required],
    contra: ['', Validators.required] 
  });
  
  constructor(private auth: AuthService,
              private fb: FormBuilder,
              private storage: StorageService,
              private nav: NavController,
              private alertController: AlertController,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  noValido(campo: string){
    return this.formAuth.get(campo)?.errors && this.isSubmited; 
  }

  ingresar(){
    this.isSubmited = true;
    this.showLoading();

    if( this.formAuth.invalid ) return;

    const auth: Auth = { ...this.formAuth.value }

    this.auth.validateUser(auth).subscribe({
      next: resp => {
        this.loadingCtrl.dismiss();
        if (resp.info.result === 1) {
          const dataLogin = resp.info.data.pop();

          this.storage.set('x-token', dataLogin.token);
          this.storage.set('idUser', dataLogin.idUsu);


         /*  localStorage.setItem('x-token', dataLogin.token);
          localStorage.setItem('idUser', dataLogin.idUsu); */
          if (dataLogin.usuarioEmpresas.length > 1) {
            this.nav.navigateRoot('select-empresa');
          } else {
            this.storage.set('idEmpresa', dataLogin.usuarioEmpresas[0].idempre);
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
