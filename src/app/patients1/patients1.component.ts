import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'ngx-cookie-service';
declare var $: any;
declare var moment: any;

@Component({
  selector: 'app-patients1',
  templateUrl: './patients1.component.html',
  styleUrls: ['./patients1.component.css'],
    providers: [Commonservices],
})
export class Patients1Component implements OnInit {
    public serverurl;
    public usastates;
    public idtoapproveordecline;
    public datalist;
    public isthisadmin;
    public p: number = 1;
    public addcookie: CookieService;
    public cookiedetails;
    public tags;
    public showdeg: any = [];
    public repuniqueid;
    public patientlist: any = [];
    public patientlistincomplete: any = [];
    public dataForm1: FormGroup ;
    public pateintquestioniremodal: boolean = false;
    public showquestionarydiv: boolean = false;
    public openapprovemodal: boolean = false;
    public opendeclinemodal: boolean = false;
    public fb;
    public patientuniqueid;
    // public cookieuniqueid;
    public patientnametoapproveordecline;
    public pgxval : boolean = false;
    public filterval;
    public filterval1;
    public filterval2;
    // public filterhitmap : any = null;
    public patientlistoriginal: any = [];
    public patientlistcomplete: any = [];
    public planbcard: any = '';
    public planbcard_1: any = '';
    public planbcard_2: any = '';
    public planbcard_3: any = '';
    public planbcard_4: any = '';
    public planbcard_5: any = '';
    public planbcard_6: any = '';
    public patientdetails;
    public opensymptommodalflag: boolean = false;
    public pgxmedicationmodal: boolean = false;
    public dataForm2: FormGroup ;
    public loadervalue:any = 0;
    public dataForm3: FormGroup ;
    public usertype: string;
    public selected_patient_id: any;
    public selected_patient_details: any;
    public patient_record_completed: any = 0;
    public commoncancer_symptomp_detail: any = 0;


    public enrollervals: any;
    public enrollervalstotal: any;
    public chk: Array<any>=[];
    public selarr: any = [];
    public searchtagflag: any = 0;
    public check_uncheck: any = 0;
    public itemsPerPage: number = 25;

