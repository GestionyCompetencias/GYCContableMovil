import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { GastoTemp } from '../interfaces/gasto';


@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  db!: SQLiteObject;

  constructor(private sqlite: SQLite) { }

  createOpenDataBase(){
    try {
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      }).then( (db: SQLiteObject)=>{
        this.db = db;
        console.log("Database created/opoened");
      }).catch(e => console.log(JSON.stringify(e)));
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  }

  createTable(){
    const $sql = `  CREATE TABLE IF NOT EXISTS gastos (
      id integer primary key AUTOINCREMENT, 
      tipo varchar(5) NOT NULL, 
      fecha date NOT NULL, 
      motivo varchar(200) NOT NULL,
      monto decimal(16,2) NOT NULL, 
      factura varchar(100) NOT NULL, 
      rut varchar(50) NOT NULL,
      proveedor varchar(180) NOT NULL, 
      observacion text, 
      foto varchar(255),
      latitud varchar(50),
      longitud varchar(50),
    );`;
    this.db.executeSql($sql, [])
      .then(result => console.log('Tabla Creada'))
      .catch(e => console.log(JSON.stringify(e)));
  }

  insertData(data: GastoTemp){
    let query: string = `
      INSERT INTO gastos (id,tipo,fecha,motivo,monto,factura,rut,proveedor,observacion,foto,latitud,longitud) VALUES (
      null,
      '${ data.tipo }',
      '${ data.fecha }',
      '${ data.motivo }',
      '${ data.monto }',
      '${ data.factura}',
      '${ data.rutProveedor }',
      '${ data.proveedor }',
      '${ data.observacion }',
      '${ data.photo }',
      '${ data.latitud }',
      '${ data.longitud }'
    )`;

    this.db.executeSql(query, [])
        .then( result => console.log('Registro Insertado'))
        .catch( e => console.log(JSON.stringify(e)));
  }

  getAll(){
    let query: string = `SELECT * FROM gastos ORDER BY id DESC LIMIT 0, 5`;
    this.db.executeSql(query, [])
      .then(result =>{
        console.log(result);
      })
      .catch(e => console.log(JSON.stringify(e)));
  }

  getGastoById(id: number){
    let query: string = `SELECT * FROM gastos WHERE id=${ id }`;
    this.db.executeSql(query, [])
      .then(result =>{
        console.log(result);
      })
      .catch(e => console.log(JSON.stringify(e)));
  }

  updateGasto(data: GastoTemp, id: number){
    let query = `
    UPDATE gastos SET 
      tipo='${ data.tipo }',
      fecha='${ data.fecha }',
      motivo='${ data.motivo }',
      monto='${ data.monto }',
      factura='${ data.factura }',
      rut='${ data.rutProveedor }',
      proveedor='${ data.proveedor }',
      observacion='${ data.observacion }',
      foto='${ data.photo }',
      latitud='${ data.latitud }',
      longitud='${ data.longitud }'
    WHERE id=${ id }
    `;
    this.db.executeSql(query, [])
        .then( result => console.log('Registro Actualizado'))
        .catch( e => console.log(JSON.stringify(e)));
  }

  deleteGasto(id: number){
    let query: string = `DELETE from gastos WHERE id = ${ id }`;
    this.db.executeSql(query, [])
      .then( result => console.log('Registro Eliminado'))
      .catch( e => console.log(JSON.stringify(e)));
  }
}
