import { Component, OnInit } from '@angular/core';
import {Commonservices} from '../app.commonservices';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [Commonservices],
})
export class ContactComponent implements OnInit {

  constructor(public _commonservices: Commonservices) { }

  ngOnInit() {
  }

}
