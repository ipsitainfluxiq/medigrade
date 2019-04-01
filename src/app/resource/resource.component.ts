import { Component, OnInit } from '@angular/core';
import {Commonservices} from '../app.commonservices';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css'],
  providers: [Commonservices],
})
export class ResourceComponent implements OnInit {

  constructor(public _commonservices: Commonservices) { }

  ngOnInit() {
  }

}
