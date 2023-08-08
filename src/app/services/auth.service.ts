import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth';
import { ApiResponse } from '../interfaces/response';
import { StorageService } from './storage.service';

const BASE_URL = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _header = new HttpHeaders()
                    .set('x-token', localStorage.getItem('token') || '')  
                    .set('Content-Type', 'application/json');


  constructor(private http: HttpClient,
              private storage: StorageService) { }

  validateUser(data: Auth){
    //return this.http.post<ApiResponse>(`https://contable.gycsol.cl/login`, data, { headers: this._header });
    return this.http.post<ApiResponse>(`${ BASE_URL }/login`, data, { headers: this._header });
  }
  
  dataUser(idUser: number){
    return this.http.get<ApiResponse>(`${ BASE_URL }/usuarios/consultausuario?id=${idUser}`, { headers: this._header });
  }


  
  logout(){
    this.storage.remove('x-token');
    this.storage.remove('idUser');
    this.storage.remove('rutUser');
    this.storage.remove('idEmpresa');
  }

  isLogged(){
    return this.storage.getData('x-token').then(data => {
      const token: string = data;
      if(token.trim().length === 0){
        return false;
      } else {
        return true;
      }
    });
  }
}