    constructor(fb: FormBuilder, addcookie: CookieService, private _http: Http, private router: Router, public _commonservices: Commonservices, private route: ActivatedRoute) {
        this.serverurl = _commonservices.url;
        this.fb = fb;
        this.getusastates();
        //  if (this.isthisadmin != 'admin') {
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.get('cookiedetails');
        //  this.callcookiedetails();
        console.log(this.cookiedetails);
        // this.getpatientlistunderthisid();
        //  }
        this.alltags();
        this.dataForm1 = this.fb.group({
            cgx1: [''],
            pgxval: [''],
            firstname1: [''],
            lastname1: [''],
            phone1: [''],
            address1: [''],
            city1: [''],
            state1: [''],
            zip1: [''],
            dob1: [''],
            gender1: [''],
            race1: [''],
            height1: [''],
            width1: [''],
            weight1: [''],
            allergies1: [''],
            medicareclaim1: [''],
            notes1: [''],
            notes2: [''],
            notes3: [''],
            notes4: [''],
            pharmacyinsurancename: [''],
            pharmacyid: [''],
            pharmacybin: [''],
            pharmacypcn: [''],
            pharmacygroup: [''],
            pharmacyhistory: [''],
            pharmacyissue: [''],
            pharmacytreatment: [''],
            topicalpain: [''],
            oralpain: [''],
            derma: [''],
            migrane: [''],
            insurance1: ['' ],
            insurance2: [''  ],
            insurance3: [''  ],
            insurance4: [''  ],
            planbcard: [''],
            medicarepolicyno: [''],
            mediprimarypolicy: [''],
            comprimarypolicy: [''],
            medadvantageprimarypolicy: [''],
            medadvantageplan: [''],
            medadvantagepolicyno: [''],
            /*   phtype1: ['', Validators.required],*/
            phtype1: [''],
            /* phtype2: [''],*/
            phage: [''],
            phdead: [''],
            motype1: [''],
            /* motype2: [''],*/
            moage: [''],
            modead: [''],
            fatype1: [''],
            /* fatype2: [''],*/
            faage: [''],
            fadead: [''],
            dautype1: [''],
            /*  dautype2: [''],*/
            dauage: [''],
            daudead: [''],
            sontype1: [''],
            /* sontype2: [''],*/
            sonage: [''],
            sondead: [''],
            brotype1: [''],
            /*  brotype2: [''],*/
            broage: [''],
            brodead: [''],
            sistype1: [''],
            /* sistype2: [''],*/
            sisage: [''],
            sisdead: [''],
            neptype1: [''],
            /*  neptype2: [''],*/
            nepage: [''],
            nepdead: [''],
            niecetype1: [''],
            /*  niecetype2: [''],*/
            nieceage: [''],
            niecedead: [''],
            unctype1: [''],
            /*  unctype2: [''],*/
            uncage: [''],
            uncdead: [''],
            autntype1: [''],
            /*  autntype2: [''],*/
            autnage: [''],
            autndead: [''],
            moftype1: [''],
            /*   moftype2: [''],*/
            mofage: [''],
            mofdead: [''],
            momotype1: [''],
            /* momotype2: [''],*/
            momoage: [''],
            momodead: [''],
            daftype1: [''],
            /* daftype2: [''],*/
            dafage: [''],
            dafdead: [''],
            damtype1: [''],
            /*  damtype2: [''],*/
            damage: [''],
            damdead: [''],
            oth1type1: [''],
            /* oth1type2: [''],*/
            oth1age: [''],
            oth1dead: [''],
            oth2type1: [''],
            /* oth2type2: [''],*/
            oth2age: [''],
            oth2dead: [''],
            oth3type1: [''],
            /* oth3type2: [''],*/
            oth3age: [''],
            oth3dead: [''],
            pgx1: [''],
            pgx2: [''],
            pgx3: [''],
            pgx4: [''],
            pgx5: [''],
            pgx6: [''],
            pgx7: [''],
            pgx8: [''],
            pgx9: [''],
            pgx10: [''],
            pgx11: [''],
            pgx12: [''],
            pgx13: [''],
            pgx14: [''],
            pgx15: [''],
            pgx16: [''],
            pgx17: [''],
            pgx18: [''],
            /*  pgx19: [''],*/
            carrier: [''],
            carrierplan: [''],
            carrierpolicyno: [''],
            cancer_sup: [''  ],
            catheters_sup: [''  ],
            allergies_sup: ['' ],
            scooter_sup: [''],
            walker_sup: [''],
            braces_sup: ['' ],
            topical_sup: ['' ],
            pain_sup: [''],
            triedbraces: [''],
            lastbrace: [''],
            wound_sup: [''],
            diabetic_sup: ['' ],
            familyrelation0: [''],
            familyrelation1: [''],
            familyrelation2: [''],
            familyrelation3: [''],
            familyrelation4: [''],
            familyrelation5: [''],
            familyrelation6: [''],
            familyrelation7: [''],
            familyrelation8: [''],
            familyrelation9: [''],
            familyrelation10: [''],
            familyrelation11: [''],
            familyrelation12: [''],
            familyrelation13: [''],
            familyrelation14: [''],
            familyrelation15: [''],
            familyrelation16: [''],
            familyrelation17: [''],
            relation1: [''],
            relation2: [''],
            relation3: [''],
            relation4: [''],
            relation5: [''],
            relation6: [''],
            relation7: [''],
            relation8: [''],
            relation9: [''],
            relation10: [''],
            relation11: [''],
            relation12: [''],
            relation13: [''],
            relation14: [''],
            relation15: [''],
            relation16: [''],
            relation17: [''],
            relation18: [''],
            degree1: [''],
            degree2: [''],
            degree3: [''],
            degree4: [''],
            degree5: [''],
            degree6: [''],
            degree7: [''],
            degree8: [''],
            degree9: [''],
            degree10: [''],
            degree11: [''],
            degree12: [''],
            degree13: [''],
            degree14: [''],
            degree15: [''],
            degree16: [''],
            degree17: [''],
            degree18: [''],
            image: [''],
            phname: [''],
            familyrelation1name: [''],
            familyrelation2name: [''],
            familyrelation3name: [''],
            familyrelation4name: [''],
            familyrelation5name: [''],
            familyrelation6name: [''],
            familyrelation7name: [''],
            familyrelation8name: [''],
            familyrelation9name: [''],
            familyrelation10name: [''],
            familyrelation11name: [''],
            familyrelation12name: [''],
            familyrelation13name: [''],
            familyrelation14name: [''],
            familyrelation15name: [''],
            familyrelation16name: [''],
            familyrelation17name: [''],
            insurance1_1: [''],
            insurance2_1: [''],
            insurance3_1: [''],
            insurance4_1: [''],
            planbcard_1: [''],
            medicarepolicyno_1: [''],
            mediprimarypolicy_1: [''],
            medadvantageprimarypolicy_1: [''],
            medadvantageplan_1: [''],
            medadvantagepolicyno_1: [''],
            comprimarypolicy_1: [''],
            carrier_1: [''],
            carrierplan_1: [''],
            carrierpolicyno_1: [''],
            insurance1_2: [''],
            insurance2_2: [''],
            insurance3_2: [''],
            insurance4_2: [''],
            planbcard_2: [''],
            medicarepolicyno_2: [''],
            mediprimarypolicy_2: [''],
            medadvantageprimarypolicy_2: [''],
            medadvantageplan_2: [''],
            medadvantagepolicyno_2: [''],
            comprimarypolicy_2: [''],
            carrier_2: [''],
            carrierplan_2: [''],
            carrierpolicyno_2: [''],
            insurance1_3: [''],
            insurance2_3: [''],
            insurance3_3: [''],
            insurance4_3: [''],
            planbcard_3: [''],
            medicarepolicyno_3: [''],
            mediprimarypolicy_3: [''],
            medadvantageprimarypolicy_3: [''],
            medadvantageplan_3: [''],
            medadvantagepolicyno_3: [''],
            comprimarypolicy_3: [''],
            carrier_3: [''],
            carrierplan_3: [''],
            carrierpolicyno_3: [''],
            insurance1_4: [''],
            insurance2_4: [''],
            insurance3_4: [''],
            insurance4_4: [''],
            planbcard_4: [''],
            medicarepolicyno_4: [''],
            mediprimarypolicy_4: [''],
            medadvantageprimarypolicy_4: [''],
            medadvantageplan_4: [''],
            medadvantagepolicyno_4: [''],
            comprimarypolicy_4: [''],
            carrier_4: [''],
            carrierplan_4: [''],
            carrierpolicyno_4: [''],
            insurance1_5: [''],
            insurance2_5: [''],
            insurance3_5: [''],
            insurance4_5: [''],
            planbcard_5: [''],
            medicarepolicyno_5: [''],
            mediprimarypolicy_5: [''],
            medadvantageprimarypolicy_5: [''],
            medadvantageplan_5: [''],
            medadvantagepolicyno_5: [''],
            comprimarypolicy_5: [''],
            carrier_5: [''],
            carrierplan_5: [''],
            carrierpolicyno_5: [''],
            insurance1_6: [''],
            insurance2_6: [''],
            insurance3_6: [''],
            insurance4_6: [''],
            planbcard_6: [''],
            medicarepolicyno_6: [''],
            mediprimarypolicy_6: [''],
            medadvantageprimarypolicy_6: [''],
            medadvantageplan_6: [''],
            medadvantagepolicyno_6: [''],
            comprimarypolicy_6: [''],
            carrier_6: [''],
            carrierplan_6: [''],
            carrierpolicyno_6: ['']
        });
        this.dataForm2 = this.fb.group({
            weightloss: [''],
            appetite: [''],
            eatingdisorder: [''],
            unabdominalpain: [''],
            upabdominalpain: [''],
            ruquadrantpain: [''],
            luquadrantpain: [''],
            labdominalpain: [''],
            rlquadrantpain: [''],
            llquadrantpain: [''],
            gabdominalpain: [''],
            vomiting1: [''],
            vomiting2: [''],
            vomiting3: [''],
            chronicfatigue: [''],
            otherfatigue: [''],
            anemia: [''],
            jaundice: [''],
            fatigue1: [''],
            fatigue2: [''],
            type1diabetes: [''],
            type2diabetes: [''],
            constipation: [''],
            abnormalweightloss: [''],
            abnormalweightgain: [''],
            hypertrophicdisorders: [''],
            bloodinstool: [''],
            skineruption: [''],
            xerosiscutis: [''],
            lumpinbreast: [''],
            thickeningbreast: [''],
            disordersofbreast: [''],
            rednessnipple: [''],
            nipplepain: [''],
            nippledischarge: [''],
            breastsize: [''],
            breastpain: [''],
            uterinebleeding: [''],
            bloodinurine: [''],
            melena: [''],
            stomachpainabdominalpain: [''],
            bowelhabits: [''],
            unconstipation: [''],
            diarrhea: [''],
            colonpolyps: [''],
            rectalbleeding: [''],
            abdominalbloating1: [''],
            abdominalbloating2: [''],
            idefecation: [''],
            ofecalabnormalities: [''],
            pancreaticuabdominalpain: [''],
            cholecystitis1: [''],
            cholecystitis2: [''],
            noofbloodclots: [''],
        });
        this.dataForm3 = this.fb.group({
            lithium: [''],
            abilify: [''],
            seroquel: [''],
            clonazepam: [''],
            latuda: [''],
            valium: [''],
            ativan: [''],
            zyprexa: [''],
            xanax: [''],
            zoloft: [''],
            celexa: [''],
            paxil: [''],
            cymbalta: [''],
            klonopin: [''],
            waellbutrin: [''],
            prozac: [''],
            lexapro: [''],
            amitriptyline: [''],
            viibryd: [''],
            trazodone: [''],
            nitros: [''],
            heartattack: [''],
            lipitor: [''],
            crestor: [''],
            zocor: [''],
            mevacor: [''],
            skinrash: [''],
            prilosec: [''],
            zantac: [''],
            nexium: [''],
            neurontin: [''],
            triamcinolone: [''],
            clobex: [''],
            fluocinonide: [''],
            betamethasone: ['']
        });
        this.getUserListunderthisusername('');
        this.getUserListunderthisusernamewithoutlimit('');
    }
    getUserListunderthisusername(username) {
        let link = this.serverurl + 'getUserListunderthisusername';
        let data = {username : username,limitval:100};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                    console.log(result);
                    this.enrollervalstotal = result.id;
                }
            }, error => {
                console.log('Oooops!');
            });
    }
    getUserListunderthisusernamewithoutlimit(username) {
        let link = this.serverurl + 'getUserListunderthisusername';
        let data = {username : username, limitval:this._commonservices.commonresultlimit};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                    console.log(result);
                    this.enrollervalstotal = result.id;
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
    showtime(time) {
        return moment(time).format('MM-DD-YYYY');
    }
    pagechange(){
        $('.chkinput').prop('checked',false);
        $('.chkallclass').prop('checked',false);
    }
    check_uncheck_all() {
        setTimeout(() => {
            var startpoint = (this.p - 1) * this.itemsPerPage;
            var endpoint = (this.p * this.itemsPerPage) - 1;
            console.log(this.check_uncheck);
            if (this.check_uncheck == true) {
                $('.chkinput').prop('checked',true);
                this.chk = [];
                this.selarr = [];
                for (let i = startpoint; i <= endpoint; i++) {
                    this.chk[i] = true;
                    this.searchtagflag++;
                    this.selarr.push(this.datalist[i]._id);
                }
            }
            else {
                $('.chkinput').prop('checked',false);
                for (let i = startpoint; i <= endpoint; i++) {
                    this.chk[i] = false;
                    let indexval: any = this.selarr.indexOf(this.datalist[i]._id);
                    this.selarr.splice(indexval, 1);
                    this.searchtagflag --;
                }
            }
            console.log('=====this.chk====');
            console.log(this.chk);
            console.log('=====this.selarr====');
            console.log(this.selarr);
        }, 50);
    }
    chkvals(itemval:any,ival:any) {


        setTimeout(() => {
            if (this.chk[ival] == true) {
                this.searchtagflag++;
                this.selarr.push(itemval._id);

             /*  this.selected_patient_id = itemval._id;
                this.selected_patient_details = itemval;

                if(itemval.PatientRecordCompletedOrNot[0].iscompleted == 1){this.patient_record_completed = 1;}
                else{this.patient_record_completed = 0;}

                if(itemval.Commoncancersymptomdetail[0].iscompleted == 1){this.commoncancer_symptomp_detail = 1;}
                else{this.commoncancer_symptomp_detail = 0;}*/

            }
            else {
                let indexval: any = this.selarr.indexOf(itemval._id);
                console.log(indexval);
                this.selarr.splice(indexval, 1);
                this.searchtagflag --;
/*
                this.selected_patient_id = null;
                this.selected_patient_details = null;
                this.patient_record_completed = 0;
                this.commoncancer_symptomp_detail = 0;*/
            }
            console.log(this.selarr);
            console.log(this.selarr.length);
        }, 50);
    }

    changenroller() {
        let link = this.serverurl + 'changeenroller';
        let data = {
            userid : this.selarr,
            enrollerusername : this.enrollervals,
            page : 'patients',
        }
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                console.log(result);
                this.getPatient_addedbyList();
                $('.chkinput').prop('checked',false);
                this.selarr=[];
                this.chk=[];
                this.searchtagflag=0;
                console.log('this.searchtagflag');
                console.log(this.searchtagflag);
                /*if (result.status == 'success') {
                  if(this.usertype=='superadmin') this.getPatient_addedbyList();
                  else  this.router.navigate(['/patient-list']);
                }*/
            }, error => {
                console.log('Oooops!');
            });
    }

    /* callcookiedetails() {
    let link = this.serverurl + 'getuserdetails';
    let data = {userid : this.cookiedetails.id};
    this._http.post(link, data)
      .subscribe(res => {
        let result = res.json();
        if (result.status == 'success' && typeof(result.id) != 'undefined') {
          this.cookieuniqueid = result.id.uniqueid;
        } else {
        }
      }, error => {
        console.log('Ooops');
      });
  }*/

    getpatientuniqueid(patientid) {
        let link = this.serverurl + 'getpatientdetails';
        let data = {_id : patientid};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success' && typeof(result.item) != 'undefined') {
                    this.patientuniqueid = result.item.uniqueid;
                    this.getrepid(result.item.addedby);
                } else {
                }
            }, error => {
                console.log('Ooops');
            });
    }


    editheatmap(i) {
        console.log('coloradd' + i);
        //   this.showheatmapeditdiv = 1-this.showheatmapeditdiv;
        $('.td_color_con').addClass('hide');
        $('.coloradd' + i).removeClass('hide');
    }

    getrepid(itemid) {
        let link = this.serverurl + 'getrepdetails';
        let data = {_id : itemid};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success' && typeof(result.item) != 'undefined') {
                    this.repuniqueid = result.item.uniqueid;
                } else {
                }
            }, error => {
                console.log('Ooops');
            });
    }

    onHidden() {
        this.pateintquestioniremodal = false;
        this.openapprovemodal = false;
        this.opendeclinemodal = false;
        this.opensymptommodalflag = false;
        this.pgxmedicationmodal = false;
    }
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.isthisadmin = params['id'];
            console.log(this.isthisadmin);
        });
        if (this.isthisadmin == 'admin') {

            let usertype=this.addcookie.get('type');
            this.usertype=this.addcookie.get('type');
            console.log('usertype');
            console.log(usertype);

            console.log('this.isthisadmin**************');
            console.log(this.isthisadmin);
            if(usertype=='superadmin') this.getPatient_addedbyList();
            else  this.router.navigate(['/patient-list']);
        }
        else {
            console.log('admin but not with admin argument .... ');
            this.usertype=this.addcookie.get('type');
            if(this.usertype=='superadmin') this.router.navigate(['/patient-list','admin']);
            // else  this.router.navigate(['/patient-list']);
            console.log('this.isthisadmin@@@@@@@@');
            console.log(this.isthisadmin);
            this.getpatientlistunderthisid();
        }
    }
    filterbyhitmap(val) {
        console.log(this.patientlist);
        this.patientlistcomplete = [];
        if (val == 'RED' || val == 'GREEN' || val == 'YELLOW' ) {
            for (let i in this.patientlist) {
                // console.log(this.patientlistoriginal[i].PatientRecordCompletedOrNot[0]);
                if (this.patientlist[i].PatientRecordCompletedOrNot[0] != null && this.patientlist[i].PatientRecordCompletedOrNot[0].hit_map_value!=null) {
                    if (this.patientlist[i].PatientRecordCompletedOrNot[0].hit_map_value.toLowerCase() == val.toLowerCase()) {
                        //  this.patientlist.push(this.patientlistoriginal[i]);
                        this.patientlistcomplete.push(this.patientlist[i]);
                    }
                }
            }
        }
        else if (val == 'GREY') {
            for (let i in this.patientlist) {
                // if (this.patientlistoriginal[i].PatientRecordCompletedOrNot[0] != null) {
                if (this.patientlist[i].hit_map_value == '') {
                    //   this.patientlist.push(this.patientlistoriginal[i]);
                    this.patientlistcomplete.push(this.patientlist[i]);
                }
                //  }
            }
        }
        else {
            // this.patientlist = this.patientlistoriginal;
            this.patientlistcomplete = this.patientlistoriginal;
        }

        /*
             // this.filterhitmap = val;
           /!* this.filterval2 = '';
            this.filterval2 = val;
              this.searchbyval(); *!/
         //   this.patientlistoriginal = this.patientlist;
            console.log('=======');
            console.log(this.patientlistoriginal);
            this.patientlist = [];
            this.patientlistcomplete = [];
            if (val == 'RED' || val == 'GREEN' || val == 'YELLOW' ) {
              for (let i in this.patientlistoriginal) {
               // console.log(this.patientlistoriginal[i].PatientRecordCompletedOrNot[0]);
                if (this.patientlistoriginal[i].PatientRecordCompletedOrNot[0] != null) {
                if (this.patientlistoriginal[i].PatientRecordCompletedOrNot[0].hit_map_value == val) {
                //  this.patientlist.push(this.patientlistoriginal[i]);
                  this.patientlistcomplete.push(this.patientlistoriginal[i]);
                }
                }
              }
            }
            else if (val == 'GREY') {
              for (let i in this.patientlistoriginal) {
               // if (this.patientlistoriginal[i].PatientRecordCompletedOrNot[0] != null) {
                  if (this.patientlistoriginal[i].hit_map_value == '') {
                 //   this.patientlist.push(this.patientlistoriginal[i]);
                    this.patientlistcomplete.push(this.patientlistoriginal[i]);
                  }
              //  }
              }
            }
            else {
              this.patientlist = this.patientlistoriginal;
              this.patientlistcomplete = this.patientlistoriginal;
            //  this.patientlist = this.patientlistcomplete;
            }*/
    }

    alltags() {
        let link = this.serverurl + 'alltags';
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                    console.log(result);
                    this.tags = result.id;
                }

            }, error => {
                console.log('Oooops!');
            });
    }

    showtagnme(tagid) {
        if (tagid != null) {
            for (let i in this.tags) {
                if (this.tags[i]._id == tagid) {
                    return this.tags[i].tagname;
                }
            }
        }
    }

    /*   getPatientList() {
        let link = this.serverurl + 'patientList';
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                    console.log(result);
                    this.datalist = result.id;
                }

            }, error => {
                console.log('Oooops!');
            });
    }*/

    gotopdf(id) {
        // var url = 'http://altushealthgroup.com/testpdf/html2pdf/ppqformpdf.php?id=' + id;
        var url = 'http://' + this._commonservices.commonvalue.commonurl1 + '/downloadppsadmin.php?id=' + id._id+'&fname='+id.firstname+'&lastname='+id.lastname+'&uid='+id.uniqueid;
        window.open(url, '_blank');
    }
    gotopdf1() {
        // var url = 'http://altushealthgroup.com/testpdf/html2pdf/ppqformpdf.php?id=' + id;
        var url = 'https://' + this._commonservices.commonvalue.commonurl + '/downloadppsadmin.php?id=' + this.selected_patient_details._id+'&fname='+this.selected_patient_details.firstname+'&lastname='+this.selected_patient_details.lastname+'&uid='+this.selected_patient_details.uniqueid;
        window.open(url, '_blank');
    }


    hitmapupdate(patientid , val) {
        let link = this.serverurl + 'hitmapupdate';
        this.loadervalue=1;
        if (val == 1) { // red
            var data = {
                patientid: patientid,
                hit_map_value: 'RED',
            };
        }
        if (val == 2) { // green
            var data = {
                patientid: patientid,
                hit_map_value: 'GREEN',
            };
        }
        if (val == 3) { // yellow
            var data = {
                patientid: patientid,
                hit_map_value: 'YELLOW',
            };
        }
        this._http.post(link, data)
            .subscribe(data => {
                let result = data.json();
                if (result.status == 'success') {
                  //  this.patientlistcomplete = [];
                    this.getPatient_addedbyList();
                }
            }, error => {
                console.log('Oooops!');
            });
    }


    // admin call to patientlist
    getPatient_addedbyList() {
        this.loadervalue = 1;
        this.patientlist = [];
        this.patientlistincomplete = [];
        this.patientlistoriginal = [];
        let link = this.serverurl + 'patient_addedbylist?limit=100';
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                    console.log(result.id);
                    this.datalist = result.id;
                    this.patientlist = this.datalist;
                    this.loadervalue=0;
                    //   this.enrollervalstotal = this.datalist;
                    for (let i in this.patientlist) {
                        if (this.patientlist[i].hit_map_value == '') {
                            this.patientlistincomplete.push(this.patientlist[i]);
                        }
                        else {
                            this.patientlistcomplete.push(this.patientlist[i]);
                        }
                    }
                    this.patientlistoriginal = this.patientlistcomplete;
                    this.getPatient_addedbyListwithoutlimit();
                    /* for (let j in this.datalist) {
                         if (this.datalist[j].PatientRecordCompletedOrNot.length > 0) {
                             console.log('inside');
                             if (this.datalist[j].PatientRecordCompletedOrNot[0].iscompleted == 1) {
                                 this.patientlist.push(this.datalist[j]);
                             }
                         }
                     }*/
                }

            }, error => {
                console.log('Oooops!');
            });
        console.log('this.patientlist------1----');
        console.log(this.patientlist);
    }
    getPatient_addedbyListwithoutlimit() {
        //   this.loadervalue = true;
        // this.patientlist = [];
        // this.patientlistoriginal = [];
        let link = this.serverurl + 'patient_addedbylist';
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                    console.log(result.id);
                    this.datalist = result.id;
                    /* this.enrollervalstotal = this.datalist;
                     console.log('=====================this.enrollervalstotal===================');
                     console.log(this.enrollervalstotal);*/
                    //   this.loadervalue = false;
                    this.patientlist = this.datalist;
                    this.patientlistincomplete = [];
                    this.patientlistcomplete = [];
                    for (let i in this.patientlist) {
                        if (this.patientlist[i].hit_map_value == '') {
                            this.patientlistincomplete.push(this.patientlist[i]);
                        }
                        else {
                            this.patientlistcomplete.push(this.patientlist[i]);
                        }
                    }
                    this.patientlistoriginal = this.patientlistcomplete;
                    /* for (let j in this.datalist) {
                                if (this.datalist[j].PatientRecordCompletedOrNot.length > 0) {
                                    console.log('inside');
                                    if (this.datalist[j].PatientRecordCompletedOrNot[0].iscompleted == 1) {
                                        this.patientlist.push(this.datalist[j]);
                                    }
                                }
                            }*/
                }

            }, error => {
                console.log('Oooops!');
            });
        console.log('this.patientlist----------');
        console.log(this.patientlist);
        console.log('this.patientlistcomplete----------');
        console.log(this.patientlistcomplete);
    }

    gotopatientrecord(id, tagid) {
        if (tagid == '5b0bfa1b3fe08865e7955f71') {
            this.router.navigate(['/patientrecord', id, 1]); // accept
        }
        if (tagid == '5b0bfa1d3fe08865e7955f72') {
            this.router.navigate(['/patientrecord', id, 2]); // decline
        }
        if (tagid == '5b0cda8121eaaa0244d52b9e') {
            this.router.navigate(['/patientrecord', id, 3]); // lead
        }
        if (tagid == '5b0b9235b33cbc2d4af08dd9') {
            this.router.navigate(['/patientrecord', id, 4]); // pps submitted
        }
        if (tagid == '5afad90dde56b53d10e2ab4d') {
            this.router.navigate(['/patientrecord', id, 5]); // pf submitted
        }
        /* if ((tagid != '5b0bfa1b3fe08865e7955f71') && (tagid != '5b0bfa1d3fe08865e7955f72')) {
      this.router.navigate(['/patientrecord', id, 3]);
    }*/
    }
    get4rowClass() {
        if (this.isthisadmin != 'admin') {
            return 'pateints_list_weraper4row';
        }
    }
    getHitmapClass(val) {
        /*   if (this.filterhitmap == 'RED') {
               return 'active_filter';
           }
           if (val == 2) {
               return 'active_filter';
           }if (val == 3) {
               return 'active_filter';
           }if (val == 4) {
               return 'active_filter';
           }*/
    }

    approveitmodal(itemtoapprove) {
        this.openapprovemodal = true;
        this.idtoapproveordecline = itemtoapprove._id;
        this.patientnametoapproveordecline = itemtoapprove.firstname + ' ' + itemtoapprove.lastname;
    }
    declineitmodal(itemtodecline) {
        this.opendeclinemodal = true;
        this.idtoapproveordecline = itemtodecline._id;
        this.patientnametoapproveordecline = itemtodecline.firstname + ' ' + itemtodecline.lastname;
    }
    approveit() {
        let link = this.serverurl + 'patientapprove';
        let data = {
            patientid: this.idtoapproveordecline,
        };
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                    this.openapprovemodal = false;
                    if (this.isthisadmin == 'admin') {

                        //alert(usertype);
                        this.getPatient_addedbyList();
                    }
                    else {
                        this.getpatientlistunderthisid();
                    }
                }
            }, error => {
                console.log('Oooops!');
            });
    }
    declineit() {
        let link = this.serverurl + 'patientdecline';
        let data = {
            patientid: this.idtoapproveordecline,
        };
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                    this.opendeclinemodal = false;
                    if (this.isthisadmin == 'admin') {
                        this.getPatient_addedbyList();
                    }
                    else {
                        this.getpatientlistunderthisid();
                    }
                }
            }, error => {
                console.log('Oooops!');
            });
    }
    // user call to patientlist
    getpatientlistunderthisid() {
        this.loadervalue = 1;
        let link = this.serverurl + 'getpatientlistunderthisid';
        let data = {
            userid: this.cookiedetails,
        };
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                    this.datalist = result.id;
                    this.loadervalue = 0;
                    this.patientlist = this.datalist;
                    //  this.patientlistoriginal = this.patientlist;
                    console.log('this.patientlist under this userid');
                    console.log(this.patientlist);
                    for (let i in this.patientlist) {
                        if (this.patientlist[i].hit_map_value == '') {
                            this.patientlistincomplete.push(this.patientlist[i]);
                        }
                        else {
                            this.patientlistcomplete.push(this.patientlist[i]);
                        }
                    }
                    this.patientlistoriginal = this.patientlistcomplete;
                }
            }, error => {
                console.log('Oooops!');
            });
    }

    getdetails(id) {
        let link = this.serverurl + 'getpatientdetails';
        let data = {_id : id};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success' && typeof(result.item) != 'undefined') {
                    console.log('getpatientdetails-------');
                    console.log(result);
                    this.patientdetails = result.item;
                    this.patientuniqueid = result.item.uniqueid;
                    this.getrepid(result.item.addedby);
                } else {
                }
            }, error => {
                console.log('Ooops');
            });
    }
    showquestionaryform(itemid) {
        this.getdetails(itemid);
        let link = this.serverurl + 'getpatientdetailsbypatientid';
        let data = {patientid : itemid};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success' && typeof(result.id) != 'undefined') {
                    let userdet = result.id;
                    console.log('-------');
                    console.log(userdet);
                    if (userdet.planbcard == 1) {
                        var putplanbcard = 'yes';
                    } if (userdet.planbcard == 0) {
                        var putplanbcard = 'no';
                    }
                    if (userdet.mediprimarypolicy == 1) {
                        var putmediprimarypolicy = 'yes';
                    } if (userdet.mediprimarypolicy == 0) {
                        var putmediprimarypolicy= 'no';
                    }
                    if (userdet.medadvantageprimarypolicy == 1) {
                        var putmedadvantageprimarypolicy = 'yes';
                    } if (userdet.medadvantageprimarypolicy == 0) {
                        var putmedadvantageprimarypolicy= 'no';
                    }
                    if (userdet.comprimarypolicy == 1) {
                        var putcomprimarypolicy = 'yes';
                    } if (userdet.comprimarypolicy == 0) {
                        var putcomprimarypolicy = 'no';
                    }
                    if (userdet.cancer_sup == 1) {
                        var putcancer_sup = 'yes';
                        this.showquestionarydiv = true;
                        setTimeout(() => {
                            $( '.pateintquestionire_div2_left2_contain' ).find('input').each(function() {
                                $(this).attr( 'disabled', 'disabled' );
                            });

                            $( '.pateintquestionire_div2_left2_contain' ).find('select').each(function() {
                                $(this).attr( 'disabled', 'disabled' );
                            });
                            //   $('#pateintquestionire_div2_left2_heading').removeClass('hide');
                        }, 500);
                    }  if (userdet.cancer_sup == 0) {
                        var putcancer_sup = 'no';
                        //   this.showquestionarydiv = false;
                        this.showquestionarydiv = true;
                        setTimeout(() => {
                            $( '.pateintquestionire_div2_left2_contain' ).find('input').each(function() {
                                $(this).attr( 'disabled', 'disabled' );
                            });

                            $( '.pateintquestionire_div2_left2_contain' ).find('select').each(function() {
                                $(this).attr( 'disabled', 'disabled' );
                            });
                            //   $('#pateintquestionire_div2_left2_heading').removeClass('hide');
                        }, 500);
                    }
                    if (userdet.catheters_sup == 1) {
                        var putcatheters_sup = 'yes';
                    }  if (userdet.catheters_sup == 0) {
                        var putcatheters_sup = 'no';
                    }
                    if (userdet.allergies_sup == 1) {
                        var putallergies_sup = 'yes';
                    }  if (userdet.allergies_sup == 0) {
                        var putallergies_sup = 'no';
                    }
                    if (userdet.scooter_sup == 1) {
                        var putscooter_sup = 'yes';
                    }  if (userdet.scooter_sup == 0) {
                        var putscooter_sup = 'no';
                    } if (userdet.walker_sup == 1) {
                        var putwalker_sup = 'yes';
                    } if (userdet.walker_sup == 0) {
                        var putwalker_sup = 'no';
                    }
                    if (userdet.braces_sup == 1) {
                        var putbraces_sup = 'yes';
                        this.disabledatepicker();
                    }  if (userdet.braces_sup == 0) {
                        var putbraces_sup = 'no';
                    }
                    if (userdet.topical_sup == 1) {
                        var puttopical_sup = 'yes';
                    } if (userdet.topical_sup == 0) {
                        var puttopical_sup = 'no';
                    }
                    if (userdet.pain_sup == 1) {
                        var putpain_sup = 'yes';
                        this.disableselect();
                    }  if (userdet.pain_sup == 0) {
                        var putpain_sup = 'no';
                    }
                    if (userdet.wound_sup == 1) {
                        var putwound_sup = 'yes';
                    }
                    if (userdet.wound_sup == 0) {
                        var putwound_sup = 'no';
                    }
                    if (userdet.diabetic_sup == 1) {
                        var putdiabetic_sup = 'yes';
                    }
                    if (userdet.diabetic_sup == 0) {
                        var putdiabetic_sup = 'no';
                    }
                    if (userdet.insurance1 == true || userdet.insurance3 == true) {
                        this.disableit();
                    }

                    if (userdet.planbcard_1 == 1) { var putplanbcard_1 = 'yes'; }
                    if (userdet.planbcard_1 == 0) { var putplanbcard_1 = 'no'; }
                    if (userdet.mediprimarypolicy_1 == 1) { var putmediprimarypolicy_1 = 'yes';}
                    if (userdet.mediprimarypolicy_1 == 0) { var putmediprimarypolicy_1= 'no';}
                    if (userdet.medadvantageprimarypolicy_1 == 1) { var putmedadvantageprimarypolicy_1 = 'yes';}
                    if (userdet.medadvantageprimarypolicy_1 == 0) { var putmedadvantageprimarypolicy_1= 'no';}
                    if (userdet.comprimarypolicy_1 == 1) { var putcomprimarypolicy_1 = 'yes';}
                    if (userdet.comprimarypolicy_1 == 0) { var putcomprimarypolicy_1 = 'no';}

                    if (userdet.planbcard_2 == 1) { var putplanbcard_2 = 'yes'; }
                    if (userdet.planbcard_2 == 0) { var putplanbcard_2 = 'no'; }
                    if (userdet.mediprimarypolicy_2 == 1) { var putmediprimarypolicy_2 = 'yes'; }
                    if (userdet.mediprimarypolicy_2 == 0) { var putmediprimarypolicy_2= 'no'; }
                    if (userdet.medadvantageprimarypolicy_2 == 1) { var putmedadvantageprimarypolicy_2 = 'yes'; }
                    if (userdet.medadvantageprimarypolicy_2 == 0) { var putmedadvantageprimarypolicy_2= 'no'; }
                    if (userdet.comprimarypolicy_2 == 1) { var putcomprimarypolicy_2 = 'yes'; }
                    if (userdet.comprimarypolicy_2 == 0) { var putcomprimarypolicy_2 = 'no'; }


                    if (userdet.planbcard_3 == 1) { var putplanbcard_3 = 'yes'; }
                    if (userdet.planbcard_3 == 0) { var putplanbcard_3 = 'no'; }
                    if (userdet.mediprimarypolicy_3 == 1) { var putmediprimarypolicy_3 = 'yes'; }
                    if (userdet.mediprimarypolicy_3 == 0) { var putmediprimarypolicy_3= 'no'; }
                    if (userdet.medadvantageprimarypolicy_3 == 1) { var putmedadvantageprimarypolicy_3 = 'yes'; }
                    if (userdet.medadvantageprimarypolicy_3 == 0) { var putmedadvantageprimarypolicy_3= 'no'; }
                    if (userdet.comprimarypolicy_3 == 1) { var putcomprimarypolicy_3 = 'yes'; }
                    if (userdet.comprimarypolicy_3 == 0) { var putcomprimarypolicy_3 = 'no'; }

                    if (userdet.planbcard_4 == 1) { var putplanbcard_4 = 'yes'; }
                    if (userdet.planbcard_4 == 0) { var putplanbcard_4 = 'no'; }
                    if (userdet.mediprimarypolicy_4 == 1) { var putmediprimarypolicy_4 = 'yes'; }
                    if (userdet.mediprimarypolicy_4 == 0) { var putmediprimarypolicy_4 = 'no'; }
                    if (userdet.medadvantageprimarypolicy_4 == 1) { var putmedadvantageprimarypolicy_4 = 'yes'; }
                    if (userdet.medadvantageprimarypolicy_4 == 0) { var putmedadvantageprimarypolicy_4 = 'no'; }
                    if (userdet.comprimarypolicy_4 == 1) { var putcomprimarypolicy_4 = 'yes'; }
                    if (userdet.comprimarypolicy_4 == 0) { var putcomprimarypolicy_4 = 'no'; }


                    if (userdet.planbcard_5 == 1) { var putplanbcard_5 = 'yes'; }
                    if (userdet.planbcard_5 == 0) { var putplanbcard_5 = 'no'; }
                    if (userdet.mediprimarypolicy_5 == 1) { var putmediprimarypolicy_5 = 'yes'; }
                    if (userdet.mediprimarypolicy_5 == 0) { var putmediprimarypolicy_5 = 'no'; }
                    if (userdet.medadvantageprimarypolicy_5 == 1) { var putmedadvantageprimarypolicy_5 = 'yes'; }
                    if (userdet.medadvantageprimarypolicy_5 == 0) { var putmedadvantageprimarypolicy_5 = 'no'; }
                    if (userdet.comprimarypolicy_5 == 1) { var putcomprimarypolicy_5 = 'yes'; }
                    if (userdet.comprimarypolicy_5 == 0) { var putcomprimarypolicy_5 = 'no'; }

                    if (userdet.planbcard_6 == 1) { var putplanbcard_6 = 'yes'; }
                    if (userdet.planbcard_6 == 0) { var putplanbcard_6 = 'no'; }
                    if (userdet.mediprimarypolicy_6 == 1) { var putmediprimarypolicy_6 = 'yes'; }
                    if (userdet.mediprimarypolicy_6 == 0) { var putmediprimarypolicy_6 = 'no'; }
                    if (userdet.medadvantageprimarypolicy_6 == 1) { var putmedadvantageprimarypolicy_6 = 'yes'; }
                    if (userdet.medadvantageprimarypolicy_6 == 0) { var putmedadvantageprimarypolicy_6 = 'no'; }
                    if (userdet.comprimarypolicy_6 == 1) { var putcomprimarypolicy_6 = 'yes'; }
                    if (userdet.comprimarypolicy_6 == 0) { var putcomprimarypolicy_6 = 'no'; }


                    // console.log('userdet.weight======'+userdet.weight);
                    this.dataForm1 = this.fb.group({
                        cgx1: [userdet.cgx],
                        pgxval: [userdet.pgxval],
                        firstname1: [userdet.firstname, Validators.required],
                        lastname1: [userdet.lastname, Validators.required],
                        phone1: [userdet.phone, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
                        address1: [userdet.address, Validators.required],
                        city1: [userdet.city, Validators.required],
                        state1: [userdet.state, Validators.required],
                        zip1: [userdet.zip, Validators.required],
                        dob1: [userdet.dob, Validators.required],
                        gender1: [userdet.gender, Validators.required],
                        race1: [userdet.race, Validators.required],
                        height1: [userdet.height, Validators.required],
                        width1: [userdet.width, Validators.required],
                        weight1: [userdet.weight],
                        allergies1: [userdet.allergies],
                        medicareclaim1: [userdet.medicareclaim],
                        notes1: [userdet.notes1],
                        notes2: [userdet.notes2],
                        notes3: [userdet.notes3],
                        notes4: [userdet.notes4],
                        pharmacyinsurancename: [userdet.pharmacyinsurancename],
                        pharmacyid: [userdet.pharmacyid],
                        pharmacybin: [userdet.pharmacybin],
                        pharmacypcn: [userdet.pharmacypcn],
                        pharmacygroup: [userdet.pharmacygroup],
                        pharmacyhistory: [userdet.pharmacyhistory],
                        pharmacyissue: [userdet.pharmacyissue],
                        pharmacytreatment: [userdet.pharmacytreatment],
                        topicalpain: [userdet.topicalpain],
                        oralpain: [userdet.oralpain],
                        derma: [userdet.derma],
                        migrane: [userdet.migrane],
                        insurance1: [userdet.insurance1],
                        insurance2: [userdet.insurance2],
                        insurance3: [userdet.insurance3],
                        insurance4: [userdet.insurance4],
                        medicarepolicyno: [userdet.medicarepolicyno],
                        mediprimarypolicy: [putmediprimarypolicy],
                        comprimarypolicy: [putcomprimarypolicy],
                        medadvantageprimarypolicy: [putmedadvantageprimarypolicy],
                        medadvantageplan: [userdet.medadvantageplan],
                        medadvantagepolicyno: [userdet.medadvantagepolicyno],
                        /* planbcard: [putplanbcard],*/
                        /*   phtype1: [userdet.phtype1, Validators.required],*/
                        phtype1: [userdet.phtype1],
                        /*  phtype2: [userdet.phtype2],*/
                        phage: [userdet.phage],
                        phdead: [userdet.phdead],
                        motype1: [userdet.motype1],
                        /*motype2: [userdet.motype2],*/
                        moage: [userdet.moage],
                        modead: [userdet.modead],
                        fatype1: [userdet.fatype1],
                        /*     fatype2: [userdet.fatype2],*/
                        faage: [userdet.faage],
                        fadead: [userdet.fadead],
                        dautype1: [userdet.dautype1],
                        /*   dautype2: [userdet.dautype2],*/
                        dauage: [userdet.dauage],
                        daudead: [userdet.daudead],
                        sontype1: [userdet.sontype1],
                        /* sontype2: [userdet.sontype2],*/
                        sonage: [userdet.sonage],
                        sondead: [userdet.sondead],
                        brotype1: [userdet.brotype1],
                        /*   brotype2: [userdet.brotype2],*/
                        broage: [userdet.broage],
                        brodead: [userdet.brodead],
                        sistype1: [userdet.sistype1],
                        /* sistype2: [userdet.sistype2],*/
                        sisage: [userdet.sisage],
                        sisdead: [userdet.sisdead],
                        neptype1: [userdet.neptype1],
                        /* neptype2: [userdet.neptype2],*/
                        nepage: [userdet.nepage],
                        nepdead: [userdet.nepdead],
                        niecetype1: [userdet.niecetype1],
                        /*  niecetype2: [userdet.niecetype2],*/
                        nieceage: [userdet.nieceage],
                        niecedead: [userdet.niecedead],
                        unctype1: [userdet.unctype1],
                        /*  unctype2: [userdet.unctype2],*/
                        uncage: [userdet.uncage],
                        uncdead: [userdet.uncdead],
                        autntype1: [userdet.autntype1],
                        /*   autntype2: [userdet.autntype2],*/
                        autnage: [userdet.autnage],
                        autndead: [userdet.autndead],
                        moftype1: [userdet.moftype1],
                        /*  moftype2: [userdet.moftype2],*/
                        mofage: [userdet.mofage],
                        mofdead: [userdet.mofdead],
                        momotype1: [userdet.momotype1],
                        /*  momotype2: [userdet.momotype2],*/
                        momoage: [userdet.momoage],
                        momodead: [userdet.momodead],
                        daftype1: [userdet.daftype1],
                        /*  daftype2: [userdet.daftype2],*/
                        dafage: [userdet.dafage],
                        dafdead: [userdet.dafdead],
                        damtype1: [userdet.damtype1],
                        /*  damtype2: [userdet.damtype2],*/
                        damage: [userdet.damage],
                        damdead: [userdet.damdead],
                        oth1type1: [userdet.oth1type1],
                        /*    oth1type2: [userdet.oth1type2],*/
                        oth1age: [userdet.oth1age],
                        oth1dead: [userdet.oth1dead],
                        oth2type1: [userdet.oth2type1],
                        /*   oth2type2: [userdet.oth2type2],*/
                        oth2age: [userdet.oth2age],
                        oth2dead: [userdet.oth2dead],
                        oth3type1: [userdet.oth3type1],
                        /* oth3type2: [userdet.oth3type2],*/
                        oth3age: [userdet.oth3age],
                        oth3dead: [userdet.oth3dead],
                        pgx1: [userdet.pgx1],
                        pgx2: [userdet.pgx2],
                        pgx3: [userdet.pgx3],
                        pgx4: [userdet.pgx4],
                        pgx5: [userdet.pgx5],
                        pgx6: [userdet.pgx6],
                        pgx7: [userdet.pgx7],
                        pgx8: [userdet.pgx8],
                        pgx9: [userdet.pgx9],
                        pgx10: [userdet.pgx10],
                        pgx11: [userdet.pgx11],
                        pgx12: [userdet.pgx12],
                        pgx13: [userdet.pgx13],
                        pgx14: [userdet.pgx14],
                        pgx15: [userdet.pgx15],
                        pgx16: [userdet.pgx16],
                        pgx17: [userdet.pgx17],
                        pgx18: [userdet.pgx18],
                        /* pgx19: [userdet.pgx19],*/
                        carrier: [userdet.carrier],
                        carrierplan: [userdet.carrierplan],
                        carrierpolicyno: [userdet.carrierpolicyno],
                        cancer_sup: [putcancer_sup],
                        catheters_sup: [putcatheters_sup],
                        allergies_sup: [putallergies_sup ],
                        scooter_sup: [putscooter_sup],
                        walker_sup: [putwalker_sup],
                        braces_sup: [putbraces_sup],
                        topical_sup: [puttopical_sup ],
                        pain_sup: [putpain_sup ],
                        wound_sup: [putwound_sup],
                        diabetic_sup: [putdiabetic_sup ],
                        triedbraces: [userdet.triedbraces ],
                        lastbrace: [userdet.lastbrace],
                        familyrelation0: [userdet.familyrelation0 ],
                        familyrelation1: [userdet.familyrelation1 ],
                        familyrelation2: [userdet.familyrelation2 ],
                        familyrelation3: [userdet.familyrelation3 ],
                        familyrelation4: [userdet.familyrelation4 ],
                        familyrelation5: [userdet.familyrelation5 ],
                        familyrelation6: [userdet.familyrelation6 ],
                        familyrelation7: [userdet.familyrelation7 ],
                        familyrelation8: [userdet.familyrelation8 ],
                        familyrelation9: [userdet.familyrelation9 ],
                        familyrelation10: [userdet.familyrelation10 ],
                        familyrelation11: [userdet.familyrelation11 ],
                        familyrelation12: [userdet.familyrelation12 ],
                        familyrelation13: [userdet.familyrelation13 ],
                        familyrelation14: [userdet.familyrelation14 ],
                        familyrelation15: [userdet.familyrelation15 ],
                        familyrelation16: [userdet.familyrelation16 ],
                        familyrelation17: [userdet.familyrelation17 ],
                        relation1: [userdet.relation1 ],
                        relation2: [userdet.relation2 ],
                        relation3: [userdet.relation3 ],
                        relation4: [userdet.relation4 ],
                        relation5: [userdet.relation5 ],
                        relation6: [userdet.relation6 ],
                        relation7: [userdet.relation7 ],
                        relation8: [userdet.relation8 ],
                        relation9: [userdet.relation9 ],
                        relation10: [userdet.relation10 ],
                        relation11: [userdet.relation11 ],
                        relation12: [userdet.relation12 ],
                        relation13: [userdet.relation13 ],
                        relation14: [userdet.relation14 ],
                        relation15: [userdet.relation15 ],
                        relation16: [userdet.relation16 ],
                        relation17: [userdet.relation17 ],
                        relation18: [userdet.relation18 ],
                        degree1: [userdet.degree1 ],
                        degree2: [userdet.degree2 ],
                        degree3: [userdet.degree3 ],
                        degree4: [userdet.degree4 ],
                        degree5: [userdet.degree5 ],
                        degree6: [userdet.degree6 ],
                        degree7: [userdet.degree7 ],
                        degree8: [userdet.degree8 ],
                        degree9: [userdet.degree9 ],
                        degree10: [userdet.degree10 ],
                        degree11: [userdet.degree11 ],
                        degree12: [userdet.degree12 ],
                        degree13: [userdet.degree13 ],
                        degree14: [userdet.degree14 ],
                        degree15: [userdet.degree15 ],
                        degree16: [userdet.degree16 ],
                        degree17: [userdet.degree17 ],
                        degree18: [userdet.degree18 ],
                        /*    image: [userdet.image[0].response ],*/
                        phname: [userdet.phname ],
                        familyrelation1name: [userdet.familyrelation1name ],
                        familyrelation2name: [userdet.familyrelation2name ],
                        familyrelation3name: [userdet.familyrelation3name ],
                        familyrelation4name: [userdet.familyrelation4name ],
                        familyrelation5name: [userdet.familyrelation5name ],
                        familyrelation6name: [userdet.familyrelation6name ],
                        familyrelation7name: [userdet.familyrelation7name ],
                        familyrelation8name: [userdet.familyrelation8name ],
                        familyrelation9name: [userdet.familyrelation9name ],
                        familyrelation10name: [userdet.familyrelation10name ],
                        familyrelation11name: [userdet.familyrelation11name ],
                        familyrelation12name: [userdet.familyrelation12name ],
                        familyrelation13name: [userdet.familyrelation13name ],
                        familyrelation14name: [userdet.familyrelation14name ],
                        familyrelation15name: [userdet.familyrelation15name ],
                        familyrelation16name: [userdet.familyrelation16name ],
                        familyrelation17name: [userdet.familyrelation17name ],
                        insurance1_1: [userdet.insurance1_1],
                        insurance2_1: [userdet.insurance2_1],
                        insurance3_1: [userdet.insurance3_1],
                        insurance4_1: [userdet.insurance4_1],
                        medicarepolicyno_1: [userdet.medicarepolicyno_1],
                        mediprimarypolicy_1: [putmediprimarypolicy_1],
                        medadvantageprimarypolicy_1: [putmedadvantageprimarypolicy_1],
                        medadvantageplan_1: [userdet.medadvantageplan_1],
                        medadvantagepolicyno_1: [userdet.medadvantagepolicyno_1],
                        comprimarypolicy_1: [putcomprimarypolicy_1],
                        carrier_1: [userdet.carrier_1],
                        carrierplan_1: [userdet.carrierplan_1],
                        carrierpolicyno_1: [userdet.carrierpolicyno_1],

                        insurance1_2: [userdet.insurance1_2],
                        insurance2_2: [userdet.insurance2_2],
                        insurance3_2: [userdet.insurance3_2],
                        insurance4_2: [userdet.insurance4_2],
                        medicarepolicyno_2: [userdet.medicarepolicyno_2],
                        mediprimarypolicy_2: [putmediprimarypolicy_2],
                        medadvantageprimarypolicy_2: [putmedadvantageprimarypolicy_2],
                        medadvantageplan_2: [userdet.medadvantageplan_2],
                        medadvantagepolicyno_2: [userdet.medadvantagepolicyno_2],
                        comprimarypolicy_2: [putcomprimarypolicy_2],
                        carrier_2: [userdet.carrier_2],
                        carrierplan_2: [userdet.carrierplan_2],
                        carrierpolicyno_2: [userdet.carrierpolicyno_2],
                        insurance1_3: [userdet.insurance1_3],
                        insurance2_3: [userdet.insurance2_3],
                        insurance3_3: [userdet.insurance3_3],
                        insurance4_3: [userdet.insurance4_3],
                        medicarepolicyno_3: [userdet.medicarepolicyno_3],
                        mediprimarypolicy_3: [putmediprimarypolicy_3],
                        medadvantageprimarypolicy_3: [putmedadvantageprimarypolicy_3],
                        medadvantageplan_3: [userdet.medadvantageplan_3],
                        medadvantagepolicyno_3: [userdet.medadvantagepolicyno_3],
                        comprimarypolicy_3: [putcomprimarypolicy_3],
                        carrier_3: [userdet.carrier_3],
                        carrierplan_3: [userdet.carrierplan_3],
                        carrierpolicyno_3: [userdet.carrierpolicyno_3],
                        insurance1_4: [userdet.insurance1_4],
                        insurance2_4: [userdet.insurance2_4],
                        insurance3_4: [userdet.insurance3_4],
                        insurance4_4: [userdet.insurance4_4],
                        medicarepolicyno_4: [userdet.medicarepolicyno_4],
                        mediprimarypolicy_4: [putmediprimarypolicy_4],
                        medadvantageprimarypolicy_4: [putmedadvantageprimarypolicy_4],
                        medadvantageplan_4: [userdet.medadvantageplan_4],
                        medadvantagepolicyno_4: [userdet.medadvantagepolicyno_4],
                        comprimarypolicy_4: [putcomprimarypolicy_4],
                        carrier_4: [userdet.carrier_4],
                        carrierplan_4: [userdet.carrierplan_4],
                        carrierpolicyno_4: [userdet.carrierpolicyno_4],
                        insurance1_5: [userdet.insurance1_5],
                        insurance2_5: [userdet.insurance2_5],
                        insurance3_5: [userdet.insurance3_5],
                        insurance4_5: [userdet.insurance4_5],
                        medicarepolicyno_5: [userdet.medicarepolicyno_5],
                        mediprimarypolicy_5: [putmediprimarypolicy_5],
                        medadvantageprimarypolicy_5: [putmedadvantageprimarypolicy_5],
                        medadvantageplan_5: [userdet.medadvantageplan_5],
                        medadvantagepolicyno_5: [userdet.medadvantagepolicyno_5],
                        comprimarypolicy_5: [putcomprimarypolicy_5],
                        carrier_5: [userdet.carrier_5],
                        carrierplan_5: [userdet.carrierplan_5],
                        carrierpolicyno_5: [userdet.carrierpolicyno_5],
                        insurance1_6: [userdet.insurance1_6],
                        insurance2_6: [userdet.insurance2_6],
                        insurance3_6: [userdet.insurance3_6],
                        insurance4_6: [userdet.insurance4_6],
                        medicarepolicyno_6: [userdet.medicarepolicyno_6],
                        mediprimarypolicy_6: [putmediprimarypolicy_6],
                        medadvantageprimarypolicy_6: [putmedadvantageprimarypolicy_6],
                        medadvantageplan_6: [userdet.medadvantageplan_6],
                        medadvantagepolicyno_6: [userdet.medadvantagepolicyno_6],
                        comprimarypolicy_6: [putcomprimarypolicy_6],
                        carrier_6: [userdet.carrier_6],
                        carrierplan_6: [userdet.carrierplan_6],
                        carrierpolicyno_6: [userdet.carrierpolicyno_6]
                    });
                    this.planbcard  = putplanbcard;
                    this.planbcard_1  = putplanbcard_1;
                    this.planbcard_2  = putplanbcard_2;
                    this.planbcard_3  = putplanbcard_3;
                    this.planbcard_4  = putplanbcard_4;
                    this.planbcard_5  = putplanbcard_5;
                    this.planbcard_6  = putplanbcard_6;

                    setTimeout(() => {
                        $('.left2_heading4new').each(function() {
                            if ($(this).find('input').val() == null || $(this).find('input').val() == '') {
                                $(this).parent().hide();
                                console.log('calling this?');
                            }
                        });
                        // console.log($('#pateintquestionire_div2_left2_heading').html());
                        $('#pateintquestionire_div2_left2_heading').removeAttr('style');

                        for (let j = 1; j < 7; j++) {
                            let insurance1 = 'insurance1_' + j;
                            let insurance2 = 'insurance2_' + j;
                            let insurance3 = 'insurance3_' + j;
                            let insurance4 = 'insurance4_' + j;
                            if ($('input[name="' + insurance1 + '"]').prop('checked') == false && $('input[name="' + insurance2 + '"]').prop('checked') == false && $('input[name="' + insurance3 + '"]').prop('checked') == false && $('input[name="' + insurance4 + '"]').prop('checked') == false) {
                                $('.insuranceinformation' + j).hide();
                            }
                        }
                    }, 1500);
                } else {
                }
            }, error => {
                console.log('Ooops');
            });
        this.pateintquestioniremodal = true;
        // do disable first
        setTimeout(() => {
            $('.left2_heading4new').each(function() {
                if ($(this).find('input').val() == null || $(this).find('input').val() == '') {
                    $(this).parent().hide();
                }
            });
            $('#pateintquestionire_div2_left2_heading').removeAttr('style');
        }, 200);
        // then disable
        setTimeout(() => {
            $( '#formquestionary' ).find('input').each(function() {
                $(this).attr( 'disabled', 'disabled' );
            });

            $( '#formquestionary' ).find('textarea').each(function() {
                $(this).attr( 'disabled', 'disabled' );
            });

            $( '#formquestionary' ).find('select').each(function() {
                $(this).attr( 'disabled', 'disabled' );
            });
            $( '#formquestionary' ).find('radio').each(function() {
                $(this).attr( 'disabled', 'disabled' );
            });
        }, 500);
    }
    showquestionaryform1() {
        this.getdetails(this.selected_patient_id);
        let link = this.serverurl + 'getpatientdetailsbypatientid';
        let data = {patientid : this.selected_patient_id};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success' && typeof(result.id) != 'undefined') {
                    let userdet = result.id;
                    console.log('-------');
                    console.log(userdet);
                    if (userdet.planbcard == 1) {
                        var putplanbcard = 'yes';
                    } if (userdet.planbcard == 0) {
                        var putplanbcard = 'no';
                    }
                    if (userdet.mediprimarypolicy == 1) {
                        var putmediprimarypolicy = 'yes';
                    } if (userdet.mediprimarypolicy == 0) {
                        var putmediprimarypolicy= 'no';
                    }
                    if (userdet.medadvantageprimarypolicy == 1) {
                        var putmedadvantageprimarypolicy = 'yes';
                    } if (userdet.medadvantageprimarypolicy == 0) {
                        var putmedadvantageprimarypolicy= 'no';
                    }
                    if (userdet.comprimarypolicy == 1) {
                        var putcomprimarypolicy = 'yes';
                    } if (userdet.comprimarypolicy == 0) {
                        var putcomprimarypolicy = 'no';
                    }
                    if (userdet.cancer_sup == 1) {
                        var putcancer_sup = 'yes';
                        this.showquestionarydiv = true;
                        setTimeout(() => {
                            $( '.pateintquestionire_div2_left2_contain' ).find('input').each(function() {
                                $(this).attr( 'disabled', 'disabled' );
                            });

                            $( '.pateintquestionire_div2_left2_contain' ).find('select').each(function() {
                                $(this).attr( 'disabled', 'disabled' );
                            });
                            //   $('#pateintquestionire_div2_left2_heading').removeClass('hide');
                        }, 500);
                    }  if (userdet.cancer_sup == 0) {
                        var putcancer_sup = 'no';
                        //   this.showquestionarydiv = false;
                        this.showquestionarydiv = true;
                        setTimeout(() => {
                            $( '.pateintquestionire_div2_left2_contain' ).find('input').each(function() {
                                $(this).attr( 'disabled', 'disabled' );
                            });

                            $( '.pateintquestionire_div2_left2_contain' ).find('select').each(function() {
                                $(this).attr( 'disabled', 'disabled' );
                            });
                            //   $('#pateintquestionire_div2_left2_heading').removeClass('hide');
                        }, 500);
                    }
                    if (userdet.catheters_sup == 1) {
                        var putcatheters_sup = 'yes';
                    }  if (userdet.catheters_sup == 0) {
                        var putcatheters_sup = 'no';
                    }
                    if (userdet.allergies_sup == 1) {
                        var putallergies_sup = 'yes';
                    }  if (userdet.allergies_sup == 0) {
                        var putallergies_sup = 'no';
                    }
                    if (userdet.scooter_sup == 1) {
                        var putscooter_sup = 'yes';
                    }  if (userdet.scooter_sup == 0) {
                        var putscooter_sup = 'no';
                    } if (userdet.walker_sup == 1) {
                        var putwalker_sup = 'yes';
                    } if (userdet.walker_sup == 0) {
                        var putwalker_sup = 'no';
                    }
                    if (userdet.braces_sup == 1) {
                        var putbraces_sup = 'yes';
                        this.disabledatepicker();
                    }  if (userdet.braces_sup == 0) {
                        var putbraces_sup = 'no';
                    }
                    if (userdet.topical_sup == 1) {
                        var puttopical_sup = 'yes';
                    } if (userdet.topical_sup == 0) {
                        var puttopical_sup = 'no';
                    }
                    if (userdet.pain_sup == 1) {
                        var putpain_sup = 'yes';
                        this.disableselect();
                    }  if (userdet.pain_sup == 0) {
                        var putpain_sup = 'no';
                    }
                    if (userdet.wound_sup == 1) {
                        var putwound_sup = 'yes';
                    }
                    if (userdet.wound_sup == 0) {
                        var putwound_sup = 'no';
                    }
                    if (userdet.diabetic_sup == 1) {
                        var putdiabetic_sup = 'yes';
                    }
                    if (userdet.diabetic_sup == 0) {
                        var putdiabetic_sup = 'no';
                    }
                    if (userdet.insurance1 == true || userdet.insurance3 == true) {
                        this.disableit();
                    }

                    if (userdet.planbcard_1 == 1) { var putplanbcard_1 = 'yes'; }
                    if (userdet.planbcard_1 == 0) { var putplanbcard_1 = 'no'; }
                    if (userdet.mediprimarypolicy_1 == 1) { var putmediprimarypolicy_1 = 'yes';}
                    if (userdet.mediprimarypolicy_1 == 0) { var putmediprimarypolicy_1= 'no';}
                    if (userdet.medadvantageprimarypolicy_1 == 1) { var putmedadvantageprimarypolicy_1 = 'yes';}
                    if (userdet.medadvantageprimarypolicy_1 == 0) { var putmedadvantageprimarypolicy_1= 'no';}
                    if (userdet.comprimarypolicy_1 == 1) { var putcomprimarypolicy_1 = 'yes';}
                    if (userdet.comprimarypolicy_1 == 0) { var putcomprimarypolicy_1 = 'no';}

                    if (userdet.planbcard_2 == 1) { var putplanbcard_2 = 'yes'; }
                    if (userdet.planbcard_2 == 0) { var putplanbcard_2 = 'no'; }
                    if (userdet.mediprimarypolicy_2 == 1) { var putmediprimarypolicy_2 = 'yes'; }
                    if (userdet.mediprimarypolicy_2 == 0) { var putmediprimarypolicy_2= 'no'; }
                    if (userdet.medadvantageprimarypolicy_2 == 1) { var putmedadvantageprimarypolicy_2 = 'yes'; }
                    if (userdet.medadvantageprimarypolicy_2 == 0) { var putmedadvantageprimarypolicy_2= 'no'; }
                    if (userdet.comprimarypolicy_2 == 1) { var putcomprimarypolicy_2 = 'yes'; }
                    if (userdet.comprimarypolicy_2 == 0) { var putcomprimarypolicy_2 = 'no'; }


                    if (userdet.planbcard_3 == 1) { var putplanbcard_3 = 'yes'; }
                    if (userdet.planbcard_3 == 0) { var putplanbcard_3 = 'no'; }
                    if (userdet.mediprimarypolicy_3 == 1) { var putmediprimarypolicy_3 = 'yes'; }
                    if (userdet.mediprimarypolicy_3 == 0) { var putmediprimarypolicy_3= 'no'; }
                    if (userdet.medadvantageprimarypolicy_3 == 1) { var putmedadvantageprimarypolicy_3 = 'yes'; }
                    if (userdet.medadvantageprimarypolicy_3 == 0) { var putmedadvantageprimarypolicy_3= 'no'; }
                    if (userdet.comprimarypolicy_3 == 1) { var putcomprimarypolicy_3 = 'yes'; }
                    if (userdet.comprimarypolicy_3 == 0) { var putcomprimarypolicy_3 = 'no'; }

                    if (userdet.planbcard_4 == 1) { var putplanbcard_4 = 'yes'; }
                    if (userdet.planbcard_4 == 0) { var putplanbcard_4 = 'no'; }
                    if (userdet.mediprimarypolicy_4 == 1) { var putmediprimarypolicy_4 = 'yes'; }
                    if (userdet.mediprimarypolicy_4 == 0) { var putmediprimarypolicy_4 = 'no'; }
                    if (userdet.medadvantageprimarypolicy_4 == 1) { var putmedadvantageprimarypolicy_4 = 'yes'; }
                    if (userdet.medadvantageprimarypolicy_4 == 0) { var putmedadvantageprimarypolicy_4 = 'no'; }
                    if (userdet.comprimarypolicy_4 == 1) { var putcomprimarypolicy_4 = 'yes'; }
                    if (userdet.comprimarypolicy_4 == 0) { var putcomprimarypolicy_4 = 'no'; }


                    if (userdet.planbcard_5 == 1) { var putplanbcard_5 = 'yes'; }
                    if (userdet.planbcard_5 == 0) { var putplanbcard_5 = 'no'; }
                    if (userdet.mediprimarypolicy_5 == 1) { var putmediprimarypolicy_5 = 'yes'; }
                    if (userdet.mediprimarypolicy_5 == 0) { var putmediprimarypolicy_5 = 'no'; }
                    if (userdet.medadvantageprimarypolicy_5 == 1) { var putmedadvantageprimarypolicy_5 = 'yes'; }
                    if (userdet.medadvantageprimarypolicy_5 == 0) { var putmedadvantageprimarypolicy_5 = 'no'; }
                    if (userdet.comprimarypolicy_5 == 1) { var putcomprimarypolicy_5 = 'yes'; }
                    if (userdet.comprimarypolicy_5 == 0) { var putcomprimarypolicy_5 = 'no'; }

                    if (userdet.planbcard_6 == 1) { var putplanbcard_6 = 'yes'; }
                    if (userdet.planbcard_6 == 0) { var putplanbcard_6 = 'no'; }
                    if (userdet.mediprimarypolicy_6 == 1) { var putmediprimarypolicy_6 = 'yes'; }
                    if (userdet.mediprimarypolicy_6 == 0) { var putmediprimarypolicy_6 = 'no'; }
                    if (userdet.medadvantageprimarypolicy_6 == 1) { var putmedadvantageprimarypolicy_6 = 'yes'; }
                    if (userdet.medadvantageprimarypolicy_6 == 0) { var putmedadvantageprimarypolicy_6 = 'no'; }
                    if (userdet.comprimarypolicy_6 == 1) { var putcomprimarypolicy_6 = 'yes'; }
                    if (userdet.comprimarypolicy_6 == 0) { var putcomprimarypolicy_6 = 'no'; }


                    // console.log('userdet.weight======'+userdet.weight);
                    this.dataForm1 = this.fb.group({
                        cgx1: [userdet.cgx],
                        pgxval: [userdet.pgxval],
                        firstname1: [userdet.firstname, Validators.required],
                        lastname1: [userdet.lastname, Validators.required],
                        phone1: [userdet.phone, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
                        address1: [userdet.address, Validators.required],
                        city1: [userdet.city, Validators.required],
                        state1: [userdet.state, Validators.required],
                        zip1: [userdet.zip, Validators.required],
                        dob1: [userdet.dob, Validators.required],
                        gender1: [userdet.gender, Validators.required],
                        race1: [userdet.race, Validators.required],
                        height1: [userdet.height, Validators.required],
                        width1: [userdet.width, Validators.required],
                        weight1: [userdet.weight],
                        allergies1: [userdet.allergies],
                        medicareclaim1: [userdet.medicareclaim],
                        notes1: [userdet.notes1],
                        notes2: [userdet.notes2],
                        notes3: [userdet.notes3],
                        notes4: [userdet.notes4],
                        pharmacyinsurancename: [userdet.pharmacyinsurancename],
                        pharmacyid: [userdet.pharmacyid],
                        pharmacybin: [userdet.pharmacybin],
                        pharmacypcn: [userdet.pharmacypcn],
                        pharmacygroup: [userdet.pharmacygroup],
                        pharmacyhistory: [userdet.pharmacyhistory],
                        pharmacyissue: [userdet.pharmacyissue],
                        pharmacytreatment: [userdet.pharmacytreatment],
                        topicalpain: [userdet.topicalpain],
                        oralpain: [userdet.oralpain],
                        derma: [userdet.derma],
                        migrane: [userdet.migrane],
                        insurance1: [userdet.insurance1],
                        insurance2: [userdet.insurance2],
                        insurance3: [userdet.insurance3],
                        insurance4: [userdet.insurance4],
                        medicarepolicyno: [userdet.medicarepolicyno],
                        mediprimarypolicy: [putmediprimarypolicy],
                        comprimarypolicy: [putcomprimarypolicy],
                        medadvantageprimarypolicy: [putmedadvantageprimarypolicy],
                        medadvantageplan: [userdet.medadvantageplan],
                        medadvantagepolicyno: [userdet.medadvantagepolicyno],
                        /* planbcard: [putplanbcard],*/
                        /*   phtype1: [userdet.phtype1, Validators.required],*/
                        phtype1: [userdet.phtype1],
                        /*  phtype2: [userdet.phtype2],*/
                        phage: [userdet.phage],
                        phdead: [userdet.phdead],
                        motype1: [userdet.motype1],
                        /*motype2: [userdet.motype2],*/
                        moage: [userdet.moage],
                        modead: [userdet.modead],
                        fatype1: [userdet.fatype1],
                        /*     fatype2: [userdet.fatype2],*/
                        faage: [userdet.faage],
                        fadead: [userdet.fadead],
                        dautype1: [userdet.dautype1],
                        /*   dautype2: [userdet.dautype2],*/
                        dauage: [userdet.dauage],
                        daudead: [userdet.daudead],
                        sontype1: [userdet.sontype1],
                        /* sontype2: [userdet.sontype2],*/
                        sonage: [userdet.sonage],
                        sondead: [userdet.sondead],
                        brotype1: [userdet.brotype1],
                        /*   brotype2: [userdet.brotype2],*/
                        broage: [userdet.broage],
                        brodead: [userdet.brodead],
                        sistype1: [userdet.sistype1],
                        /* sistype2: [userdet.sistype2],*/
                        sisage: [userdet.sisage],
                        sisdead: [userdet.sisdead],
                        neptype1: [userdet.neptype1],
                        /* neptype2: [userdet.neptype2],*/
                        nepage: [userdet.nepage],
                        nepdead: [userdet.nepdead],
                        niecetype1: [userdet.niecetype1],
                        /*  niecetype2: [userdet.niecetype2],*/
                        nieceage: [userdet.nieceage],
                        niecedead: [userdet.niecedead],
                        unctype1: [userdet.unctype1],
                        /*  unctype2: [userdet.unctype2],*/
                        uncage: [userdet.uncage],
                        uncdead: [userdet.uncdead],
                        autntype1: [userdet.autntype1],
                        /*   autntype2: [userdet.autntype2],*/
                        autnage: [userdet.autnage],
                        autndead: [userdet.autndead],
                        moftype1: [userdet.moftype1],
                        /*  moftype2: [userdet.moftype2],*/
                        mofage: [userdet.mofage],
                        mofdead: [userdet.mofdead],
                        momotype1: [userdet.momotype1],
                        /*  momotype2: [userdet.momotype2],*/
                        momoage: [userdet.momoage],
                        momodead: [userdet.momodead],
                        daftype1: [userdet.daftype1],
                        /*  daftype2: [userdet.daftype2],*/
                        dafage: [userdet.dafage],
                        dafdead: [userdet.dafdead],
                        damtype1: [userdet.damtype1],
                        /*  damtype2: [userdet.damtype2],*/
                        damage: [userdet.damage],
                        damdead: [userdet.damdead],
                        oth1type1: [userdet.oth1type1],
                        /*    oth1type2: [userdet.oth1type2],*/
                        oth1age: [userdet.oth1age],
                        oth1dead: [userdet.oth1dead],
                        oth2type1: [userdet.oth2type1],
                        /*   oth2type2: [userdet.oth2type2],*/
                        oth2age: [userdet.oth2age],
                        oth2dead: [userdet.oth2dead],
                        oth3type1: [userdet.oth3type1],
                        /* oth3type2: [userdet.oth3type2],*/
                        oth3age: [userdet.oth3age],
                        oth3dead: [userdet.oth3dead],
                        pgx1: [userdet.pgx1],
                        pgx2: [userdet.pgx2],
                        pgx3: [userdet.pgx3],
                        pgx4: [userdet.pgx4],
                        pgx5: [userdet.pgx5],
                        pgx6: [userdet.pgx6],
                        pgx7: [userdet.pgx7],
                        pgx8: [userdet.pgx8],
                        pgx9: [userdet.pgx9],
                        pgx10: [userdet.pgx10],
                        pgx11: [userdet.pgx11],
                        pgx12: [userdet.pgx12],
                        pgx13: [userdet.pgx13],
                        pgx14: [userdet.pgx14],
                        pgx15: [userdet.pgx15],
                        pgx16: [userdet.pgx16],
                        pgx17: [userdet.pgx17],
                        pgx18: [userdet.pgx18],
                        /* pgx19: [userdet.pgx19],*/
                        carrier: [userdet.carrier],
                        carrierplan: [userdet.carrierplan],
                        carrierpolicyno: [userdet.carrierpolicyno],
                        cancer_sup: [putcancer_sup],
                        catheters_sup: [putcatheters_sup],
                        allergies_sup: [putallergies_sup ],
                        scooter_sup: [putscooter_sup],
                        walker_sup: [putwalker_sup],
                        braces_sup: [putbraces_sup],
                        topical_sup: [puttopical_sup ],
                        pain_sup: [putpain_sup ],
                        wound_sup: [putwound_sup],
                        diabetic_sup: [putdiabetic_sup ],
                        triedbraces: [userdet.triedbraces ],
                        lastbrace: [userdet.lastbrace],
                        familyrelation0: [userdet.familyrelation0 ],
                        familyrelation1: [userdet.familyrelation1 ],
                        familyrelation2: [userdet.familyrelation2 ],
                        familyrelation3: [userdet.familyrelation3 ],
                        familyrelation4: [userdet.familyrelation4 ],
                        familyrelation5: [userdet.familyrelation5 ],
                        familyrelation6: [userdet.familyrelation6 ],
                        familyrelation7: [userdet.familyrelation7 ],
                        familyrelation8: [userdet.familyrelation8 ],
                        familyrelation9: [userdet.familyrelation9 ],
                        familyrelation10: [userdet.familyrelation10 ],
                        familyrelation11: [userdet.familyrelation11 ],
                        familyrelation12: [userdet.familyrelation12 ],
                        familyrelation13: [userdet.familyrelation13 ],
                        familyrelation14: [userdet.familyrelation14 ],
                        familyrelation15: [userdet.familyrelation15 ],
                        familyrelation16: [userdet.familyrelation16 ],
                        familyrelation17: [userdet.familyrelation17 ],
                        relation1: [userdet.relation1 ],
                        relation2: [userdet.relation2 ],
                        relation3: [userdet.relation3 ],
                        relation4: [userdet.relation4 ],
                        relation5: [userdet.relation5 ],
                        relation6: [userdet.relation6 ],
                        relation7: [userdet.relation7 ],
                        relation8: [userdet.relation8 ],
                        relation9: [userdet.relation9 ],
                        relation10: [userdet.relation10 ],
                        relation11: [userdet.relation11 ],
                        relation12: [userdet.relation12 ],
                        relation13: [userdet.relation13 ],
                        relation14: [userdet.relation14 ],
                        relation15: [userdet.relation15 ],
                        relation16: [userdet.relation16 ],
                        relation17: [userdet.relation17 ],
                        relation18: [userdet.relation18 ],
                        degree1: [userdet.degree1 ],
                        degree2: [userdet.degree2 ],
                        degree3: [userdet.degree3 ],
                        degree4: [userdet.degree4 ],
                        degree5: [userdet.degree5 ],
                        degree6: [userdet.degree6 ],
                        degree7: [userdet.degree7 ],
                        degree8: [userdet.degree8 ],
                        degree9: [userdet.degree9 ],
                        degree10: [userdet.degree10 ],
                        degree11: [userdet.degree11 ],
                        degree12: [userdet.degree12 ],
                        degree13: [userdet.degree13 ],
                        degree14: [userdet.degree14 ],
                        degree15: [userdet.degree15 ],
                        degree16: [userdet.degree16 ],
                        degree17: [userdet.degree17 ],
                        degree18: [userdet.degree18 ],
                        /*    image: [userdet.image[0].response ],*/
                        phname: [userdet.phname ],
                        familyrelation1name: [userdet.familyrelation1name ],
                        familyrelation2name: [userdet.familyrelation2name ],
                        familyrelation3name: [userdet.familyrelation3name ],
                        familyrelation4name: [userdet.familyrelation4name ],
                        familyrelation5name: [userdet.familyrelation5name ],
                        familyrelation6name: [userdet.familyrelation6name ],
                        familyrelation7name: [userdet.familyrelation7name ],
                        familyrelation8name: [userdet.familyrelation8name ],
                        familyrelation9name: [userdet.familyrelation9name ],
                        familyrelation10name: [userdet.familyrelation10name ],
                        familyrelation11name: [userdet.familyrelation11name ],
                        familyrelation12name: [userdet.familyrelation12name ],
                        familyrelation13name: [userdet.familyrelation13name ],
                        familyrelation14name: [userdet.familyrelation14name ],
                        familyrelation15name: [userdet.familyrelation15name ],
                        familyrelation16name: [userdet.familyrelation16name ],
                        familyrelation17name: [userdet.familyrelation17name ],
                        insurance1_1: [userdet.insurance1_1],
                        insurance2_1: [userdet.insurance2_1],
                        insurance3_1: [userdet.insurance3_1],
                        insurance4_1: [userdet.insurance4_1],
                        medicarepolicyno_1: [userdet.medicarepolicyno_1],
                        mediprimarypolicy_1: [putmediprimarypolicy_1],
                        medadvantageprimarypolicy_1: [putmedadvantageprimarypolicy_1],
                        medadvantageplan_1: [userdet.medadvantageplan_1],
                        medadvantagepolicyno_1: [userdet.medadvantagepolicyno_1],
                        comprimarypolicy_1: [putcomprimarypolicy_1],
                        carrier_1: [userdet.carrier_1],
                        carrierplan_1: [userdet.carrierplan_1],
                        carrierpolicyno_1: [userdet.carrierpolicyno_1],

                        insurance1_2: [userdet.insurance1_2],
                        insurance2_2: [userdet.insurance2_2],
                        insurance3_2: [userdet.insurance3_2],
                        insurance4_2: [userdet.insurance4_2],
                        medicarepolicyno_2: [userdet.medicarepolicyno_2],
                        mediprimarypolicy_2: [putmediprimarypolicy_2],
                        medadvantageprimarypolicy_2: [putmedadvantageprimarypolicy_2],
                        medadvantageplan_2: [userdet.medadvantageplan_2],
                        medadvantagepolicyno_2: [userdet.medadvantagepolicyno_2],
                        comprimarypolicy_2: [putcomprimarypolicy_2],
                        carrier_2: [userdet.carrier_2],
                        carrierplan_2: [userdet.carrierplan_2],
                        carrierpolicyno_2: [userdet.carrierpolicyno_2],
                        insurance1_3: [userdet.insurance1_3],
                        insurance2_3: [userdet.insurance2_3],
                        insurance3_3: [userdet.insurance3_3],
                        insurance4_3: [userdet.insurance4_3],
                        medicarepolicyno_3: [userdet.medicarepolicyno_3],
                        mediprimarypolicy_3: [putmediprimarypolicy_3],
                        medadvantageprimarypolicy_3: [putmedadvantageprimarypolicy_3],
                        medadvantageplan_3: [userdet.medadvantageplan_3],
                        medadvantagepolicyno_3: [userdet.medadvantagepolicyno_3],
                        comprimarypolicy_3: [putcomprimarypolicy_3],
                        carrier_3: [userdet.carrier_3],
                        carrierplan_3: [userdet.carrierplan_3],
                        carrierpolicyno_3: [userdet.carrierpolicyno_3],
                        insurance1_4: [userdet.insurance1_4],
                        insurance2_4: [userdet.insurance2_4],
                        insurance3_4: [userdet.insurance3_4],
                        insurance4_4: [userdet.insurance4_4],
                        medicarepolicyno_4: [userdet.medicarepolicyno_4],
                        mediprimarypolicy_4: [putmediprimarypolicy_4],
                        medadvantageprimarypolicy_4: [putmedadvantageprimarypolicy_4],
                        medadvantageplan_4: [userdet.medadvantageplan_4],
                        medadvantagepolicyno_4: [userdet.medadvantagepolicyno_4],
                        comprimarypolicy_4: [putcomprimarypolicy_4],
                        carrier_4: [userdet.carrier_4],
                        carrierplan_4: [userdet.carrierplan_4],
                        carrierpolicyno_4: [userdet.carrierpolicyno_4],
                        insurance1_5: [userdet.insurance1_5],
                        insurance2_5: [userdet.insurance2_5],
                        insurance3_5: [userdet.insurance3_5],
                        insurance4_5: [userdet.insurance4_5],
                        medicarepolicyno_5: [userdet.medicarepolicyno_5],
                        mediprimarypolicy_5: [putmediprimarypolicy_5],
                        medadvantageprimarypolicy_5: [putmedadvantageprimarypolicy_5],
                        medadvantageplan_5: [userdet.medadvantageplan_5],
                        medadvantagepolicyno_5: [userdet.medadvantagepolicyno_5],
                        comprimarypolicy_5: [putcomprimarypolicy_5],
                        carrier_5: [userdet.carrier_5],
                        carrierplan_5: [userdet.carrierplan_5],
                        carrierpolicyno_5: [userdet.carrierpolicyno_5],
                        insurance1_6: [userdet.insurance1_6],
                        insurance2_6: [userdet.insurance2_6],
                        insurance3_6: [userdet.insurance3_6],
                        insurance4_6: [userdet.insurance4_6],
                        medicarepolicyno_6: [userdet.medicarepolicyno_6],
                        mediprimarypolicy_6: [putmediprimarypolicy_6],
                        medadvantageprimarypolicy_6: [putmedadvantageprimarypolicy_6],
                        medadvantageplan_6: [userdet.medadvantageplan_6],
                        medadvantagepolicyno_6: [userdet.medadvantagepolicyno_6],
                        comprimarypolicy_6: [putcomprimarypolicy_6],
                        carrier_6: [userdet.carrier_6],
                        carrierplan_6: [userdet.carrierplan_6],
                        carrierpolicyno_6: [userdet.carrierpolicyno_6]
                    });
                    this.planbcard  = putplanbcard;
                    this.planbcard_1  = putplanbcard_1;
                    this.planbcard_2  = putplanbcard_2;
                    this.planbcard_3  = putplanbcard_3;
                    this.planbcard_4  = putplanbcard_4;
                    this.planbcard_5  = putplanbcard_5;
                    this.planbcard_6  = putplanbcard_6;

                    setTimeout(() => {
                        $('.left2_heading4new').each(function() {
                            if ($(this).find('input').val() == null || $(this).find('input').val() == '') {
                                $(this).parent().hide();
                                console.log('calling this?');
                            }
                        });
                        // console.log($('#pateintquestionire_div2_left2_heading').html());
                        $('#pateintquestionire_div2_left2_heading').removeAttr('style');

                        for (let j = 1; j < 7; j++) {
                            let insurance1 = 'insurance1_' + j;
                            let insurance2 = 'insurance2_' + j;
                            let insurance3 = 'insurance3_' + j;
                            let insurance4 = 'insurance4_' + j;
                            if ($('input[name="' + insurance1 + '"]').prop('checked') == false && $('input[name="' + insurance2 + '"]').prop('checked') == false && $('input[name="' + insurance3 + '"]').prop('checked') == false && $('input[name="' + insurance4 + '"]').prop('checked') == false) {
                                $('.insuranceinformation' + j).hide();
                            }
                        }
                    }, 1500);
                } else {
                }
            }, error => {
                console.log('Ooops');
            });
        this.pateintquestioniremodal = true;
        // do disable first
        setTimeout(() => {
            $('.left2_heading4new').each(function() {
                if ($(this).find('input').val() == null || $(this).find('input').val() == '') {
                    $(this).parent().hide();
                }
            });
            $('#pateintquestionire_div2_left2_heading').removeAttr('style');
        }, 200);
        // then disable
        setTimeout(() => {
            $( '#formquestionary' ).find('input').each(function() {
                $(this).attr( 'disabled', 'disabled' );
            });

            $( '#formquestionary' ).find('textarea').each(function() {
                $(this).attr( 'disabled', 'disabled' );
            });

            $( '#formquestionary' ).find('select').each(function() {
                $(this).attr( 'disabled', 'disabled' );
            });
            $( '#formquestionary' ).find('radio').each(function() {
                $(this).attr( 'disabled', 'disabled' );
            });
        }, 500);
    }
    disableit() {
        setTimeout(() => {
            $( '.insurencedet_subblock2' ).find('input').each(function() {
                $(this).attr( 'disabled', 'disabled' );
            });
            $( '.insurencedet_subblock2' ).find('radio').each(function() {
                $(this).attr( 'disabled', 'disabled' );
            });
        }, 500);
    }
    /* show(val) {
       let familyval = 'familyrelation' + val;
       if ($('select[name="' + familyval + '"]').val() == 'Self' || $('select[name="' + familyval + '"]').val() == 'Mother' || $('select[name="' + familyval + '"]').val() == 'Father' || $('select[name="' + familyval + '"]').val() == 'Brother' || $('select[name="' + familyval + '"]').val() == 'Sister') {
         this.showdeg[val] = '(1st Degree)';
       }
       else if ($('select[name="' + familyval + '"]').val() == 'Uncle' || $('select[name="' + familyval + '"]').val() == 'Aunt' || $('select[name="' + familyval + '"]').val() == 'Grand Father' || $('select[name="' + familyval + '"]').val() == 'Grand Mother') {
         this.showdeg[val] = '(2nd Degree)';
       }
       else {
         this.showdeg[val] = '(3rd Degree)';
       }
     }*/
    show(val) {
        let familyval = 'familyrelation' + val;
        if ( $('select[name="' + familyval + '"]').val() == 'Mother' || $('select[name="' + familyval + '"]').val() == 'Father' || $('select[name="' + familyval + '"]').val() == 'Brother' || $('select[name="' + familyval + '"]').val() == 'Sister' || $('select[name="' + familyval + '"]').val() == 'Son' || $('select[name="' + familyval + '"]').val() == 'Daughter') {
            this.showdeg[val] = '1st Degree';
        }
        else if ($('select[name="' + familyval + '"]').val() == 'Uncle' || $('select[name="' + familyval + '"]').val() == 'Aunt' ) {
            this.showdeg[val] = '2nd Degree';
        }
        else if ($('select[name="' + familyval + '"]').val() == 'Nephew' || $('select[name="' + familyval + '"]').val() == 'Niece' || $('select[name="' + familyval + '"]').val() == 'Cousin' || $('select[name="' + familyval + '"]').val() == 'Grand Father' || $('select[name="' + familyval + '"]').val() == 'Grand Mother') {
            this.showdeg[val] = '3rd Degree';
        }
        else {
            this.showdeg[val] = '';
        }
    }
    gotocsspdf(id) {
        var url = 'http://' + this._commonservices.commonvalue.commonurl1 + '/testpdf/html2pdf/common_cancer_symptoms.php?id=' + id;
        window.open(url, '_blank');
    }
    gotocsspdf1() {
        var url = 'http://' + this._commonservices.commonvalue.commonurl1 + '/testpdf/html2pdf/common_cancer_symptoms.php?id=' + this.selected_patient_id;
        window.open(url, '_blank');
    }
    showsymptomchecklist(id) {
        this.symptomdetailsbypatientid(id);
        this.opensymptommodalflag = true;
        setTimeout(() => {
            $( '#formcss' ).find('input').each(function() {
                $(this).attr( 'disabled', 'disabled' );
            });
            $( '#formcss' ).find('textarea').each(function() {
                $(this).attr( 'disabled', 'disabled' );
            });
            $( '#formcss' ).find('checkbox').each(function() {
                $(this).attr( 'disabled', 'disabled' );
            });
        }, 500);
    }
    showsymptomchecklist1() {
        this.symptomdetailsbypatientid(this.selected_patient_id);
        this.opensymptommodalflag = true;
        setTimeout(() => {
            $( '#formcss' ).find('input').each(function() {
                $(this).attr( 'disabled', 'disabled' );
            });
            $( '#formcss' ).find('textarea').each(function() {
                $(this).attr( 'disabled', 'disabled' );
            });
            $( '#formcss' ).find('checkbox').each(function() {
                $(this).attr( 'disabled', 'disabled' );
            });
        }, 500);
    }
    symptomdetailsbypatientid(id) {
        let link = this.serverurl + 'getcommoncancersymptomsbypatientid';
        let data = {patientid : id};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success' && typeof(result.id) != 'undefined') {
                    console.log('getcommoncancersymptomsbypatientid');
                    console.log(result.id);
                    let userdet = result.id;
                    //  this.iscompletedccsrecord = result.id.iscompleted;
                    this.dataForm2 = this.fb.group({
                        weightloss: [userdet.weightloss],
                        appetite: [userdet.appetite],
                        eatingdisorder: [userdet.eatingdisorder],
                        unabdominalpain: [userdet.unabdominalpain],
                        upabdominalpain: [userdet.upabdominalpain],
                        ruquadrantpain: [userdet.ruquadrantpain],
                        luquadrantpain: [userdet.luquadrantpain],
                        labdominalpain: [userdet.labdominalpain],
                        rlquadrantpain: [userdet.rlquadrantpain],
                        llquadrantpain: [userdet.llquadrantpain],
                        gabdominalpain: [userdet.gabdominalpain],
                        vomiting1: [userdet.vomiting1],
                        vomiting2: [userdet.vomiting2],
                        vomiting3: [userdet.vomiting3],
                        chronicfatigue: [userdet.chronicfatigue],
                        otherfatigue: [userdet.otherfatigue],
                        anemia: [userdet.anemia],
                        jaundice: [userdet.jaundice],
                        fatigue1: [userdet.fatigue1],
                        fatigue2: [userdet.fatigue2],
                        type1diabetes: [userdet.type1diabetes],
                        type2diabetes: [userdet.type2diabetes],
                        constipation: [userdet.constipation],
                        abnormalweightloss: [userdet.abnormalweightloss],
                        abnormalweightgain: [userdet.abnormalweightgain],
                        hypertrophicdisorders: [userdet.hypertrophicdisorders],
                        bloodinstool: [userdet.bloodinstool],
                        skineruption: [userdet.skineruption],
                        xerosiscutis: [userdet.xerosiscutis],
                        lumpinbreast: [userdet.lumpinbreast],
                        thickeningbreast: [userdet.thickeningbreast],
                        disordersofbreast: [userdet.disordersofbreast],
                        rednessnipple: [userdet.rednessnipple],
                        nipplepain: [userdet.nipplepain],
                        nippledischarge: [userdet.nippledischarge],
                        breastsize: [userdet.breastsize],
                        breastpain: [userdet.breastpain],
                        uterinebleeding: [userdet.uterinebleeding],
                        bloodinurine: [userdet.bloodinurine],
                        melena: [userdet.melena],
                        stomachpainabdominalpain: [userdet.stomachpainabdominalpain],
                        bowelhabits: [userdet.bowelhabits],
                        unconstipation: [userdet.unconstipation],
                        diarrhea: [userdet.diarrhea],
                        colonpolyps: [userdet.colonpolyps],
                        rectalbleeding: [userdet.rectalbleeding],
                        abdominalbloating1: [userdet.abdominalbloating1],
                        abdominalbloating2: [userdet.abdominalbloating2],
                        idefecation: [userdet.idefecation],
                        ofecalabnormalities: [userdet.ofecalabnormalities],
                        pancreaticuabdominalpain: [userdet.pancreaticuabdominalpain],
                        cholecystitis1: [userdet.cholecystitis1],
                        cholecystitis2: [userdet.cholecystitis2],
                        noofbloodclots: [userdet.noofbloodclots]
                    });
                    //  this.getsymptommodaliscompletedornot();
                } else {
                }
            }, error => {
                console.log('Ooops');
            });
    }
    showinproperform(val) {
        var returnarr = [];
        var k;
        for (let i in val) {
            k = val[i].replace(/\d+/g, '');
            k = k.replace('_', '');
            returnarr.push(k);
        }
        return returnarr;
        //  return val;
    }
    showmedicationpgx(id) {
        this.medicationpgxbypatientid(id);
        this.pgxmedicationmodal = true;
        setTimeout(() => {
            $( '#formpgx' ).find('input').each(function() {
                $(this).attr( 'disabled', 'disabled' );
            });
            $( '#formpgx' ).find('textarea').each(function() {
                $(this).attr( 'disabled', 'disabled' );
            });
            $( '#formpgx' ).find('checkbox').each(function() {
                $(this).attr( 'disabled', 'disabled' );
            });
        }, 500);
    }
    medicationpgxbypatientid(id) {
        let link = this.serverurl + 'getmedicationpgxbypatientid';
        let data = {patientid : id};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success' && typeof(result.id) != 'undefined') {
                    console.log('getmedicationpgxbypatientid');
                    console.log(result.id);
                    let userdet = result.id;
                    this.dataForm3 = this.fb.group({
                        lithium: [userdet.lithium],
                        abilify: [userdet.abilify],
                        seroquel: [userdet.seroquel],
                        clonazepam: [userdet.clonazepam],
                        latuda: [userdet.latuda],
                        valium: [userdet.valium],
                        ativan: [userdet.ativan],
                        zyprexa: [userdet.zyprexa],
                        xanax: [userdet.xanax],
                        zoloft: [userdet.zoloft],
                        celexa: [userdet.celexa],
                        paxil: [userdet.paxil],
                        cymbalta: [userdet.cymbalta],
                        klonopin: [userdet.klonopin],
                        waellbutrin: [userdet.waellbutrin],
                        prozac: [userdet.prozac],
                        lexapro: [userdet.lexapro],
                        amitriptyline: [userdet.amitriptyline],
                        viibryd: [userdet.viibryd],
                        trazodone: [userdet.trazodone],
                        nitros: [userdet.nitros],
                        heartattack: [userdet.heartattack],
                        lipitor: [userdet.lipitor],
                        crestor: [userdet.crestor],
                        zocor: [userdet.zocor],
                        mevacor: [userdet.mevacor],
                        skinrash: [userdet.skinrash],
                        prilosec: [userdet.prilosec],
                        zantac: [userdet.zantac],
                        nexium: [userdet.nexium],
                        neurontin: [userdet.neurontin],
                        triamcinolone: [userdet.triamcinolone],
                        clobex: [userdet.clobex],
                        fluocinonide: [userdet.fluocinonide],
                        betamethasone: [userdet.betamethasone],
                    });
                } else {
                }
            }, error => {
                console.log('Ooops');
            });
    }

    gotopgxpdf(id) {
        var url = 'http://' + this._commonservices.commonvalue.commonurl + '/testpdf/html2pdf/medication_checklist.php?id=' + id;
        window.open(url, '_blank');
    }
    disableselect() {
        setTimeout(() => {
            $( '#formquestionary' ).find('select').each(function() {
                $(this).attr( 'disabled', 'disabled' );
            });
        }, 500);
    }
    disabledatepicker() {
        setTimeout(() => {
            $( '#bsDatepickerid' ).attr( 'disabled', 'disabled' );
        }, 500);
    }
}
