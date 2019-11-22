import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-reco-donantes',
  templateUrl: './reco-donantes.component.html',
  styleUrls: ['./reco-donantes.component.css']
})
export class RecoDonantesComponent implements OnInit {

  constructor(public route:ActivatedRoute) { }

  ngOnInit() {
  }

}
