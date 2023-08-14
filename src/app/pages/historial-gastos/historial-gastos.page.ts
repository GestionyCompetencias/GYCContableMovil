import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-historial-gastos',
  templateUrl: './historial-gastos.page.html',
  styleUrls: ['./historial-gastos.page.scss'],
})
export class HistorialGastosPage implements OnInit {

  fechaAct!: string;
  preFecha: string = '';

  idEmpresa!: number;

  //filterForm!: FormGroup;
  filterForm: FormGroup = this.fb.group({
    fechaFac: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
    private storage: StorageService,
    private navCtrl: NavController) { }

  ngOnInit() {
    const fecha = new Date();
    let mes: any = fecha.getMonth()+1;
    mes = (mes.toString().length > 1) ? mes : '0'+mes; 
    let dia: any = fecha.getDate();
    dia = (dia.toString().length > 1) ? dia : '0'+dia; 
    this.fechaAct = `${ fecha.getFullYear() }-${ mes }-${ dia }T23:59:59`;
    this.preFecha = `${ fecha.getFullYear() }-${ mes }-${ dia }T23:59:59`;
    this.filterForm.get('fechaFac')?.reset(this.preFecha);
    
  }


  filterFechaFactura(){

  }

  captureFecha( event: any ){
    let fechaSel: string = event.detail.value;
    let fd = fechaSel.substring(0, 10);
    this.filterForm.get('fecha')?.reset(fd);
  }

}
