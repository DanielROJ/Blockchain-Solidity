import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-reco-unidad',
  templateUrl: './reco-unidad.component.html',
  styleUrls: ['./reco-unidad.component.css']
})
export class RecoUnidadComponent implements OnInit {

  constructor(public route:ActivatedRoute) { }

  ngOnInit() {
  }

}