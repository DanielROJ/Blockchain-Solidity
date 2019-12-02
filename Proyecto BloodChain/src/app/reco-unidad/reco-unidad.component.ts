import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Donacion } from '../Model/donacion';
import { DonacionService } from '../Services/donacion.service';
import { Web3Service } from '../util/web3.service';
import { TipoBolsa } from '../Model/tipo-bolsa';

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
  public listBolsa: TipoBolsa[];
  public BloodCoin: any;
  public accounts = [];
  public idLote:Number;
  public idDonacion:Number;
  public activate:boolean;
  model = {
    amount: 0,
    receiver: '',
    name: '',
    account: ''
  };
  constructor(public route:ActivatedRoute,private donacionService: DonacionService,private web3Service: Web3Service) { 
    this.donacion=new Donacion();
    this.listBolsa=[
      new TipoBolsa(0,'Doble'),
      new TipoBolsa(1,'Corriente'),
      new TipoBolsa(2,'Normal')
    ];
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

  setDonacion():void{
    this.donacionService.setDonacion(this.model.account,this.donacion).catch(err=>{
      console.log('Error en set Donacion '+ err);
    })
  }

  getDonacion():void{
    this.donacionService.getDonacionLote(this.model.account,this.idLote,this.idDonacion).then(data=>{
    this.donacion=new Donacion();
     this.donacion = data;
     this.activate = true;
    }).catch(err=>{
      console.log('Error en get Donacion '+err);
    })
  }



}
