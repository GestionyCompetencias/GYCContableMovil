import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Gasto } from '../interfaces/gasto';
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

  crearGasto(data: Gasto){
    return this.http.post<ApiResponse>(`${ BASE_URL }`, data, { headers: this._header});
  }
}
