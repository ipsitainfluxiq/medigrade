import { Component, OnInit,Input } from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'ngx-cookie-service';
declare var moment: any;

@Component({
  selector: 'app-signoptinform',
  templateUrl: './signoptinform.component.html',
  styleUrls: ['./signoptinform.component.css'],
  providers: [Commonservices],
})
export class SignoptinformComponent implements OnInit {
  public dataForm: FormGroup;
  private fb;
  public serverurl;
  public directnodeurl;
  public urlis;
  public id;
  public saveonly;
//  private addcookie: CookieService;
 // private cookiedetails;
  public showvalidationerror = 0;
  public usastates;
  public successmodal: boolean = false;

  constructor(fb: FormBuilder, private _http: Http, private router: Router, public _commonservices: Commonservices, private route: ActivatedRoute) {
    this.fb = fb;
    this.serverurl = _commonservices.url;
    this.directnodeurl = _commonservices.directnodeurl;
    this.urlis = _commonservices.urlis;
   // this.addcookie = addcookie ;
   // this.cookiedetails = this.addcookie.get('cookiedetails');
    this.getusastates();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      this.getdetailsbyid();
    });
    this.dataForm = this.fb.group({
      wellness_screening: [''],
      cancer_germanics: [''],
      hereditary_carrier: [''],
      pharmacogenomics: [''],
      gastrointestinal: [''],
      medical_devices: [''],
      allergy_testing: [''],
      respiratory: [''],
      firstname: [''],
      lastname: [''],
      phone: [''],
      email: [''],
      address: [''],
      city: [''],
      state: [''],
      zip: [''],
      age: [''],
      Medicare_part_B: [''],
      med_Advantage: [''],
      uhc_ppo: [''],
      aetna_ppo: [''],
      cigna_ppo: [''],
      humana_ppo: [''],
      sign: ['',Validators.required]
    });
  }


  dosubmit() {
    console.log('dosubmit');
    console.log(this.dataForm.valid);
    this.showvalidationerror = 1;
    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
    }
    if (this.dataForm.valid) {
      let link= this.directnodeurl + 'addorupdatedata';
      let data ={
        status:'Patient signature completed',
        sign:this.dataForm.controls['sign'].value,
        signaturetime:new Date().getTime(),
        id:this.id,
      };
      this._http.post(link, {source:'optindata',data:data})
          .subscribe(res => {
            let result = res.json();
            if (result.status == 'error') {
            }
            if (result.status == 'success') {
              this.successmodal=true;
              setTimeout(()=>{
                this.successmodal=false;
              },3000);

            }
          }, error => {
            console.log('Oooops!');
          });
    }
  }

  getdetailsbyid() {
    let link = this.directnodeurl + 'datalist';
        this._http.post(link, {source:'optindata',condition:{_id_object:this.id}})
        .subscribe(res => {
          let result = res.json();
          if(result.res.length>0) {
            this.dataForm = this.fb.group({
              wellness_screening: [result.res[0].wellness_screening],
              cancer_germanics: [result.res[0].cancer_germanics],
              hereditary_carrier: [result.res[0].hereditary_carrier],
              pharmacogenomics: [result.res[0].pharmacogenomics],
              gastrointestinal: [result.res[0].gastrointestinal],
              medical_devices: [result.res[0].medical_devices],
              allergy_testing: [result.res[0].allergy_testing],
              respiratory: [result.res[0].respiratory],
              firstname: [result.res[0].firstname],
              lastname: [result.res[0].lastname],
              phone: [result.res[0].phone],
              email: [result.res[0].email],
              address: [result.res[0].address],
              city: [result.res[0].city],
              state: [result.res[0].state],
              zip: [result.res[0].zip],
              age: [result.res[0].age],
              Medicare_part_B: [result.res[0].Medicare_part_B],
              med_Advantage: [result.res[0].med_Advantage],
              uhc_ppo: [result.res[0].uhc_ppo],
              aetna_ppo: [result.res[0].aetna_ppo],
              cigna_ppo: [result.res[0].cigna_ppo],
              humana_ppo: [result.res[0].humana_ppo],
              sign: ['',Validators.required]
            });
          }
          }, error => {
            console.log('Oooops!');
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
  onHidden(){
    this.successmodal=false;
  }
}

