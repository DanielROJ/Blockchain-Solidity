import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-reco-trazo',
  templateUrl: './reco-trazo.component.html',
  styleUrls: ['./reco-trazo.component.css']
})
export class RecoTrazoComponent implements OnInit {

  constructor(public route:ActivatedRoute) { }

  ngOnInit() {
  }

}
