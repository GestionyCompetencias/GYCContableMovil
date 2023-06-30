import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { ApiResponse } from '../interfaces/response';

const BASE_URL = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private _header = new HttpHeaders()
                    .set('x-token', localStorage.getItem('token') || '')  
                    .set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getEmpresasByUser( idUser: number ){
    return this.http.get<ApiResponse>(`${ BASE_URL }/empresas/consultarempresasusuario/${ idUser }`, { headers: this._header });
  }
}
