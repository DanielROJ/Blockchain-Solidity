import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Trazo } from '../Model/trazo';
import { Web3Service } from '../util/web3.service';
import { TrazabilidadService } from '../Services/trazabilidad.service';

declare let require:any;
const contrato_artefacto = require('../../../build/contracts/BloodChain.json');


@Component({
  selector: 'app-reco-trazo',
  templateUrl: './reco-trazo.component.html',
  styleUrls: ['./reco-trazo.component.css'],
  providers:[TrazabilidadService]
})
export class RecoTrazoComponent implements OnInit {
  public trazo:Trazo;
  public BloodCoin: any;
  public accounts = [];
  model = {
    amount: 0,
    receiver: '',
    name: '',
    account: ''
  };
  constructor(public route:ActivatedRoute,private web3Service: Web3Service, private trazoService:TrazabilidadService) {
    this.trazo=new Trazo();
   }

  
   ngOnInit() {
    console.log('OnInit: ' + this.web3Service);
    console.log(this);
    this.watchAccount();

    this.web3Service.artifactsToContract(contrato_artefacto)
      .then((BloodCoinAbstraction) => {
        this.BloodCoin = BloodCoinAbstraction;
        this.trazoService.BloodCoin = this.BloodCoin;
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
