
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Donante } from '../Model/donante';
import { Empleado } from "../Model/empleado";
@Injectable()


export class UsuarioService {

  public BloodCoin: any;



  constructor(private matSnackBar: MatSnackBar) {
  }





  async setDonante(addressBanco: string, dn: Donante) {
    if (!this.BloodCoin) {
      this.setStatus('BLOODCHAIN is not loaded, unable to send transaction');
      return;
    }
    this.setStatus('Initiating transaction... (please wait)');

    try {
      const contratoDepliegue = await this.BloodCoin.deployed();
      const resultTransaccion = await contratoDepliegue.setDonante.sendTransaction(addressBanco, dn.cedula, dn.edad, dn.numeroTelefono, dn.nombre, dn.apellido, dn.Eps, dn.correoElectronico, dn.genero, { from: addressBanco });
      if (resultTransaccion.logs[0].args["0"] == dn.cedula) {
        this.setStatus('Se registro correctamente');
      } else {
        this.setStatus('Fallo el Registro del Usuario')
      }
    } catch (error) {
      console.log('ERROR PO: ' + error);
      this.setStatus("Fallo en la Consulta Servicio");
    }

  }



  async getDonante(addressBanco: string, cedula: Number) {
    if (!this.BloodCoin) {
      this.setStatus('BLOODCHAIN is not loaded, unable to send transaction');
      return;
    }
    this.setStatus('Initiating transaction... (please wait)');

    try {
      const contratoDepliegue = await this.BloodCoin.deployed();
      const resultTransaccion = await contratoDepliegue.getDonante.call(cedula, { from: addressBanco });
      console.log(resultTransaccion)
      if (resultTransaccion.cedula === 0) {
        this.setStatus('Se Obtubieron los datos con exito')
        return resultTransaccion;
      } else {
        this.setStatus('No se Encuentran los datos');
        return undefined;
      }
    } catch (error) {
      console.log('ERROR PO: ' + error);
      this.setStatus("Fallo en la Consulta Servicio");
      return undefined;
    }

  }



  async setSaludDonante(addressBanco: string, dn: Donante) {
    if (!this.BloodCoin) {
      this.setStatus('BLOODCHAIN is not loaded, unable to send transaction');
      return;
    }
    this.setStatus('Initiating transaction... (please wait)');

    try {
      const contratoDepliegue = await this.BloodCoin.deployed();
      const resultTransaccion = await contratoDepliegue.setSaludDonante.sendTransaction(dn.cedula, dn.peso, dn.altura, dn.TensionArterial, { from: addressBanco });
      if (resultTransaccion.logs[0].args["0"]) {
        this.setStatus('Se Cargaron los datos de forma correctaS')
      } else {
        this.setStatus('Nose pudieron Cargar Los datos')
      }
    } catch (error) {
      console.log('ERROR PO: ' + error);
      this.setStatus("Fallo en la Consulta Servicio");
    }

  }



  async setEmpleado(addressBanco: string, em: Empleado) {
    if (!this.BloodCoin) {
      this.setStatus('BLOODCHAIN is not loaded, unable to send transaction');
      return;
    }
    this.setStatus('Initiating transaction... (please wait)');

    try {
      const contratoDepliegue = await this.BloodCoin.deployed();
      const resultTransaccion = await contratoDepliegue.setEmpleado.sendTransaction(addressBanco, em.idEmpleado, em.password, em.nombre, em.rol, { from: addressBanco });
      if (resultTransaccion.logs[0].args["0"] == em.idEmpleado) {
        this.setStatus('Se Cargaron los datos de forma correcta')
      } else {
        this.setStatus('Nose pudieron Cargar Los datos')
      }
    } catch (error) {
      console.log('ERROR PO: ' + error);
      this.setStatus("Fallo en la Consulta Servicio");
    }
  }



  async getEmpleado(addressBanco:string, cedula:Number){
    if (!this.BloodCoin) {
      this.setStatus('BLOODCHAIN is not loaded, unable to send transaction');
      return;
    }
    this.setStatus('Initiating transaction... (please wait)');
    
    try {
      const contratoDepliegue = await this.BloodCoin.deployed();
      const resultTransaccion = await contratoDepliegue.getEmpleado.call(cedula, {from:addressBanco});
      console.log(resultTransaccion);
       return resultTransaccion;
    } catch (error) {
      console.log('ERROR PO: '+error);
      this.setStatus("Fallo en la Consulta Servicio");
      return undefined;
    }
  
  }













  setStatus(status) {
    this.matSnackBar.open(status, null, { duration: 3000 });
  }



}