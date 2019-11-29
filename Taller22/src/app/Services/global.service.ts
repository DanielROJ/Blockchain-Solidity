import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public EncuestaCoin:any;

  constructor(private matSnackBar: MatSnackBar){
  }

  async setEmpresa(address:string, idEmpresa:Number){
    if (!this.EncuestaCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    this.setStatus('Initiating transaction... (please wait)');
    
    try {
      const contratoDepliegue = await this.EncuestaCoin.deployed();
      const resultTransaccion = await contratoDepliegue.setEmpresa.sendTransaction(idEmpresa,{from:address});
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



  async getEmpresa(address:string, idEmpresa:Number,){
    if (!this.EncuestaCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    this.setStatus('Initiating transaction... (please wait)');
    
    try { 
      const contratoDepliegue = await this.EncuestaCoin.deployed();
      const resultTransaccion = await contratoDepliegue.getEmpresa.call(idEmpresa,{from:address});
      console.log(resultTransaccion);
      return resultTransaccion;
    } catch (error) {
      console.log('ERROR PO: '+error);
      this.setStatus("Fallo en la Consulta Servicio");
    }
  
  }



  async setEncuestaContratada(address:string, idEmpresa:Number, idEncuestaContratada:Number){
    if (!this.EncuestaCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    this.setStatus('Initiating transaction... (please wait)');
    
    try {
      const contratoDepliegue = await this.EncuestaCoin.deployed();
      const resultTransaccion = await contratoDepliegue.setEncuestaContratada.sendTransaction(idEmpresa,idEncuestaContratada,{from:address});
      if(resultTransaccion.logs[0].args["0"]){
      this.setStatus('Registro de Encuesta contratada  Correctamente');  
      }else{
        this.setStatus('Fallo el Registro de la Encuesta Contratada')
      }
    } catch (error) {
      console.log('ERROR PO: '+error);
      this.setStatus("Fallo en la Consulta Servicio");
    }
  
  }


  async setPregunta(address:string, idEmpresa:Number, idEncuestaContratada:Number, pregunta:String){
    if (!this.EncuestaCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    this.setStatus('Initiating transaction... (please wait)');
    
    try {
      const contratoDepliegue = await this.EncuestaCoin.deployed();
      const resultTransaccion = await contratoDepliegue.setPregunta.sendTransaction(idEmpresa,idEncuestaContratada,pregunta,{from:address});
      if(resultTransaccion.logs[0].args["0"]){
      this.setStatus('Registro de Encuesta contratada  Correctamente');  
      }else{
        this.setStatus('Fallo el Registro de la Encuesta Contratada')
      }
    } catch (error) {
      console.log('ERROR PO: '+error);
      this.setStatus("Fallo en la Consulta Servicio");
    }
  
  }



  async getRespuesta(address:string, idEmpresa:Number,idEncuestaContratada:Number,indexC:Number , indexR:Number){
    if (!this.EncuestaCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    this.setStatus('Initiating transaction... (please wait)');
    
    try { 
      const contratoDepliegue = await this.EncuestaCoin.deployed();
      const resultTransaccion = await contratoDepliegue.getRespuesta.call(idEmpresa,idEncuestaContratada,indexC,indexR,{from:address});
      console.log(resultTransaccion);
      return resultTransaccion;
    } catch (error) {
      console.log('ERROR PO: '+error);
      this.setStatus("Fallo en la Consulta Servicio");
    }
  
  }

  async sizeRespuesta(address:string, idEmpresa:Number,idEncuestaContratada:Number, indexC:Number){
    if (!this.EncuestaCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    this.setStatus('Initiating transaction... (please wait)');
    
    try { 
      const contratoDepliegue = await this.EncuestaCoin.deployed();
      const resultTransaccion = await contratoDepliegue.sizeRespuesta.call(idEmpresa,idEncuestaContratada,indexC,{from:address});
      console.log(resultTransaccion);
      return resultTransaccion["0"];
    } catch (error) {
      console.log('ERROR PO: '+error);
      this.setStatus("Fallo en la Consulta Servicio");
    }
  
  }

  async setEncuestador(address:string, cedula:Number){
    if (!this.EncuestaCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    this.setStatus('Initiating transaction... (please wait)');
    
    try {
      const contratoDepliegue = await this.EncuestaCoin.deployed();
      const resultTransaccion = await contratoDepliegue.setEncuestador.sendTransaction(cedula,{from:address});
      if(resultTransaccion.logs[0].args["0"]){
      this.setStatus('Registro de Encuesta contratada  Correctamente');  
      }else{
        this.setStatus('Fallo el Registro de la Encuesta Contratada')
      }
    } catch (error) {
      console.log('ERROR PO: '+error);
      this.setStatus("Fallo en la Consulta Servicio");
    }
  
  }

  
  async getContrato(address:string, indexContrato:Number){
    if (!this.EncuestaCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    this.setStatus('Initiating transaction... (please wait)');
    
    try { 
      const contratoDepliegue = await this.EncuestaCoin.deployed();
      const resultTransaccion = await contratoDepliegue.getContrato.call(indexContrato,{from:address});
      console.log(resultTransaccion);
      return resultTransaccion; //["0"] idEmpresa, ["1"] idEncuestaContratada
    } catch (error) {
      console.log('ERROR PO: '+error);
      this.setStatus("Fallo en la Consulta Servicio");
    }
  
  }

  async getEncuestador(address:string, cedula:Number){
    if (!this.EncuestaCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    this.setStatus('Initiating transaction... (please wait)');
    
    try { 
      const contratoDepliegue = await this.EncuestaCoin.deployed();
      const resultTransaccion = await contratoDepliegue.getEncuestador.call(cedula,{from:address});
      console.log(resultTransaccion);
      return resultTransaccion["0"];
    } catch (error) {
      console.log('ERROR PO: '+error);
      this.setStatus("Fallo en la Consulta Servicio");
    }
  
  }
  async sizePreguntas(address:string, idEmpresa:Number,idEncuestaContratada:Number){
    if (!this.EncuestaCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    this.setStatus('Initiating transaction... (please wait)');
    
    try { 
      const contratoDepliegue = await this.EncuestaCoin.deployed();
      const resultTransaccion = await contratoDepliegue.sizePreguntas.call(idEmpresa,idEncuestaContratada,{from:address});
      console.log(resultTransaccion);
      return resultTransaccion["0"];
    } catch (error) {
      console.log('ERROR PO: '+error);
      this.setStatus("Fallo en la Consulta Servicio");
    }
  
  }
  async getPregunta(address:string, idEmpresa:Number,idEncuestaContratada:Number,index:Number ){
    if (!this.EncuestaCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    this.setStatus('Initiating transaction... (please wait)');   
    try { 
      const contratoDepliegue = await this.EncuestaCoin.deployed();
      const resultTransaccion = await contratoDepliegue.getPregunta.call(idEmpresa,idEncuestaContratada,index,{from:address});
      console.log(resultTransaccion);
      return resultTransaccion["0"];
    } catch (error) {
      console.log('ERROR PO: '+error);
      this.setStatus("Fallo en la Consulta Servicio");
    }
  
  }
  async sizeListaContratos(address:string){
    if (!this.EncuestaCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    this.setStatus('Initiating transaction... (please wait)');
    
    try { 
      const contratoDepliegue = await this.EncuestaCoin.deployed();
      const resultTransaccion = await contratoDepliegue.getRespuesta.call({from:address});
      console.log(resultTransaccion);
      return resultTransaccion["0"];
    } catch (error) {
      console.log('ERROR PO: '+error);
      this.setStatus("Fallo en la Consulta Servicio");
    }
  
  }
  async sizeCheck(address:string, idEmpresa:Number,idEncuestaContratada:Number){
    if (!this.EncuestaCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    this.setStatus('Initiating transaction... (please wait)');
    
    try { 
      const contratoDepliegue = await this.EncuestaCoin.deployed();
      const resultTransaccion = await contratoDepliegue.sizeCheck.call(idEmpresa,idEncuestaContratada,{from:address});
      console.log(resultTransaccion);
      return resultTransaccion["0"];
    } catch (error) {
      console.log('ERROR PO: '+error);
      this.setStatus("Fallo en la Consulta Servicio");
    }
  
  }






  setStatus(status) {
    this.matSnackBar.open(status, null, {duration: 3000});
  }

}
