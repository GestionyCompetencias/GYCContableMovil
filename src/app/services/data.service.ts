import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../interfaces/response';
import { environment } from 'src/environments/environment.prod';

const BASE_URL = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _header = new HttpHeaders()
                    .set('x-token', localStorage.getItem('token') || '')  
                    .set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getProveedorByRut(idEmpresa: number, rut: string){
    return this.http.get<ApiResponse>(`${ BASE_URL }/proveedores/consultaproveedor?rut=${ rut }&empresa=${ idEmpresa }`, { headers: this._header});
  }
}
