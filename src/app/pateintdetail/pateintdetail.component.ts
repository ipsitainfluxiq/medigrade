import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'ngx-cookie-service';

@Component({
    selector: 'app-pateintdetail',
    templateUrl: './pateintdetail.component.html',
    styleUrls: ['./pateintdetail.component.css'],
    providers: [Commonservices],
})
export class PateintdetailComponent implements OnInit {
    public dataForm: FormGroup;
    public fb;
    public serverurl;
    public usastates;
    public addcookie: CookieService;
    public cookiedetails;
    public newinstertedid;
    public newinsertedname;
    static invalidemail;
    static blankemail;
    public opensuccessmodal: boolean = false;
    public uniquepatientid;
    public tagid;
    public addpatientvalidation: any = 0;

    constructor(fb: FormBuilder, addcookie: CookieService, private _http: Http, private router: Router, private _commonservices: Commonservices) {
        this.fb = fb;
        this.serverurl = _commonservices.url;
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.get('cookiedetails');
        this.getusastates();
        this.getuniquepatientid();
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
    getuniquepatientid() {
        let link = this.serverurl + 'getuniquerepid';
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                console.log(result);
                this.uniquepatientid = result.id;
            }, error => {
                console.log('Oooops!');
            });
    }
    ngOnInit() {
        /* this.dataForm = this.fb.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, PateintdetailComponent.validateEmail])],
            phone: ['', Validators.required],
            address: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zip: ['', Validators.required],
            dob: ['', Validators.required],
            gender: ['', Validators.required],
            heightwidth: ['', Validators.required],
            allergies: ['', Validators.required],
            medicareclaim: ['', Validators.required],
            tag: [''],
            raceethnicity: ['', Validators.required],
            trackingno: ['', Validators.required],
            medicarecard: ['', Validators.required],
            iscancer: ['', Validators.required],
            cancertypes: ['', Validators.required],
            relation: ['', Validators.required],
            approxage: ['', Validators.required],
        });*/
        this.dataForm = this.fb.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
              email: ['', Validators.compose([Validators.required, PateintdetailComponent.validateEmail])],
          //  email: [''],
            phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
            city: ['', Validators.required],
            state: ['', Validators.required]
        });
    }

    static validateEmail(control: FormControl) {
        PateintdetailComponent.blankemail = false;
        PateintdetailComponent.invalidemail = false;

        if (control.value == '' || control.value == null) {
            PateintdetailComponent.blankemail = true;
            return {'invalidemail': true};
        }
        if (!control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            PateintdetailComponent.invalidemail = true;
            return {'invalidemail': true};
        }
    }

    getemail(type: any) {
        // console.log('t '+type);
        if (type == 'invalid') {
            return PateintdetailComponent.invalidemail;
        }
        if (type == 'blank') {
            return PateintdetailComponent.blankemail;
        }
    }
    clearit() {
        this.dataForm.reset();
        console.log(this.dataForm.value);
        //  this.dataForm.value.state = null;
    }
    addpatientvalidationcall() {
        this.addpatientvalidation = 0;
    }
    dosubmit(formval) {
        this.addpatientvalidation = 1;
        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }
        // if (this.dataForm.valid && (PateintdetailComponent.invalidemail == false || PateintdetailComponent.blankemail == false))
        if (this.dataForm.valid )
        {
            console.log('inside');

            let link = this.serverurl + 'patientdetail';
            let data = {
                firstname: formval.firstname,
                lastname: formval.lastname,
                email: formval.email,
                phone: formval.phone,
                //  address: formval.address,
                city: formval.city,
                state: formval.state,
                addedby: this.cookiedetails,
                uniqueid: this.uniquepatientid,
                /*zip: formval.zip,
                gender: formval.gender,
                dob: formval.dob,
                heightwidth: formval.heightwidth,
                allergies: formval.allergies,
                medicareclaim: formval.medicareclaim,
                tag: formval.tag,
                raceethnicity: formval.raceethnicity,
                trackingno: formval.trackingno,
                medicarecard: formval.medicarecard,
                iscancer: formval.iscancer,
                cancertypes: formval.cancertypes,
                relation: formval.relation,
                approxage: formval.approxage,*/
            };
          console.log(data);
          if(data!=null){
              console.log('data not null');
            this._http.post(link, data)
                .subscribe(res => {
                    let result = res.json();
                    console.log(result);
                    if (result.status == 'success') {
                        this.dataForm.reset();
                        this.opensuccessmodal = true;
                        this.newinstertedid = result.id;
                        this.newinsertedname = formval.firstname + ' ' + formval.lastname;
                        this.newinstertedid = result.id;
                        // this.router.navigate(['/patient-list']);
                    }
                }, error => {
                    console.log('Oooops!');
                });
        }
        }
    }

    closemodal() {
      this.getuniquepatientid();
      this.opensuccessmodal = false;
    }

    gotopatientrecord() {
        this.gettagvalue(this.newinstertedid);
        setTimeout(() => {
            console.log(this.tagid);
            if (this.tagid == '5b0bfa1b3fe08865e7955f71') {
                this.router.navigate(['/patientrecord', this.newinstertedid, 1]); // accept
            }
            if (this.tagid == '5b0bfa1d3fe08865e7955f72') {
                this.router.navigate(['/patientrecord', this.newinstertedid, 2]); // decline
            }
            if (this.tagid == '5b0cda8121eaaa0244d52b9e') {
                this.router.navigate(['/patientrecord', this.newinstertedid, 3]); // lead
            }
            if (this.tagid == '5b0b9235b33cbc2d4af08dd9') {
                this.router.navigate(['/patientrecord', this.newinstertedid, 4]); // pps submitted
            }
            if (this.tagid == '5afad90dde56b53d10e2ab4d') {
                this.router.navigate(['/patientrecord', this.newinstertedid, 5]); // pf submitted
            }
        }, 1500);
        // this.router.navigate(['/patientrecord', this.newinstertedid]);
    }
    gettagvalue(id) {
        let link = this.serverurl + 'gettagvalue';
        let data = {
            userid: id,
        }
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                console.log(result);
                if (result.status == 'success') {
                    this.tagid = result.id[0].tagid;
                }
            }, error => {
                console.log('Oooops!');
            });
    }
    onHidden() {
        this.opensuccessmodal = false;

    }

    cancel() {
        this.dataForm.reset();
        this.router.navigate(['/patient-list']);
    }
}
