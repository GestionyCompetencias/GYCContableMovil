import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth';
import { ApiResponse } from '../interfaces/response';
import { StorageService } from './storage.service';
import { Preferences } from '@capacitor/preferences';

const BASE_URL = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _header = new HttpHeaders()
                    .set('x-token', localStorage.getItem('token') || '')  
                    .set('Content-Type', 'application/json');


  constructor(private http: HttpClient,
              private appStorage: StorageService) { }

  validateUser(data: Auth){
    //return this.http.post<ApiResponse>(`https://contable.gycsol.cl/login`, data, { headers: this._header });
    return this.http.post<ApiResponse>(`${ BASE_URL }/login`, data, { headers: this._header });
  }
  
  dataUser(idUser: number){
    return this.http.get<ApiResponse>(`${ BASE_URL }/usuarios/consultausuario?id=${idUser}`, { headers: this._header });
  }


  
  async logout(){
    await this.appStorage.remove('x-token');
    await this.appStorage.remove('usuario');
    await this.appStorage.remove('rutUser');
    await this.appStorage.remove('empresa');
  }

  async isLogged(){
    const x_token = await this.appStorage.get('x-token');
    const token: string = x_token || '';
    if(token.trim().length === 0){
      return false;
    } else {
      return true;
    }
  }
}
