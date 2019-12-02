
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import {Donacion} from '../Model/donacion';

@Injectable()



export class DonacionService {
  public BloodCoin :any;



  constructor(private matSnackBar: MatSnackBar){
  }


  async setDonacion(addressBanco:string, dn:Donacion){
    if (!this.BloodCoin) {
      this.setStatus('BLOODCHAIN is not loaded, unable to send transaction');
      return;
    }
    this.setStatus('Initiating transaction... (please wait)');
    
    try {
      const contratoDepliegue = await this.BloodCoin.deployed();
      const resultTransaccion = await contratoDepliegue.setDonacion.sendTransaction(addressBanco,dn.idDonacion,dn.idLote,dn.cantidadExtraida,dn.numeroVenoponuciones, dn.numeroMinExtraccion, dn.fechaDonacion, dn.tipBolsa,dn.medicoEncargado, {from:addressBanco});
      if(resultTransaccion.logs[0].args["0"]){
      this.setStatus('Se registro correctamente la donacion ');  
      }else{
        this.setStatus('Fallo el Registro de la donacion')
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
      console.log(resultTransaccion);
      let obj =new Donacion();
      //put attributes in the class 
      obj.idDonacion = resultTransaccion.id;
      obj.cantidadExtraida = resultTransaccion.cantidadExtraida;
      obj.numeroVenoponuciones = resultTransaccion.numeroVenoponuciones;
      obj.numeroMinExtraccion = resultTransaccion.numeroMinExtraccion;
      obj.fechaDonacion= resultTransaccion.fechaDonacion;
      obj.tipBolsa= resultTransaccion.idBolsa;
      obj.medicoEncargado = resultTransaccion.idEmpleado;
      return obj;

    } catch (error) {
      console.log('ERROR PO: '+error);
      this.setStatus("Fallo en la Consulta Servicio");
    }
  
  }


  async getUbicacionUnidad(addressBanco:string, idLote:Number, idDonacion:Number ){
    if (!this.BloodCoin) {
      this.setStatus('BLOODCHAIN is not loaded, unable to send transaction');
      return;
    }
    this.setStatus('Initiating transaction... (please wait)');
    
    try {
      const contratoDepliegue = await this.BloodCoin.deployed();
      const resultTransaccion = await contratoDepliegue.getUbicacionUnidad.call(idLote, idDonacion, {from:addressBanco});
      return resultTransaccion;
    } catch (error) {
      console.log('ERROR PO: '+error);
      this.setStatus("Fallo en la Consulta Servicio");
    }
  
  }


  async getTruUnidad(addressBanco:string, idLote:Number, idDonacion:Number ){
    if (!this.BloodCoin) {
      this.setStatus('BLOODCHAIN is not loaded, unable to send transaction');
      return;
    }
    this.setStatus('Initiating transaction... (please wait)');
    
    try {
      const contratoDepliegue = await this.BloodCoin.deployed();
      const resultTransaccion = await contratoDepliegue.getTruUnidad.call(idLote, idDonacion, {from:addressBanco});
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