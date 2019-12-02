import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Donante } from '../Model/donante';
import { Web3Service } from '../util/web3.service';
import { UsuarioService } from '../Services/usuario.service';

declare let require:any;
const contrato_artefacto = require('../../../build/contracts/BloodChain.json');


@Component({
  selector: 'app-reco-donantes',
  templateUrl: './reco-donantes.component.html',
  styleUrls: ['./reco-donantes.component.css']
})
export class RecoDonantesComponent implements OnInit {
  public donante:Donante;
  public BloodCoin: any;
  public accounts = [];
  model = {
    amount: 0,
    receiver: '',
    name: '',
    account: ''
  };
  constructor(public route:ActivatedRoute,private web3Service: Web3Service, private usService:UsuarioService) { 
    this.donante=new Donante();
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
}
