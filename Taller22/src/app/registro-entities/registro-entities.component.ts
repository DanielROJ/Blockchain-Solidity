import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GlobalService} from '../Services/global.service';
import {Web3Service} from '../util/web3.service';
import {Empresa} from '../Model/empresa';
import { _MatTabHeaderMixinBase } from '@angular/material/tabs/typings/tab-header';
import{Encuesta} from '../Model/encuesta';
declare let require:any;
const contrato_artefacto = require('../../../build/contracts/EEncuesta.json');



@Component({
  selector: 'app-registro-entities',
  templateUrl: './registro-entities.component.html',
  styleUrls: ['./registro-entities.component.css'],
  providers:[GlobalService]
})
export class RegistroEntitiesComponent implements OnInit {

  public EncuestaCoin: any;
  public accounts: string[];
  public empresa: Empresa;
  public idEncuestaContratada: Number;
  public nChecks:number;
  public indexC:number;
  public listChecks : Encuesta[];
  private tmpE : Encuesta;
  model = {
    amount: 0,
    receiver: '',
    name: '',
    account: ''
  };


  constructor(public route: ActivatedRoute,private web3Service: Web3Service, private gService:GlobalService) {
   this.empresa = new Empresa();
  }

  
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

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.model.account = accounts[0];
    });
  }

  setEmpresa():void{
    this.gService.setEmpresa(this.model.account).catch(err=>{
      console.log('ERROR EN SetEMpresa' + err);
    });
  }

  setEncuestaContratada():void{
     this.gService.setEncuestaContratada(this.model.account,this.idEncuestaContratada).then(s=>{
       this.idEncuestaContratada = new Number();
     }).catch(err=>{
       console.log("Error en el set encuesta "+ err);
     })
  }


  sizeCheck():void{
    this.gService.sizeCheck(this.model.account,this.idEncuestaContratada).then(data=>{
      this.nChecks = +data;
    }).catch(err=>{
      console.log('Error en el sizeCheck '+err);
    })
  }
  
  getCheck():any{
    this.gService.getCheck(this.model.account,this.idEncuestaContratada,this.indexC).then(data=>{
        this.tmpE = new Encuesta();
        this.tmpE.idEncuesta = data["0"];
        this.tmpE.lugar = data["1"];
        this.tmpE.fecha = data["2"];
        this.tmpE.hora = data["3"];
        this.tmpE.encuestador.idEncuestador = data["4"];
        this.tmpE.persona.idPersona = data["5"];
        this.tmpE.persona.nombre = data["6"];
        this.tmpE.foto.url= data["7"];
        this.tmpE.foto.hs = data["8"];
    });
  }

  getAllchecks():void{
    this.listChecks = [];
    this.gService.sizeCheck(this.model.account,this.idEncuestaContratada).then(num=>{
      for (this.indexC = num; this.indexC >=0; this.indexC--) {
        this.getCheck()
        this.listChecks.push(this.tmpE);
      }
    })
  }


  

}
