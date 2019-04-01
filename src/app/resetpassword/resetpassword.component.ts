import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'ngx-cookie-service';

@Component({
    selector: 'app-resetpassword',
    templateUrl: './resetpassword.component.html',
    styleUrls: ['./resetpassword.component.css'],
    providers: [Commonservices],
})
export class ResetpasswordComponent implements OnInit {
    public dataForm: FormGroup;
    public fb;
    static invalidpassword;
    public addcookie: CookieService;
    public cookiedetails;
    public serverurl;
    public passmatchvalidate;
    public is_error;
    public accesscode;
    public userdetails;
    public modalpasswordupdated;
    public id;
    public addpatientvalidation: any = 0;

    constructor(fb: FormBuilder, addcookie: CookieService, private _http: Http, private router: Router, private _commonservices: Commonservices, private route: ActivatedRoute) {
        this.fb = fb;
        this.serverurl = _commonservices.url;
     //   this.addcookie = addcookie ;
     //   this.cookiedetails = this.addcookie.getObject('cookiedetails');
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.accesscode = params['id'];
            console.log(this.accesscode);
            this.getuserdetails();
        });
        this.passmatchvalidate = false;
        this.dataForm = this.fb.group({
            password: ['', Validators.compose([Validators.required, ResetpasswordComponent.validatePassword])],
            confpassword: ['', Validators.required],
        }, {validator: this.matchingPasswords('password', 'confpassword')});
       /* this.dataForm = this.fb.group({
            password: ['', Validators.required],
            confpassword: ['', Validators.required],
        });*/
    }
    getuserdetails() {
        let link = this.serverurl + 'getuserdetailsbyaccesscode';
        let data = {accesscode : this.accesscode};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                console.log(result);
                if (result.status == 'success'&& typeof(result.id) != 'undefined') {
                    console.log(result.id);
                    this.userdetails = result.id;
                    this.id = this.userdetails._id;
                } else {
                    this.router.navigate(['/log-in']);
                }
            }, error => {
                console.log('Ooops');
            });
    }
    static validatePassword(control: FormControl) {
        ResetpasswordComponent.invalidpassword = false;
        if (control.value == '' || control.value == null) {
            return {'invalidpassword': false};
        }
        if (!control.value.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)) {
            //  if (!control.value.match(/^[a-zA-Z0-9_]+$/)) {
            ResetpasswordComponent.invalidpassword = true;
            return {'invalidpassword': true};
        }
    }
    getpassword(type: any) {
        if (type == 'invalid') {
            return ResetpasswordComponent.invalidpassword;
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
        console.log('hi');
        console.log(this.dataForm.valid);
        console.log(this.passmatchvalidate);
        console.log(ResetpasswordComponent.invalidpassword);
        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }
        this.is_error = 0;
         if (this.dataForm.valid && this.passmatchvalidate && ResetpasswordComponent.invalidpassword == false ) {
        console.log('hi');
        let link = this.serverurl + 'newpassword';
        let data = {id: this.id, password: formval.password};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                console.log(result);
                if (result.status == 'success') {
                    this.modalpasswordupdated = true;
                    setTimeout(() => {
                        this.router.navigate(['/log-in']);
                    }, 3000);
                }
                else {
                    this.is_error = 'Some internal problem happened! Please try again later.';
                }
            }, error => {
                console.log('Oooops!');
            });
         }


    }
    onHidden() {
        this.modalpasswordupdated = false;
        this.router.navigate(['/']);
    }
    addpatientvalidationcall() {
        this.addpatientvalidation = 0;
    }
}
