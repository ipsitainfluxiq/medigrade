import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'ngx-cookie-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-myaccount',
    templateUrl: './myaccount.component.html',
    styleUrls: ['./myaccount.component.css'],
    providers: [Commonservices],
})
export class MyaccountComponent implements OnInit {
    public addcookie: CookieService;
    public cookiedetails;
    public serverurl;
    public dataForm: FormGroup ;
    public fb;
    public type;
    public usastates;
    public passerror;
    public addpatientvalidation: any = 0;

    constructor(fb: FormBuilder, addcookie: CookieService, private _http: Http, private router: Router, private _commonservices: Commonservices) {
        this.fb = fb;
        this.serverurl = _commonservices.url;
        this.addcookie = addcookie;
        this.cookiedetails = this.addcookie.get('cookiedetails');
        console.log('this.cookiedetails');
        console.log(this.cookiedetails);
        if (this.cookiedetails == null) {
            this.router.navigate(['/log-in']);
        } else {
            this. getaccountdetails();
            this.getusastates();
        }
    }

    ngOnInit() {
        this.dataForm = this.fb.group({
            uniqueid: ['', Validators.required],
            username: ['', Validators.required],
            password: [''],
            confpassword: [''],
            role: [''],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            address: ['', Validators.required],
            address2: [''],
            email: [''],
            phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
            city: ['', Validators.required],
            state: ['', Validators.required],
            gender: ['', Validators.required],
            dob: ['', Validators.required],
            zip: ['', Validators.required],
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
    getaccountdetails() {
        let link = this.serverurl + 'getuserdetails';
        let data = {userid : this.cookiedetails};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                console.log('result--------');
                console.log(result);
                if (result.status == 'success' && typeof(result.id) != 'undefined') {
                    let userdet = result.id;
                    this.dataForm = this.fb.group({
                        uniqueid: [userdet.uniqueid],
                        username: [userdet.username],
                        password: [''],
                        confpassword: [''],
                        role: [userdet.type],
                        firstname: [userdet.firstname, Validators.required],
                        lastname: [userdet.lastname, Validators.required],
                        address: [userdet.address, Validators.required],
                        address2: [userdet.address2],
                        email: [userdet.email],
                        phone: [userdet.phone, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
                        city: [userdet.city, Validators.required],
                        state: [userdet.state, Validators.required],
                        gender: [userdet.gender, Validators.required],
                        dob: [userdet.dob, Validators.required],
                        zip: [userdet.zip, Validators.required],
                    });
                } else {
                    // this.router.navigate(['/patient-list']);
                }
            }, error => {
                console.log('Ooops');
            });
    }

    dosubmit(formval) {
        this.addpatientvalidation = 1;
        this.passerror = null;
        console.log(this.dataForm.valid);
        console.log(formval.password);
        if (formval.password == null || formval.password == '') {
            console.log('pass null');
            //  if (this.dataForm.valid && this.passmatchvalidate && UserrecruitereditComponent.invalidpassword == false) {
            if (this.dataForm.valid) {
                let link= this.serverurl + 'edituserdetails';
                let data = {
                    id: this.cookiedetails,
                    firstname: formval.firstname,
                    lastname: formval.lastname,
                    address: formval.address,
                    address2: formval.address2,
                    phone: formval.phone,
                    city: formval.city,
                    state: formval.state,
                    zip: formval.zip,
                    gender: formval.gender,
                    dob: formval.dob,
                };
                console.log(data);
                this._http.post(link, data)
                    .subscribe(data => {
                        //  this.router.navigate(['/userrecruiterlist', formval.type]);
                    }, error => {
                        console.log('Oooops!');
                    });
            }
        }
        else {
            console.log('pass givrn');
            console.log(formval.password);
            this.passerror = null;
            if (formval.password == formval.confpassword) {
                console.log('1 step ahd');
                console.log(formval.password.length);
                if (formval.password.length >= 8) {
                    console.log('2 step ahd');
                    if (!formval.password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)) {
                        this.passerror = 'Password must contain at least 8 characters,one lower case character , one upper case character , one number, one special character';
                        console.log('3 step ahd');
                    }
                    else {
                        this.passerror = null;
                        console.log('4 step ahd');
                        // if (this.dataForm.valid) {
                        console.log('yo');
                        let link= this.serverurl + 'edituserdetails';
                        let data = {
                            id: this.cookiedetails,
                            firstname: formval.firstname,
                            lastname: formval.lastname,
                            password: formval.password,
                            address: formval.address,
                            address2: formval.address2,
                            phone: formval.phone,
                            city: formval.city,
                            state: formval.state,
                            zip: formval.zip,
                            gender: formval.gender,
                            dob: formval.dob,
                        };
                        console.log(data);
                        this._http.post(link, data)
                            .subscribe(data => {
                                //  this.router.navigate(['/userrecruiterlist', formval.type]);
                            }, error => {
                                console.log('Oooops!');
                            });
                        //   }
                    }
                }
                else {
                    this.passerror = 'Password must contain at least 8 characters';
                }
            }
            else {
                this.passerror = 'Passwords must match';
            }
        }
    }
    addpatientvalidationcall() {
        this.addpatientvalidation = 0;
    }
    gotodashboard() {
        this.router.navigate(['/rep-dashboard']);
    }
}
