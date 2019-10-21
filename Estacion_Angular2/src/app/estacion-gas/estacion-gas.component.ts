import { Component, OnInit } from '@angular/core';
import {Web3Service} from '../util/web3.service';
import { MatSnackBar } from '@angular/material';
import {EstacionService} from '../Services/estacion-servicio.service';
import {Transaccion} from '../clases/transaccion';
import {TipoCombustible} from '../clases/tipo-combustible';

 declare let require:any;

const estaciongascoin_artifacts = require('../../../build/contracts/EstacionGas.json');



@Component({
  selector: 'app-estacion-gas',
  templateUrl: './estacion-gas.component.html',
  styleUrls: ['./estacion-gas.component.css'],
  providers:[EstacionService],
  
})

export class EstacionGasComponent implements OnInit {
  accounts : string[];
  private EstacionCoin:any;
  transaccion: Transaccion;
  public nombreEstacion:string;
  public balanceGanado: 0;
  public tiposCombustibles : TipoCombustible[];
  public idVehiculo:Number;
  model = {
    amount: 0,
    receiver: '',
    name: '',
    account: ''
  };

  constructor(private web3Service: Web3Service, private matSnackBar: MatSnackBar, private estacionService : EstacionService) { 
    this.tiposCombustibles = [new TipoCombustible(0,"Diesel",0), new TipoCombustible(1,"Gas",0), new TipoCombustible(2,"Corriente",0)];
  }

  ngOnInit(): void {
    console.log('OnInit: ' + this.web3Service);
    console.log(this);
    this.watchAccount();
	
    this.web3Service.artifactsToContract(estaciongascoin_artifacts)
      .then((EstacionCoinAbstraction) => {
        this.EstacionCoin = EstacionCoinAbstraction;
        this.estacionService.EstacionCoin = this.EstacionCoin;
        this.estacionService.tool = this.web3Service;
        this.EstacionCoin.deployed().then(deployed => {
          console.log(deployed);         
        });

      });
  }

  setGasInfo(): void{
    this.estacionService.setGasInfo(this.model.account, this.nombreEstacion).then();
    this.tiposCombustibles.forEach(element=>{
      this.estacionService.setPriceFuel(this.model.account,element.idCombustible,Number(element.precioCombustible));
    })    
  }

  getGasInfo():void{
   this.estacionService.getGasInfo(this.model.account).then(data=>{
     this.nombreEstacion = data.nombreEstacion;
     this.tiposCombustibles[0].precioCombustible = this.web3Service.fromWei(String(data.diesel));
     this.tiposCombustibles[1].precioCombustible =   this.web3Service.fromWei(String(data.gas));
     this.tiposCombustibles[2].precioCombustible = this.web3Service.fromWei(String(data.corriente)); 
    });
  }

  
  getSaldoEstacion():void{
this.estacionService.getSaldoEstacion(this.model.account).then(data=>{
this.balanceGanado = this.web3Service.fromWei(String(data)); 
})
  }

  enviarFuel():void{
 this.estacionService.EnviarFuel(this.model.account,this.idVehiculo).then(data1=>{
  this.tiposCombustibles.forEach(data=>{
    if(data.idCombustible === data1["0"]){
      data1["0"] = data.nombreCombustible;
    }
  }) 
  
  this.transaccion = new Transaccion(data1);
  console.log(data1);
   this.getSaldoEstacion();
 })
  }


     watchAccount() {
      this.web3Service.accountsObservable.subscribe((accounts) => {
        this.accounts = accounts;
        this.model.account = accounts[0];
        this.getGasInfo();
        this.getSaldoEstacion();
      });
    }
    

  
    setStatus(status){
      this.matSnackBar.open(status,null, {duration: 3000});
    }
  


}
