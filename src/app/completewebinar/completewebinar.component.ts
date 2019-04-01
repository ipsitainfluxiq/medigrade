import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {Commonservices} from '../app.commonservices';
import {Http} from '@angular/http';
declare var moment: any;

@Component({
    selector: 'app-completewebinar',
    templateUrl: './completewebinar.component.html',
    styleUrls: ['./completewebinar.component.css'],
  providers: [Commonservices],
})
export class CompletewebinarComponent implements OnInit {
    private addcookie: CookieService;
    private cookiedetails;
  public serverurl;
  public mastergroupid;
  public userid;
  public webinarkey;
  public showmaincontent = 0;
  public show_webinar_or_not = 0;
  public webinarlist = [];
  public webinarkeyerror;

    constructor( addcookie: CookieService, private router: Router, public _commonservices: Commonservices, private _http: Http) {
      this.serverurl = _commonservices.url;
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.get('cookiedetails');
        if (this.cookiedetails == null || this.cookiedetails <5) {
            this.router.navigate(['/log-in']);
        } else {
          this.getuserdetailsbyuseridnew();
        }

    }

    ngOnInit() {
    }
    callogout() {
        this.addcookie.deleteAll();
        this.router.navigate(['/log-in']);
    }
  getuserdetailsbyuseridnew() {
    let link = this.serverurl + 'getuserdetailsbyuseridnew';
    let data = {_id : this.cookiedetails};
    this._http.post(link, data)
      .subscribe(res => {
        let result = res.json();
        console.log(result);
        if (result.status == 'success' && typeof(result.id) != 'undefined') {
          this.mastergroupid = result.id.mastergroupid;
          this.userid = result.id._id;
          console.log('mastergroupid  ' + this.mastergroupid);
          if (result.id.webinarkey != null && result.id.webinarkey != '') {
            this.showmaincontent = 1;
          }
          if (this.mastergroupid == '5b655bc720ae416d1d0fb07f' || this.mastergroupid == '5b67ffdec21db354218fe5bb' || this.mastergroupid == '5b68021b1d269c0632876860' || this.mastergroupid == '5b6803601d269c0632876862') {
            // call centers - show
            this.show_webinar_or_not = 1;
            this.getwebinarlist();
          }
          else {
            this.show_webinar_or_not = 0;
          }
        } else {
        }
      }, error => {
        console.log('Ooops');
      });
  }
  getwebinarlist() {
    this.webinarlist = [];
    let link = this._commonservices.phpurl + 'getwebinarlist.php';
    this._http.get(link)
      .subscribe(res => {
        let results = res.json();
        for (let i in results) {
          if (results[i].registrationUrl == 'https://attendee.gotowebinar.com/rt/6546197958152859148') {
            this.webinarlist.push(results[i]);
          }
        }
      }, error => {
        console.log('Ooops');
      });
  }
  showdateproperly(stdate , enddate) {
    var zone = new Date().toLocaleTimeString('en-us',{timeZoneName:'short'}).split(' ')[2];
    console.log(zone);
    return moment(stdate).format('ddd') + ', ' + moment(stdate).format('MMM') + ' ' + moment(stdate).format('D') + ', ' + moment(stdate).format('YYYY')+" "+ moment(stdate).format('hh') +' :'+ moment(stdate).format('mm')+" "+ moment(stdate).format('A')+' - '+ moment(enddate).format('hh') +' :'+ moment(enddate).format('mm')+" "+ moment(enddate).format('A')+" "+zone;
  }
  savewebinarvalue() {
    this.webinarkeyerror = null;
    if (this.webinarkey != null) {
    let link = this.serverurl + 'savewebinarvalue';
    let data = {
      _id : this.userid,
      webinarkey : this.webinarkey
    };
    this._http.post(link, data)
      .subscribe(res => {
        let result = res.json();
        console.log(result);
        if (result.status == 'success' && typeof(result.id) != 'undefined') {
          this.showmaincontent = 1;
        }
      }, error => {
        console.log('Ooops');
      });
  }
  else {
      this.webinarkeyerror = 'Invalid Webinarkey';
    }
  }
}
