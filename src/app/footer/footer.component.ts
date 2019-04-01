import { Component, OnInit } from '@angular/core';
import {Commonservices} from '../app.commonservices';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers: [Commonservices],
})
export class FooterComponent implements OnInit {
    public termsmodal: boolean = false;
    public policymodal: boolean = false;
  constructor(public _commonservices: Commonservices) { }

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
