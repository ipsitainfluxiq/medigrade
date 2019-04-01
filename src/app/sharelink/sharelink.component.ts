import { Component, OnInit } from '@angular/core';
import {Commonservices} from '../app.commonservices';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import {CookieService} from 'ngx-cookie-service';

@Component({
    selector: 'app-sharelink',
    templateUrl: './sharelink.component.html',
    styleUrls: ['./sharelink.component.css'],
    providers: [Commonservices],
})
export class SharelinkComponent implements OnInit {
    public serverhost;
    public copiedmodal: boolean = false;
    public addcookie: CookieService;
    public cookiedetails;
    public serverurl;
    public userdetails;
    public username;
    public parentid;

    constructor(private _http: Http, private router: Router, public  _commonservices: Commonservices, addcookie: CookieService) {
        this.serverhost = _commonservices.hostis;
        this.serverurl = _commonservices.url;
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.get('cookiedetails');
        this.username = this.addcookie.get('username');
        let link = this.serverurl + 'getuserdetailsbyuserid';
        let data = {
            username: this.username
        };
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                console.log(result);
                if (result.status == 'success') {
                    this.userdetails = result.id;
                  if(typeof (this.userdetails.mastergroupid)=='undefined') this.userdetails.mastergroupid=0;
                    console.log('=======================================');
                    console.log(this.userdetails);
                }
            }, error => {
                console.log('Oooops!');
            });
       /* setTimeout(() => {
            if(this.userdetails!=null){
                let link1 = this.serverurl + 'getuserdetailsbyuserid';
                let data1 = {
                    username: this.userdetails.addedby
                };
                this._http.post(link1, data1)
                    .subscribe(res => {
                        let result1 = res.json();
                        console.log(result1);
                        if (result1.status == 'success') {
                            this.parentid = result1.id._id;
                            console.log('=======================================');
                            console.log(this.parentid);
                        }
                    }, error => {
                        console.log('Oooops!');
                    });
            }
        }, 1000);*/
    }

    ngOnInit() {
    }
    callfunc() {


        //  return 'https://' + this.serverhost + '/#/sign-up/' + token;
        return 'https://' + this.serverhost + '/#/sign-up/'+this.userdetails.mastergroupid+'/'+this.userdetails._id+'/1';

    }
    callfunc1() {

        //  return 'https://' + this.serverhost + '/#/sign-up/' + token;
        return 'https://' + this.serverhost + '/#/cgx/'+this.userdetails.mastergroupid+'/'+this.userdetails._id+'/1';

    }
    callfunc2() {
        //  return 'https://' + this.serverhost + '/#/sign-up/' + token;
        return 'https://' + this.serverhost + '/#/landing/'+this.userdetails.mastergroupid+'/'+this.userdetails._id+'/1';

    }
    showcopied() {
        this.copiedmodal = true;
        setTimeout(() => {
            this.copiedmodal = false;
        }, 2000);
    }
    onHidden() {
        this.copiedmodal = false;
    }
}
