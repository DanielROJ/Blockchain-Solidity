
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()


export class UsuarioService {

  public BloodCoin :any;



  constructor(private matSnackBar: MatSnackBar){
  }





  async setDonante(addressBanco:string, cedula:Number, edad:Number, numeroTelefono:Number, nombre:string, apellido:string, Eps:string, correoElectronico:string, genero:string){
    if (!this.BloodCoin) {
      this.setStatus('BLOODCHAIN is not loaded, unable to send transaction');
      return;
    }
    this.setStatus('Initiating transaction... (please wait)');
    
    try {
      const contratoDepliegue = await this.BloodCoin.deployed();
      const resultTransaccion = await contratoDepliegue.setDonante.sendTransaction(addressBanco,cedula,edad,numeroTelefono,nombre, apellido, Eps,correoElectronico,genero,{from:addressBanco});
      if(resultTransaccion.logs[0].args["0"] == cedula){
      this.setStatus('Se registro correctamente');  
      }else{
        this.setStatus('Fallo el Registro del Usuario')
      }
    } catch (error) {
      console.log('ERROR PO: '+error);
      this.setStatus("Fallo en la Consulta Servicio");
    }
  
  }



  async getDonante(addressBanco:string, cedula:Number){
    if (!this.BloodCoin) {
      this.setStatus('BLOODCHAIN is not loaded, unable to send transaction');
      return;
    }
    this.setStatus('Initiating transaction... (please wait)');
    
    try {
      const contratoDepliegue = await this.BloodCoin.deployed();
      const resultTransaccion = await contratoDepliegue.getDonante.call(cedula, {from:addressBanco});
      if(resultTransaccion.cedula === 0 ){
        this.setStatus('Se Obtubieron los datos con exito')
       return resultTransaccion;
      }else{
        this.setStatus('No se Encuentran los datos');
        return undefined;
      }
    } catch (error) {
      console.log('ERROR PO: '+error);
      this.setStatus("Fallo en la Consulta Servicio");
      return undefined;
    }
  
  }



  async setSaludDonante(addressBanco:string, cedula:Number, peso: Number, altura:Number, TesionArterial:Number ){
    if (!this.BloodCoin) {
      this.setStatus('BLOODCHAIN is not loaded, unable to send transaction');
      return;
    }
    this.setStatus('Initiating transaction... (please wait)');
    
    try {
      const contratoDepliegue = await this.BloodCoin.deployed();
      const resultTransaccion = await contratoDepliegue.setSaludDonante.sendTransaction(cedula,peso,altura,TesionArterial, {from:addressBanco});
      if(resultTransaccion.logs[0].args["0"]){
        this.setStatus('Se Cargaron los datos de forma correctaS')
      }else{
        this.setStatus('Nose pudieron Cargar Los datos')
      }
    } catch (error) {
      console.log('ERROR PO: '+error);
      this.setStatus("Fallo en la Consulta Servicio");
    }
  
  }



  async setEmpleado(addressBanco:string, idEmpleado:Number, password: string, nombre:string, rol:string ){
    if (!this.BloodCoin) {
      this.setStatus('BLOODCHAIN is not loaded, unable to send transaction');
      return;
    }
    this.setStatus('Initiating transaction... (please wait)');
    
    try {
      const contratoDepliegue = await this.BloodCoin.deployed();
      const resultTransaccion = await contratoDepliegue.setEmpleado.sendTransaction(addressBanco,idEmpleado,password, nombre, rol, {from:addressBanco});
      if(resultTransaccion.logs[0].args["0"] == idEmpleado){
        this.setStatus('Se Cargaron los datos de forma correcta')
      }else{
        this.setStatus('Nose pudieron Cargar Los datos')
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