import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { GastoApi } from '../interfaces/gasto';
import { ApiResponse } from '../interfaces/response';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class GastosService {

  private _header = new HttpHeaders()
                    .set('x-token', localStorage.getItem('token') || '')  
                    .set('Content-Type', 'application/json');


  constructor(private http: HttpClient) { }

  crearGasto(data: GastoApi, idEmpresa: number){
    return this.http.post<ApiResponse>(`${ BASE_URL }/gastos?empresa=${ idEmpresa }`, data, { headers: this._header});
  }
  
  getAll(idEmpresa: number){
    return this.http.get<ApiResponse>(`${ BASE_URL }/gastos/consultargastos?empresa=${ idEmpresa }`, { headers: this._header});
  }
  
  getGatsosByReg(idEmpresa: number, fechaIni: string, fechaFin: string){
    return this.http.get<ApiResponse>(`${ BASE_URL }/gastos/gastosfecharegistro?fechaI=${ fechaIni }&fechaF=${ fechaFin }&empresa=${ idEmpresa }`, { headers: this._header});
  }
  
  getGatsosByFechDoc(idEmpresa: number, fechaIni: string, fechaFin: string){
    return this.http.get<ApiResponse>(`${ BASE_URL }/gastos/gastosfechadoc?fechaI=${ fechaIni }&fechaF=${ fechaFin }&empresa=${ idEmpresa }`, { headers: this._header});
  }

  uploadFoto(idEmpresa:number, idGasto:any, imgUrl:File){
    const fd =  new FormData();
    fd.append('idGast', idGasto),
    fd.append('image', imgUrl)
    return this.http.post(`${ BASE_URL }/fotocomprobante?empresa=${ idEmpresa }`,fd,{headers: this._header});
  }
}
