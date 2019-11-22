import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-reco-empleados',
  templateUrl: './reco-empleados.component.html',
  styleUrls: ['./reco-empleados.component.css']
})
export class RecoEmpleadosComponent implements OnInit {

  constructor(public route:ActivatedRoute) { }

  ngOnInit() {
  }

}
