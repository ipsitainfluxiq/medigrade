import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;

@Component({
  selector: 'app-corporatemanageredit',
  templateUrl: './corporatemanageredit.component.html',
  styleUrls: ['./corporatemanageredit.component.css'],
    providers: [Commonservices],
})
export class CorporatemanagereditComponent implements OnInit {
    public dataForm: FormGroup ;
    public fb;
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
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            username: [''],
            password: [''],
            confpassword: [''],
            email: [''],
            address: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            gender: ['', Validators.required],
            zip: ['', Validators.required],
            dob: ['', Validators.required],
            phone: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
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
                    this.dataForm = this.fb.group({
                        uniqueid: [userdet.uniqueid],
                        firstname: [userdet.firstname, Validators.required],
                        lastname: [userdet.lastname, Validators.required],
                        username: [userdet.username],
                        password: [''],
                        confpassword: [''],
                        email: [userdet.email],
                        address: [userdet.address, Validators.required],
                        city: [userdet.city, Validators.required],
                        state: [userdet.state, Validators.required],
                        gender: [userdet.gender, Validators.required],
                        zip: [userdet.zip, Validators.required],
                        dob: [userdet.dob, Validators.required],
                        phone: [userdet.phone, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])]
                    });
                } else {
                    this.router.navigate(['/corporatemanagerlist']);
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
            if (this.dataForm.valid) {
                let link= this.serverurl + 'edithelpdeskdetails';
                let data = {
                    id: this.id,
                    firstname: formval.firstname,
                    lastname: formval.lastname,
                    address: formval.address,
                    phone: formval.phone,
                    city: formval.city,
                    state: formval.state,
                    zip: formval.zip,
                    gender: formval.gender,
                    dob: formval.dob
                };
                console.log(data);
                this._http.post(link, data)
                    .subscribe(data => {
                        this.router.navigate(['/corporatemanagerlist']);
                    }, error => {
                        console.log('Oooops!');
                    });
            }
        }
        else {
            console.log('pass given');
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
                        console.log('yo');
                        let link= this.serverurl + 'edithelpdeskdetails';
                        let data = {
                            id: this.id,
                            firstname: formval.firstname,
                            lastname: formval.lastname,
                            password: formval.password,
                            address: formval.address,
                            phone: formval.phone,
                            city: formval.city,
                            state: formval.state,
                            zip: formval.zip,
                            gender: formval.gender,
                            dob: formval.dob
                        };
                        console.log(data);
                        this._http.post(link, data)
                            .subscribe(data => {
                                this.router.navigate(['/corporatemanagerlist']);
                            }, error => {
                                console.log('Oooops!');
                            });
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
        this.router.navigate(['/corporatemanagerlist']);
    }
    addpatientvalidationcall() {
        this.addpatientvalidation = 0;
    }
}
