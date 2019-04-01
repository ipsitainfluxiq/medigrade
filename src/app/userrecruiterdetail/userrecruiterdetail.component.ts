import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {Location} from '@angular/common';
declare var moment: any;
declare var $: any;
@Component({
    selector: 'app-userrecruiterdetail',
    templateUrl: './userrecruiterdetail.component.html',
    styleUrls: ['./userrecruiterdetail.component.css'],
    providers: [Commonservices],
})
export class UserrecruiterdetailComponent implements OnInit {
  private addcookie: CookieService;
  private cookiedetails;
  public serverurl;
  public id;
  public type;
  public dataForm: FormGroup ;
  public fb;
  public usastates;
  public passerror ;
  public getdetailsbyidis ;
  public tags ;
  public allusers;
  // to add edit delete note
  public divaddnote;
  public addnote;
  public noteslist;
  public addit = 1;
  public allnotearr: any = [];
  public successfuladdnotemodal: boolean = false;
  public successfulupdatenotemodal: boolean = false;
  public editnoteid;
  public shownoteerror;
  public showdeletenotemodal: boolean = false;
  public showdeletesuccessmodal: boolean = false;
  public deleteid;
  public addpatientvalidation: any = 0;
  private usertype: string;
  private addedby: string;

    constructor( fb: FormBuilder, private _http: Http, private router: Router, private route: ActivatedRoute, public _commonservices: Commonservices, addcookie: CookieService,private _location: Location) {
        this.fb = fb;
        this.serverurl = _commonservices.url;
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.get('cookiedetails');
        this.usertype = this.addcookie.get('type');
        this.getusastates();
        this.alltags();
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            console.log('this.id');
            console.log(this.id);
            this.getdetailsbyid();
            this.getnotes();
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
            agentexperience: [''],
            olderclients: [''],
            noofplanBcard: [''],
        });

        if(this.usertype!='superadmin') {
          console.log('user type .....'+this.usertype);
          console.log($('.addedbyinput').length);
          $('.addedbyinput').prop('disabled', 'disabled');
        }
    }
  ngAfterViewChecked(){
    if(this.usertype!='superadmin') {
      console.log('user type .....'+this.usertype);
      console.log($('.addedbyinput').length);
      $('.addedbyinput').prop('disabled', 'disabled');
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

    showtime(dateis) {
        if (dateis != null) {
            return moment(dateis).format('MM-DD-YYYY');
        }
        else {
            return '';
        }
    }

    // To show the employment status
    alltags() {
        let link = this.serverurl + 'alltags';
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                    this.tags = result.id;
                }
            }, error => {
                console.log('Oooops!');
            });
    }

    showtagname(tagid) {
        for (let i in this.tags) {
            if (this.tags[i]._id == tagid) {
                return this.tags[i].tagname;
            }
        }
    }

  gotoagreementpdf(id) {
    /* var url = 'http://altushealthgroup.com/testpdf/html2pdf/employment-agreement.php?id=' + id;*/
    var url = 'http://' + this._commonservices.commonvalue.commonurl1 + '/testpdf/html2pdf/employment-agreement.php?id=' + id;
    window.open(url, '_blank');
  }

  getdetailsbyid() {
    let link = this.serverurl + 'getuserdetailswithtags';
    let data = {userid : this.id};
    this._http.post(link, data)
      .subscribe(res => {
        let result = res.json();
        //   console.log(result);
        if (result.status == 'success' && typeof(result.id) != 'undefined') {
          console.log('result.id------------------------------');
          console.log(result.id);
          this.getdetailsbyidis = result.id;
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
                        agentexperience: [userdet.agentexperience],
                        olderclients: [userdet.olderclients],
                        noofplanBcard: [userdet.noofplanBcard],
                    });
                } else {
                }
            }, error => {
                console.log('Ooops');
            });
    }

    dosubmit(formval) {
        this.addpatientvalidation = 1;
        this.passerror = null;
        console.log('formval');
        console.log(formval);
        console.log(this.addedby);
        if (formval.password == null || formval.password == '') {
            //  if (this.dataForm.valid && this.passmatchvalidate && UserrecruitereditComponent.invalidpassword == false) {
            if (this.dataForm.valid) {
                let link= this.serverurl + 'edituserdetails';
                let data = {
                  id: this.id,
                  firstname: formval.firstname,
                  addedby: formval.addedby,
                  lastname: formval.lastname,
                  address: formval.address,
                  address2: formval.address2,
                  phone: formval.phone,
                  city: formval.city,
                  state: formval.state,
                  zip: formval.zip,
                  gender: formval.gender,
                  dob: formval.dob,
                  type: formval.type,
                  agentexperience: formval.agentexperience,
                  olderclients: formval.olderclients,
                  noofplanBcard: formval.noofplanBcard,
                };
                this._http.post(link, data)
                    .subscribe(data => {
                        //this.router.navigate(['/userrecruiterlist', formval.type]);
                      this._location.back();
                    }, error => {
                        console.log('Oooops!');
                    });
            }
        }
        else {
            this.passerror = null;
            if (formval.password == formval.confpassword) {
                if (formval.password.length >= 8) {
                    console.log('2 step ahd');
                    if (!formval.password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)) {
                        this.passerror = 'Password must contain at least 8 characters,one lower case character , one upper case character , one number, one special character';
                    }
                    else {
                        this.passerror = null;
                        // if (this.dataForm.valid) {
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
                            type: formval.type,
                            agentexperience: formval.agentexperience,
                            olderclients: formval.olderclients,
                            noofplanBcard: formval.noofplanBcard,
                        };
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

    // note requirements

    showtimefornote(time) {
        return moment(time).format('MMM Do, YYYY');
    }
    showname(id) {
        for (let i in this.allusers) {
            if (this.allusers[i]._id == id) {
                return this.allusers[i].firstname + ' ' + this.allusers[i].lastname;
            }
        }
    }
    getnotes() {
        this.allnotearr = [];
        let link = this.serverurl + 'getnotesforusers';
        let data = {userid : this.id};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success' && typeof(result.id) != 'undefined') {
                    this.noteslist = result.id;
                    console.log('this.noteslist----');
                    console.log(this.noteslist);
                } else {
                }
            }, error => {
                console.log('Ooops');
            });
    }

    addsimplenote() {
        let data;
        let link = this.serverurl + 'noteaddforusers';
        if (this.addnote != null) {
            data = {
                userid: this.id,
                added_by: this.cookiedetails,
                note: this.addnote,
                //  added_on: this.getdate(),
            };
            this._http.post(link, data)
                .subscribe(res => {
                    let result = res.json();
                    if (result.status == 'success') {
                        this.addnote = null;
                        this.divaddnote = false;
                        this.successfuladdnotemodal = true;
                        setTimeout(() => {
                            this.successfuladdnotemodal = false;
                        }, 2000);
                        this.getnotes();
                    }
                }, error => {
                    console.log('Oooops!');
                });
            // }
        }
        else {
            this.shownoteerror = true;
        }
    }

    updatesimplenote() {
        let link = this.serverurl + 'noteupdateforusers';
        let data = {
            _id: this.editnoteid,
            note: this.addnote,
        };
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                    this.divaddnote = false;
                    this.addnote = null;
                    this.addit = 1;
                    this.getnotes();
                    this.successfulupdatenotemodal = true;
                    setTimeout(() => {
                        this.successfulupdatenotemodal = false;
                    }, 2000);
                }
            }, error => {
                console.log('Oooops!');
            });
    }

    deletethisnote() {
        let link = this.serverurl + 'notedeleteforusers';
        let data = {
            _id: this.deleteid,
        };
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                    this.showdeletenotemodal = false;
                    this.showdeletesuccessmodal = true;
                    setTimeout(() => {
                        this.showdeletesuccessmodal = false;
                    }, 2000);
                    this.getnotes();
                }
            }, error => {
                console.log('Oooops!');
            });
    }

    editnote(item) {
        this.editnoteid = item._id;
        this.divaddnote = true;
        this.addnote = item.note;
        this.addit = 0; // edit
    }

    show_div_to_add_note() {
        this.divaddnote = true;
    }

    cancelnote() {
        this.addnote = null;
        this.divaddnote = false;
    }

    deletenote(id) {
        this.deleteid = id;
        this.showdeletenotemodal = true;
    }
    onHidden() {
        this.showdeletenotemodal = false;
    }

/*    getdetailsbyid() {
        let link = this.serverurl + 'getuserdetails';
        let data = {userid : this.id};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                //   console.log(result);
                if (result.status == 'success' && typeof(result.id) != 'undefined') {
                    console.log(result.id);
                    this.userrecruitterdetails = result.id;
                    this.type = result.id.type;
                } else {
                }
            }, error => {
                console.log('Ooops');
            });
    }*/
    addpatientvalidationcall() {
        this.addpatientvalidation = 0;
    }
}
