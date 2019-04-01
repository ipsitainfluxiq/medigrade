import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'ngx-cookie-service';

@Component({
    selector: 'app-compensationmodifier',
    templateUrl: './compensationmodifier.component.html',
    styleUrls: ['./compensationmodifier.component.css'],
    providers: [Commonservices],
})
export class CompensationmodifierComponent implements OnInit {
    public compensationmodal: boolean = false;
    public copiedmodal: boolean = false;
    public addcookie: CookieService;
    public cookiedetails;
    public serverurl;
    public serverhost;
    public compensationamount;
    public pgxvalue;
    public compensationerror;
    public pgxerror;
    public compensationList;
    public p: number = 1;

    constructor(addcookie: CookieService, private _http: Http, private router: Router, private _commonservices: Commonservices) {
        this.serverurl = _commonservices.url;
        this.serverhost = _commonservices.hostis;
        this.addcookie = addcookie;
        this.cookiedetails = this.addcookie.get('cookiedetails');
        console.log('this.cookiedetails');
        console.log(this.cookiedetails);
        if (this.cookiedetails == null) {
            this.router.navigate(['/log-in']);
        } else {
            this. getcompensationlist();
        }

    }

    ngOnInit() {
    }
    callfunc(token) {
        //  return 'https://' + this.serverhost + '/#/sign-up/' + token;
        return 'https://' + this.serverhost + '/#/sign-up/' + token;
    }
    callfunc1(token) {
        //  return 'https://' + this.serverhost + '/#/sign-up/' + token;
        return 'https://' + this.serverhost + '/#/cgx/' + token;
    }
    callfunc2(token) {
        //  return 'https://' + this.serverhost + '/#/sign-up/' + token;
        return 'https://' + this.serverhost + '/#/landing/' + token;
    }
    showcopied() {
        this.copiedmodal = true;
        setTimeout(() => {
            this.copiedmodal = false;
        }, 2000);
    }
    getcompensationlist() {
        let link = this.serverurl + 'compensationlistbyuserid';
        let data = {
            userid: this.cookiedetails
        }
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                    console.log(result);
                    this.compensationList = result.id;
                }
            }, error => {
                console.log('Oooops!');
            });
    }
    openaddcompensationmodal() {
        this.compensationmodal = true;
    }

    onHidden() {
        this.compensationerror = null;
        this.compensationmodal = false;
        //  this.copiedmodal = false;
        this.compensationamount = null;
        this.pgxvalue = null;
    }

    /* addcompensation() {
        if (this.compensationamount > 0 && this.compensationamount < 201 && this.compensationamount != '' && this.compensationamount != null) {
            this.compensationerror = null;
            if (this.pgxvalue > 0 && this.pgxvalue < 101 && this.pgxvalue != '' && this.pgxvalue != null) {
              this.pgxerror = null;
       /!*       let link = this.serverurl + 'getcompensationdetailsbyusernameandamount';
              let data = {
                userid: this.cookiedetails.id,
                amount: this.compensationamount,
                pgxvalue: this.pgxvalue,
              };
              this._http.post(link, data)
                .subscribe(res => {
                  let result = res.json();
                  if (result.status == 'alreadyhavecgx') {
                    this.compensationerror = 'You already added same compensation amount earlier.';
                  }
                  if (result.status == 'alreadyhavepgx') {
                    this.pgxerror = 'You already added same Pgx amount earlier.';
                  }
                  if (result.status != 'alreadyhavecgx' && result.status != 'alreadyhavepgx' ) {*!/
                    let link = this.serverurl + 'addcompensation';
                    let data = {
                      userid: this.cookiedetails.id,
                      amount: this.compensationamount,
                      pgxvalue: this.pgxvalue,
                    };
                    //  console.log('addcompensation-------');
                    // console.log(data);
                    this._http.post(link, data)
                      .subscribe(res => {
                        let result = res.json();
                        console.log(result);
                        if (result.status == 'success') {
                          this.compensationerror = null;
                          this.pgxerror = null;
                          this.compensationamount = null;
                          this.pgxvalue = null;
                          this.compensationmodal = false;
                          this.getcompensationlist();
                        }
                        else if (result.status == 'error') {
                          this.compensationerror = 'Some server issues! Please try again later.';
                        }
                      }, error => {
                        console.log('Oooops!');
                      });
                /!*  }
                });*!/
            }
            else {
              this.pgxerror = 'PGX amount must be between $1 - $100';
            }
        }
         else {
             this.compensationerror = 'CGX amount must be between $1 - $200';
         }
    }*/


    addcompensation() {
        if (this.compensationamount > 0 && this.compensationamount < 201 && this.compensationamount != '' && this.compensationamount != null) {
            this.compensationerror = null;
        }
        else {
            this.compensationerror = 'CGX amount must be between $1 - $200';
        }
        if (this.pgxvalue > 0 && this.pgxvalue < 101 && this.pgxvalue != '' && this.pgxvalue != null) {
            this.pgxerror = null;
        }
        else {
            this.pgxerror = 'PGX amount must be between $1 - $100';
        }
        if (this.pgxerror == null && this.compensationerror == null) {
            let link = this.serverurl + 'addcompensation';
            let data = {
                userid: this.cookiedetails,
                amount: this.compensationamount,
                pgxvalue: this.pgxvalue,
            };
            this._http.post(link, data)
                .subscribe(res => {
                    let result = res.json();
                    console.log(result);
                    if (result.status == 'success') {
                        this.compensationerror = null;
                        this.pgxerror = null;
                        this.compensationamount = null;
                        this.pgxvalue = null;
                        this.compensationmodal = false;
                        this.getcompensationlist();
                    }
                    else if (result.status == 'error') {
                        this.compensationerror = 'Some server issues! Please try again later.';
                    }
                }, error => {
                    console.log('Oooops!');
                });
        }
    }
}
