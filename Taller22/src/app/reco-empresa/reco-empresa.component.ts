import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-reco-empresa',
  templateUrl: './reco-empresa.component.html',
  styleUrls: ['./reco-empresa.component.css']
})
export class RecoEmpresaComponent implements OnInit {

  constructor(public route: ActivatedRoute) { }

  ngOnInit() {
  }

}
