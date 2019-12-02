import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Donante } from '../Model/donante';
import { Web3Service } from '../util/web3.service';
import { UsuarioService } from '../Services/usuario.service';
import {NgForm} from '@angular/forms';
declare let require:any;
const contrato_artefacto = require('../../../build/contracts/BloodChain.json');


@Component({
  selector: 'app-reco-donantes',
  templateUrl: './reco-donantes.component.html',
  styleUrls: ['./reco-donantes.component.css'],
  providers:[UsuarioService]
})
export class RecoDonantesComponent implements OnInit {
  public donante:Donante;
  public donante2:Donante;
  public BloodCoin: any;
  public accounts = [];
  public idDonante:Number;
  public activate:boolean;
  model = {
    amount: 0,
    receiver: '',
    name: '',
    account: ''
  };
  constructor(public route:ActivatedRoute,private web3Service: Web3Service, private usService:UsuarioService) { 
    this.donante=new Donante();
  }

  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
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

  setDonante():void{
    this.usService.setDonante(this.model.account,this.donante).then(()=>{
     this.donante=new Donante();
    }).catch(err=>{
      console.log("Error en Set donante "+ err);
    })
  }

  getDonante():void{
    if(this.idDonante!=0 && this.donante != undefined)
    this.usService.getDonante(this.model.account,this.idDonante).then(data=>{
      this.activate=true; 
      this.donante2 = data;
    })
  }



}
