import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {Commonservices} from '../app.commonservices' ;

@Component({
    selector: 'app-forgetpassword',
    templateUrl: './forgetpassword.component.html',
    styleUrls: ['./forgetpassword.component.css'],
    providers: [Commonservices],
})
export class ForgetpasswordComponent implements OnInit {
    public dataForm: FormGroup;
    private fb;
    private isSubmit;
    public is_error;
    public serverurl;
    static invalidemail;
    static blankemail;
    public addcookie: CookieService;
    public cookiedetails;
    public showmessage;
    public addpatientvalidation: any = 0;

    constructor(fb: FormBuilder, addcookie: CookieService, private _http: Http, private router: Router, private _commonservices: Commonservices) {
        this.fb = fb;
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.get('cookiedetails');
        this.serverurl = _commonservices.url;
    }

    ngOnInit() {
        this.isSubmit = false;
        this.dataForm = this.fb.group({
            email: ['', Validators.compose([Validators.required, ForgetpasswordComponent.validateEmail])],
        });

    }

    static validateEmail(control: FormControl) {
        ForgetpasswordComponent.blankemail = false;
        ForgetpasswordComponent.invalidemail = false;
        if (control.value == '') {
            ForgetpasswordComponent.blankemail = true;
            return { 'invalidemail' : true } ;
        }
        if ( !control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            ForgetpasswordComponent.invalidemail = true;
            return { 'invalidemail': true };
        }
    }


    getemail(type: any)  {
        if (type == 'invalid') {
            return ForgetpasswordComponent.invalidemail;
        }
        if (type == 'blank') {
            return ForgetpasswordComponent.blankemail;
        }
    }


    dosubmit(formval) {
        this.addpatientvalidation = 1;
        console.log('submit');
        this.is_error = 0;
        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }
        console.log('this.dataForm.valid' + this.dataForm.valid);
        console.log('ForgetpasswordComponent.invalidemail' + ForgetpasswordComponent.invalidemail);
        console.log('ForgetpasswordComponent.blankemail' + ForgetpasswordComponent.blankemail);

        if (this.dataForm.valid &&  (ForgetpasswordComponent.invalidemail == false || ForgetpasswordComponent.blankemail == false)) {
            console.log('inside');
            let link = this.serverurl + 'forgetpassword';
            let data = {email: formval.email};
            this._http.post(link, data)
                .subscribe(res => {
                    let result = res.json();
                    console.log(result);
                    console.log(result.msg);
                    if (result.status == 'success') {
                        this.addcookie.set('cookiedetails', result.msg);
                        // this.cookiedetails = this.addcookie.getObject('cookiedetails');
                        this.showmessage = 'Success! The Email should be arriving shortly.';
                    }
                    else {
                        this.is_error = result.msg;
                        this.router.navigate(['/forgetpassword']);
                    }
                }, error => {
                    console.log("Oooops!");
                });
        }
    }
    addpatientvalidationcall() {
        this.addpatientvalidation = 0;
    }
}
