import { Component, OnInit,Input } from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {PatientrecordComponent} from '../patientrecord/patientrecord.component' ;
import {CookieService} from 'ngx-cookie-service';
declare var moment: any;

@Component({
  selector: 'app-opt-in-form',
  templateUrl: './opt-in-form.component.html',
  styleUrls: ['./opt-in-form.component.css'],
  providers: [Commonservices],
})
export class OptInFormComponent implements OnInit {
  public dataForm: FormGroup;
  private fb;
  public serverurl;
  public directnodeurl;
  public urlis;
  public signis=null;
  public saveonly;
  private addcookie: CookieService;
  private cookiedetails;
  public showvalidationerror = 0;
  static invalidemail;
  static blankemail;
  public usastates;
  public successmodal: boolean = false;

  constructor(fb: FormBuilder, addcookie: CookieService, private _http: Http, private router: Router, public _commonservices: Commonservices, private route: ActivatedRoute, public patientrecord: PatientrecordComponent) {
    this.patientrecord=patientrecord;
    this.fb = fb;
    this.serverurl = _commonservices.url;
    this.directnodeurl = _commonservices.directnodeurl;
    this.urlis = _commonservices.urlis;
    this.addcookie = addcookie ;
    this.cookiedetails = this.addcookie.get('cookiedetails');
    OptInFormComponent.blankemail = false;
    OptInFormComponent.invalidemail = false;
    this.getusastates();
    this.getdetailsbyid();
  }

