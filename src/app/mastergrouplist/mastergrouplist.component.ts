import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'ngx-cookie-service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-mastergrouplist',
  templateUrl: './mastergrouplist.component.html',
  styleUrls: ['./mastergrouplist.component.css'],
  providers: [Commonservices],
})
export class MastergrouplistComponent implements OnInit {
    public addcookie: CookieService;
    public cookiedetails;
  public serverurl;
  public datalist;
  public mastergroupid;
  public p: number = 1;
  public addusermodal: boolean = false;
    public dataForm: FormGroup ;
    public fb;
    static invalidemail;
    static blankemail;
    static invalidpassword;
    static invalidusername;
    private passmatchvalidate;
    public addpatientvalidation: any = 0;
    public showvalidationerror = 0;
    public alreadyexist: any;
    public usastates;
    public username;
    public usertype;
    public commonurl;
    public copiedmodal: boolean = false;

  constructor(addcookie: CookieService , fb: FormBuilder , private _http: Http, private router: Router, private _commonservices: Commonservices,  private route: ActivatedRoute, public _sanitizer: DomSanitizer) {
      this.fb = fb;
      this.serverurl = _commonservices.url;
      this.commonurl = _commonservices.commonvalue.commonurl1;
      this.addcookie = addcookie;
      this.cookiedetails = this.addcookie.get('cookiedetails');
      this.username = this.addcookie.get('username');
      console.log('this.cookiedetails');
      console.log(this.cookiedetails);
      this.usertype = this.addcookie.get('type');
      if(this.usertype!='superadmin')
        window.history.back();
      this.getusastates();
      this.getUserList();
  }

  ngOnInit() {
      this.passmatchvalidate = false;
      this.dataForm = this.fb.group({
          firstname: ['', Validators.required],
          lastname: ['', Validators.required],
          type: ['', Validators.required],
          address: ['', Validators.required],
          username: ['', Validators.compose([Validators.required, MastergrouplistComponent.validateUsername])],
          email: ['', Validators.compose([Validators.required, MastergrouplistComponent.validateEmail])],
          password: ['', Validators.compose([Validators.required, MastergrouplistComponent.validatePassword])],
          confpassword: ['', Validators.required],
          city: ['', Validators.required],
          state: ['', Validators.required],
          gender: ['', Validators.required],
          zip: ['', Validators.required],
          dob: ['', Validators.required],
          phone: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      }, {validator: this.matchingPasswords('password', 'confpassword')});
  }

  getUserList() {
    let link = this.serverurl + 'mastergrouplist';
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
    adduser(val) {
        this.mastergroupid = val;
        this.addusermodal = true;
    }
    onHidden() {
        this.dataForm.reset();
        this.addusermodal = false;
        this.copiedmodal = false;
    }
    cancelit() {
        this.dataForm.reset();
        this.addusermodal = false;
        this.router.navigate(['/mastergrouplist']);
    }
    static validateEmail(control: FormControl) {
        MastergrouplistComponent.blankemail = false;
        MastergrouplistComponent.invalidemail = false;

        if (control.value == '' || control.value == null) {
            MastergrouplistComponent.blankemail = true;
            return {'invalidemail': true};
        }
        if (!control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            MastergrouplistComponent.invalidemail = true;
            return {'invalidemail': true};
        }
    }

    static validatePassword(control: FormControl) {
        MastergrouplistComponent.invalidpassword = false;
        if (control.value == '' || control.value == null) {
            return {'invalidpassword': false};
        }
        if (!control.value.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)) {
            //  if (!control.value.match(/^[a-zA-Z0-9_]+$/)) {
            MastergrouplistComponent.invalidpassword = true;
            return {'invalidpassword': true};
        }
    }
    static validateUsername(control: FormControl) {
        MastergrouplistComponent.invalidusername = false;
        if (control.value == '' || control.value == null) {
            console.log('control.value null');
            return {'invalidusername': false};
        }
        // if (!control.value.match(/^(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{3,})$/)) {
        if (!control.value.match(/^([a-zA-Z0-9]{3,})*$/)) {
            MastergrouplistComponent.invalidusername = true;
            return {'invalidusername': true};
        }
    }
    getemail(type: any) {
        // console.log('t '+type);
        if (type == 'invalid') {
            return MastergrouplistComponent.invalidemail;
        }
        if (type == 'blank') {
            return MastergrouplistComponent.blankemail;
        }
    }

    getpassword(type: any) {
        if (type == 'invalid') {
            return MastergrouplistComponent.invalidpassword;
        }
    }

    getusername(type: any) {
        if (type == 'invalid') {
            return MastergrouplistComponent.invalidusername;
        }
    }

    public matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
        return (group: FormGroup): { [key: string]: any } => {
            let password = group.controls[passwordKey];
            let confirmPassword = group.controls[confirmPasswordKey];

            if (password.value !== confirmPassword.value) {
                console.log('mismatch');
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
        this.addpatientvalidation = 1;
        this.showvalidationerror = 1;
        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }
        if (this.dataForm.valid && this.passmatchvalidate && (MastergrouplistComponent.invalidemail == false || MastergrouplistComponent.blankemail == false) && MastergrouplistComponent.invalidusername == false && MastergrouplistComponent.invalidpassword == false) {
            let link = this.serverurl + 'adduser';
            let data = {
                firstname: formval.firstname,
                lastname: formval.lastname,
                username: formval.username,
                email: formval.email,
                password: formval.password,
                address: formval.address,
                city: formval.city,
                state: formval.state,
                zip: formval.zip,
                gender: formval.gender,
                dob: formval.dob,
                phone: formval.phone,
               // uniqueid: formval.uniqueid,
                addedby: this.username,
                mastergroupid: this.mastergroupid,
                type: formval.type
            };
            this._http.post(link, data)
                .subscribe(res => {
                    let result = res.json();
                    //  console.log(result);
                    if (result.status == 'error' && result.id == '-1') {
                        console.log('inside mailexists');
                        this.alreadyexist = 'Emailid already exists';
                    }
                    if (result.status == 'error' && result.id == '-2') {
                        console.log('inside Username exists');
                        this.alreadyexist = 'Username already exists';
                    }
                    if (result.status == 'success') {
                        console.log('success');
                        this.alreadyexist = null;
                        this.addusermodal = false;
                        this.dataForm.reset();
                        this.router.navigate(['/mastergrouplist']);
                    }
                }, error => {
                    console.log('Oooops!');
                });
        }
    }
    addpatientvalidationcall() {
        this.addpatientvalidation = 0;
    }

    /*callfunc(usernameofcorporate , mastergroupid) {
        return 'http://' + usernameofcorporate + '.' + this.commonurl + '/#/landing/' + mastergroupid;
    }*/
    callfunc(mastergroupid, useridofaddedby) {
        return 'http://' + this.commonurl + '/#/landing/' + mastergroupid + '/' + useridofaddedby + '/1';
    }
    callfunc1(mastergroupid, useridofaddedby) {
        return 'http://' + this.commonurl + '/#/sign-up/' + mastergroupid + '/' + useridofaddedby + '/1';
    }

    callfunc2(mastergroupid, useridofaddedby) {
        return 'http://' + this.commonurl + '/#/cgx/' + mastergroupid + '/' + useridofaddedby + '/1';
    }
    /*
    callfunc2(usernameofcorporate , mastergroupid) {
        return 'http://' + usernameofcorporate + '.' + this.commonurl + '/#/cgx/' + mastergroupid;
    }*/
    showcopied() {
        this.copiedmodal = true;
        setTimeout(() => {
            this.copiedmodal = false;
        }, 2000);
    }
}
