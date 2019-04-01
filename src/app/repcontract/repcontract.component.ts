import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'ngx-cookie-service';
declare var moment: any;

@Component({
    selector: 'app-repcontract',
    templateUrl: './repcontract.component.html',
    styleUrls: ['./repcontract.component.css'],
    providers: [Commonservices],
})
export class RepcontractComponent implements OnInit {
    public errorblank;
    public serverurl;
    public signaturemodal: boolean = false;
    public addcookie: CookieService;
    public cookiedetails;
    public signaturename;
    public today;
    public showtoday;
    public showafteryear;
    public mastergrouptype;
    public cgxvalue: any = 0;
    public pgxvalue: any = 0;

    constructor(addcookie: CookieService, private _http: Http, private router: Router, public _commonservices: Commonservices) {
        this.serverurl = _commonservices.url;
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.get('cookiedetails');
        // console.log('repcontract get ');
      if (this.cookiedetails == null || this.cookiedetails <5) {
        this.router.navigate(['/log-in']);
      }
        console.log('this.cookiedetails');
        console.log(this.cookiedetails);
        this.today = moment().format('MMM') + ' ' + moment().format('D') + ', ' + moment().format('YYYY') + ' ' + moment().format('h') + ':' + moment().format('mm') + ' ' + moment().format('A');
        this.showtoday = moment().format('D') + ' day of ' + moment().format('MMM') + ', ' + moment().format('YYYY');
        this.showafteryear = moment().format('D') + ' day of ' + moment().format('MMM') + ', ' + moment().add(1, 'years').format('YYYY');
        if (this.cookiedetails == null) {
            this.router.navigate(['/log-in']);
        }
        else{
            if (this.cookiedetails.type == 'leadmanager') {
                this.cgxvalue = 10;
                this.pgxvalue = 0;
            }
            else {
                this.getuserdetails();
            }
        }
    }

    ngOnInit() {
    }
    signature() {
        this.signaturemodal = true;
    }
    calllogout() {
        this.addcookie.deleteAll();
        this.router.navigate(['/log-in']);
    }
    putsignaure() {
        this.signaturemodal = false;
        if (this.signaturename == null || this.signaturename == '') {
            this.errorblank = 'Please enter Sales\'s rep name';
        }
        else {
            this.errorblank = null;
        }
    }
    onHidden() {
        this.signaturename = null;
        this.signaturemodal = false;
    }
    callsubmit() {
        if (this.signaturename == null || this.signaturename == '') {
            this.errorblank = 'Please enter Sales\'s rep name';
        }
        else {
            let link = this.serverurl + 'repcontract';
            let data = {
                name: this.signaturename,
                addedby: this.cookiedetails,
                compensationgrade: this.cgxvalue,
                pgxvalue: this.pgxvalue,
            };
            this._http.post(link, data)
                .subscribe(res => {
                    let result = res.json();
                    console.log(result);
                    if (result.status == 'success') {
                      //  this.router.navigate(['/trainingstep']);
                        this.router.navigate(['/agreement']);
                    }
                }, error => {
                    console.log('Oooops!');
                });
            this.errorblank = null;
        }
    }
    getuserdetails() {
        let link = this.serverurl + 'getuserdetails';
        let data = {
            userid: this.cookiedetails,
        };
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                console.log(result);
                if (result.status == 'success' && typeof(result.id) != 'undefined') {
                    this.cgxvalue = result.id.cgxamountoflead;
                    this.pgxvalue = result.id.pgxvalueoflead;
                    console.log(result.id.mastergroupid);
                    if (result.id.mastergroupid == '5b67d9e8c21db354218fe5b2' || result.id.mastergroupid == '5b67febbc21db354218fe5ba' || result.id.mastergroupid == '5b680104c21db354218fe5bc' || result.id.mastergroupid == '5b6802bb1d269c0632876861' || result.id.mastergroupid == '0' ||result.id.mastergroupid=='5b83bf415be7d22242900ef3') {
                      if(result.id.mastergroupid==0 ||result.id.mastergroupid=='5b83bf415be7d22242900ef3') this.cgxvalue=0;
                      else this.cgxvalue=300;
                        console.log('1');
                        this.mastergrouptype = 'non_imo';
                    }
                    else if (result.id.mastergroupid == '5b6803601d269c0632876862' || result.id.mastergroupid == '5b68021b1d269c0632876860' || result.id.mastergroupid == '5b67ffdec21db354218fe5bb' || result.id.mastergroupid == '5b655bc720ae416d1d0fb07f') {
                        console.log('2');
                        this.mastergrouptype = 'call_center';
                    }
                    console.log('mastergrouptype ' + this.mastergrouptype);
                }
            }, error => {
                console.log('Oooops!');
            });
    }
}