  ngOnInit() {
    this.dataForm = this.fb.group({
      wellness_screening: [''],
      cancer_germanics: [''],
      hereditary_carrier: [''],
      pharmacogenomics: [''],
      gastrointestinal: [''],
      medical_devices: [''],
      allergy_testing: [''],
      respiratory: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
   //   email: ['', Validators.compose([Validators.required, OptInFormComponent.validateEmail])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],
      address: ['', Validators.required],
      city: ['',    Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      age: [''],
      Medicare_part_B: [''],
      med_Advantage: [''],
      uhc_ppo: [''],
      aetna_ppo: [''],
      cigna_ppo: [''],
      humana_ppo: [''],
      sign: ['']
    });

  }
  getdetailsbyid() {
    let link = this.directnodeurl + 'datalist';
    this._http.post(link, {source:'optindata',condition:{patientid_object:this.patientrecord.id}})
        .subscribe(res => {
          let result = res.json();
          console.log(result.res.length);
          if(result.res.length>0) {
            console.log('inside if');
            this.signis=result.res[0].sign;
            this.dataForm = this.fb.group({
              wellness_screening: [result.res[0].wellness_screening],
              cancer_germanics: [result.res[0].cancer_germanics],
              hereditary_carrier: [result.res[0].hereditary_carrier],
              pharmacogenomics: [result.res[0].pharmacogenomics],
              gastrointestinal: [result.res[0].gastrointestinal],
              medical_devices: [result.res[0].medical_devices],
              allergy_testing: [result.res[0].allergy_testing],
              respiratory: [result.res[0].respiratory],
              firstname: [result.res[0].firstname, Validators.required],
              lastname: [result.res[0].lastname, Validators.required],
              phone: [result.res[0].phone, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
              email: [result.res[0].email, Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],
              address: [result.res[0].address, Validators.required],
              city: [result.res[0].city, Validators.required],
              state: [result.res[0].state, Validators.required],
              zip: [result.res[0].zip, Validators.required],
              age: [result.res[0].age],
              Medicare_part_B: [result.res[0].Medicare_part_B],
              med_Advantage: [result.res[0].med_Advantage],
              uhc_ppo: [result.res[0].uhc_ppo],
              aetna_ppo: [result.res[0].aetna_ppo],
              cigna_ppo: [result.res[0].cigna_ppo],
              humana_ppo: [result.res[0].humana_ppo],
              sign: [result.res[0].sign]
            });
          }
          else{
            console.log('inside else');
            this._http.post(link, {source:'patients',condition:{_id_object:this.patientrecord.id}})
                .subscribe(res => {
                  let result = res.json();
                  if(result.res.length>0) {
                    this.dataForm = this.fb.group({
                      wellness_screening: [''],
                      cancer_germanics: [''],
                      hereditary_carrier: [''],
                      pharmacogenomics: [''],
                      gastrointestinal: [''],
                      medical_devices: [''],
                      allergy_testing: [''],
                      respiratory: [''],
                      firstname: [result.res[0].firstname, Validators.required],
                      lastname: [result.res[0].lastname, Validators.required],
                      phone: [result.res[0].phone, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
                      email: [result.res[0].email, Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],
                      address: [result.res[0].address, Validators.required],
                      city: [result.res[0].city, Validators.required],
                      state: [result.res[0].state, Validators.required],
                      zip: [result.res[0].zip, Validators.required],
                      age: [result.res[0].age],
                      Medicare_part_B: [''],
                      med_Advantage: [''],
                      uhc_ppo: [''],
                      aetna_ppo: [''],
                      cigna_ppo: [''],
                      humana_ppo: [''],
                      sign: ['']
                    });
                  }
                }, error => {
                  console.log('Oooops!');
                });
          }
        }, error => {
          console.log('Oooops!');
        });
  }

  static validateEmail(control: FormControl) {
    OptInFormComponent.blankemail = false;
    OptInFormComponent.invalidemail = false;

    if (control.value == '' || control.value == null) {
      OptInFormComponent.blankemail = true;
      return {'invalidemail': true};
    }
    if (!control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      OptInFormComponent.invalidemail = true;
      return {'invalidemail': true};
    }
  }
  getemail(type: any) {
    if (type == 'invalid') {
      return OptInFormComponent.invalidemail;
    }
    if (type == 'blank') {
      return OptInFormComponent.blankemail;
    }
  }
  saveorsubmit(type){
    if(type==0) this.saveonly=true;
    if(type==1) this.saveonly=false;
  }
  dosubmit() {
    if(this.dataForm.controls['Medicare_part_B'].value==true){
      this.dataForm.controls['med_Advantage'].setValidators(Validators.required);
      this.dataForm.controls['med_Advantage'].markAsTouched();
      this.dataForm.controls["med_Advantage"].updateValueAndValidity();
    }
    else{
      this.dataForm.controls['med_Advantage'].clearValidators();
      this.dataForm.controls["med_Advantage"].updateValueAndValidity();
    }
    console.log('dosubmit');
    console.log(this.dataForm.valid);
    this.showvalidationerror = 1;
    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
    }
    if (this.dataForm.valid  && (OptInFormComponent.invalidemail == false || OptInFormComponent.blankemail == false)) {
      console.log(this.directnodeurl);
    let link= this.directnodeurl + 'addorupdatedata';
      let data =this.dataForm.value;
      if(this.saveonly==false){
        data.mailsendtime=new Date().getTime();
        data.status='Pending patient signature';
      }/*else{
        data.signaturetime=new Date().getTime();
      }*/
      /*console.log('data-------');
      console.log(data);*/
      data.saveonly=this.saveonly;
      data.patientid= this.patientrecord.id;
      data.url= this.urlis+'signoptinform';
      console.log('data-------');
      console.log(data);
      this._http.post(link, {source:'optindata',sourceobj:['patientid'],data:data})
          .subscribe(res => {
            let result = res.json();
            if (result.status == 'error') {
            }
            if (result.status == 'success') {
              this.successmodal=true;
              setTimeout(() => {
                this.successmodal=false;
                this.patientrecord.modal_for_opt_in_path=false;
              }, 3000);
            }
          }, error => {
            console.log('Oooops!');
          });
    }
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
  onHidden(){
    this.successmodal=false;
  }
}


