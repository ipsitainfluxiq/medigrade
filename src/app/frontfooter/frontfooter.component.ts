import { Component, OnInit } from '@angular/core';
import {Commonservices} from '../app.commonservices' ;
@Component({
    selector: 'app-frontfooter',
    templateUrl: './frontfooter.component.html',
    styleUrls: ['./frontfooter.component.css'],
  providers: [Commonservices],
})
export class FrontfooterComponent implements OnInit {
    public termsmodal: boolean = false;
    public policymodal: boolean = false;
    constructor( public _commonservices: Commonservices) { }

    ngOnInit() {
    }
    callterms() {
        this.termsmodal = true;
    }
    callpolicy() {
        this.policymodal = true;
    }
    onHidden() {
        this.termsmodal = false;
        this.policymodal = false;
    }
}
