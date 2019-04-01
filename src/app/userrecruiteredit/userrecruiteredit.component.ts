import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;

@Component({
    selector: 'app-userrecruiteredit',
    templateUrl: './userrecruiteredit.component.html',
    styleUrls: ['./userrecruiteredit.component.css'],
    providers: [Commonservices],
})
export class UserrecruitereditComponent implements OnInit {
    public dataForm: FormGroup ;
    public fb;
    public type;
    id: number;
    public serverurl;
    public usastates;
    public passerror ;
    public addpatientvalidation: any = 0;

    constructor(fb: FormBuilder, private _http: Http, private router: Router, private route: ActivatedRoute, public _commonservices: Commonservices) {
        this.fb = fb;
        this.serverurl = _commonservices.url;
        this.getusastates();
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
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            console.log(this.id);
            this.getdetailsbyid();
        });
        this.dataForm = this.fb.group({
            uniqueid: ['', Validators.required],
            username: ['', Validators.required],
            password: [''],
            confpassword: [''],
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
            type: ['', Validators.required],
            addedby: ['', Validators.required],
            notes: ['', Validators.required],
            status: ['', Validators.required],
            zip: ['', Validators.required],
            subdomain: ['', Validators.required],
        });
    }
    getdetailsbyid() {
        let link = this.serverurl + 'getuserdetails';
        let data = {userid : this.id};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                //   console.log(result);
                if (result.status == 'success' && typeof(result.id) != 'undefined') {
                    console.log(result.id);
                    let userdet = result.id;
                    this.type = userdet.type;
                    this.dataForm = this.fb.group({
                        uniqueid: [userdet.uniqueid],
                        username: [userdet.username],
                        password: [''],
                        confpassword: [''],
                        firstname: [userdet.firstname, Validators.required],
                        lastname: [userdet.lastname, Validators.required],
                        address: [userdet.address, Validators.required],
                        address2: [userdet.address2],
                        email: [userdet.email],
                        //   phone: [userdet.phone, Validators.required],
                        phone: [userdet.phone, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
                        city: [userdet.city, Validators.required],
                        state: [userdet.state, Validators.required],
                        gender: [userdet.gender, Validators.required],
                        dob: [userdet.dob, Validators.required],
                        type: [userdet.type, Validators.required],
                        addedby: [userdet.addedby],
                        /* notes: [userdet.notes, Validators.required],
                        status: [userdet.status, Validators.required],*/
                        zip: [userdet.zip, Validators.required],
                        subdomain: [userdet.username],
                    });
                } else {
                    // this.router.navigate(['/patient-list']);
                }
            }, error => {
                console.log('Ooops');
            });
    }
/*    static validatePassword(control: FormControl) {
        UserrecruitereditComponent.invalidpassword = false;
        if (control.value == '' || control.value == null) {
            return {'invalidpassword': false};
        }
        if (!control.value.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)) {
            //  if (!control.value.match(/^[a-zA-Z0-9_]+$/)) {
            UserrecruitereditComponent.invalidpassword = true;
            return {'invalidpassword': true};
        }
    }
    getpassword(type: any) {
        if (type == 'invalid') {
            return UserrecruitereditComponent.invalidpassword;
        }
    }*/
/*    public matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
        return (group: FormGroup): { [key: string]: any } => {
            let password = group.controls[passwordKey];
            let confirmPassword = group.controls[confirmPasswordKey];

            if (password.value !== confirmPassword.value) {
                //  console.log('mismatch');
                return {
                    mismatchedPasswords: true
                };
            }
            else {
                this.passmatchvalidate = true;
            }
        };
    }*/
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
                    id: this.id,
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
                    type: formval.type
                };
                console.log(data);
                this._http.post(link, data)
                    .subscribe(data => {
                        this.router.navigate(['/userrecruiterlist', formval.type]);
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
                            id: this.id,
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
                            type: formval.type
                        };
                        console.log(data);
                        this._http.post(link, data)
                            .subscribe(data => {
                                this.router.navigate(['/userrecruiterlist', formval.type]);
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
    cancelit() {
        this.router.navigate(['/userrecruiterlist', this.type]);
    }
    addpatientvalidationcall() {
        this.addpatientvalidation = 0;
    }
}
