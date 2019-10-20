import { Component, OnInit } from '@angular/core';
import {Web3Service} from '../util/web3.service';
import { MatSnackBar } from '@angular/material';
import {EstacionService} from '../Services/estacion-servicio.service';
import {VehiculoService} from '../Services/vehiculo.service';
import {Transaccion} from '../clases/transaccion';
import {TipoCombustible} from '../clases/tipo-combustible';

 declare let require:any;

const estaciongascoin_artifacts = require('../../../build/contracts/EstacionGas.json');



@Component({
  selector: 'app-estacion-gas',
  templateUrl: './estacion-gas.component.html',
  styleUrls: ['./estacion-gas.component.css'],
  providers:[EstacionService,VehiculoService]
})

export class EstacionGasComponent implements OnInit {
  accounts : string[];
  private EstacionCoin:any;
  public idVehiculo:Number;
  transaccion: Transaccion;
  public nombreEstacion:string;
  public balance: number;
  public tiposCombustibles : TipoCombustible[];
  model = {
    amount: 0,
    receiver: '',
    name: '',
    account: ''
  };

  constructor(private web3Service: Web3Service, private matSnackBar: MatSnackBar, private estacionService : EstacionService, private vehiculoService:VehiculoService) { 
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
        this.estacionService.EstacionCoin = this.EstacionCoin;
        this.EstacionCoin.deployed().then(deployed => {
          console.log(deployed);         
        });

      });
  }

  setGasInfo(): void{
    this.estacionService.setGasInfo(this.model.account, this.nombreEstacion).then();
    this.tiposCombustibles.forEach(element=>{
      this.estacionService.setPriceFuel(this.model.account,element.idCombustible,element.precioCombustible);
    })    
  }

  getGasInfo():void{
   this.estacionService.getGasInfo(this.model.account).then(data=>{
     this.nombreEstacion = data.nombreEstacion;
     this.tiposCombustibles[0].precioCombustible = data.diesel;
     this.tiposCombustibles[1].precioCombustible = data.gas;
     this.tiposCombustibles[2].precioCombustible = data.gas; 
    });
  }

  
  


     watchAccount() {
      this.web3Service.accountsObservable.subscribe((accounts) => {
        this.accounts = accounts;
        this.model.account = accounts[0];
      });
    }
    

  
    setStatus(status){
      this.matSnackBar.open(status, null, {duration: 3000});
    }
  


}
