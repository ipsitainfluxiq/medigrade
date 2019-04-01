import { Component, OnInit } from '@angular/core';
import {Commonservices} from '../app.commonservices';

@Component({
    selector: 'app-pateintquestionire',
    templateUrl: './pateintquestionire.component.html',
    styleUrls: ['./pateintquestionire.component.css'],
  providers: [Commonservices],
})
export class PateintquestionireComponent implements OnInit {

    constructor(public _commonservices: Commonservices) { }

    ngOnInit() {
    }

}
