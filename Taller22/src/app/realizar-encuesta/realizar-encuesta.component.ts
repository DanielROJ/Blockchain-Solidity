import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GlobalService} from '../Services/global.service';
import {Web3Service} from '../util/web3.service';
import { MatSnackBar } from '@angular/material';


declare let require:any;
const contrato_artefacto = require('../../../build/contracts/EEncuesta.json');



@Component({
  selector: 'app-realizar-encuesta',
  templateUrl: './realizar-encuesta.component.html',
  styleUrls: ['./realizar-encuesta.component.css'],
  providers:[GlobalService, MatSnackBar]
})
export class RealizarEncuestaComponent implements OnInit {

  public EncuestaCoin:any;
  public accounts: string[];

  model = {
    amount: 0,
    receiver: '',
    name: '',
    account: ''
  };


  constructor(public route: ActivatedRoute,private web3Service: Web3Service, private matSnackBar: MatSnackBar, private gService:GlobalService) { }


  
  ngOnInit() {
    console.log('OnInit: ' + this.web3Service);
    console.log(this);
    this.watchAccount();
	
    this.web3Service.artifactsToContract(contrato_artefacto)
      .then((EncuestaCoinAbstraction) => {
        this.EncuestaCoin = EncuestaCoinAbstraction;
        this.gService.EncuestaCoin = this.EncuestaCoin;
        this.EncuestaCoin.deployed().then(deployed => {
          console.log(deployed);         
        });

      });
  }

  setStatus(status) {
    this.matSnackBar.open(status, null, {duration: 3000});
  }

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.model.account = accounts[0];
    });
  }


}
