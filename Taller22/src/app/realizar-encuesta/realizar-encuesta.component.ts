import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-realizar-encuesta',
  templateUrl: './realizar-encuesta.component.html',
  styleUrls: ['./realizar-encuesta.component.css']
})
export class RealizarEncuestaComponent implements OnInit {

  constructor(public route: ActivatedRoute) { }

  ngOnInit() {
  }

}
