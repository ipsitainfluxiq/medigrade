import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'ngx-cookie-service';
declare var moment: any;
declare var $: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  providers: [Commonservices],
})
export class LandingComponent implements OnInit {
    public termsmodal: boolean = false;
    public privacymodal: boolean = false;
  public dataForm: FormGroup;
  private fb;
  static invalidemail;
  static blankemail;
  static invalidpassword;
  static invalidusername;
  private passmatchvalidate;
  public alreadyexist: any;
  public pgxvalue: any;
  public serverurl;
  private addcookie: CookieService;
  private cookiedetails;
  public hostname;
  public type;
  public serverhost;
  public cgxamount;
  public neededhost;
  public compensationtokenvalue;
  public showvalidationerror = 0;
  public roleid;
  public addedby;
  public usastates;
  public uniquerepid;
  public webinarlist = [];
  public wrongtokenforleadrolemodal: boolean = false;
  public username;
    public flag;
    public mastergroupid;

  constructor(fb: FormBuilder, addcookie: CookieService, private _http: Http, private router: Router, public _commonservices: Commonservices, private route: ActivatedRoute) {
    this.fb = fb;
    LandingComponent.blankemail = false;
    LandingComponent.invalidemail = false;
    this.serverurl = _commonservices.url;
    this.addcookie = addcookie ;
    this.cookiedetails = this.addcookie.get('cookiedetails');
    console.log(window.location.host);
    this.hostname = window.location.host;
    this.serverhost = _commonservices.hostis;
    var splitvalue = this.serverhost.split('.');
    this.neededhost = splitvalue[1] + '.' + splitvalue[2];
    if (this.hostname == 'localhost:4200') {
      this.type = 'salesrep';
    }
    else {
      var splitvalue = this.hostname.split('.');
      //  console.log(splitvalue);
      //  console.log(splitvalue[0]);
      if (splitvalue[2] == null) {
        this.type = 'corporate';
        // this.neededhost = 'altushealthgroup.com';
        this.neededhost = _commonservices.commonvalue.commonurl1;
        this.addedby = 'corporate';
      }
      else {
        this.addedby = splitvalue[0];
        let link = this.serverurl + 'getuserdetailsbyuserid';
        let data = {
          username: splitvalue[0],
        };
        this._http.post(link, data)
          .subscribe(res => {
            let result = res.json();
            console.log(result);
            if (result.status == 'success') {
              console.log(result.id.type);
              console.log('=======================================');
              console.log(result.id._id);
              this.roleid = result.id._id;
              if (result.id.type == 'corporate') {
                this.type = 'leadmanager';
              }
              else if (result.id.type == 'leadmanager') {
                this.type = 'masteraccount';
                this.route.params.subscribe(params => {
                  this.compensationtokenvalue = params['id'];
                  //  console.log(this.compensationtokenvalue);
                  this.getdetailsbycompensationtokenvalue();
                });
              }if (result.id.type == 'masteraccount') {
                this.type = 'salesrep';
                this.cgxamount = 200 - result.id.cgxamountoflead;
                this.pgxvalue = 100 - result.id.pgxvalueoflead;
              }
            }
          }, error => {
            console.log('Oooops!');
          });
      }
    }
    this.getusastates();
    this.getuniquerepid();
    this.getwebinarlist();
  }

