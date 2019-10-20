import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
@Injectable()
export class VehiculoService {
  public EstacionCoin:any;
 

  constructor(private matSnackBar: MatSnackBar) { 
  }
  
  
  async EnviarDeposito(addresEstacion:string, idVehiculo:Number, idTipoCombustible:Number, cantidadFuel:Number){
    if (!this.EstacionCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    try {
      const contratoDeploy = await this.EstacionCoin.deployed();
      const resultEvent = await contratoDeploy.sendDeposit.sendTransaction(addresEstacion,idVehiculo,idTipoCombustible,cantidadFuel,{from:addresEstacion});
      return resultEvent;
    } catch (e) {
      console.log(e);
      this.setStatus('Error getting balance; see log.');
      return false;
    }
  }


  async CancelarTransaccion(addresEstacion:string, idVehiculo:Number){
    if (!this.EstacionCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    try {
      const contratoDeploy = await this.EstacionCoin.deployed();
      const resultEvent = await contratoDeploy.cancelDeposit.sendTransaction(addresEstacion,idVehiculo,{from:addresEstacion});
      return resultEvent;
    } catch (e) {
      console.log(e);
      this.setStatus('Error getting balance; see log.');
      return false;
    }
  }

  



 
  setStatus(status){
    this.matSnackBar.open(status, null, {duration: 3000});
  }

}
