import { Component, OnInit } from '@angular/core';
import {Web3Service} from '../util/web3.service';
import { MatSnackBar } from '@angular/material';
import{Estacion} from './estacion';



declare let require:any;

const estaciongascoin_artifacts = require('../../../build/contracts/EstacionGas.json');



@Component({
  selector: 'app-estacion-gas',
  templateUrl: './estacion-gas.component.html',
  styleUrls: ['./estacion-gas.component.css']
})

export class EstacionGasComponent implements OnInit {
  accounts : string[];
  EstacionCoin:any;
  Estacion =new Estacion();

  model = {
    amount: 0,
    receiver: '',
    name: '',
    account: ''
  };


  constructor(private web3Service: Web3Service, private matSnackBar: MatSnackBar) { 
    console.log('Constructor: ' + web3Service);
  }

  ngOnInit(): void {
    console.log('OnInit: ' + this.web3Service);
    console.log(this);
    this.watchAccount();
	
    this.web3Service.artifactsToContract(estaciongascoin_artifacts)
      .then((EstacionCoinAbstraction) => {
        this.EstacionCoin = EstacionCoinAbstraction;
        this.EstacionCoin.deployed().then(deployed => {
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
    

  async setGasInfo( ){
    if (!this.EstacionCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    try {
      const contratoDeploy = await this.EstacionCoin.deployed();
      const resultEvent = await contratoDeploy.setGasInfo.sendTransaction(this.model.account, this.Estacion.nombreEstacion,{from:this.model.account});
      if(resultEvent === 1){
        console.log("todo ok")
      }
    } catch (e) {
      console.log(e);
      this.setStatus('Error getting balance; see log.');
    }
  }


  async getGasInfo(){
    if (!this.EstacionCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    try {
      const contratoDeploy = await this.EstacionCoin.deployed();
      console.log(contratoDeploy);
      const resultEvent = await contratoDeploy.getGasInfo.call(this.model.account);
      console.log(resultEvent["0"])
    } catch (e) {
      console.log(e);
      this.setStatus('Error getting balance; see log.');
    }
  }









  
  setStatus(status){
    this.matSnackBar.open(status, null, {duration: 3000});
  }


}
