import { Component, OnInit } from '@angular/core';
import {Commonservices} from '../app.commonservices';

@Component({
    selector: 'app-trainingcenter',
    templateUrl: './trainingcenter.component.html',
    styleUrls: ['./trainingcenter.component.css'],
  providers: [Commonservices],
})
export class TrainingcenterComponent implements OnInit {

    constructor(public _commonservices: Commonservices) { }

    ngOnInit() {
    }






}
