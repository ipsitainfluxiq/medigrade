import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {Commonservices} from '../app.commonservices';
import {Http} from '@angular/http';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.css'],
  providers: [Commonservices],
})
export class AgreementComponent implements OnInit {
  public serverurl;
  private addcookie: CookieService;
  private cookiedetails;
  public agreed: any;
  public error: any;
  constructor( addcookie: CookieService, private router: Router, public _commonservices: Commonservices, private _http: Http) {
    this.serverurl = _commonservices.url;
      this.addcookie = addcookie ;
    this.cookiedetails = this.addcookie.get('cookiedetails');
    if (this.cookiedetails == null || this.cookiedetails < 5) {
      this.router.navigate(['/log-in']);
    } else {

    }
  }

  ngOnInit() {
  }
  callogout() {
    this.addcookie.deleteAll();
    this.router.navigate(['/log-in']);
  }
  gototrainingstepage() {
    this.error = null;
    if (this.agreed == true) {
      let link = this.serverurl + 'agreement';
      let data = {
        userid: this.cookiedetails,
      };
      this._http.post(link, data)
        .subscribe(res => {
          let result = res.json();
          console.log(result);
          this.router.navigate(['/trainingstep']);
        }, error => {
          console.log('Oooops!');
        });
    }
    else {
      this.error = 'Please accept the condition';
    }
  }
}
