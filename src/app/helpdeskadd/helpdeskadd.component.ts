import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-helpdeskadd',
  templateUrl: './helpdeskadd.component.html',
  styleUrls: ['./helpdeskadd.component.css'],
  providers: [Commonservices],
})
export class HelpdeskaddComponent implements OnInit {
  public addcookie: CookieService;
  public cookiedetails;
  public serverurl;
  public dataForm: FormGroup ;
  public fb;
  public type;
  public usastates;
  public passerror;
  static invalidemail;
  static blankemail;
  static invalidpassword;
  static invalidusername;
  private passmatchvalidate;
  public alreadyexist: any;
  public uniquerepid;
  public username;
  public showvalidationerror = 0;
  id: number;
    public addpatientvalidation: any = 0;

  constructor(fb: FormBuilder, addcookie: CookieService, private _http: Http, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices) {
    this.fb = fb;
    this.serverurl = _commonservices.url;
    this.addcookie = addcookie;
    this.cookiedetails = this.addcookie.get('cookiedetails');
    this.username = this.addcookie.get('username');
    console.log('this.cookiedetails');
    console.log(this.cookiedetails);
      this.getusastates();
      this.getuniquerepid();
    HelpdeskaddComponent.blankemail = false;
    HelpdeskaddComponent.invalidemail = false;
  }

  ngOnInit() {
   /* this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      this.getdetailsbyid();
    });*/
    this.passmatchvalidate = false;
    this.dataForm = this.fb.group({
      uniqueid: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      address: ['', Validators.required],
      username: ['', Validators.compose([Validators.required, HelpdeskaddComponent.validateUsername])],
      email: ['', Validators.compose([Validators.required, HelpdeskaddComponent.validateEmail])],
      password: ['', Validators.compose([Validators.required, HelpdeskaddComponent.validatePassword])],
      confpassword: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      gender: ['', Validators.required],
      zip: ['', Validators.required],
      dob: ['', Validators.required],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
    }, {validator: this.matchingPasswords('password', 'confpassword')});

  }
  getuniquerepid() {
    let link = this.serverurl + 'getuniquerepid';
    this._http.get(link)
        .subscribe(res => {
          let result = res.json();
          console.log(result);
          this.uniquerepid = result.id;
         // this.dataForm.value.uniqueid = this.uniquerepid;
          this.dataForm.patchValue({
            uniqueid : this.uniquerepid
          });
        }, error => {
          console.log('Oooops!');
        });
  }
  cancelit() {
    this.router.navigate(['/helpdesklist']);
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
  static validateEmail(control: FormControl) {
    HelpdeskaddComponent.blankemail = false;
    HelpdeskaddComponent.invalidemail = false;

    if (control.value == '' || control.value == null) {
      HelpdeskaddComponent.blankemail = true;
      return {'invalidemail': true};
    }
    if (!control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      HelpdeskaddComponent.invalidemail = true;
      return {'invalidemail': true};
    }
  }

  static validatePassword(control: FormControl) {
    HelpdeskaddComponent.invalidpassword = false;
    if (control.value == '' || control.value == null) {
      return {'invalidpassword': false};
    }
    if (!control.value.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)) {
      //  if (!control.value.match(/^[a-zA-Z0-9_]+$/)) {
      HelpdeskaddComponent.invalidpassword = true;
      return {'invalidpassword': true};
    }
  }
  static validateUsername(control: FormControl) {
    HelpdeskaddComponent.invalidusername = false;
    if (control.value == '' || control.value == null) {
      console.log('control.value null');
      return {'invalidusername': false};
    }
    // if (!control.value.match(/^(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{3,})$/)) {
    if (!control.value.match(/^([a-zA-Z0-9]{3,})*$/)) {
      HelpdeskaddComponent.invalidusername = true;
      return {'invalidusername': true};
    }
  }
  getemail(type: any) {
    // console.log('t '+type);
    if (type == 'invalid') {
      return HelpdeskaddComponent.invalidemail;
    }
    if (type == 'blank') {
      return HelpdeskaddComponent.blankemail;
    }
  }

  getpassword(type: any) {
    if (type == 'invalid') {
      return HelpdeskaddComponent.invalidpassword;
    }
  }

  getusername(type: any) {
    if (type == 'invalid') {
      return HelpdeskaddComponent.invalidusername;
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
    this.showvalidationerror = 1;
    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
    }
    if (this.dataForm.valid && this.passmatchvalidate && (HelpdeskaddComponent.invalidemail == false || HelpdeskaddComponent.blankemail == false) && HelpdeskaddComponent.invalidusername == false && HelpdeskaddComponent.invalidpassword == false) {
      let link = this.serverurl + 'helpdesk';
      let data = {
        firstname: formval.firstname,
        lastname: formval.lastname,
        username: formval.username,
        email: formval.email,
        password: formval.password,
        address: formval.address,
        city: formval.city,
        state: formval.state,
        zip: formval.zip,
        gender: formval.gender,
        dob: formval.dob,
        phone: formval.phone,
        uniqueid: formval.uniqueid,
        addedby: this.username,
        type: 'helpdesk'
      };
      this._http.post(link, data)
          .subscribe(res => {
            let result = res.json();
            //  console.log(result);
            if (result.status == 'error' && result.id == '-1') {
              console.log('inside mailexists');
              this.alreadyexist = 'Emailid already exists';
            }
            if (result.status == 'error' && result.id == '-2') {
              console.log('inside Username exists');
              this.alreadyexist = 'Username already exists';
            }
            if (result.status == 'success') {
              console.log('success');
              this.alreadyexist = null;
              this.router.navigate(['/helpdesklist']);
            }
          }, error => {
            console.log('Oooops!');
          });
    }
  }
/*  getdetailsbyid() {
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
              username: [userdet.username, Validators.compose([Validators.required, HelpdeskaddComponent.validateUsername])],
              password: [''],
              confpassword: [''],
              firstname: [userdet.firstname, Validators.required],
              lastname: [userdet.lastname, Validators.required],
              address: [userdet.address, Validators.required],
              email: [userdet.email],
              phone: [userdet.phone, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
              city: [userdet.city, Validators.required],
              state: [userdet.state, Validators.required],
              gender: [userdet.gender, Validators.required],
              dob: [userdet.dob, Validators.required],
              type: [userdet.type, Validators.required],
              addedby: [userdet.addedby],
              /!* notes: [userdet.notes, Validators.required],
               status: [userdet.status, Validators.required],*!/
              zip: [userdet.zip, Validators.required],
              subdomain: [userdet.username],
            });
          } else {
            // this.router.navigate(['/patient-list']);
          }
        }, error => {
          console.log('Ooops');
        });
  }*/
    addpatientvalidationcall() {
        this.addpatientvalidation = 0;
    }
}
