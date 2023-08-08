import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    //this.init();
   }

  async init(){
    const storage = await this.storage.create();
    this._storage = storage;  
  }

  public async set(key: string, value: any){
    await Preferences.set({
      key,
      value
    });
    //this._storage?.set(key, value);
  }

  public async getData(key: string){
    const { value } = await Preferences.get({ key });
    return value || '';
    /* return this.storage.get(key).then((value)=>{
        return value;
    }); */
  }



  public async remove(key: string){
    await Preferences.remove({ key });
    //this._storage?.remove(key);
  }

  public clear(){
    Preferences.clear();
    //this._storage?.clear();
  }
}
