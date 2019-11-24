import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-registro-entities',
  templateUrl: './registro-entities.component.html',
  styleUrls: ['./registro-entities.component.css']
})
export class RegistroEntitiesComponent implements OnInit {

  constructor(public route: ActivatedRoute) { }

  ngOnInit() {
  }

}
