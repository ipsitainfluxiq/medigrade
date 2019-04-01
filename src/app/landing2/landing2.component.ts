import { Component, OnInit } from '@angular/core';
import {Commonservices} from '../app.commonservices';

@Component({
    selector: 'app-landing2',
    templateUrl: './landing2.component.html',
    styleUrls: ['./landing2.component.css'],
  providers: [Commonservices],
})
export class Landing2Component implements OnInit {
    public termsmodal: boolean = false;
    public privacymodal: boolean = false;

    constructor( public _commonservices: Commonservices) { }

    ngOnInit() {
    }
    callterms() {
        this.termsmodal = true;
    }
    callprivacy() {
        this.privacymodal = true;
    }

    onHidden() {
        this.termsmodal = false;
        this.privacymodal = false;
    }
}