  ngOnInit() {
      this.route.params.subscribe(params => {
          this.username = params['username'];
          this.mastergroupid = params['id'];
          this.flag = params['flag'];
      });
    this.passmatchvalidate = false;
    this.dataForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.compose([Validators.required, LandingComponent.validateUsername])],
      email: ['', Validators.compose([Validators.required, LandingComponent.validateEmail])],
      password: ['', Validators.compose([Validators.required, LandingComponent.validatePassword])],
      confpassword: ['', Validators.required],
      address: ['', Validators.required],
      address2: [''],
      city: ['',    Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      agentexperience: [''],
      olderclients: [''],
      noofplanBcard: [''],
      webinarkey: ['', Validators.required],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
    }, {validator: this.matchingPasswords('password', 'confpassword')});

      if (this.flag != null && this.username != null && this.mastergroupid != null) {
          this.getuserdetailsbyuseridnew();
      }
  }

  getusastates() {
    let link = this.serverurl + 'getusastates';
    this._http.get(link)
      .subscribe(res => {
        let result = res.json();
        this.usastates = result;
      }, error => {
        console.log('Oooops!');
      });
  }

  getuniquerepid() {
    let link = this.serverurl + 'getuniquerepid';
    this._http.get(link)
      .subscribe(res => {
        let result = res.json();
        console.log(result);
        this.uniquerepid = result.id;
      }, error => {
        console.log('Oooops!');
      });
  }
  static validateEmail(control: FormControl) {
    LandingComponent.blankemail = false;
    LandingComponent.invalidemail = false;

    if (control.value == '' || control.value == null) {
      LandingComponent.blankemail = true;
      return {'invalidemail': true};
    }
    if (!control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      LandingComponent.invalidemail = true;
      return {'invalidemail': true};
    }
  }

  static validatePassword(control: FormControl) {
    LandingComponent.invalidpassword = false;
    if (control.value == '' || control.value == null) {
      return {'invalidpassword': false};
    }
    if (!control.value.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)) {
      LandingComponent.invalidpassword = true;
      return {'invalidpassword': true};
    }
  }

  static validateUsername(control: FormControl) {
    LandingComponent.invalidusername = false;
    if (control.value == '' || control.value == null) {
      return {'invalidusername': false};
    }
    if (!control.value.match(/^([a-zA-Z0-9]{3,})*$/)) {
      LandingComponent.invalidusername = true;
      return {'invalidusername': true};
    }
  }

  getemail(type: any) {
    // console.log('t '+type);
    if (type == 'invalid') {
      return LandingComponent.invalidemail;
    }
    if (type == 'blank') {
      return LandingComponent.blankemail;
    }
  }

  getpassword(type: any) {
    if (type == 'invalid') {
      return LandingComponent.invalidpassword;
    }
  }

  getusername(type: any) {
    if (type == 'invalid') {
      return LandingComponent.invalidusername;
    }
  }

  public matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
      else {
        this.passmatchvalidate = true;
      }
    };
  }

  dosubmit(formval) {
    console.log('dosubmit 1');
    this.showvalidationerror = 1;
    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
    }
    console.log(this.type);
    if (this.dataForm.valid && this.passmatchvalidate && (LandingComponent.invalidemail == false || LandingComponent.blankemail == false) && LandingComponent.invalidusername == false && LandingComponent.invalidpassword == false) {
      let link = this.serverurl + 'signup';
      let data = {
        firstname: formval.firstname,
        lastname: formval.lastname,
        username: formval.username,
        email: formval.email,
        password: formval.password,
        address: formval.address,
        address2: formval.address2,
        city: formval.city,
        state: formval.state,
        zip: formval.zip,
        gender: formval.gender,
        dob: formval.dob,
        phone: formval.phone,
        agentexperience: formval.agentexperience,
        olderclients: formval.olderclients,
        noofplanBcard: formval.noofplanBcard,
        webinarkey: formval.webinarkey,
          type: 'salesrep',
      //  type: this.type,
        signup_step: 1,
        cgxamountoflead: this.cgxamount,
        pgxvalueoflead: this.pgxvalue,
        addedby: this.addedby,
        iswebinarchekced: 0,
        uniqueid: this.uniquerepid,
          mastergroupid: this.mastergroupid,
      };
      console.log('data-------');
      console.log(data);
      this._http.post(link, data)
        .subscribe(res => {
          let result = res.json();
          if (result.status == 'error' && result.id == '-1') {
            this.alreadyexist = 'Emailid already exists';
          }
          if (result.status == 'error' && result.id == '-2') {
            this.alreadyexist = 'Username already exists';
          }
          if (result.status == 'success') {
            this.alreadyexist = null;
            this.dataForm.reset();
            if (this.serverhost == 'localhost:4200') {
              var newurl = 'http://localhost:4200/#/autologin/' + result.id.logintoken;
            }
            else {
              var newurl = 'https://' + formval.username + '.' + this.neededhost + '/#/autologin/' + result.id.logintoken;
            //  var newurl = 'http://' + this.neededhost + '/#/autologin/' + result.id.logintoken;
            }
            console.log(newurl);
            window.location.href = newurl;
            console.log('callcreateregistratsphppage  result.id');
            console.log(result.id._id);
            this.callcreateregistratsphppage(result.id._id);
          }
        }, error => {
          console.log('Oooops!');
        });
    }
  }
  getdetailsbycompensationtokenvalue() {
    let link = this.serverurl + 'getdetailsbycompensationtokenvalue';
    let data = {roleid : this.roleid , compensationtokenvalue : this.compensationtokenvalue};
    this._http.post(link, data)
      .subscribe(res => {
        let result = res.json();
        console.log(result);
        if (result.status == 'success' && typeof(result.id) != 'undefined') {
          this.cgxamount  = result.id.amount;
          this.pgxvalue  = result.id.pgxvalue;
        } else {
          console.log('Sorry ! You have to signup with proper url.');
          this.wrongtokenforleadrolemodal = true;

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
        console.log('this.webinarlist');
        console.log(this.webinarlist);
      }, error => {
        console.log('Ooops');
      });
  }

  showdateproperly(stdate , enddate) {
    return moment(stdate).format('ddd') + ', ' + moment(stdate).format('MMM') + ' ' + moment(stdate).format('D') + ', ' + moment(stdate).format('YYYY') + ' 5:00 PM - 6:00 PM PDT';
  }

  callcreateregistratsphppage(id) {
    let link = this._commonservices.phpurl + 'createregistrants.php?id=' + id;
    this._http.get(link)
      .subscribe(res => {
        let result = res.json();
        console.log('result++++++++++');
        console.log(result);
      }, error => {
        console.log('Ooops');
      });
  }


callterms() {
        this.termsmodal = true;
    }
    callprivacy() {
        this.privacymodal = true;
    }

    onHidden() {
        this.termsmodal = false;
        this.privacymodal = false;
    }


  gotoup() {
    console.log('call');
    $('html, body').animate({
      scrollTop: $('.landing_top1_right_wrapper').offset().top
    }, 'slow');
  }
    getuserdetailsbyuseridnew() {
        let link = this.serverurl + 'getuserdetailsbyuseridnew';
        let data = {_id : this.username};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                console.log(result);
                if (result.status == 'success' && typeof(result.id) != 'undefined') {
                    this.addedby = result.id.username;
                    console.log('addedby' + this.addedby);
                } else {
                }
            }, error => {
                console.log('Ooops');
            });
    }
}
