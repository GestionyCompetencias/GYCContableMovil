import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Preferences } from '@capacitor/preferences';
import { NavController } from '@ionic/angular';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-select-empresa',
  templateUrl: './select-empresa.page.html',
  styleUrls: ['./select-empresa.page.scss'],
})
export class SelectEmpresaPage implements OnInit {
  isSubmitted: boolean = false;

  listEmpresas: any[] = [];
  idUser!: number;

  formSelEmpre: FormGroup = this.fb.group({
    empresa: ['', Validators.required],
  });
  constructor(private fb: FormBuilder,
              private nav: NavController,
              private empresaServ: EmpresaService) { }

  async ngOnInit() {
    const { value } = await Preferences.get({ key: 'idUser' });
    let idus = value || '0';
    this.idUser = parseInt(idus);
    this.getEmpresasUser( this.idUser );
  }


  getEmpresasUser(idUser: number) {
    this.empresaServ.getEmpresasByUser(idUser).subscribe({
      next: resp=>{
        this.listEmpresas = resp.info.data;
      },
      error: err => console.log(err)
    });
  }

  noValido(campo: string){
    return this.formSelEmpre.get('empresa')?.hasError && this.isSubmitted;
  }


  entrar(){
    this.isSubmitted = true;

    if(this.formSelEmpre.invalid) return;

    const valor = this.formSelEmpre.get('empresa')?.value;
    
    if (valor.toString().trim().length === 0) {
      return;
    }

    if(this.formSelEmpre.invalid){
      return;
    }

    Preferences.set({ key: 'idEmpresa', value: valor });
    this.nav.navigateRoot('home');
  }

}
