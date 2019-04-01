import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-autologin',
  templateUrl: './autologin.component.html',
  styleUrls: ['./autologin.component.css'],
    providers: [Commonservices],
})
export class AutologinComponent implements OnInit {
    public addcookie: CookieService;
    public cookiedetails;
    public serverurl;
    public logintoken;
    public cgxvalue: any = 0;
    public pgxvalue: any = 0;
    public mastergrouptype;
    public resultautologin;

    constructor(addcookie: CookieService, private _http: HttpClient, private router: Router, private _commonservices: Commonservices, private route: ActivatedRoute) {
        this.serverurl = _commonservices.url;
        this.addcookie = addcookie ;
      //  this.cookiedetails = this.addcookie.get('cookiedetails');
    }

  ngOnInit() {
      this.route.params.subscribe(params => {
          this.logintoken = params['id'];
          console.log('this.logintoken');
          console.log(this.logintoken);
      });
    setTimeout(() => {
      this.getdetailsusinglogintoken();
    }, 1000);
  }
    getdetailsusinglogintoken() {
        let link = this.serverurl + 'detailsusinglogintoken';
        let data = {logintoken: this.logintoken};
        console.log(data);
        this._http.post(link, data)
            .subscribe(res => {
              let result: any;
              result =res;
                console.log(result);
                this.resultautologin = result;
              // console.log('result.msg.type++++++++++++++');
               // console.log(result.msg.type);
                if (result.status == 'success') {
                   /* let addresultforcookie = {
                        id : result.msg._id,
                        firstname : result.msg.firstname,
                        lastname : result.msg.lastname,
                        email : result.msg.email,
                        username : result.msg.username,
                        type : result.msg.type,
                    };*/
                    console.log('add result to cookie ++++++');
                   // console.log(addresultforcookie);
                  this.addcookie.set('cookiedetails', result.msg._id);
                  this.addcookie.set('fname', result.msg.firstname);
                  this.addcookie.set('lname',result.msg.lastname);
                  this.addcookie.set('username',result.msg.username);
                  this.addcookie.set('email',result.msg.email);
                  this.addcookie.set('type',result.msg.type);
                    this.cookiedetails = result.msg._id;
                   // this.cookiedetails = this.addcookie.get('cookiedetails');
                    console.log('cookiedetails from result in autologin--------');
                    console.log(this.cookiedetails);
                    console.log('result.msg.type');
                    console.log(result.msg.type);
                    if (result.msg.type == 'salesrep') {
                        console.log('hi 1');
                        console.log(result);
                        console.log(result.msg.signup_step);
                        if (result.msg.signup_step == '1') {

                            // Start repcontract here
                            if (result.msg.type == 'leadmanager') {
                                this.cgxvalue = 10;
                                this.pgxvalue = 0;
                                this.callsubmit();
                            }
                            else {
                                    this.getuserdetails();
                            }
                            // End repcontract here
                         //   this.router.navigate(['/employment-agreement']);
                        }
                        else if (result.msg.signup_step == '2') {
                            this.router.navigate(['/agreement']);
                        }
                        else if (result.msg.signup_step == '3') {
                            this.router.navigate(['/trainingstep']);
                        }
                        else if (result.msg.signup_step == '4') {
                            if (result.msg.iswebinarchekced == 0 || result.msg.iswebinarchekced == null) {
                            this.router.navigate(['/completewebinar']);
                            }
                            else {
                                this.router.navigate(['/rep-dashboard']);
                            }
                        }
                    }
                    else if (result.msg.type == 'corporate' || result.msg.type == 'leadmanager' || result.msg.type == 'masteraccount') {
                        console.log('hi 13');
                        if (result.msg.signup_step == '1') {
                            if (result.msg.type == 'leadmanager') {
                                this.cgxvalue = 10;
                                this.pgxvalue = 0;
                                this.callsubmit();
                            }
                            else {
                                    this.getuserdetails();
                            }
                         //   this.router.navigate(['/employment-agreement']);
                        }
                        else if (result.msg.signup_step == '2') {
                          this.router.navigate(['/agreement']);
                        }
                        else if (result.msg.signup_step == '3') {
                            this.router.navigate(['/trainingstep']);
                        }
                        else if (result.msg.signup_step == '4') {
                          if (result.msg.iswebinarchekced == 0 || result.msg.iswebinarchekced == null) {
                            this.router.navigate(['/completewebinar']);
                          }
                          else {
                            this.router.navigate(['/rep-dashboard']);
                          }
                        }
                    }
                    else if (result.msg.type == 'recruiter') {
                        console.log('hi 2');
                        if (result.msg.signup_step == '1') {
                            if (result.msg.type == 'leadmanager') {
                                this.cgxvalue = 10;
                                this.pgxvalue = 0;
                                this.callsubmit();
                            }
                            else {
                                    this.getuserdetails();
                            }
                          //  this.router.navigate(['/employment-agreement']);
                        }

                        else if (result.msg.signup_step == '2') {
                          this.router.navigate(['/agreement']);
                        }
                        else if (result.msg.signup_step == '3') {
                            this.router.navigate(['/trainingstep']);
                        }
                        else if (result.msg.signup_step == '4') {
                          if (result.msg.iswebinarchekced == 0 || result.msg.iswebinarchekced == null) {
                            this.router.navigate(['/completewebinar']);
                          }
                          else {
                            this.router.navigate(['/rep-dashboard']);
                          }
                        }
                    }
                   else {  // superadmin
                        console.log('hi 3');
                        this.router.navigate(['/rep-dashboard']);
                    }
                }
                else {
                }

            }, error => {
                console.log('Oooops!');
            });
    }
    getuserdetails() {
        /*let link = this.serverurl + 'getuserdetails';
        let data = {
            userid: this.cookiedetails,
        };
        this._http.post(link, data)
            .subscribe(res => {
                let result1 ;
                result1 = res;
                console.log(result1);*/
                 let result1 = this.resultautologin;
                if (result1.status == 'success' && typeof(result1.msg) != 'undefined') {
                    this.cgxvalue = result1.msg.cgxamountoflead;
                    this.pgxvalue = result1.msg.pgxvalueoflead;
                    console.log(result1.msg.mastergroupid);
                    if (result1.msg.mastergroupid == '5b67d9e8c21db354218fe5b2' || result1.msg.mastergroupid == '5b67febbc21db354218fe5ba' || result1.msg.mastergroupid == '5b680104c21db354218fe5bc' || result1.msg.mastergroupid == '5b6802bb1d269c0632876861' || result1.msg.mastergroupid == '0' ||result1.msg.mastergroupid=='5b83bf415be7d22242900ef3') {
                        if(result1.msg.mastergroupid==0 ||result1.msg.mastergroupid=='5b83bf415be7d22242900ef3') this.cgxvalue=0;
                        else this.cgxvalue=300;
                        console.log('1');
                        this.mastergrouptype = 'non_imo';
                    }
                    else if (result1.msg.mastergroupid == '5b6803601d269c0632876862' || result1.msg.mastergroupid == '5b68021b1d269c0632876860' || result1.msg.mastergroupid == '5b67ffdec21db354218fe5bb' || result1.msg.mastergroupid == '5b655bc720ae416d1d0fb07f') {
                        console.log('2');
                        this.mastergrouptype = 'call_center';
                    }
                    console.log('mastergrouptype ' + this.mastergrouptype);
                    this.callsubmit();

                }
          /*  }, error => {
                console.log('Oooops!');
            });*/

    }
    callsubmit() {
            let link = this.serverurl + 'repcontract';
            let data = {
                name: 'Default value',
                addedby: this.cookiedetails,
                compensationgrade: this.cgxvalue,
                pgxvalue: this.pgxvalue,
            };
            this._http.post(link, data)
                .subscribe(res => {
                    let result;
                    result = res;
                    console.log(result);
                    if (result.status == 'success') {
                        this.router.navigate(['/agreement']);
                    }
                }, error => {
                    console.log('Oooops!');
                });
        }
}
