import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material';

@Injectable()
export class EstacionService {
  public EstacionCoin:any;
  public tool : any;

  constructor(private matSnackBar: MatSnackBar) { 
  }


  async setGasInfo(addresEstacion:string, nombreEstacion:string){
    if (!this.EstacionCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    try {
      const contratoDeploy = await this.EstacionCoin.deployed();
      const resultEvent = await contratoDeploy.setGasInfo.sendTransaction(addresEstacion, nombreEstacion,{from:addresEstacion});
      console.log(resultEvent);
    } catch (e) {
      console.log(e);
      this.setStatus('Error getting balance; see log.');
    }
  }


  async getGasInfo(addresEstacion:string){
    if (!this.EstacionCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    try {
      const contratoDeploy = await this.EstacionCoin.deployed();
      const resultEvent = await contratoDeploy.getGasInfo.call(addresEstacion);

      let data = {
        nombreEstacion: "",
        diesel:0,
        gas:0,
        corriente:0
      }
      if(resultEvent){
          data.nombreEstacion = resultEvent["0"];
          data.diesel = resultEvent["2"][0];
          data.gas = resultEvent["2"][1];
          data.corriente = resultEvent["2"][2];
          console.log(data);
          return data;
      }else{
        this.setStatus('No se encuentran Datos Relacionados');
        return undefined;
      }
    } catch (e) {
      console.log(e); 
      this.setStatus('Error getting balance; see log.');
      return undefined;
    }
  }


  async setPriceFuel(addresEstacion:string, idTipoCombustible:Number, precio:Number){
    if (!this.EstacionCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    try {
      const contratoDeploy = await this.EstacionCoin.deployed();
      const resultEvent = await contratoDeploy.setPriceFuel.sendTransaction(addresEstacion,idTipoCombustible,this.tool.toWei(String(precio)),{from:addresEstacion});
      console.log(resultEvent);
    } catch (e) {
      console.log(e);
      this.setStatus('Error getting balance; see log.');
    }
  }


  async getPriceFuel(addresEstacion:string,idTipoCombustible:Number){
    if (!this.EstacionCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    try {
      const contratoDeploy = await this.EstacionCoin.deployed();
      const resultEvent = await contratoDeploy.getPriceFuel.call(addresEstacion,idTipoCombustible);
      return resultEvent;
    } catch (e) {
      console.log(e); 
      this.setStatus('Error getting balance; see log.');
      return  0;
    }
  }

  async EnviarFuel(addresEstacion:string,idVehiculo:Number){
    if (!this.EstacionCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    try {
      const contratoDeploy = await this.EstacionCoin.deployed();
      const resultEvent = await contratoDeploy.enviarFuel.sendTransaction(addresEstacion,idVehiculo,{from:addresEstacion});;
      return resultEvent;
    } catch (e) {
      console.log(e); 
      this.setStatus('Error getting balance; see log.');
      return  0;
    }
  }

  async getSaldoEstacion(addresEstacion:string){
    if (!this.EstacionCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    try {
      const contratoDeploy = await this.EstacionCoin.deployed();
      const resultEvent = await contratoDeploy.getSaldoEstacion.call(addresEstacion);
      return resultEvent;
    } catch (e) {
      console.log(e); 
      this.setStatus('Error getting balance; see log.');
      return  0;
    }
  }

  async verifyDeposit(addresEstacion:string, idVehiculo:Number){
    if (!this.EstacionCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    try {
      const contratoDeploy = await this.EstacionCoin.deployed();
      const resultEvent = await contratoDeploy.verifyDeposit.call(addresEstacion);
      return resultEvent;
    } catch (e) {
      console.log(e); 
      this.setStatus('Error getting balance; see log.');
      return  false;
    }
  }




  
  setStatus(status){
    this.matSnackBar.open(status, null, {duration: 3000});
  }





}
