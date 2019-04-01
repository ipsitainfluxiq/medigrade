import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'ngx-cookie-service';
//import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-helpdesklist',
  templateUrl: './helpdesklist.component.html',
  styleUrls: ['./helpdesklist.component.css'],
  providers: [Commonservices],
})
export class HelpdesklistComponent implements OnInit {
  public serverurl;
  public datalist;
  public p: number = 1;
  private usertype: string;


  constructor(public addcookie: CookieService,private _http: Http, private router: Router, private _commonservices: Commonservices,  private route: ActivatedRoute) {
    this.serverurl = _commonservices.url;

    this.usertype = this.addcookie.get('type');
    if(this.usertype!='superadmin')
      window.history.back();
    this.getUserList();
  }

  ngOnInit() {
  }

  getUserList() {
    let link = this.serverurl + 'helpdesklist';
    this._http.get(link)
        .subscribe(res => {
          let result = res.json();
          if (result.status == 'success') {
            console.log(result);
            this.datalist = result.id;
          }

        }, error => {
          console.log('Oooops!');
        });
  }
}
