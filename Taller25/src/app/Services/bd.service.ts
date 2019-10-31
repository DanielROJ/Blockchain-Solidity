import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
@Injectable()

export class BDService {
  public DesastreCoin :any;
  constructor(private matSnackBar: MatSnackBar){
  }
  
 async setUser(address:string, idUser:Number, nombre:string, tipo:Number){
    if (!this.DesastreCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    this.setStatus('Initiating transaction... (please wait)');
    
    try {
      const contratoDepliegue = await this.DesastreCoin.deployed();
      const resultTransaccion = await contratoDepliegue.setUser.sendTransaction(idUser,nombre,tipo,{from:address});
      if(resultTransaccion.logs[0].args["0"]){
      this.setStatus('Se registro correctamente');  
      }else{
        this.setStatus('Fallo el Registro del Usuario')
      }
    } catch (error) {
      console.log('ERROR PO: '+error);
      this.setStatus("Fallo en la Consulta Servicio");
    }
  
  }


  async setRegistroUbicacion(address:string, idUser: number, fecha:string, latitud:string, longitud:string, caudal:string){
    if (!this.DesastreCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    this.setStatus('Initiating transaction... (please wait)');
    
    try {
      const contratoDepliegue = await this.DesastreCoin.deployed();
      const resultTransaccion = await contratoDepliegue.setRegistro.sendTransaction(idUser,fecha,latitud,longitud,caudal,{from:address});
      if(resultTransaccion.logs[0].args["0"]){
        this.setStatus('Se registro correctamente');  
        }else{
          this.setStatus('Fallo el Registro de la Ubicacion')
        }
        
    } catch (error) {
      console.log('ERROR POR : ');
      console.log(error);
      this.setStatus("Fallo en el Reigsitro Ubicacion");
    }
  
  }



  async getUser(address:string, idUser:Number){
    if (!this.DesastreCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    this.setStatus('Initiating transaction... (please wait)');
    
    try {
      const contratoDepliegue = await this.DesastreCoin.deployed();
      const resultTransaccion = await contratoDepliegue.getUser.call(idUser,{from:address});
      if(resultTransaccion){
        return resultTransaccion;
      }else{
        return undefined;
      }
    } catch (error) {
      console.log('ERROR PO: '+error);
      this.setStatus("Fallo en la Consulta Servicio");
    }
  
  }


  async getRegistro(address:string, idUser:Number, fecha:string){
    if (!this.DesastreCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    this.setStatus('Initiating transaction... (please wait)');
    
    try { 
      const contratoDepliegue = await this.DesastreCoin.deployed();
      const resultTransaccion = await contratoDepliegue.getRegistro.call(idUser,fecha,{from:address});
      console.log(resultTransaccion);
      return resultTransaccion;
    } catch (error) {
      console.log('ERROR PO: '+error);
      this.setStatus("Fallo en la Consulta Servicio");
    }
  
  }







  setStatus(status) {
    this.matSnackBar.open(status, null, {duration: 3000});
  }

}
