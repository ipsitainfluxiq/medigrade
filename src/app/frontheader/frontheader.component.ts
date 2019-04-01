import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-frontheader',
    templateUrl: './frontheader.component.html',
    styleUrls: ['./frontheader.component.css'],
    providers: [Commonservices],
})
export class FrontheaderComponent implements OnInit {
    public comingsoonmodal;
    public addcookie: CookieService;
    public cookiedetails;
    public getdetailsbyidis;
    public serverurl;
    public usertype: string;

    constructor( fb: FormBuilder, private _http: Http, private router: Router, private route: ActivatedRoute, public _commonservices: Commonservices, addcookie: CookieService) {
        this.serverurl = _commonservices.url;
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.get('cookiedetails');
        this.usertype = this.addcookie.get('type');
        console.log('from frontheader');
        console.log(this.cookiedetails);
        if (this.cookiedetails == null || this.cookiedetails.length<5) {
            this.router.navigate(['/log-in']);
        }
        if (this.cookiedetails != null) {
            this.getdetailsbyid();
        }
    }

    ngOnInit() {
    }
    onHidden() {
        this.comingsoonmodal = false;

    }
    openmodal() {
        this.comingsoonmodal = true;
    }
    calllogout() {
        this.addcookie.deleteAll();
        this.router.navigate(['/log-in']);
    }
    getdetailsbyid() {
        let link = this.serverurl + 'getuserdetails';
        let data = {userid : this.cookiedetails};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success' && typeof(result.id) != 'undefined') {
                    console.log('result.id------------------------------');
                    console.log(result.id);
                    this.getdetailsbyidis = result.id;
                }
            }, error => {
                console.log('Oooops!');
            });
    }
    gotoagreementpdf(id) {
        var url = 'https://' + this._commonservices.commonvalue.commonurl1 + '/testpdf/html2pdf/employment-agreement.php?id=' + id;
        window.open(url, '_blank');
    }
}
