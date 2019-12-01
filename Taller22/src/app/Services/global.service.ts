import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Encuesta } from '../Model/encuesta';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public EncuestaCoin:any;
  private tmpE:Encuesta;

  constructor(private matSnackBar: MatSnackBar){
  }

  async setEmpresa(address:string){
    if (!this.EncuestaCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    this.setStatus('Initiating transaction... (please wait)');
    
    try {
      const contratoDepliegue = await this.EncuestaCoin.deployed();
      const resultTransaccion = await contratoDepliegue.setEmpresa.sendTransaction(address,{from:address});
      if(resultTransaccion.logs[0].args["0"]){
      this.setStatus('Registro de Empresa Correcto');  
      }else{
        this.setStatus('Fallo el Registro de la Empresa')
      }
    } catch (error) {
      console.log('ERROR PO: '+error);
      this.setStatus("Fallo en la Consulta Servicio");
    }
  
  }

  async setEncuestaContratada(address:string, idEncuestaContratada:Number){
    if (!this.EncuestaCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    this.setStatus('Initiating transaction... (please wait)');
    
    try {
      const contratoDepliegue = await this.EncuestaCoin.deployed();
      const resultTransaccion = await contratoDepliegue.setEncuestaContratada.sendTransaction(address,idEncuestaContratada,{from:address});
      if(resultTransaccion.logs[0].args["0"]){
      this.setStatus('Registro del Contrato encuesta Correcto');  
      }else{
        this.setStatus('Fallo el Registro del Contrato Encuesta')
      }
    } catch (error) {
      console.log('ERROR PO: '+error);
      this.setStatus("Fallo en la Consulta Servicio");
    }
  
  }

  async setCheck(address:string,addressE:string, idEncuestaContratada:Number, lugar:string,  fecha:string, hora:string,idEncuestador:Number,idPersona:Number,  nombre:string,  url:string,  hs:string){
    if (!this.EncuestaCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    this.setStatus('Initiating transaction... (please wait)');
    
    try {
      const contratoDepliegue = await this.EncuestaCoin.deployed();
      const resultTransaccion = await contratoDepliegue.setCheck.sendTransaction(addressE,idEncuestaContratada,lugar,fecha,hora,idEncuestador,idPersona,nombre,url,hs, {from:address});
      if(resultTransaccion.logs[0].args["0"]){
      this.setStatus('Registro de Evidencia Correctamente');  
      }else{
        this.setStatus('Fallo el Registro de Evidecia ')
      }
    } catch (error) {
      console.log('ERROR POR: '+error);
      this.setStatus("Fallo en la Consulta Servicio");
    }
  
  }



  async sizeCheck(address:string, idEncuestaContratada:Number){
    if (!this.EncuestaCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    this.setStatus('Initiating transaction... (please wait)');
    
    try { 
      const contratoDepliegue = await this.EncuestaCoin.deployed();
      const resultTransaccion = await contratoDepliegue.sizeCheck.call(address,idEncuestaContratada,{from:address});
      console.log(resultTransaccion);
      return resultTransaccion.words[0];
    } catch (error) {
      console.log('ERROR PO: '+error);
      this.setStatus("Fallo en la Consulta Servicio");
    }
  
  }

  async getCheck(address:string, idEncuestaContratada:Number, index:Number){
    if (!this.EncuestaCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    this.setStatus('Initiating transaction... (please wait)');
    try { 
      const contratoDepliegue = await this.EncuestaCoin.deployed();
      const resultTransaccion = await contratoDepliegue.getCheck.call(address,idEncuestaContratada,index,{from:address});
      
        this.tmpE = new Encuesta();
        this.tmpE.idEncuesta = resultTransaccion["0"].words[0];
        this.tmpE.lugar = resultTransaccion["1"];
        this.tmpE.fecha = resultTransaccion["2"];
        this.tmpE.hora = resultTransaccion["3"];
        this.tmpE.encuestador.idEncuestador = resultTransaccion["4"].words[4];
        this.tmpE.persona.idPersona = resultTransaccion["5"].words[5];
        this.tmpE.persona.nombre = resultTransaccion["6"];
        this.tmpE.foto.url= resultTransaccion["7"];
        this.tmpE.foto.hs = resultTransaccion["8"];
      
      return this.tmpE;
    } catch (error) {
      console.log('ERROR PO: '+error);
      this.setStatus("Fallo en la Consulta Servicio");
    }
  
  }






  setStatus(status) {
    this.matSnackBar.open(status, null, {duration: 3000});
  }

}
