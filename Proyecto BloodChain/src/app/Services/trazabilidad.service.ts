
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import {Trazo} from '../Model/trazo';
@Injectable()
export class TrazabilidadService {
  public BloodCoin :any;

  constructor(private matSnackBar: MatSnackBar) { }



  async primitiveTrace(addressBanco:string, TrunInicio: Number,TruFinal:Number){
    if (!this.BloodCoin) {
      this.setStatus('BLOODCHAIN is not loaded, unable to send transaction');
      return;
    }
    this.setStatus('Initiating transaction... (please wait)');
    
    try {
      const contratoDepliegue = await this.BloodCoin.deployed();
      const resultTransaccion = await contratoDepliegue.primitiveTrace.sendTransaction(addressBanco,TrunInicio,TruFinal, {from:addressBanco});
      if(resultTransaccion.logs[0].args["0"]){
      console.log(resultTransaccion) 
      }else{
        this.setStatus('Fallo en el calculo de la Traza')
      }
    } catch (error) {
      console.log('ERROR PO: '+error);
      this.setStatus("Fallo en la Consulta Servicio");
    }
  
  }


  async newPrimitiveActivity(addressBanco:string,tr:Trazo){
    if (!this.BloodCoin) {
      this.setStatus('BLOODCHAIN is not loaded, unable to send transaction');
      return;
    }
    this.setStatus('Initiating transaction... (please wait)');
    
    try {
      const contratoDepliegue = await this.BloodCoin.deployed();
      const resultTransaccion = await contratoDepliegue.newPrimitiveActivity.sendTransaction(addressBanco,tr.addressTrazo,tr.idTrazo,tr.inputTru,tr.long,tr.lat,tr.idUnidad,tr.idLote, {from:addressBanco});
      if(resultTransaccion.logs[0].args["0"]){
      console.log(resultTransaccion) 
      }else{
        this.setStatus('Fallo en el calculo de la Traza')
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
