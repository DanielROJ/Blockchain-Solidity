import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Donacion } from '../Model/donacion';
import { DonacionService } from '../Services/donacion.service';
import { Web3Service } from '../util/web3.service';

declare let require:any;
const contrato_artefacto = require('../../../build/contracts/BloodChain.json');



@Component({
  selector: 'app-reco-unidad',
  templateUrl: './reco-unidad.component.html',
  styleUrls: ['./reco-unidad.component.css'],
  providers:[DonacionService]
})
export class RecoUnidadComponent implements OnInit {
  public donacion:Donacion;
  public BloodCoin: any;
  public accounts = [];
  model = {
    amount: 0,
    receiver: '',
    name: '',
    account: ''
  };
  constructor(public route:ActivatedRoute,private donacionService: DonacionService,private web3Service: Web3Service) { 
    this.donacion=new Donacion();
  }

 
  ngOnInit() {
    console.log('OnInit: ' + this.web3Service);
    console.log(this);
    this.watchAccount();

    this.web3Service.artifactsToContract(contrato_artefacto)
      .then((BloodCoinAbstraction) => {
        this.BloodCoin = BloodCoinAbstraction;
        this.donacionService.BloodCoin = this.BloodCoin;
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
