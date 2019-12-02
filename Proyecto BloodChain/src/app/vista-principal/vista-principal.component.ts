import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Empleado } from '../Model/empleado';
import { UsuarioService } from '../Services/usuario.service';
import { Web3Service } from '../util/web3.service';


declare let require: any;
const contrato_artefacto = require('../../../build/contracts/BloodChain.json');

@Component({
  selector: 'app-vista-principal',
  templateUrl: './vista-principal.component.html',
  styleUrls: ['./vista-principal.component.css'],
  providers: [UsuarioService]
})

export class VistaPrincipalComponent implements OnInit {
  public empleadoTmp: Empleado;
  public BloodCoin: any;
  public accounts = [];
  model = {
    amount: 0,
    receiver: '',
    name: '',
    account: ''
  };
  constructor(public route: ActivatedRoute, private usService: UsuarioService, private web3Service: Web3Service) {
    this.empleadoTmp = new Empleado();
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
