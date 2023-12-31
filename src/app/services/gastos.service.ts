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

  uploadFoto(idEmpresa:number, datos:any){
    //alert(JSON.stringify(datos));
    return this.http.post(`${ BASE_URL }/fotocomprobante?empresa=${ idEmpresa }`,datos,{headers: this._header});
  }

  getFotoGasto(idEmpresa:number, idGas:number){
    return this.http.get<ApiResponse>(`${ BASE_URL }/fotocomprobante/consultarimagenes?idGast=${ idGas }&empresa=${ idEmpresa }`, { headers: this._header});
  }
}
