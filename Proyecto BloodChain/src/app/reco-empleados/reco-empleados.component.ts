import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UsuarioService} from "../Services/usuario.service";
import { Empleado } from '../Model/empleado';
import { Web3Service } from '../util/web3.service';

declare let require:any;
const contrato_artefacto = require('../../../build/contracts/BloodChain.json');



@Component({
  selector: 'app-reco-empleados',
  templateUrl: './reco-empleados.component.html',
  styleUrls: ['./reco-empleados.component.css'],
  providers:[UsuarioService]
})
export class RecoEmpleadosComponent implements OnInit {
  
  empleado:Empleado;
  public accounts = [];
  public BloodCoin: any;
  model = {
    amount: 0,
    receiver: '',
    name: '',
    account: ''
  };

  
  constructor(public route:ActivatedRoute, private usService:UsuarioService,private web3Service: Web3Service) {
    this.empleado = new Empleado();
   }

 
   ngOnInit() {
    console.log('OnInit: ' + this.web3Service);
    console.log(this);
    this.watchAccount();

    this.web3Service.artifactsToContract(contrato_artefacto)
      .then((BloodCoinAbstraction) => {
        this.BloodCoin = BloodCoinAbstraction;
        this.usService.BloodCoin = this.BloodCoin;
        this.BloodCoin.deployed().then(deployed => {
          console.log(deployed);
        });

      });
  }

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.model.account = accounts[0];
    });
  }

  setEmpleado():void{

    this.usService.setEmpleado(this.model.account,this.empleado).catch(err=>{
      console.log('Error en el metodo setEmpleaod '+err);
    })
  }


}
