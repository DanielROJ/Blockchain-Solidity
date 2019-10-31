import { Component, OnInit } from '@angular/core';
import {Web3Service} from '../util/web3.service';
import { MatSnackBar } from '@angular/material';
import {BDService} from '../Services/bd.service';
import {User} from '../clases/user';
import {Registro} from '../clases/registro';
declare let require:any;
const contrato_artefacto = require('../../../build/contracts/Desastre.json');


 
@Component({
  selector: 'app-registro-user',
  templateUrl: './registro-user.component.html',
  styleUrls: ['./registro-user.component.css'],
  providers :[BDService]
})





export class RegistroUserComponent implements OnInit {
  usuarios: User[]; 
  registro: Registro;
  index:Number;
  DesastreCoin:any;
  tipo =  ["Administracion","Ciudadano"];
  accounts = [];
 

  model = {
    amount: 0,
    receiver: '',
    name: '',
    account: ''
  };


  constructor(private web3Service: Web3Service, private matSnackBar: MatSnackBar, private bdService: BDService) { 
    console.log('Constructor: ' + web3Service);
    this.usuarios =[ new User(), new User()];
    this.registro = new Registro();
  }

  

  ngOnInit() {
    console.log('OnInit: ' + this.web3Service);
    console.log(this);
    this.watchAccount();
	
    this.web3Service.artifactsToContract(contrato_artefacto)
      .then((DesastreCoinAbstraction) => {
        this.DesastreCoin = DesastreCoinAbstraction;
        this.bdService.DesastreCoin = this.DesastreCoin;
        this.DesastreCoin.deployed().then(deployed => {
          console.log(deployed);         
        });

      });
  }

  setStatus(status) {
    this.matSnackBar.open(status, null, {duration: 3000});
  }

  setUser():void{
    this.bdService.setUser(this.model.account,this.usuarios[0].idUser,this.usuarios[0].nombre,this.usuarios[0].idrol).then();
  }

  setRegistro():void{
    this.bdService.setRegistroUbicacion(this.model.account,this.usuarios[1].idUser, this.registro.fecha,this.registro.latitud,this.registro.longitud,this.registro.caudal);
  }

  getUser():void{
    this.bdService.getUser(this.model.account,this.usuarios[1].idUser).then(data=>{
    if(data){
      this.usuarios[1].idUser = data["0"];
      this.usuarios[1].nombre = data["1"];
      this.usuarios[1].idrol = data["2"];
    }
    });
  }

  getRegistro():void{
    this.bdService.getRegistro(this.model.account,this.usuarios[1].idUser,this.registro.fecha).then(data=>{

   
      
      this.registro.latitud =data["0"];
      this.registro.longitud = data["1"];
      this.registro.caudal = data["2"];
    
    })
  }

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.model.account = accounts[0];
    });
  }
  

}
