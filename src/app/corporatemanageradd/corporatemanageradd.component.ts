import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-corporatemanageradd',
  templateUrl: './corporatemanageradd.component.html',
  styleUrls: ['./corporatemanageradd.component.css'],
    providers: [Commonservices],
})
export class CorporatemanageraddComponent implements OnInit {
    public addcookie: CookieService;
    public cookiedetails;
    public serverurl;
    public dataForm: FormGroup ;
    public fb;
    public type;
    public usastates;
    public passerror;
    static invalidemail;
    static blankemail;
    static invalidpassword;
    static invalidusername;
    private passmatchvalidate;
    public alreadyexist: any;
    public uniquerepid;
    public username;
    public showvalidationerror = 0;
    id: number;
    public addpatientvalidation: any = 0;

    constructor(fb: FormBuilder, addcookie: CookieService, private _http: Http, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices) {
        this.fb = fb;
        this.serverurl = _commonservices.url;
        this.addcookie = addcookie;
        this.cookiedetails = this.addcookie.get('cookiedetails');
        this.username = this.addcookie.get('username');
        console.log('this.cookiedetails');
        console.log(this.cookiedetails);
        this.getusastates();
        this.getuniquerepid();
        CorporatemanageraddComponent.blankemail = false;
        CorporatemanageraddComponent.invalidemail = false;
    }

    ngOnInit() {
        /* this.route.params.subscribe(params => {
           this.id = params['id'];
           console.log(this.id);
           this.getdetailsbyid();
         });*/
        this.passmatchvalidate = false;
        this.dataForm = this.fb.group({
            uniqueid: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            address: ['', Validators.required],
            username: ['', Validators.compose([Validators.required, CorporatemanageraddComponent.validateUsername])],
            email: ['', Validators.compose([Validators.required, CorporatemanageraddComponent.validateEmail])],
            password: ['', Validators.compose([Validators.required, CorporatemanageraddComponent.validatePassword])],
            confpassword: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            gender: ['', Validators.required],
            zip: ['', Validators.required],
            dob: ['', Validators.required],
            phone: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
        }, {validator: this.matchingPasswords('password', 'confpassword')});

    }
    getuniquerepid() {
        let link = this.serverurl + 'getuniquerepid';
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                console.log(result);
                this.uniquerepid = result.id;
                // this.dataForm.value.uniqueid = this.uniquerepid;
                this.dataForm.patchValue({
                    uniqueid : this.uniquerepid
                });
            }, error => {
                console.log('Oooops!');
            });
    }
    cancelit() {
        this.router.navigate(['/corporatemanagerlist']);
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
    static validateEmail(control: FormControl) {
        CorporatemanageraddComponent.blankemail = false;
        CorporatemanageraddComponent.invalidemail = false;

        if (control.value == '' || control.value == null) {
            CorporatemanageraddComponent.blankemail = true;
            return {'invalidemail': true};
        }
        if (!control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            CorporatemanageraddComponent.invalidemail = true;
            return {'invalidemail': true};
        }
    }

    static validatePassword(control: FormControl) {
        CorporatemanageraddComponent.invalidpassword = false;
        if (control.value == '' || control.value == null) {
            return {'invalidpassword': false};
        }
        if (!control.value.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)) {
            //  if (!control.value.match(/^[a-zA-Z0-9_]+$/)) {
            CorporatemanageraddComponent.invalidpassword = true;
            return {'invalidpassword': true};
        }
    }
    static validateUsername(control: FormControl) {
        CorporatemanageraddComponent.invalidusername = false;
        if (control.value == '' || control.value == null) {
            console.log('control.value null');
            return {'invalidusername': false};
        }
        // if (!control.value.match(/^(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{3,})$/)) {
        if (!control.value.match(/^([a-zA-Z0-9]{3,})*$/)) {
            CorporatemanageraddComponent.invalidusername = true;
            return {'invalidusername': true};
        }
    }
    getemail(type: any) {
        // console.log('t '+type);
        if (type == 'invalid') {
            return CorporatemanageraddComponent.invalidemail;
        }
        if (type == 'blank') {
            return CorporatemanageraddComponent.blankemail;
        }
    }

    getpassword(type: any) {
        if (type == 'invalid') {
            return CorporatemanageraddComponent.invalidpassword;
        }
    }

    getusername(type: any) {
        if (type == 'invalid') {
            return CorporatemanageraddComponent.invalidusername;
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
        if (this.dataForm.valid && this.passmatchvalidate && (CorporatemanageraddComponent.invalidemail == false || CorporatemanageraddComponent.blankemail == false) && CorporatemanageraddComponent.invalidusername == false && CorporatemanageraddComponent.invalidpassword == false) {
            let link = this.serverurl + 'corporatemanager';
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
                uniqueid: formval.uniqueid,
                addedby: this.username,
                type: 'corporatemanager'
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
                        this.router.navigate(['/corporatemanagerlist']);
                    }
                }, error => {
                    console.log('Oooops!');
                });
        }
    }
    addpatientvalidationcall() {
        this.addpatientvalidation = 0;
    }
}
