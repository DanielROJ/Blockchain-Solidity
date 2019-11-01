
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()



export class DonacionService {
  public BloodCoin :any;



  constructor(private matSnackBar: MatSnackBar){
  }


  async setDonacion(addressBanco:string, idDonacion: Number,idLote:Number,cantidadExtraida:Number, numeroVenoponuciones:Number,numeroMinExtraccion:Number,fechaDonacion:string,idBolsa:Number, idMedico:Number){
    if (!this.BloodCoin) {
      this.setStatus('BLOODCHAIN is not loaded, unable to send transaction');
      return;
    }
    this.setStatus('Initiating transaction... (please wait)');
    
    try {
      const contratoDepliegue = await this.BloodCoin.deployed();
      const resultTransaccion = await contratoDepliegue.setDonacion.sendTransaction(addressBanco,idDonacion,idLote,cantidadExtraida,numeroVenoponuciones, numeroMinExtraccion, fechaDonacion, idBolsa,idMedico, {from:addressBanco});
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


  async getDonacionLote(addressBanco:string, idLote:Number, idDonacion:Number ){
    if (!this.BloodCoin) {
      this.setStatus('BLOODCHAIN is not loaded, unable to send transaction');
      return;
    }
    this.setStatus('Initiating transaction... (please wait)');
    
    try {
      const contratoDepliegue = await this.BloodCoin.deployed();
      const resultTransaccion = await contratoDepliegue.getDonacionLote.call(idLote, idDonacion, {from:addressBanco});
      if(resultTransaccion.id !== 0 ){
        this.setStatus('Se Obtubieron los datos con exito')

      }
    } catch (error) {
      console.log('ERROR PO: '+error);
      this.setStatus("Fallo en la Consulta Servicio");
    }
  
  }






  setStatus(status) {
    this.matSnackBar.open(status, null, {duration: 3000});
  }

}  