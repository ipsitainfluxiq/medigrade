import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
declare var $: any;
@Component({
  selector: 'app-mastergroupedit',
  templateUrl: './mastergroupedit.component.html',
  styleUrls: ['./mastergroupedit.component.css'],
  providers: [Commonservices],
})
export class MastergroupeditComponent implements OnInit {
  public dataForm: FormGroup ;
  public fb;
  id: number;
  public serverurl;
  public usastates;
  public passerror ;
  public addpatientvalidation: any = 0;
  public groupdescriptionerror;
  public ckeditorgroupdescription: any;
  public showvalidationerror = 0;
  public grouplist;
  public showflag = 2;

  constructor(fb: FormBuilder, private _http: Http, private router: Router, private route: ActivatedRoute, public _commonservices: Commonservices) {
    this.fb = fb;
    this.serverurl = _commonservices.url;
    this.ckeditorgroupdescription = '';
    this.getUserList();
  }
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      this.getdetailsbyid();
    });
    this.dataForm = this.fb.group({
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

  getUserList() {
    let link = this.serverurl + 'corporatemanagerlist';
    this._http.get(link)
        .subscribe(res => {
          let result = res.json();
          if (result.status == 'success') {
           // console.log(result);
            this.grouplist = result.id;
          }

        }, error => {
          console.log('Oooops!');
        });
  }
  
  getdetailsbyid() {
    let link = this.serverurl + 'getmastergroupdetails';
    let data = {userid : this.id};
    this._http.post(link, data)
        .subscribe(res => {
          let result = res.json();
          //   console.log(result);
          if (result.status == 'success' && typeof(result.id) != 'undefined') {
            console.log(result.id);
            let userdet = result.id;
            this.ckeditorgroupdescription = userdet.groupdescription;
            this.dataForm = this.fb.group({
              groupname: [userdet.groupname],
             // groupdescription: [userdet.groupdescription],
              groupcorporatemanager: [userdet.groupcorporatemanager, Validators.required],
              groupactive: [userdet.groupactive],
              overridename0: [userdet.overridename0, Validators.required],
              overriderole0: [userdet.overriderole0, Validators.required],
              overridecommission0: [userdet.overridecommission0, Validators.required],
              overridename1: [userdet.overridename1, Validators.required],
              overriderole1: [userdet.overriderole1, Validators.required],
              overridecommission1: [userdet.overridecommission1, Validators.required],
              overridename2: [userdet.overridename2, Validators.required],
              overriderole2: [userdet.overriderole2, Validators.required],
              overridecommission2: [userdet.overridecommission2, Validators.required],
              overridename3: [userdet.overridename3],
              overriderole3: [userdet.overriderole3],
              overridecommission3: [userdet.overridecommission3],
              overridename4: [userdet.overridename4],
              overriderole4: [userdet.overriderole4],
              overridecommission4: [userdet.overridecommission4],
              overridename5: [userdet.overridename5],
              overriderole5: [userdet.overriderole5],
              overridecommission5: [userdet.overridecommission5],
              no_on_introduction: [userdet.no_on_introduction, Validators.required]
            });
            setTimeout(() => {
            for (let i = 3; i < 6; i++) {
              let overridenameval = 'overridename' + i;
              if ( $( 'input[name="'+overridenameval+'"]').val() != '' && $( 'input[name="'+overridenameval+'"]' ).val() != null ) {
                $('.override' + i).removeClass('hide');
              this.showflag = i;
              }
            }
            }, 500);
          } else {
            this.router.navigate(['/mastergrouplist']);
          }
        }, error => {
          console.log('Ooops');
        });
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
            let link= this.serverurl + 'editmastergroupdetails';
            let data = {
              id: this.id,
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
            };
            console.log(data);
            this._http.post(link, data)
                .subscribe(data => {
                  this.router.navigate(['/mastergrouplist']);
                }, error => {
                  console.log('Oooops!');
                });
          }
      
  }
  cancelit() {
    this.router.navigate(['/mastergrouplist']);
  }
  addpatientvalidationcall() {
    this.addpatientvalidation = 0;
  }
  show_override_singlediv() {
    this.showflag++;
    $('.override' + this.showflag).removeClass('hide');
  }
}
