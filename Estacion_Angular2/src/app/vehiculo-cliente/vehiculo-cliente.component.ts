import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import {Web3Service} from '../util/web3.service';
import {Transaccion} from '../clases/transaccion';
import {TipoCombustible} from '../clases/tipo-combustible';
import {VehiculoService} from '../Services/vehiculo.service';
import {Vehiculo} from '../clases/vehiculo';

declare let require:any;
const estaciongascoin_artifacts = require('../../../build/contracts/EstacionGas.json');

@Component({
  selector: 'app-vehiculo-cliente',
  templateUrl: './vehiculo-cliente.component.html',
  styleUrls: ['./vehiculo-cliente.component.css'],
  providers:[VehiculoService]
})

export class VehiculoClienteComponent implements OnInit {
  accounts : string[];
  public tiposCombustibles : TipoCombustible[];
  private EstacionCoin:any;
  transaccion: Transaccion;
  public vehiculo = new  Vehiculo();
  public idCobustibleSelector: Number;
  public cantidadFuel:Number;
  public addEstacion:string;
  public cantidadETH:Number;
  model = {
    amount: 0,
    receiver: '',
    name: '',
    account: ''
  };
  constructor(private web3Service: Web3Service, private matSnackBar: MatSnackBar, private vehiculoService: VehiculoService) { 
    this.tiposCombustibles = [new TipoCombustible(0,"Diesel",0), new TipoCombustible(1,"Gas",0), new TipoCombustible(2,"Corriente",0)];
  
  }
  ngOnInit() {
    console.log('OnInit: ' + this.web3Service);
    console.log(this);
    this.watchAccount();
	
    this.web3Service.artifactsToContract(estaciongascoin_artifacts)
      .then((EstacionCoinAbstraction) => {
        this.EstacionCoin = EstacionCoinAbstraction;
        this.vehiculoService.EstacionCoin = this.EstacionCoin;
        this.vehiculoService.tool = this.web3Service;
        this.EstacionCoin.deployed().then(deployed => {
          console.log(deployed);         
        });

      });
  }


  sendDeposit():void{
    console.log(this.idCobustibleSelector)
    this.vehiculoService.EnviarDeposito(this.addEstacion, this.vehiculo.idVehiculo, this.idCobustibleSelector,this.cantidadFuel,this.model.account,this.cantidadETH).then(data=>{
     if(data){
       this.setStatus('Se ha Realizado El depostio correctamente');
     }
    });
  }

  
  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.model.account = accounts[0];
    });
  }
  


  setStatus(status){
    this.matSnackBar.open(status,null, {duration: 3000});
  }


}
