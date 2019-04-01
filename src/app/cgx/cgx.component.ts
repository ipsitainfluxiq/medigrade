import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {Commonservices} from '../app.commonservices';

@Component({
    selector: 'app-cgx',
    templateUrl: './cgx.component.html',
    styleUrls: ['./cgx.component.css'],
    providers: [Commonservices],
})
export class CgxComponent implements OnInit {
    id: number;
    private addcookie: CookieService;
    private cookiedetails;
    public hostname;
    public username;
    public commonurl;
    public username1;
    public flag;
    public mastergroupid;
    constructor( addcookie: CookieService, private _http: Http, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices) {
        this.commonurl = _commonservices.commonvalue.commonurl1;
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.get('cookiedetails');
        this.hostname = window.location.host;
        if (this.hostname == 'localhost:4200') {
        }
        else {
            var splitvalue = this.hostname.split('.');
            if (splitvalue[2] == null) {
            }
            else {
                this.username = splitvalue[0];
            }
        }
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id']; // mastergroupid
            this.username1 = params['username1']; // username
            console.log(this.id);
            console.log(this.username1);
        });
    }
    gotosignup() {
        var url =  'https://' + this.commonurl + '/#/sign-up/' + this.id + '/' + this.username1 + '/1';

     //   this.router.navigate(['/sign-up' + this.id + '/' + this.username1 + '/1']);
       // this.router.navigate([url]);
        window.location.href = url;
    }
}
