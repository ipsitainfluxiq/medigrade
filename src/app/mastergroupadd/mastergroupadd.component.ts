import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'ngx-cookie-service';
declare var $: any;

@Component({
  selector: 'app-mastergroupadd',
  templateUrl: './mastergroupadd.component.html',
  styleUrls: ['./mastergroupadd.component.css'],
    providers: [Commonservices],
})
export class MastergroupaddComponent implements OnInit {
    public addcookie: CookieService;
    public cookiedetails;
    public serverurl;
    public dataForm: FormGroup ;
    public fb;
    public groupdescriptionerror;
    public grouplist;
    public type;
    public usastates;
    public alreadyexist: any;
    public uniquerepid;
    public ckeditorgroupdescription: any;
    public showvalidationerror = 0;
    id: number;
    public addpatientvalidation: any = 0;
    public showflag = 2;

    constructor(fb: FormBuilder, addcookie: CookieService, private _http: Http, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices) {
        this.fb = fb;
        this.serverurl = _commonservices.url;
        this.addcookie = addcookie;
        this.cookiedetails = this.addcookie.get('cookiedetails');
        console.log('this.cookiedetails');
        console.log(this.cookiedetails);
        this.ckeditorgroupdescription = '';
        this.getuniquerepid();
        this.getUserList();
    }

    ngOnInit() {
        this.dataForm = this.fb.group({
           /* uniqueid: [''],*/
            groupname: ['', Validators.required],
            groupdescription: [''],
            groupcorporatemanager: ['', Validators.required],
            groupactive: [''],
            overridename0: ['', Validators.required],
            overriderole0: ['', Validators.required],
            overridecommission0: ['', Validators.required],
            overridename1: ['', Validators.required],
            overriderole1: ['', Validators.required],
            overridecommission1: ['', Validators.required],
            overridename2: ['', Validators.required],
            overriderole2: ['', Validators.required],
            overridecommission2: ['', Validators.required],
            overridename3: [''],
            overriderole3: [''],
            overridecommission3: [''],
            overridename4: [''],
            overriderole4: [''],
            overridecommission4: [''],
            overridename5: [''],
            overriderole5: [''],
            overridecommission5: [''],
            no_on_introduction: ['', Validators.required]
            });

    }
    patchdesc() {
        console.log('===');
        console.log('call?' + this.ckeditorgroupdescription);
        this.dataForm.patchValue({
            groupdescription : this.ckeditorgroupdescription
        });
        if (this.ckeditorgroupdescription == null || this.ckeditorgroupdescription == '') {
            this.groupdescriptionerror = "Invalid Description.";
        }
        else {
            this.groupdescriptionerror = null;
        }
    }

    getuniquerepid() {
        let link = this.serverurl + 'getuniquerepid';
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                console.log(result);
                this.uniquerepid = result.id;
                this.dataForm.patchValue({
                    uniqueid : this.uniquerepid
                });
            }, error => {
                console.log('Oooops!');
            });
    }

    getUserList() {
        let link = this.serverurl + 'corporatemanagerlist';
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                    console.log(result);
                    this.grouplist = result.id;
                }

            }, error => {
                console.log('Oooops!');
            });
    }

    cancelit() {
      //  this.router.navigate(['/helpdesklist']);
    }
    show_override_singlediv() {
        this.showflag++;
        $('.override' + this.showflag).removeClass('hide');
    }
    dosubmit(formval) {
        this.groupdescriptionerror = null;
        if (formval.groupactive == true) {
            var groupactive = 1;
        }
        else {
            var groupactive = 0;
        }
        this.addpatientvalidation = 1;
        this.showvalidationerror = 1;
        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }
        console.log('this.ckeditorgroupdescription' + this.ckeditorgroupdescription);
        if (this.ckeditorgroupdescription == null || this.ckeditorgroupdescription == '') {
            this.groupdescriptionerror = 'Invalid Description.';
        }
        if (this.dataForm.valid && this.groupdescriptionerror == null) {
            let link = this.serverurl + 'mastergroupadd';
            let data = {
                groupname: formval.groupname,
                groupdescription: this.ckeditorgroupdescription,
                groupcorporatemanager: formval.groupcorporatemanager,
                groupactive: groupactive,
                overridename0: formval.overridename0,
                overriderole0: formval.overriderole0,
                overridecommission0: formval.overridecommission0,
                overridename1: formval.overridename1,
                overriderole1: formval.overriderole1,
                overridecommission1: formval.overridecommission1,
                overridename2: formval.overridename2,
                overriderole2: formval.overriderole2,
                overridecommission2: formval.overridecommission2,
                overridename3: formval.overridename3,
                overriderole3: formval.overriderole3,
                overridecommission3: formval.overridecommission3,
                overridename4: formval.overridename4,
                overriderole4: formval.overriderole4,
                overridecommission4: formval.overridecommission4,
                overridename5: formval.overridename5,
                overriderole5: formval.overriderole5,
                overridecommission5: formval.overridecommission5,
                no_on_introduction: formval.no_on_introduction,
               /* uniqueid: formval.uniqueid,
                addedby: this.cookiedetails.username*/
            };
            this._http.post(link, data)
                .subscribe(res => {
                    let result = res.json();
                    //  console.log(result);
                    if (result.status == 'error' && result.id == '-1') {
                        this.alreadyexist = 'Group Name already exists';
                    }
                    if (result.status == 'success') {
                        console.log('success');
                        this.alreadyexist = null;
                      //  this.router.navigate(['/helpdesklist']);
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
