import { Component, OnInit,  NgZone, EventEmitter} from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'ngx-cookie-service';
declare var $: any;
declare var moment: any;
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-patientrecord',
  templateUrl: './patientrecord.component.html',
  styleUrls: ['./patientrecord.component.css'],
  providers: [Commonservices],
})
export class PatientrecordComponent implements OnInit {
  public dataForm: FormGroup ;
  public dataForm1: FormGroup ;
  public dataForm2: FormGroup ;
  public fb;
  public cancer_type_modal_val;
 // public choose_cancer_type_flag = 0;
  public fb1;
  public optinstatus;
  public qstn;
  public saveorviewsheet;
  public pgxval : boolean = false;
  public deleteid;
  public editnoteid;
  public type;
  public patientdetails;
  public usastates;
  public issubmit;
  public issubmitcommoncancerform;
  public tagstatus;
  public shownoteerror;
  public divaddnote;
  public addnote;
  public val;
  public noteslist;
  public addit = 1;
  public allnotearr: any =[];
  public showdeg: any =[];
  public patient_added_on;
  public opensaveorsubmitmodal: boolean = false;
  public showdeletenotemodal: boolean = false;
  public showdeletesuccessmodal: boolean = false;
  public showquestionarydiv: boolean = false;
  id: number;
  public p: number = 1;
  public serverurl;
  public allusers;
  public patientuniqueid;
  public repuniqueid;
  // public cookieuniqueid;
  public pateintquestioniremodal: boolean = false;
  public modal_for_opt_in_path: boolean = false;
  public successfuladdnotemodal: boolean = false;
  public successfulupdatenotemodal: boolean = false;
  public addcookie: CookieService;
  public cookiedetails;
  public iscompletedpatientrecord = 0;
  public iscompletedccsrecord = 0;
  public planbcard: any = '';
  public planbcard_1: any = '';
  public planbcard_2: any = '';
  public planbcard_3: any = '';
  public planbcard_4: any = '';
  public planbcard_5: any = '';
  public planbcard_6: any = '';
  public carrier: any = '';
  public carrierplan: any = '';
  public carrierpolicyno: any = '';
  public symptomtype: any;
  public divshowself: any;

  public opensymptommodalflag: boolean = false;
  public opentypemodalflag: boolean = false;
  public hit_map_value: any;
  // public isdisable=0;
  public issegmentmodalshown: boolean = false;
  public showimagediv: boolean = false;
  public pgxmedicationmodal: boolean = false;
  options: UploaderOptions;
  //  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  private zone: NgZone;
  public basicOptions: Object;
  public disableuploader : any = 0;
  public inmediplanbcarderror: any;
  public inmedipolicynoerror: any;
  public inmedprimarypolicyerror: any;
  public incommercialcarriererror: any;
  public incarrierplanerror: any;
  public carrierpolicynoerror: any;
  public medadvantageplanplanerror: any;
  public medadvantagepolicynoerror: any;
  public medadvantageprimarypolicyerror: any;
  public insuranceerror: any = null;
  public carrierprimarypolicynoerror: any;
  public showflag = 0;
  public showflagforinsuranceinformation = 0;
  public helpdeskmailid: any;
  public addedbyrepdetailname: any;
  public selectrelationship: any;
    public addpatientvalidation: any = 0;

/*    public inmediplanbcarderror_: any = [];
    public inmedipolicynoerror_: any = [];
    public inmedprimarypolicyerror_: any = [];
    public incommercialcarriererror_: any = [];
    public incarrierplanerror_: any = [];
    public carrierpolicynoerror_: any = [];
    public medadvantageplanplanerror_: any = [];
    public medadvantagepolicynoerror_: any = [];
    public medadvantageprimarypolicyerror_: any = [];
    public carrierprimarypolicynoerror_: any = [];*/
public breastcancercount: any = 0;
public breastcancercountmain: any = 0;
public ovariantcancercount: any = 0;
public ovariantcancercountmain: any = 0;
public digestivecancercount: any = 0;
public digestivecancercountmain: any = 0;
  public dataForm3: FormGroup ;
  public selectedflaginsurance;
  public issubmitpgxform;
 // public selected_value;
  public iscompletedpgxrecord = 0;
  public usertype: string;
  static invalidtriedbraces;
  public hasprimaryerror = 0;
  public age_and_cancer_type = 0;
  public framesrc;
  public framesrc1;
  public isrecordavailable;
  public recordtype;
  public serverhost;
  public patientrecorddetails;
  public recordpopupmodal: boolean = false;
  public recorderror : boolean = true;
  
  constructor(fb: FormBuilder, fb1: FormBuilder, private _http: Http, private router: Router, private route: ActivatedRoute, public _commonservices: Commonservices, addcookie: CookieService,private sanitizer: DomSanitizer) {
    this.qstn = 'Self';
    this.fb = fb;
    this.fb1 = fb1;
    this.serverurl = _commonservices.url;
    this.getusastates();
    this.getallusers();
    this.addcookie = addcookie ;
    this.cookiedetails = this.addcookie.get('cookiedetails');
    this.usertype = this.addcookie.get('type');
    console.log('this.cookiedetails');
    console.log(this.cookiedetails);
    console.log(this.usertype);
    //  this.callcookiedetails();
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;

    this.serverhost = _commonservices.hostis;
    console.log('this.serverhost');
    console.log(this.serverhost);
  }

/*  callcookiedetails() {
    let link = this.serverurl + 'getuserdetails';
    let data = {userid: this.cookiedetails.id};
    this._http.post(link, data)
      .subscribe(res => {
        let result = res.json();
        console.log(result);
        if (result.status == 'success' && typeof(result.id) != 'undefined') {
          let userdet = result.id;
          this.cookieuniqueid = result.id.uniqueid;
          console.log('cookieuniqueid' + this.cookieuniqueid);
        } else {
        }
      }, error => {
        console.log('Ooops');
      });
  }*/
  ngOnInit() {
    setInterval(() => {
      this.getoptstatus();
    }, 15000);
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log('this.id________');
      console.log(this.id);
      this.getdetails();
      this.getnotes();
      this.getpatientrecord();
      /* this val 2 is just to get the iscompleted value from database , and it will not open the modal */
      this.getsymptommodaliscompletedornot();
     // this.getpgxiscompletedornot();
      console.log('call--1');
      this.pgxdetailsbypatientid();
    });
    this.route.params.subscribe(params => {
      this.type = params['type'];
      console.log('this.type___________');
      console.log(this.type);
      if (this.type == 1) {
        this.tagstatus = 'PPS Accepted';
      }
      else if (this.type == 2) {
        this.tagstatus = 'PPS Declined';
      }
      else if (this.type == 3) {
        this.tagstatus = 'Lead';
      }
      else if (this.type == 4) {
        this.tagstatus = 'PPS Submitted';
      }
      else if (this.type == 5) {
        this.tagstatus = 'PF submitted';
      }
      else {
        this.tagstatus = '';
      }
    });
                                  /*MANAGE CONTACT FIRST BLOCK IN PATIENT RECORD*/
    this.dataForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: [''],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      city: ['', Validators.required],
      state: ['', Validators.required]
    });
                                   /*PATIENT PROFILE SHEET FIRST BLOCK IN PATIENT RECORD*/
    this.dataForm1 = this.fb.group({
      cgx1: [''],
      pgxval: [''],
      firstname1: ['', Validators.required],
      lastname1: ['', Validators.required],
      phone1: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      address1: ['', Validators.required],
      city1: ['', Validators.required],
      state1: ['', Validators.required],
      zip1: ['', Validators.required],
      dob1: ['', Validators.required],
      gender1: ['', Validators.required],
      race1: ['', Validators.required],
      height1: ['', Validators.required],
      width1: ['', Validators.required],
      weight1: ['', Validators.required],
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
      insurance1: ['' , Validators.required ],
      insurance2: ['' , Validators.required ],
      insurance3: ['' , Validators.required ],
      insurance4: ['' , Validators.required ],
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
      cancer_sup: ['' ,  Validators.required ],
      catheters_sup: [''  ],
      allergies_sup: ['' ,  Validators.required ],
      scooter_sup: ['' , Validators.required ],
      walker_sup: ['' ,  Validators.required ],
      braces_sup: ['' ,  Validators.required ],
      topical_sup: ['',  Validators.required  ],
      pain_sup: ['',  Validators.required  ],
      triedbraces: [''],
     // triedbraces: ['', PatientrecordComponent.validatetriedbraces],
      wound_sup: ['', Validators.required ],
      diabetic_sup: ['', Validators.required ],
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
      image: [''],

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
        carrierpolicyno_6: [''],
      lastbrace: [''],
    });
      /*CANCER SYMPTOMS FIRST BLOCK IN PATIENT RECORD*/

    this.dataForm2 = this.fb.group({
      weightloss: [''],
      weight: [''],
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
      difficulty_swallowing: [''],
      sorethroat: [''],
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
      chroniccough: [''],
      lowerbackpain: [''],
      hearingloss: [''],
      skinchanges: [''],
      legpain: [''],
      swollenabdomen: [''],
      lumpinbreast: [''],
      thickeningbreast: [''],
      disordersofbreast: [''],
      rednessnipple: [''],
      nipplepain: [''],
      nippledischarge: [''],
      breastsize: [''],
      breastpain: [''],
      uterinebleeding: [''],
      urinationurgency: [''],
      pelvicpain: [''],
      gaspain: [''],
      bloodinurine: [''],
      melena: [''],
      stomachpainabdominalpain: [''],
      bowelhabits: [''],
      unconstipation: [''],
      diarrhea: [''],
      colonpolyps: [''],
      inflammatorypolyps: [''],
      rectalbleeding: [''],
      abdominalbloating1: [''],
      abdominalbloating2: [''],
      idefecation: [''],
      ofecalabnormalities: [''],
      pancreaticuabdominalpain: [''],
      cholecystitis1: [''],
      cholecystitis2: [''],
      noofbloodclots: [''],
      personalhighcholesterol: [''],
      fhighcholesterol: [''],
      fheartdisease: [''],
      varicose_veins: [''],
      acid_reflux: [''],
      anemia1: [''],
      migraines: [''],
      pain: [''],
      paininunsjoint: [''],
      backpain: [''],
      fibromyalgia: [''],
      nerve_pain: [''],
      arthritis: [''],
      angina: [''],
      stroke: [''],
      heart_attack: [''],
      high_blood_pressure: ['']
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
    this.zone = new NgZone({enableLongStackTrace: false});
    this.basicOptions = {
      url: this.serverurl + 'uploads',
      filterExtensions: false,
      allowedExtensions: ['jpg', 'png', 'jpeg']
    };
    this.gethelpdeskmailid();
    this.getoptstatus();
  }

/*  static validatetriedbraces(control: FormControl) {
    PatientrecordComponent.invalidtriedbraces = false;
console.log('control.value'+control.value);
    if (control.value == '' || control.value == null) {
     // PatientrecordComponent.blankemail = true;
      return {'invalidemail': true};
    }
    if (!control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
     // PatientrecordComponent.invalidemail = true;
      return {'invalidemail': true};
    }
  }*/

                                                          /*NOTES*/

  show_div_to_add_note() {
    this.divaddnote = true;
  }
  editnote(item) {
    this.editnoteid = item._id;
    this.divaddnote = true;
    this.addnote = item.note;
    this.addit = 0; // edit
  }
  getnotes() {
    this.allnotearr = [];
    let link = this.serverurl + 'getnotes';
    let data = {patientid : this.id};
    this._http.post(link, data)
      .subscribe(res => {
        let result = res.json();
        if (result.status == 'success' && typeof(result.id) != 'undefined') {
          //  console.log('getnotes-------');
          //  console.log(result);
          this.noteslist = result.id;
          console.log('this.noteslist----');
          console.log(this.noteslist);
          /*for (let j in this.noteslist) {
            this.allnotearr.push(this.noteslist[j].note);
           }*/
        } else {
        }
      }, error => {
        console.log('Ooops');
      });
  }
  addsimplenote() {
    let data;
    let link = this.serverurl + 'noteadd';
    if (this.addnote != null) {
      data = {
        patientid: this.id,
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
  cancelnote() {
    this.addnote = null;
    this.divaddnote = false;
  }
  deletethisnote() {
    let link = this.serverurl + 'notedelete';
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

  deletenote(id) {
    this.deleteid = id;
    this.showdeletenotemodal = true;
  }

  updatesimplenote() {
    let link = this.serverurl + 'noteupdate';
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
                                                      /*BASIC FUNCTIONS*/
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
  getallusers() {
    let link = this.serverurl + 'getallusers';
    this._http.get(link)
      .subscribe(res => {
        let result = res.json();
        this.allusers = result.id;

      }, error => {
        console.log('Oooops!');
      });
  }
  getdetails() {
    let link = this.serverurl + 'getpatientdetails';
    let data = {_id : this.id};
    this._http.post(link, data)
      .subscribe(res => {
        let result = res.json();
        if (result.status == 'success' && typeof(result.item) != 'undefined') {
          console.log('getpatientdetails-------');
          console.log(result);
          this.patientdetails = result.item;
          let userdet = result.item;
          console.log(userdet.added_on);
          this.patient_added_on = moment(userdet.added_on).format('MM-DD-YYYY');
          this.patientuniqueid = result.item.uniqueid;
          console.log('patientuniqueid' + this.patientuniqueid);
          this.dataForm = this.fb.group({
            firstname: [userdet.firstname, Validators.required],
            lastname: [userdet.lastname, Validators.required],
            email: [userdet.email],
            phone: [userdet.phone, Validators.required],
            city: [userdet.city, Validators.required],
            state: [userdet.state, Validators.required]
          });
          this.getrepid(result.item.addedby);
        } else {
          this.router.navigate(['/patient-list']);
        }
      }, error => {
        console.log('Ooops');
      });
  }
  showname(id) {
    for (let i in this.allusers) {
      if (this.allusers[i]._id == id) {
        return this.allusers[i].firstname + ' ' + this.allusers[i].lastname;
      }
    }
  }
  showtime(time) {
    return moment(time).format('MMM Do, YYYY');
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
  getpatientrecord() {
    let link = this.serverurl + 'getpatientrecord';
    let data = {_id : this.id};
    this._http.post(link, data)
      .subscribe(res => {
        let result = res.json();
        if (result.status == 'success' && typeof(result.item) != 'undefined') {
          console.log('result.item.iscompleted');
          console.log(result.item.iscompleted);
          this.iscompletedpatientrecord = result.item.iscompleted;
        } else {
        }
      }, error => {
        console.log('Ooops');
      });
  }

  getoptstatus() {
    let link = this._commonservices.directnodeurl + 'datalist';
    this._http.post(link, {source:'optindata',condition:{patientid_object:this.id}})
        .subscribe(res => {
          let result = res.json();
          this.optinstatus=result.res[0].status;
        }, error => {
          console.log('Ooops');
        });
  }

  getsymptommodaliscompletedornot() {
    let link = this.serverurl + 'getcommoncancersymptomsbypatientid';
    let data = {patientid : this.id};
    this._http.post(link, data)
      .subscribe(res => {
        let result = res.json();
        if (result.status == 'success' && typeof(result.id) != 'undefined') {
          console.log('getcommoncancersymptomsbypatientid');
          console.log(result.id);
          let userdet = result.id;
          this.iscompletedccsrecord = result.id.iscompleted;
        } else {
        }
      }, error => {
        console.log('Ooops');
      });
  }

                                                    /* ERROR CALULATIONS*/
  setplancardbvalue(val: any, flag) {
    if (flag == 0) {
    this.planbcard = val;
    if (this.dataForm1.value.insurance1 == true && (this.planbcard == 'yes' || this.planbcard == 'no') ) {
    //  console.log('hi');
      this.inmediplanbcarderror = null;
    } else {
    //  console.log('else');
      this.inmediplanbcarderror = 'Please Choose an answer! ';
    }
    }
    if ( flag == 1) {
        this.planbcard_1 = val;
    }
    if ( flag == 2) {
        this.planbcard_2 = val;
    }
    if ( flag == 3) {
        this.planbcard_3 = val;
    }
    if ( flag == 4) {
        this.planbcard_4 = val;
    }
    if ( flag == 5) {
        this.planbcard_5 = val;
    }
    if ( flag == 6) {
        this.planbcard_6 = val;
    }
  }
  callmedpolicyerror() {
    console.log('callmedpolicyerror');
    console.log(this.dataForm1.value.medicarepolicyno);
    if (this.dataForm1.value.insurance1 == true && this.dataForm1.value.medicarepolicyno != null && this.dataForm1.value.medicarepolicyno != '') {
      this.inmedipolicynoerror = null;
      console.log('if?');
    } else {
      console.log('else?');
      this.inmedipolicynoerror = 'Please give your policy number! ';
    }
  }



  callmedprimarypolicyerror() {
    setTimeout(() => {
    if (this.dataForm1.value.insurance1 == true && (this.dataForm1.value.mediprimarypolicy == 'yes' || this.dataForm1.value.mediprimarypolicy == 'no' )) {
      console.log(this.inmedprimarypolicyerror);
      console.log('if????????????????????');
      this.inmedprimarypolicyerror = null;
    } else {
      console.log('elseeeee????????????????????');
      console.log(this.inmedprimarypolicyerror);
      this.inmedprimarypolicyerror =  'Please Choose an answer! ';
    }
    }, 50);
  }


  commercialcarrier() {
    if (this.dataForm1.value.insurance3 == true && (this.dataForm1.value.carrier != null && this.dataForm1.value.carrier != '')) {
     // console.log(this.inmedprimarypolicyerror);
      this.incommercialcarriererror = null;
    } else {
     // console.log('elseeeee????????????????????');
     // console.log(this.inmedprimarypolicyerror);
      this.incommercialcarriererror =  'Please Choose an answer! ';
    }
  }

  callcarrierplanerror() {
    if (this.dataForm1.value.insurance3 == true && this.dataForm1.value.carrierplan != null && this.dataForm1.value.carrierplan != '') {
      this.incarrierplanerror = null;
    } else {
      this.incarrierplanerror = 'Please give your plan type! ';
    }
  }

    callmedadvantageplanerror() {
    if (this.dataForm1.value.insurance2 == true && this.dataForm1.value.medadvantageplan != null && this.dataForm1.value.medadvantageplan != '') {
      this.medadvantageplanplanerror = null;
    } else {
      this.medadvantageplanplanerror = 'Please give your plan type! ';
    }
  }


  callcarrierpolicynoerror() {
    if (this.dataForm1.value.insurance3 == true && this.dataForm1.value.carrierpolicyno != null && this.dataForm1.value.carrierpolicyno != '') {
      this.carrierpolicynoerror = null;
    } else {
      this.carrierpolicynoerror = 'Please give your plan type! ';
    }
  }


    callmedadvantagepolicynoerror() {
    if (this.dataForm1.value.insurance2 == true && this.dataForm1.value.medadvantagepolicyno != null && this.dataForm1.value.medadvantagepolicyno != '') {
      this.medadvantagepolicynoerror = null;
    } else {
      this.medadvantagepolicynoerror = 'Please give your plan type! ';
    }
  }

  callcarrierprimarypolicyerror() {
    setTimeout(() => {
      if (this.dataForm1.value.insurance3 == true && (this.dataForm1.value.comprimarypolicy == 'yes' || this.dataForm1.value.comprimarypolicy == 'no' )) {
        this.carrierprimarypolicynoerror = null;
      } else {
        this.carrierprimarypolicynoerror =  'Please Choose an answer! ';
      }
    }, 50);
  }

    callmedadvantageprimarypolicyerror() {
    setTimeout(() => {
      if (this.dataForm1.value.insurance2 == true && (this.dataForm1.value.medadvantageprimarypolicy == 'yes' || this.dataForm1.value.medadvantageprimarypolicy == 'no' )) {
        this.medadvantageprimarypolicyerror = null;
      } else {
        this.medadvantageprimarypolicyerror =  'Please Choose an answer! ';
      }
    }, 50);
  }
                                                /* ERROR CALULATIONS END */

  removeplan1(){
    $('.insuranceinformation1').hide();
    this.dataForm1.patchValue({
      insurance3_1 : false,
      insurance2_1 : false,
      insurance4_1 : false,
      insurance1_1 : false,
    });
    this.showflagforinsuranceinformation--;
  }
  removeplan2(){
    $('.insuranceinformation2').hide();
    this.dataForm1.patchValue({
      insurance3_2 : false,
      insurance2_2 : false,
      insurance4_2 : false,
      insurance1_2 : false,
    });
    this.showflagforinsuranceinformation--;
  }
  removeplan3(){
    $('.insuranceinformation3').hide();
    this.dataForm1.patchValue({
      insurance3_3 : false,
      insurance2_3 : false,
      insurance4_3 : false,
      insurance1_3 : false,
    });
    this.showflagforinsuranceinformation--;
  }
  removeplan4(){
    $('.insuranceinformation4').hide();
    this.dataForm1.patchValue({
      insurance3_4 : false,
      insurance2_4 : false,
      insurance4_4 : false,
      insurance1_4 : false,
    });
    this.showflagforinsuranceinformation--;
  }
  removeplan5(){
    $('.insuranceinformation5').hide();
    this.dataForm1.patchValue({
      insurance3_5 : false,
      insurance2_5 : false,
      insurance4_5 : false,
      insurance1_5 : false,
    });
    this.showflagforinsuranceinformation--;
  }
  removeplan6(){
    $('.insuranceinformation6').hide();
    this.dataForm1.patchValue({
      insurance3_6 : false,
      insurance2_6 : false,
      insurance4_6 : false,
      insurance1_6 : false,
    });
    this.showflagforinsuranceinformation--;
  }






  setchkval1(val1) {
    console.log('465465');
    console.log(val1);
    console.log(this.dataForm1.value);
    setTimeout(() => {
      $('.chkval1').prop('checked', false);
      if (val1 == 1) {
        this.dataForm1.value.insurance3_1 = false;
        this.dataForm1.value.insurance2_1 = false;
        this.dataForm1.value.insurance1_1 = true;
        this.dataForm1.value.insurance4_1 = true;
        $('.chkval1').eq(0).prop('checked', true);
        this.dataForm1.patchValue({
          insurance3_1 : false,
          insurance2_1 : false,
          insurance4_1 : false,
          insurance1_1 : true,
          comprimarypolicy_1 : 'no'
        });
      }
      if (val1 == 2) {
        this.dataForm1.value.insurance1_1 = false;
        this.dataForm1.value.insurance2_1 = true;
        this.dataForm1.value.insurance3_1 = false;
        this.dataForm1.value.insurance4_1 = false;
        this.dataForm1.patchValue({
          insurance3_1 : false,
          insurance2_1 : true,
          insurance4_1 : false,
          insurance1_1 : false,
          comprimarypolicy_1 : 'no'
        });
        $('.chkval1').eq(1).prop('checked', true);
      }
      if (val1 == 3) {
        this.dataForm1.value.insurance1_1 = false;
        this.dataForm1.value.insurance3_1 = true;
        this.dataForm1.value.insurance2_1 = false;
        this.dataForm1.value.insurance4_1 = false;
        this.dataForm1.patchValue({
          insurance3_1 : true,
          insurance2_1 : false,
          insurance4_1 : false,
          insurance1_1 : false,
          comprimarypolicy_1 : 'yes',
          medadvantageprimarypolicy : 'no',
          medadvantageprimarypolicy_1 : 'no',
          medadvantageprimarypolicy_2 : 'no',
          medadvantageprimarypolicy_3 : 'no',
          medadvantageprimarypolicy_4 : 'no',
          medadvantageprimarypolicy_5 : 'no',
          medadvantageprimarypolicy_6 : 'no',
          mediprimarypolicy : 'no',
          mediprimarypolicy_1 : 'no',
          mediprimarypolicy_2 : 'no',
          mediprimarypolicy_3 : 'no',
          mediprimarypolicy_4 : 'no',
          mediprimarypolicy_5 : 'no',
          mediprimarypolicy_6 : 'no',
        });
        $('.chkval1').eq(2).prop('checked', true);
      }
      if (val1 == 4) {
        this.dataForm1.value.insurance2_1 = false;
        this.dataForm1.value.insurance4_1 = true;
        this.dataForm1.value.insurance1_1 = false;
        this.dataForm1.value.insurance3_1 = false;
        this.dataForm1.patchValue({
          insurance3_1 : false,
          insurance2_1 : false,
          insurance4_1 : true,
          insurance1_1 : false,
        });
        $('.chkval1').eq(3).prop('checked', true);
      }
      console.log(this.dataForm1.value.insurance1_1);
      console.log(this.dataForm1.value.insurance2_1);
      console.log(this.dataForm1.value.insurance3_1);
      console.log(this.dataForm1.value.insurance4_1);
      console.log(this.dataForm1.value);

      /*$(".fcheck").each(function(i) {
        if ($(this).prop('checked')==true) {
          console.log("Checkbox at index " + i + " is checked.");
          PatientrecordComponent.setinsurancevalue(i);
        }
      });*/
      console.log('.................??????????.............');
      if(this.dataForm1.value.comprimarypolicy == 'yes' || this.dataForm1.value.comprimarypolicy_1 == 'yes' || this.dataForm1.value.comprimarypolicy_2 == 'yes' || this.dataForm1.value.comprimarypolicy_3 == 'yes' || this.dataForm1.value.comprimarypolicy_4 == 'yes' || this.dataForm1.value.comprimarypolicy_5 == 'yes' || this.dataForm1.value.comprimarypolicy_6 == 'yes') {
        console.log('...................?..............');
        this.dataForm1.patchValue({
          mediprimarypolicy : 'no',
          mediprimarypolicy_1 : 'no',
          mediprimarypolicy_2 : 'no',
          mediprimarypolicy_3 : 'no',
          mediprimarypolicy_4 : 'no',
          mediprimarypolicy_5 : 'no',
          mediprimarypolicy_6 : 'no',
          medadvantageprimarypolicy : 'no',
          medadvantageprimarypolicy_1 : 'no',
          medadvantageprimarypolicy_2 : 'no',
          medadvantageprimarypolicy_3 : 'no',
          medadvantageprimarypolicy_4 : 'no',
          medadvantageprimarypolicy_5 : 'no',
          medadvantageprimarypolicy_6 : 'no',
        });
      }
    }, 500);
    }
  setchkval2(val1) {
    console.log('465465');
    console.log(val1);
    console.log(this.dataForm1.value);
    setTimeout(() => {
      $('.chkval1').prop('checked', false);
      if (val1 == 1) {
        this.dataForm1.value.insurance3_2 = false;
        this.dataForm1.value.insurance2_2 = false;
        this.dataForm1.value.insurance1_2 = true;
        this.dataForm1.value.insurance4_2 = true;
        $('.chkval1').eq(0).prop('checked', true);
        this.dataForm1.patchValue({
          insurance3_2 : false,
          insurance2_2 : false,
          insurance4_2 : false,
          insurance1_2 : true,
          comprimarypolicy_2 : 'no'
        });
      }
      if (val1 == 2) {
        this.dataForm1.value.insurance1_2 = false;
        this.dataForm1.value.insurance2_2 = true;
        this.dataForm1.value.insurance3_2 = false;
        this.dataForm1.value.insurance4_2 = false;
        this.dataForm1.patchValue({
          insurance3_2 : false,
          insurance2_2 : true,
          insurance4_2 : false,
          insurance1_2 : false,
          comprimarypolicy_2 : 'no'
        });
        $('.chkval1').eq(1).prop('checked', true);
      }
      if (val1 == 3) {
        this.dataForm1.value.insurance1_2 = false;
        this.dataForm1.value.insurance3_2 = true;
        this.dataForm1.value.insurance2_2 = false;
        this.dataForm1.value.insurance4_2 = false;
        this.dataForm1.patchValue({
          insurance3_2 : true,
          insurance2_2 : false,
          insurance4_2 : false,
          insurance1_2 : false,
          comprimarypolicy_2 : 'yes',
          medadvantageprimarypolicy : 'no',
          medadvantageprimarypolicy_1 : 'no',
          medadvantageprimarypolicy_2 : 'no',
          medadvantageprimarypolicy_3 : 'no',
          medadvantageprimarypolicy_4 : 'no',
          medadvantageprimarypolicy_5 : 'no',
          medadvantageprimarypolicy_6 : 'no',
          mediprimarypolicy : 'no',
          mediprimarypolicy_1 : 'no',
          mediprimarypolicy_2 : 'no',
          mediprimarypolicy_3 : 'no',
          mediprimarypolicy_4 : 'no',
          mediprimarypolicy_5 : 'no',
          mediprimarypolicy_6 : 'no',
        });
        $('.chkval1').eq(2).prop('checked', true);
      }
      if (val1 == 4) {
        this.dataForm1.value.insurance2_2 = false;
        this.dataForm1.value.insurance4_2 = true;
        this.dataForm1.value.insurance1_2 = false;
        this.dataForm1.value.insurance3_2 = false;
        this.dataForm1.patchValue({
          insurance3_2 : false,
          insurance2_2 : false,
          insurance4_2 : true,
          insurance1_2 : false,
        });
        $('.chkval1').eq(3).prop('checked', true);
      }
      console.log(this.dataForm1.value.insurance1_2);
      console.log(this.dataForm1.value.insurance2_2);
      console.log(this.dataForm1.value.insurance3_2);
      console.log(this.dataForm1.value.insurance4_2);
      console.log(this.dataForm1.value);

      /*$(".fcheck").each(function(i) {
        if ($(this).prop('checked')==true) {
          console.log("Checkbox at index " + i + " is checked.");
          PatientrecordComponent.setinsurancevalue(i);
        }
      });*/

      if(this.dataForm1.value.comprimarypolicy == 'yes' || this.dataForm1.value.comprimarypolicy_1 == 'yes' || this.dataForm1.value.comprimarypolicy_2 == 'yes' || this.dataForm1.value.comprimarypolicy_3 == 'yes' || this.dataForm1.value.comprimarypolicy_4 == 'yes' || this.dataForm1.value.comprimarypolicy_5 == 'yes' || this.dataForm1.value.comprimarypolicy_6 == 'yes') {
        this.dataForm1.patchValue({
          mediprimarypolicy : 'no',
          mediprimarypolicy_1 : 'no',
          mediprimarypolicy_2 : 'no',
          mediprimarypolicy_3 : 'no',
          mediprimarypolicy_4 : 'no',
          mediprimarypolicy_5 : 'no',
          mediprimarypolicy_6 : 'no',
          medadvantageprimarypolicy : 'no',
          medadvantageprimarypolicy_1 : 'no',
          medadvantageprimarypolicy_2 : 'no',
          medadvantageprimarypolicy_3 : 'no',
          medadvantageprimarypolicy_4 : 'no',
          medadvantageprimarypolicy_5 : 'no',
          medadvantageprimarypolicy_6 : 'no',
        });
      }
    }, 500);
    }

  setchkval3(val1) {
    console.log('465465');
    console.log(val1);
    console.log(this.dataForm1.value);
    setTimeout(() => {
      $('.chkval1').prop('checked', false);
      if (val1 == 1) {
        this.dataForm1.value.insurance3_3 = false;
        this.dataForm1.value.insurance2_3 = false;
        this.dataForm1.value.insurance1_3 = true;
        this.dataForm1.value.insurance4_3 = true;
        $('.chkval1').eq(0).prop('checked', true);
        this.dataForm1.patchValue({
          insurance3_3 : false,
          insurance2_3 : false,
          insurance4_3 : false,
          insurance1_3 : true,
          comprimarypolicy_3 : 'no'
        });
      }
      if (val1 == 2) {
        this.dataForm1.value.insurance1_3 = false;
        this.dataForm1.value.insurance2_3 = true;
        this.dataForm1.value.insurance3_3 = false;
        this.dataForm1.value.insurance4_3 = false;
        this.dataForm1.patchValue({
          insurance3_3 : false,
          insurance2_3 : true,
          insurance4_3 : false,
          insurance1_3 : false,
          comprimarypolicy_3 : 'no'
        });
        $('.chkval1').eq(1).prop('checked', true);
      }
      if (val1 == 3) {
        this.dataForm1.value.insurance1_3 = false;
        this.dataForm1.value.insurance3_3 = true;
        this.dataForm1.value.insurance2_3 = false;
        this.dataForm1.value.insurance4_3 = false;
        this.dataForm1.patchValue({
          insurance3_3 : true,
          insurance2_3 : false,
          insurance4_3 : false,
          insurance1_3 : false,
          comprimarypolicy_3 : 'yes',
          medadvantageprimarypolicy : 'no',
          medadvantageprimarypolicy_1 : 'no',
          medadvantageprimarypolicy_2 : 'no',
          medadvantageprimarypolicy_3 : 'no',
          medadvantageprimarypolicy_4 : 'no',
          medadvantageprimarypolicy_5 : 'no',
          medadvantageprimarypolicy_6 : 'no',
          mediprimarypolicy : 'no',
          mediprimarypolicy_1 : 'no',
          mediprimarypolicy_2 : 'no',
          mediprimarypolicy_3 : 'no',
          mediprimarypolicy_4 : 'no',
          mediprimarypolicy_5 : 'no',
          mediprimarypolicy_6 : 'no',
        });
        $('.chkval1').eq(2).prop('checked', true);
      }
      if (val1 == 4) {
        this.dataForm1.value.insurance2_3 = false;
        this.dataForm1.value.insurance4_3 = true;
        this.dataForm1.value.insurance1_3 = false;
        this.dataForm1.value.insurance3_3 = false;
        this.dataForm1.patchValue({
          insurance3_3 : false,
          insurance2_3 : false,
          insurance4_3 : true,
          insurance1_3 : false,
        });
        $('.chkval1').eq(3).prop('checked', true);
      }
      console.log(this.dataForm1.value.insurance1_3);
      console.log(this.dataForm1.value.insurance2_3);
      console.log(this.dataForm1.value.insurance3_3);
      console.log(this.dataForm1.value.insurance4_3);
      console.log(this.dataForm1.value);

      /*$(".fcheck").each(function(i) {
        if ($(this).prop('checked')==true) {
          console.log("Checkbox at index " + i + " is checked.");
          PatientrecordComponent.setinsurancevalue(i);
        }
      });*/

      if(this.dataForm1.value.comprimarypolicy == 'yes' || this.dataForm1.value.comprimarypolicy_1 == 'yes' || this.dataForm1.value.comprimarypolicy_2 == 'yes' || this.dataForm1.value.comprimarypolicy_3 == 'yes' || this.dataForm1.value.comprimarypolicy_4 == 'yes' || this.dataForm1.value.comprimarypolicy_5 == 'yes' || this.dataForm1.value.comprimarypolicy_6 == 'yes') {
        this.dataForm1.patchValue({
          mediprimarypolicy : 'no',
          mediprimarypolicy_1 : 'no',
          mediprimarypolicy_2 : 'no',
          mediprimarypolicy_3 : 'no',
          mediprimarypolicy_4 : 'no',
          mediprimarypolicy_5 : 'no',
          mediprimarypolicy_6 : 'no',
          medadvantageprimarypolicy : 'no',
          medadvantageprimarypolicy_1 : 'no',
          medadvantageprimarypolicy_2 : 'no',
          medadvantageprimarypolicy_3 : 'no',
          medadvantageprimarypolicy_4 : 'no',
          medadvantageprimarypolicy_5 : 'no',
          medadvantageprimarypolicy_6 : 'no',
        });
      }
    }, 500);
    }


  setchkval4(val1) {
    console.log('465465');
    console.log(val1);
    console.log(this.dataForm1.value);
    setTimeout(() => {
      $('.chkval1').prop('checked', false);
      if (val1 == 1) {
        this.dataForm1.value.insurance3_4 = false;
        this.dataForm1.value.insurance2_4 = false;
        this.dataForm1.value.insurance1_4 = true;
        this.dataForm1.value.insurance4_4 = true;
        $('.chkval1').eq(0).prop('checked', true);
        this.dataForm1.patchValue({
          insurance3_4 : false,
          insurance2_4 : false,
          insurance4_4 : false,
          insurance1_4 : true,
          comprimarypolicy_4 : 'no'
        });
      }
      if (val1 == 2) {
        this.dataForm1.value.insurance1_4 = false;
        this.dataForm1.value.insurance2_4 = true;
        this.dataForm1.value.insurance3_4 = false;
        this.dataForm1.value.insurance4_4 = false;
        this.dataForm1.patchValue({
          insurance3_4 : false,
          insurance2_4 : true,
          insurance4_4 : false,
          insurance1_4 : false,
          comprimarypolicy_4 : 'no'
        });
        $('.chkval1').eq(1).prop('checked', true);
      }
      if (val1 == 3) {
        this.dataForm1.value.insurance1_4 = false;
        this.dataForm1.value.insurance3_4 = true;
        this.dataForm1.value.insurance2_4 = false;
        this.dataForm1.value.insurance4_4 = false;
        this.dataForm1.patchValue({
          insurance3_4 : true,
          insurance2_4 : false,
          insurance4_4 : false,
          insurance1_4 : false,
          comprimarypolicy_4 : 'yes',
          medadvantageprimarypolicy : 'no',
          medadvantageprimarypolicy_1 : 'no',
          medadvantageprimarypolicy_2 : 'no',
          medadvantageprimarypolicy_3 : 'no',
          medadvantageprimarypolicy_4 : 'no',
          medadvantageprimarypolicy_5 : 'no',
          medadvantageprimarypolicy_6 : 'no',
          mediprimarypolicy : 'no',
          mediprimarypolicy_1 : 'no',
          mediprimarypolicy_2 : 'no',
          mediprimarypolicy_3 : 'no',
          mediprimarypolicy_4 : 'no',
          mediprimarypolicy_5 : 'no',
          mediprimarypolicy_6 : 'no',
        });
        $('.chkval1').eq(2).prop('checked', true);
      }
      if (val1 == 4) {
        this.dataForm1.value.insurance2_4 = false;
        this.dataForm1.value.insurance4_4 = true;
        this.dataForm1.value.insurance1_4 = false;
        this.dataForm1.value.insurance3_4 = false;
        this.dataForm1.patchValue({
          insurance3_4 : false,
          insurance2_4 : false,
          insurance4_4 : true,
          insurance1_4 : false,
        });
        $('.chkval1').eq(3).prop('checked', true);
      }
      console.log(this.dataForm1.value.insurance1_4);
      console.log(this.dataForm1.value.insurance2_4);
      console.log(this.dataForm1.value.insurance3_4);
      console.log(this.dataForm1.value.insurance4_4);
      console.log(this.dataForm1.value);

      /*$(".fcheck").each(function(i) {
        if ($(this).prop('checked')==true) {
          console.log("Checkbox at index " + i + " is checked.");
          PatientrecordComponent.setinsurancevalue(i);
        }
      });*/

      if(this.dataForm1.value.comprimarypolicy == 'yes' || this.dataForm1.value.comprimarypolicy_1 == 'yes' || this.dataForm1.value.comprimarypolicy_2 == 'yes' || this.dataForm1.value.comprimarypolicy_3 == 'yes' || this.dataForm1.value.comprimarypolicy_4 == 'yes' || this.dataForm1.value.comprimarypolicy_5 == 'yes' || this.dataForm1.value.comprimarypolicy_6 == 'yes') {
        this.dataForm1.patchValue({
          mediprimarypolicy : 'no',
          mediprimarypolicy_1 : 'no',
          mediprimarypolicy_2 : 'no',
          mediprimarypolicy_3 : 'no',
          mediprimarypolicy_4 : 'no',
          mediprimarypolicy_5 : 'no',
          mediprimarypolicy_6 : 'no',
          medadvantageprimarypolicy : 'no',
          medadvantageprimarypolicy_1 : 'no',
          medadvantageprimarypolicy_2 : 'no',
          medadvantageprimarypolicy_3 : 'no',
          medadvantageprimarypolicy_4 : 'no',
          medadvantageprimarypolicy_5 : 'no',
          medadvantageprimarypolicy_6 : 'no',
        });
      }
    }, 500);
    }
  setchkval5(val1) {
    console.log('465465');
    console.log(val1);
    console.log(this.dataForm1.value);
    setTimeout(() => {
      $('.chkval1').prop('checked', false);
      if (val1 == 1) {
        this.dataForm1.value.insurance3_5 = false;
        this.dataForm1.value.insurance2_5 = false;
        this.dataForm1.value.insurance1_5 = true;
        this.dataForm1.value.insurance4_5 = true;
        $('.chkval1').eq(0).prop('checked', true);
        this.dataForm1.patchValue({
          insurance3_5 : false,
          insurance2_5 : false,
          insurance4_5 : false,
          insurance1_5 : true,
          comprimarypolicy_5 : 'no'
        });
      }
      if (val1 == 2) {
        this.dataForm1.value.insurance1_5 = false;
        this.dataForm1.value.insurance2_5 = true;
        this.dataForm1.value.insurance3_5 = false;
        this.dataForm1.value.insurance4_5 = false;
        this.dataForm1.patchValue({
          insurance3_5 : false,
          insurance2_5 : true,
          insurance4_5 : false,
          insurance1_5 : false,
          comprimarypolicy_5 : 'no'
        });
        $('.chkval1').eq(1).prop('checked', true);
      }
      if (val1 == 3) {
        this.dataForm1.value.insurance1_5 = false;
        this.dataForm1.value.insurance3_5 = true;
        this.dataForm1.value.insurance2_5 = false;
        this.dataForm1.value.insurance4_5 = false;
        this.dataForm1.patchValue({
          insurance3_5 : true,
          insurance2_5 : false,
          insurance4_5 : false,
          insurance1_5 : false,
          comprimarypolicy_5 : 'yes',
          medadvantageprimarypolicy : 'no',
          medadvantageprimarypolicy_1 : 'no',
          medadvantageprimarypolicy_2 : 'no',
          medadvantageprimarypolicy_3 : 'no',
          medadvantageprimarypolicy_4 : 'no',
          medadvantageprimarypolicy_5 : 'no',
          medadvantageprimarypolicy_6 : 'no',
          mediprimarypolicy : 'no',
          mediprimarypolicy_1 : 'no',
          mediprimarypolicy_2 : 'no',
          mediprimarypolicy_3 : 'no',
          mediprimarypolicy_4 : 'no',
          mediprimarypolicy_5 : 'no',
          mediprimarypolicy_6 : 'no',
        });
        $('.chkval1').eq(2).prop('checked', true);
      }
      if (val1 == 4) {
        this.dataForm1.value.insurance2_5 = false;
        this.dataForm1.value.insurance4_5 = true;
        this.dataForm1.value.insurance1_5 = false;
        this.dataForm1.value.insurance3_5 = false;
        this.dataForm1.patchValue({
          insurance3_5 : false,
          insurance2_5 : false,
          insurance4_5 : true,
          insurance1_5 : false,
        });
        $('.chkval1').eq(3).prop('checked', true);
      }
      console.log(this.dataForm1.value.insurance1_5);
      console.log(this.dataForm1.value.insurance2_5);
      console.log(this.dataForm1.value.insurance3_5);
      console.log(this.dataForm1.value.insurance4_5);
      console.log(this.dataForm1.value);

      /*$(".fcheck").each(function(i) {
        if ($(this).prop('checked')==true) {
          console.log("Checkbox at index " + i + " is checked.");
          PatientrecordComponent.setinsurancevalue(i);
        }
      });*/
      if(this.dataForm1.value.comprimarypolicy == 'yes' || this.dataForm1.value.comprimarypolicy_1 == 'yes' || this.dataForm1.value.comprimarypolicy_2 == 'yes' || this.dataForm1.value.comprimarypolicy_3 == 'yes' || this.dataForm1.value.comprimarypolicy_4 == 'yes' || this.dataForm1.value.comprimarypolicy_5 == 'yes' || this.dataForm1.value.comprimarypolicy_6 == 'yes') {
        this.dataForm1.patchValue({
          mediprimarypolicy : 'no',
          mediprimarypolicy_1 : 'no',
          mediprimarypolicy_2 : 'no',
          mediprimarypolicy_3 : 'no',
          mediprimarypolicy_4 : 'no',
          mediprimarypolicy_5 : 'no',
          mediprimarypolicy_6 : 'no',
          medadvantageprimarypolicy : 'no',
          medadvantageprimarypolicy_1 : 'no',
          medadvantageprimarypolicy_2 : 'no',
          medadvantageprimarypolicy_3 : 'no',
          medadvantageprimarypolicy_4 : 'no',
          medadvantageprimarypolicy_5 : 'no',
          medadvantageprimarypolicy_6 : 'no',
        });
      }

    }, 500);
    }
  setchkval6(val1) {
    console.log('465465');
    console.log(val1);
    console.log(this.dataForm1.value);
    setTimeout(() => {
      $('.chkval1').prop('checked', false);
      if (val1 == 1) {
        this.dataForm1.value.insurance3_6 = false;
        this.dataForm1.value.insurance2_6 = false;
        this.dataForm1.value.insurance1_6 = true;
        this.dataForm1.value.insurance4_6 = true;
        $('.chkval1').eq(0).prop('checked', true);
        this.dataForm1.patchValue({
          insurance3_6 : false,
          insurance2_6 : false,
          insurance4_6 : false,
          insurance1_6 : true,
          comprimarypolicy_6 : 'no'
        });
      }
      if (val1 == 2) {
        this.dataForm1.value.insurance1_6 = false;
        this.dataForm1.value.insurance2_6 = true;
        this.dataForm1.value.insurance3_6 = false;
        this.dataForm1.value.insurance4_6 = false;
        this.dataForm1.patchValue({
          insurance3_6 : false,
          insurance2_6 : true,
          insurance4_6 : false,
          insurance1_6 : false,
          comprimarypolicy_6 : 'no'
        });
        $('.chkval1').eq(1).prop('checked', true);
      }
      if (val1 == 3) {
        this.dataForm1.value.insurance1_6 = false;
        this.dataForm1.value.insurance3_6 = true;
        this.dataForm1.value.insurance2_6 = false;
        this.dataForm1.value.insurance4_6 = false;
        this.dataForm1.patchValue({
          insurance3_6 : true,
          insurance2_6 : false,
          insurance4_6 : false,
          insurance1_6 : false,
          comprimarypolicy_6 : 'yes',
          medadvantageprimarypolicy : 'no',
          medadvantageprimarypolicy_1 : 'no',
          medadvantageprimarypolicy_2 : 'no',
          medadvantageprimarypolicy_3 : 'no',
          medadvantageprimarypolicy_4 : 'no',
          medadvantageprimarypolicy_5 : 'no',
          medadvantageprimarypolicy_6 : 'no',
          mediprimarypolicy : 'no',
          mediprimarypolicy_1 : 'no',
          mediprimarypolicy_2 : 'no',
          mediprimarypolicy_3 : 'no',
          mediprimarypolicy_4 : 'no',
          mediprimarypolicy_5 : 'no',
          mediprimarypolicy_6 : 'no',
        });
        $('.chkval1').eq(2).prop('checked', true);
      }
      if (val1 == 4) {
        this.dataForm1.value.insurance2_6 = false;
        this.dataForm1.value.insurance4_6 = true;
        this.dataForm1.value.insurance1_6 = false;
        this.dataForm1.value.insurance3_6 = false;
        this.dataForm1.patchValue({
          insurance3_6 : false,
          insurance2_6 : false,
          insurance4_6 : true,
          insurance1_6 : false,
        });
        $('.chkval1').eq(3).prop('checked', true);
      }
      console.log(this.dataForm1.value.insurance1_6);
      console.log(this.dataForm1.value.insurance2_6);
      console.log(this.dataForm1.value.insurance3_6);
      console.log(this.dataForm1.value.insurance4_6);
      console.log(this.dataForm1.value);

      /*$(".fcheck").each(function(i) {
        if ($(this).prop('checked')==true) {
          console.log("Checkbox at index " + i + " is checked.");
          PatientrecordComponent.setinsurancevalue(i);
        }
      });*/
      if(this.dataForm1.value.comprimarypolicy == 'yes' || this.dataForm1.value.comprimarypolicy_1 == 'yes' || this.dataForm1.value.comprimarypolicy_2 == 'yes' || this.dataForm1.value.comprimarypolicy_3 == 'yes' || this.dataForm1.value.comprimarypolicy_4 == 'yes' || this.dataForm1.value.comprimarypolicy_5 == 'yes' || this.dataForm1.value.comprimarypolicy_6 == 'yes') {
        this.dataForm1.patchValue({
          mediprimarypolicy : 'no',
          mediprimarypolicy_1 : 'no',
          mediprimarypolicy_2 : 'no',
          mediprimarypolicy_3 : 'no',
          mediprimarypolicy_4 : 'no',
          mediprimarypolicy_5 : 'no',
          mediprimarypolicy_6 : 'no',
          medadvantageprimarypolicy : 'no',
          medadvantageprimarypolicy_1 : 'no',
          medadvantageprimarypolicy_2 : 'no',
          medadvantageprimarypolicy_3 : 'no',
          medadvantageprimarypolicy_4 : 'no',
          medadvantageprimarypolicy_5 : 'no',
          medadvantageprimarypolicy_6 : 'no',
        });
      }

    }, 500);
    }



    public setinsurancevalue(val) {
    console.log('33333');
    console.log(this.dataForm1.value);
    setTimeout(() => {


      $('.fcheck').prop('checked',false);
      if (val==1) {
        this.dataForm1.value.insurance3=false;
        this.dataForm1.value.insurance2=false;
        this.dataForm1.value.insurance4=false;
        this.dataForm1.value.insurance1=true;
        this.dataForm1.patchValue({
          insurance3 : false,
          insurance2 : false,
          insurance4 : false,
          insurance1 : true,
          comprimarypolicy : 'no'
        });
        $('.fcheck').eq(0).prop('checked',true);
      }
      if (val==2) {
        this.dataForm1.value.insurance1=false;
        this.dataForm1.value.insurance3=false;
        this.dataForm1.value.insurance4=false;
        this.dataForm1.value.insurance2=true;
        this.dataForm1.patchValue({
          insurance3 : false,
          insurance2 : true,
          insurance4 : false,
          insurance1 : false,
          comprimarypolicy : 'no'
        });
        $('.fcheck').eq(1).prop('checked',true);
      }
      if (val==3) {
        this.dataForm1.value.insurance1=false;
        this.dataForm1.value.insurance2=false;
        this.dataForm1.value.insurance4=false;
        this.dataForm1.value.insurance3=true;
        this.dataForm1.patchValue({
          insurance3 : true,
          insurance2 : false,
          insurance4 : false,
          insurance1 : false,
          comprimarypolicy : 'yes',
          medadvantageprimarypolicy : 'no',
          medadvantageprimarypolicy_1 : 'no',
          medadvantageprimarypolicy_2 : 'no',
          medadvantageprimarypolicy_3 : 'no',
          medadvantageprimarypolicy_4 : 'no',
          medadvantageprimarypolicy_5 : 'no',
          medadvantageprimarypolicy_6 : 'no',
          mediprimarypolicy : 'no',
          mediprimarypolicy_1 : 'no',
          mediprimarypolicy_2 : 'no',
          mediprimarypolicy_3 : 'no',
          mediprimarypolicy_4 : 'no',
          mediprimarypolicy_5 : 'no',
          mediprimarypolicy_6 : 'no',
        });
        $('.fcheck').eq(2).prop('checked',true);
      }
      if (val==4) {
        this.dataForm1.value.insurance1=false;
        this.dataForm1.value.insurance3=false;
        this.dataForm1.value.insurance2=false;
        this.dataForm1.value.insurance4 = true;
        this.dataForm1.patchValue({
          insurance3 : false,
          insurance2 : false,
          insurance4 : true,
          insurance1 : false,
        });
        $('.fcheck').eq(3).prop('checked',true);
      }
      if (this.dataForm1.value.insurance1 == false) {
        this.inmediplanbcarderror = null;
        this.inmedipolicynoerror = null;
        this.inmedprimarypolicyerror = null;
      }
      if (this.dataForm1.value.insurance3 == false) {
        this.incommercialcarriererror = null;
        this.incarrierplanerror = null;
        this.carrierpolicynoerror = null;
        this.carrierprimarypolicynoerror = null;
      }
      if (this.dataForm1.value.insurance2 == false) {
        this.medadvantageplanplanerror = null;
        this.medadvantagepolicynoerror = null;
        this.medadvantageprimarypolicyerror = null;
      }

      /*$(".chkval1").each(function(i) {
        if ($(this).prop('checked')==true) {
          console.log("Checkbox at index " + i + " is checked.");
          PatientrecordComponent.setchkval1(i);
        }
      });*/

/*for (let j = 1; j < 7; j++) {
    let insurance1 = 'insurance1_' + j;
    let insurance2 = 'insurance2_' + j;
    let insurance3 = 'insurance3_' + j;
    let insurance4 = 'insurance4_' + j;
    if ($('input[name="' + insurance1 + '"]').prop('checked')  == false) {
        this.inmediplanbcarderror_[j] = null;
        this.inmedipolicynoerror_[j] = null;
        this.inmedprimarypolicyerror_[j] = null;
    }
    if ($('input[name="' + insurance3 + '"]').prop('checked')  == false) {
        this.incommercialcarriererror_[j] = null;
        this.incarrierplanerror_[j] = null;
        this.carrierpolicynoerror_[j] = null;
        this.carrierprimarypolicynoerror_[j] = null;
    }
    if ($('input[name="' + insurance2 + '"]').prop('checked')  == false) {
        this.medadvantageplanplanerror_[j] = null;
        this.medadvantagepolicynoerror_[j] = null;
        this.medadvantageprimarypolicyerror_[j] = null;
    }
}*/


      if(this.dataForm1.value.comprimarypolicy == 'yes' || this.dataForm1.value.comprimarypolicy_1 == 'yes' || this.dataForm1.value.comprimarypolicy_2 == 'yes' || this.dataForm1.value.comprimarypolicy_3 == 'yes' || this.dataForm1.value.comprimarypolicy_4 == 'yes' || this.dataForm1.value.comprimarypolicy_5 == 'yes' || this.dataForm1.value.comprimarypolicy_6 == 'yes') {
        this.dataForm1.patchValue({
          mediprimarypolicy : 'no',
          mediprimarypolicy_1 : 'no',
          mediprimarypolicy_2 : 'no',
          mediprimarypolicy_3 : 'no',
          mediprimarypolicy_4 : 'no',
          mediprimarypolicy_5 : 'no',
          mediprimarypolicy_6 : 'no',
          medadvantageprimarypolicy : 'no',
          medadvantageprimarypolicy_1 : 'no',
          medadvantageprimarypolicy_2 : 'no',
          medadvantageprimarypolicy_3 : 'no',
          medadvantageprimarypolicy_4 : 'no',
          medadvantageprimarypolicy_5 : 'no',
          medadvantageprimarypolicy_6 : 'no',
        });
      }



    }, 500);
  }


    checkpgx(val) {
        //  console.log(val);
        //  console.log(this.pgxval);
        if (this.pgxval != true) {
      if (val != null) {
        this.pgxval = true;
        //  $('#formquestionary .pgxvalclass').attr('checked', true);
        $('#formquestionary .pgxvalclass').prop('checked', true);
      }
    }
  }

  backtolistview() {
    if (this.cookiedetails.type == 'superadmin') {
      this.router.navigate(['/patient-list' , 'admin']);
    }
    else {
      this.router.navigate(['/patient-list']);
    }
  }
    removerow(val) {
    var removeval = 'history' + val;
        $('.' + removeval).hide();
  /*  var familyval = 'familyrelation' + val;
    var familyrelationnameval = 'familyrelation' + val + 'name';
    var relationval = 'relation' + (val + 1);
    var degreeval = 'degree' + (val + 1);
    var ageval = 'age' + val;
    var deadval = 'dead' + val;*/

/*        console.log('===========1============');
    console.log($('select[name="' + familyval + '"]').val());
    console.log($('input[name="' + familyrelationnameval + '"]').val());
    console.log(this.dataForm1.value.familyrelation1);
    console.log($('select[name="' + relationval + '"]').val());
    console.log($('select[name="' + degreeval + '"]').val());
    console.log($('input[name="' + ageval + '"]').val());
    console.log($('input[name="' + deadval + '"]').val());

        $('select[name="' + familyval + '"]').val('') ;
            $('input[name="' + familyrelationnameval + '"]').val('');
            $('select[name="' + relationval + '"]').val('');
            $('select[name="' + degreeval + '"]').val('');
            $('input[name="' + ageval + '"]').val('');
            $('input[name="' + deadval + '"]').val('');

        console.log('===========2============');
        console.log($('select[name="' + familyval + '"]').val());
        console.log($('input[name="' + familyrelationnameval + '"]').val());
        console.log($('select[name="' + relationval + '"]').val());
        console.log($('select[name="' + degreeval + '"]').val());
        console.log($('input[name="' + ageval + '"]').val());
        console.log($('input[name="' + deadval + '"]').val());*/

        if (val == 1) {
            this.dataForm1.patchValue({
                familyrelation1 : '',
                familyrelation1name : '',
                motype1 : '',
                relation2 : '',
                degree2 : '',
                moage : '',
                modead : '',
            });
        }
        if (val == 2) {
            this.dataForm1.patchValue({
                familyrelation2 : '',
                familyrelation2name : '',
                fatype1 : '',
                relation3 : '',
                degree3 : '',
                faage : '',
                fadead : '',
            });
        }
        if (val == 3) {
            this.dataForm1.patchValue({
                familyrelation3 : '',
                familyrelation3name : '',
                dautype1 : '',
                relation4 : '',
                degree4 : '',
                dauage : '',
                daudead : '',
            });
        }
        if (val == 4) {
            this.dataForm1.patchValue({
                familyrelation4 : '',
                familyrelation4name : '',
                sontype1 : '',
                relation5 : '',
                degree5 : '',
                sonage : '',
                sondead : '',
            });
        }
        if (val == 5) {
            this.dataForm1.patchValue({
                familyrelation5 : '',
                familyrelation5name : '',
                brotype1 : '',
                relation6 : '',
                degree6 : '',
                broage : '',
                brodead : '',
            });
        }
        if (val == 6) {
            this.dataForm1.patchValue({
                familyrelation6 : '',
                familyrelation6name : '',
                sistype1 : '',
                relation7 : '',
                degree7 : '',
                sisage : '',
                sisdead : '',
            });
        }
        if (val == 7) {
            this.dataForm1.patchValue({
                familyrelation7 : '',
                familyrelation7name : '',
                neptype1 : '',
                relation8 : '',
                degree8 : '',
                nepage : '',
                nepdead : '',
            });
        }
        if (val == 8) {
            this.dataForm1.patchValue({
                familyrelation8 : '',
                familyrelation8name : '',
                niecetype1 : '',
                relation9 : '',
                degree9 : '',
                nieceage : '',
                niecedead : '',
            });
        }
        if (val == 9) {
            this.dataForm1.patchValue({
                familyrelation9 : '',
                familyrelation9name : '',
                unctype1 : '',
                relation10 : '',
                degree10 : '',
                uncage : '',
                uncdead : '',
            });
        }
        if (val == 10) {
            this.dataForm1.patchValue({
                familyrelation10 : '',
                familyrelation10name : '',
                autntype1 : '',
                relation11 : '',
                degree11 : '',
                autnage : '',
                autndead : '',
            });
        }
        if (val == 11) {
            this.dataForm1.patchValue({
                familyrelation11 : '',
                familyrelation11name : '',
                moftype1 : '',
                relation12 : '',
                degree12 : '',
                mofage : '',
                mofdead : '',
            });
        }
        if (val == 12) {
            this.dataForm1.patchValue({
                familyrelation12 : '',
                familyrelation12name : '',
                momotype1 : '',
                relation13 : '',
                degree13 : '',
                momoage : '',
                momodead : '',
            });
        }
        if (val == 13) {
            this.dataForm1.patchValue({
                familyrelation13 : '',
                familyrelation13name : '',
                daftype1 : '',
                relation14 : '',
                degree14 : '',
                dafage : '',
                dafdead : '',
            });
        }
        if (val == 14) {
            this.dataForm1.patchValue({
                familyrelation14 : '',
                familyrelation14name : '',
                damtype1 : '',
                relation15 : '',
                degree15 : '',
                damage : '',
                damdead : '',
            });
        }
        if (val == 15) {
            this.dataForm1.patchValue({
                familyrelation15 : '',
                familyrelation15name : '',
                oth1type1 : '',
                relation16 : '',
                degree16 : '',
                oth1age : '',
                oth1dead : '',
            });
        }
        if (val == 16) {
            this.dataForm1.patchValue({
                familyrelation16 : '',
                familyrelation16name : '',
                oth2type1 : '',
                relation17 : '',
                degree17 : '',
                oth2age : '',
                oth2dead : '',
            });
        }
        if (val == 17) {
            this.dataForm1.patchValue({
                familyrelation17 : '',
                familyrelation17name : '',
                oth3type1 : '',
                relation18 : '',
                degree18 : '',
                oth3age : '',
                oth3dead : '',
            });
        }
    }

    showhidepatientquestionarydiv(val) {
   // if (val == 1) {
      this.showquestionarydiv = true;
        // self selected by default, so make relationship type disable and degree blank forefully.
        setTimeout(() => {
        $('select[name="familyrelation0"]').parent().next().next().next().next().find('select').attr( 'disabled', 'disabled' );
        this.showdeg[0] = '';

            if (this.dataForm1.value.cancer_sup == 'no') {
                this.dataForm1.patchValue({
                    familyrelation0 : '',
                    phname : '',
                    phtype1: '',
                    relation1: '',
                    degree1: '',
                    phage: '',
                    phdead: ''
                });
                $('select[name="familyrelation0"]').val('');
                $('.name0').val('');
            }
            else {
                this.dataForm1.patchValue({
                    familyrelation0 : 'Self',
                    phname : this.patientdetails.firstname + ' ' + this.patientdetails.lastname
                });
                $('select[name="familyrelation0"]').val('Self');
                $('.name0').val(this.patientdetails.firstname + ' ' + this.patientdetails.lastname);
            }
        }, 500);
  //  }
   /* else {
      this.showquestionarydiv = false;
    }*/

  }
  showsinglediv() {
    console.log('call,,,,,,,');
    this.showflag++;
    $('.pateintquestionire_div2_left2new .history' + this.showflag).removeClass('hide');
    console.log(this.showflag);
  }
    selectrelationshipfunc(val) {
        let familyvalnew = 'familyrelation' + val;
        if ($('select[name="' + familyvalnew + '"]').val() == 'Self' ) {
            this.selectrelationship = '';
            console.log('do nothing');
        }
        if ( $('select[name="' + familyvalnew + '"]').val() == 'Mother' || $('select[name="' + familyvalnew + '"]').val() == 'Daughter' || $('select[name="' + familyvalnew + '"]').val() == 'Aunt' || $('select[name="' + familyvalnew + '"]').val() == 'Niece' || $('select[name="' + familyvalnew + '"]').val() == 'Sister' || $('select[name="' + familyvalnew + '"]').val() == 'Grand Mother' ) {
            console.log('selectrelationship female');
           this.selectrelationship = 'female';
        }
        if ( $('select[name="' + familyvalnew + '"]').val() == 'Father' || $('select[name="' + familyvalnew + '"]').val() == 'Brother' || $('select[name="' + familyvalnew + '"]').val() == 'Son' || $('select[name="' + familyvalnew + '"]').val() == 'Uncle' || $('select[name="' + familyvalnew + '"]').val() == 'Nephew' || $('select[name="' + familyvalnew + '"]').val() == 'Grand Father' ) {
            console.log('selectrelationship male');
            this.selectrelationship = 'male';
        }
        else {
            console.log('selectrelationship');
            this.selectrelationship = '';
        }
    }
  disablefields(val) {
    let familyval = 'familyrelation' + val;
      console.log('\\\\\\\\\\'+familyval);
    console.log($('select[name="' + familyval + '"]').val());
    if ($('select[name="' + familyval + '"]').val() == 'Self' || $('select[name="' + familyval + '"]').val() == 'Mother' || $('select[name="' + familyval + '"]').val() == 'Father' || $('select[name="' + familyval + '"]').val() == 'Daughter' || $('select[name="' + familyval + '"]').val() == 'Son' || $('select[name="' + familyval + '"]').val() == 'Brother' || $('select[name="' + familyval + '"]').val() == 'Sister' ) {
        console.log('disable 2');
      $('select[name="' + familyval + '"]').parent().next().next().next().next().find('select').attr( 'disabled', 'disabled' );
   //   console.log( $('select[name="' + familyval + '"]').parent().next().next().next().next().find('select').html());
    }
    else {
        console.log('disable 3');
       // console.log(familyval);
      $('select[name="' + familyval + '"]').parent().next().next().next().next().find('select').prop('disabled' , false);
    //  console.log($('select[name="' + familyval + '"]').parent().next().next().next().next().find('select').html());
    }



    if ( $('select[name="' + familyval + '"]').val() == 'Mother' || $('select[name="' + familyval + '"]').val() == 'Father' || $('select[name="' + familyval + '"]').val() == 'Brother' || $('select[name="' + familyval + '"]').val() == 'Sister' || $('select[name="' + familyval + '"]').val() == 'Son' || $('select[name="' + familyval + '"]').val() == 'Daughter' ) {
      this.showdeg[val] = '(1st Degree)';
    }
    else  if ($('select[name="' + familyval + '"]').val() == 'Uncle' || $('select[name="' + familyval + '"]').val() == 'Aunt' ) {
      this.showdeg[val] = '(2nd Degree)';
    }
    else if ($('select[name="' + familyval + '"]').val() == 'Nephew' || $('select[name="' + familyval + '"]').val() == 'Niece' || $('select[name="' + familyval + '"]').val() == 'Cousin' || $('select[name="' + familyval + '"]').val() == 'Grand Father' || $('select[name="' + familyval + '"]').val() == 'Grand Mother') {
        this.showdeg[val] = '3rd Degree';
    }
    else {
        this.showdeg[val] = '';
    }
  }


  /*SUBMIT MANAGE CONTACT FIRST BLOCK*/
  dosubmit(formval) {

    if (this.dataForm.valid) {
      let link= this.serverurl + 'editpatient';
      let data = {
        id: this.id,
        firstname: formval.firstname,
        lastname: formval.lastname,
        email: formval.email,
        phone: formval.phone,
        //  address: formval.address,
        city: formval.city,
        state: formval.state,
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
      this._http.post(link, data)
        .subscribe(data => {
          //  this.pateintquestioniremodal = true;
          /* if (this.cookiedetails.type == 'superadmin') {
            this.router.navigate(['/patient-list' , 'admin']);
          }
          else {
          this.router.navigate(['/patient-list']);
          }*/
        }, error => {
          console.log('Oooops!');
        });
    }
  }

                                    /* PDF DETAILS IN PATIENT RECORD */
  gotopdf() {
  /*  var url = 'http://altushealthgroup.com/testpdf/html2pdf/ppqformpdf.php?id=' + this.id;*/
    var url = 'http://' + this._commonservices.commonvalue.commonurl1 + '/downloadppsadmin.php?id=' + this.id;
    window.open(url, '_blank');
  }
  gotocsspdf() {
    var url = 'http://' + this._commonservices.commonvalue.commonurl1 + '/testpdf/html2pdf/common_cancer_symptoms.php?id=' + this.id;
    window.open(url, '_blank');
  }
                                       /* VIEW IN READ-ONLY */
  openquesmodalreadonly(val) {
      this.saveorviewsheet = val;
    this.getpatientdetailsbypatientid();
    this.pateintquestioniremodal = true;
    setTimeout(() => {
      /*   setTimeout(() => {
     console.log(this.patientrecorddetails);
      if(this.patientrecorddetails!= null && this.patientrecorddetails.isrecordavailable==1){
      /!*  this.framesrc=this.sanitizer.bypassSecurityTrustResourceUrl('https://medigradehealth.com/assets/recorder/uploads/'+this.patientrecorddetails.patientid+'.wav');*!/
        this.framesrc='https://medigradehealth.com/assets/recorder/uploads/'+this.patientrecorddetails.patientid+'.wav';
        console.log('??????????????'+this.framesrc);
      }
      }, 2000);*/
      $('#formquestionary').find('input[type="submit"]').hide();
      $('#formquestionary').find('input[type="button"]').hide();
      $( '#formquestionary' ).find('input').each(function() {
          console.log('disable 4');
        $(this).attr( 'disabled', 'disabled' );
      });

      $( '#formquestionary' ).find('textarea').each(function() {
          console.log('disable 5');
        $(this).attr( 'disabled', 'disabled' );
      });
      $( '#formquestionary' ).find('select').each(function() {
          console.log('disable 6');
        $(this).attr( 'disabled', 'disabled' );
      });
      $( '#formquestionary' ).find('button').each(function() {
          console.log('disable 7');
        $(this).attr( 'disabled', 'disabled' );
      });
      setTimeout(() => {
          console.log('disable 8');
      $('#planbcard').find('input[type="radio"]').attr( 'disabled', 'disabled' );
      }, 500);
     /* $( '#planbcard' ).find('radio').each(function() {
        $(this).attr( 'disabled', 'disabled' );
      });*/
    }, 500);
  }

  opensymptommodalreadonly() {
    this.symptomdetailsbypatientid();
    this.opensymptommodalflag = true;
    setTimeout(() => {
      $('#formcss').find('input[type="submit"]').hide();
      $('#formcss').find('input[type="button"]').hide();
      $( '#formcss' ).find('input').each(function() {
          console.log('disable 9');
        $(this).attr( 'disabled', 'disabled' );
      });

      $( '#formcss' ).find('textarea').each(function() {
          console.log('disable 10');
        $(this).attr( 'disabled', 'disabled' );
      });
      $( '#formcss' ).find('checkbox').each(function() {
          console.log('disable 11');
        $(this).attr( 'disabled', 'disabled' );
      });
    }, 500);
  }

                                  /* PATIENT PROFILE SHEET FUNCTIONALITIES */

  /*initialization and getting basic values*/
  openquesmodal(val) {
    this.recordtype = 0;
    console.log('recordtype'+ this.recordtype);
    this.saveorviewsheet = val;
    this.pateintquestioniremodal = true;
    this.getdetails();
    setTimeout(() => {
      console.log('this.patientdetails-----after---------');
      console.log('this.patientdetails-----after1---------');
      console.log(this.patientdetails);
 /*     this.framesrc=this.sanitizer.bypassSecurityTrustResourceUrl('https://recorder.influxiq.com?id='+this.patientdetails._id+'&patientname='+this.patientdetails.firstname+' '+this.patientdetails.lastname);*/
      this.framesrc=this.sanitizer.bypassSecurityTrustResourceUrl('https://'+this.serverhost+'/assets/recorder?id='+this.patientdetails._id+'&patientname='+this.patientdetails.firstname+' '+this.patientdetails.lastname);
      console.log(this.framesrc);
      this.dataForm1 = this.fb.group({
        firstname1: [this.patientdetails.firstname, Validators.required],
        lastname1: [this.patientdetails.lastname, Validators.required],
        phone1: [this.patientdetails.phone, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
        city1: [this.patientdetails.city, Validators.required],
        state1: [this.patientdetails.state, Validators.required],
        cgx1: [true],
        pgxval: [''],
        address1: ['', Validators.required],
        zip1: ['', Validators.required],
        dob1: ['', Validators.required],
        gender1: ['', Validators.required],
        race1: ['', Validators.required],
        height1: ['', Validators.required],
        width1: ['', Validators.required],
        weight1: ['', Validators.required],
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
        insurance1: [''],
        insurance2: [''],
        insurance3: [''],
        insurance4: [''],
        planbcard: [''],
        medicarepolicyno: [''],
        mediprimarypolicy: [''],
        comprimarypolicy: [''],
          medadvantageprimarypolicy: [''],
          medadvantageplan: [''],
          medadvantagepolicyno: [''],
        /*phtype1: ['', Validators.required],*/
        phtype1: [''],
      /*  phtype2: [''],*/
        phage: [''],
          phdead: [''],
        motype1: [''],
      /*  motype2: [''],*/
        moage: [''],
        modead: [''],
        fatype1: [''],
      /*  fatype2: [''],*/
        faage: [''],
        fadead: [''],
        dautype1: [''],
      /*  dautype2: [''],*/
        dauage: [''],
        daudead: [''],
        sontype1: [''],
      /*  sontype2: [''],*/
        sonage: [''],
        sondead: [''],
        brotype1: [''],
     /*   brotype2: [''],*/
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
       /* niecetype2: [''],*/
        nieceage: [''],
        niecedead: [''],
        unctype1: [''],
       /* unctype2: [''],*/
        uncage: [''],
        uncdead: [''],
        autntype1: [''],
       /* autntype2: [''],*/
        autnage: [''],
        autndead: [''],
        moftype1: [''],
       /* moftype2: [''],*/
        mofage: [''],
        mofdead: [''],
        momotype1: [''],
     /*   momotype2: [''],*/
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
     /*   oth1type2: [''],*/
        oth1age: [''],
        oth1dead: [''],
        oth2type1: [''],
      /*  oth2type2: [''],*/
        oth2age: [''],
        oth2dead: [''],
        oth3type1: [''],
      /*  oth3type2: [''],*/
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
        cancer_sup: ['' ,  Validators.required ],
        catheters_sup: [''  ],
        allergies_sup: ['' ,  Validators.required ],
        scooter_sup: ['' , Validators.required ],
        walker_sup: ['' ,  Validators.required ],
        braces_sup: ['' ,  Validators.required ],
        topical_sup: ['',  Validators.required  ],
        pain_sup: ['',  Validators.required  ],
        triedbraces: [''],
        lastbrace: [''],
      //  triedbraces: ['', PatientrecordComponent.validatetriedbraces],
        wound_sup: ['', Validators.required ],
        diabetic_sup: ['', Validators.required ],
        familyrelation0: ['Self'],
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
        phname: [this.patientdetails.firstname + ' ' + this.patientdetails.lastname],
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
        image: [''],
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
      this.getpatientdetailsbypatientid();
    }, 1000);
  }


  // after save when we are trying to get the PATIENT PROFILE SHEET saved values
  getpatientdetailsbypatientid() {
    let link = this.serverurl + 'getpatientdetailsbypatientid';
    let data = {patientid : this.id};
    this._http.post(link, data)
      .subscribe(res => {
        let result = res.json();
        if (result.status == 'success' && typeof(result.id) != 'undefined') {
          console.log('PATIENTRECORD VALUES-----**-');
          console.log(result.id);
          this.patientrecorddetails = result.id;
          if(this.patientrecorddetails!= null && this.patientrecorddetails.isrecordavailable==1){
            /*  this.framesrc=this.sanitizer.bypassSecurityTrustResourceUrl('https://medigradehealth.com/assets/recorder/uploads/'+this.patientrecorddetails.patientid+'.wav');*/
            this.framesrc1='https://'+this.serverhost+'/assets/recorder/uploads/'+this.patientrecorddetails.patientid+'.wav';
          //  this.framesrc1 = this.sanitizer.bypassSecurityTrustResourceUrl(this.framesrc1);
          //  this.framesrc1='https://medigradehealth.com/assets/recorder/uploads/'+this.patientrecorddetails.patientid+'.wav';
            console.log('??????????????'+this.framesrc1);
          }
          let userdet = result.id;
        /*  if (userdet.insurance == 1) {
            var putinsurance = 'yes';
          } else {
            var putinsurance = 'no';
          }*/
            this.breastcancercount = userdet.breastcancercount;
            this.breastcancercountmain = userdet.breastcancercount;
            this.ovariantcancercount = userdet.ovariantcancercount;
            this.ovariantcancercountmain = userdet.ovariantcancercount;
            this.digestivecancercount = userdet.digestivecancercount;
            this.digestivecancercountmain = userdet.digestivecancercount;
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

            if (userdet.planbcard_1 == 1) { var putplanbcard_1 = 'yes';}
            if (userdet.planbcard_1 == 0) { var putplanbcard_1 = 'no';}
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


            /*  disablefields(val) {
                  let familyval = 'familyrelation' + val;
                  if ($('select[name="' + familyval + '"]').val() == 'Self' || $('select[name="' + familyval + '"]').val() == 'Mother' || $('select[name="' + familyval + '"]').val() == 'Father' || $('select[name="' + familyval + '"]').val() == 'Daughter' || $('select[name="' + familyval + '"]').val() == 'Son' || $('select[name="' + familyval + '"]').val() == 'Brother' || $('select[name="' + familyval + '"]').val() == 'Sister' ) {
                      console.log('disable 2');
                      $('select[name="' + familyval + '"]').parent().next().next().next().next().find('select').attr( 'disabled', 'disabled' );
                  }
                  else {
                      $('select[name="' + familyval + '"]').parent().next().next().next().next().find('select').prop('disabled' , false);
                  }



                  if ($('select[name="' + familyval + '"]').val() == 'Self' || $('select[name="' + familyval + '"]').val() == 'Mother' || $('select[name="' + familyval + '"]').val() == 'Father' || $('select[name="' + familyval + '"]').val() == 'Brother' || $('select[name="' + familyval + '"]').val() == 'Sister' || $('select[name="' + familyval + '"]').val() == 'Son' || $('select[name="' + familyval + '"]').val() == 'Daughter' ) {
                      this.showdeg[val] = '(1st Degree)';
                  }
                  else  if ($('select[name="' + familyval + '"]').val() == 'Uncle' || $('select[name="' + familyval + '"]').val() == 'Aunt' || $('select[name="' + familyval + '"]').val() == 'Grand Father' || $('select[name="' + familyval + '"]').val() == 'Grand Mother' ) {
                      this.showdeg[val] = '(2nd Degree)';
                  }
                  else {
                      this.showdeg[val] = '(3rd Degree)';
                  }
              }*/

            setTimeout(() => {
    /*            console.log('==============');
                console.log($('input[name="insurance1_1"]').prop('checked'));
                console.log($('input[name="insurance2_1"]').prop('checked'));
                console.log($('input[name="insurance3_1"]').prop('checked'));
                console.log($('input[name="insurance4_1"]').prop('checked'));
                console.log('==============');*/
                 for (let j = 1; j < 7; j++) {
                     /*   let medicarepolicyno = 'medicarepolicyno_' + j;
                        let medadvantagepolicyno = 'medadvantagepolicyno_' + j;
                        let carrierpolicyno = 'carrierpolicyno_' + j;

                        if (($('input[name="' + medicarepolicyno + '"]').val() != '' && $('input[name="' + medicarepolicyno + '"]').val() != null) || ($('input[name="' + medadvantagepolicyno + '"]').val() != '' && $('input[name="' + medadvantagepolicyno + '"]').val() != null) || ($('input[name="' + carrierpolicyno + '"]').val() != '' && $('input[name="' + carrierpolicyno + '"]').val() != null)) {
                            $('.insuranceinformation' + j).removeClass('hide');
                            this.showflagforinsuranceinformation++;
                            // this.disablefields(j);
                        }*/
                     let insurance1 = 'insurance1_' + j;
                     let insurance2 = 'insurance2_' + j;
                     let insurance3 = 'insurance3_' + j;
                     let insurance4 = 'insurance4_' + j;
                    if ($('input[name="' + insurance1 + '"]').prop('checked') == true || $('input[name="' + insurance2 + '"]').prop('checked') == true || $('input[name="' + insurance3 + '"]').prop('checked') == true || $('input[name="' + insurance4 + '"]').prop('checked') == true) {
                        $('.insuranceinformation' + j).removeClass('hide');
                        this.showflagforinsuranceinformation++;
                        // this.disablefields(j);
                    }
            }
            }, 500);

            if (userdet.cancer_sup == 1) {
                var putcancer_sup = 'yes';
                this.showquestionarydiv = true;
                // when there is a saved value regarding add record, then it will show that div
                setTimeout(() => {
                    let i = 1;
                    for (let i = 0; i < 18; i++) {
                        let familyval = 'familyrelation' + i;
                    //  console.log($('select[name="' + familyval + '"]').val());
                      if ( $('select[name="' + familyval + '"]').val() != '' && $('select[name="' + familyval + '"]').val() != null ) {
                      //  console.log(familyval);
                      //  console.log($('select[name="' + familyval + '"]').val());
                       // console.log('============='+i);
                          $('.history' + i).removeClass('hide');
                          this.showflag++;
                          this.disablefields(i);
                      }
                  }
                  if (this.saveorviewsheet != 1 ) {
                      $('#formquestionary').find('input').each(function () {
                          console.log('disable 12');
                          $(this).attr('disabled', 'disabled');
                      });
                      $('#formquestionary').find('select').each(function () {
                          console.log('disable 13');
                          $(this).attr('disabled', 'disabled');
                      });
                      $('.left2_heading3').find('button').each(function () {
                          console.log('disable 14');
                          $(this).attr('disabled', 'disabled');
                      });
                      $('.addrecord_btn').hide();
                  }
              }, 500);
          }
          if (userdet.cancer_sup == 0) {
            var putcancer_sup = 'no';
          //  this.showquestionarydiv = false;
              // last added start
            this.showquestionarydiv = true;
              setTimeout(() => {
                  let i = 1;
                  for (let i = 0; i < 18; i++) {
                      let familyval = 'familyrelation' + i;
                      //  console.log($('select[name="' + familyval + '"]').val());
                      if ( $('select[name="' + familyval + '"]').val() != '' && $('select[name="' + familyval + '"]').val() != null ) {
                          //  console.log(familyval);
                          //  console.log($('select[name="' + familyval + '"]').val());
                          // console.log('============='+i);
                          $('.history' + i).removeClass('hide');
                          this.disablefields(i);
                      }
                  }
                  if (this.saveorviewsheet != 1 ) {
                      $('#formquestionary').find('input').each(function () {
                          console.log('disable 12');
                          $(this).attr('disabled', 'disabled');
                      });
                      $('#formquestionary').find('select').each(function () {
                          console.log('disable 13');
                          $(this).attr('disabled', 'disabled');
                      });
                      $('.left2_heading3').find('button').each(function () {
                          console.log('disable 14');
                          $(this).attr('disabled', 'disabled');
                      });
                      $('.addrecord_btn').hide();
                  }
              }, 500);
              // last added end
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
         // let dateTimeis = new Date(userdet.lastbrace);
         // dateTimeis = moment(dateTimeis).format("YYYY-MM-DD");
        //  dateTimeis =  moment(dateTimeis).utcOffset("+05:30").format();
        //  console.log('-************'+moment.utc(dateTimeis).valueOf());
       //   console.log('-************'+dateTimeis);
          this.dataForm1 = this.fb.group({
            cgx1: [userdet.cgx],
          //  weight: [userdet.weight],
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
            weight1: [userdet.weight, Validators.required],
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
            cancer_sup: [putcancer_sup, Validators.required],
            catheters_sup: [putcatheters_sup],
            allergies_sup: [putallergies_sup, Validators.required ],
            scooter_sup: [putscooter_sup, Validators.required],
            walker_sup: [putwalker_sup, Validators.required],
            braces_sup: [putbraces_sup, Validators.required],
            topical_sup: [puttopical_sup, Validators.required ],
            pain_sup: [putpain_sup, Validators.required ],
            wound_sup: [putwound_sup, Validators.required],
            diabetic_sup: [putdiabetic_sup, Validators.required ],
            triedbraces: [userdet.triedbraces ],
          //  lastbrace: [dateTimeis ],
            lastbrace: [userdet.lastbrace],
          //  triedbraces: ['', PatientrecordComponent.validatetriedbraces],
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
            image: [userdet.image ],
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
        } else {
        }
      }, error => {
        console.log('Ooops');
      });
  }

  savepateintquestionire() {
    this.issubmit = false;
    console.log('save');
  }
  submitpateintquestionire() {
    this.issubmit = true;
    console.log('submit');
  }
  gethelpdeskmailid(){
    let link= this.serverurl + 'gethelpdeskmailidbypatientid';
    let data = {
      patientid: this.id
    };
  //  console.log(data);
    this._http.post(link, data)
      .subscribe(data => {
        let result = data.json();
        if (result.status == 'success') {
        //  console.log('=============');
        //  console.log(result.id);
          if (result.id.Helpdeskdetail.length > 0) {
            this.helpdeskmailid = result.id.Helpdeskdetail[0].email;
          }
          if (result.id.Addedbyrepdetail != null && result.id.Addedbyrepdetail.length >0) {
            this.addedbyrepdetailname = result.id.Addedbyrepdetail[0].firstname + ' ' + result.id.Addedbyrepdetail[0].lastname;
          }
          this.patientuniqueid = result.id.uniqueid;
        }
      }, error => {
        console.log('Oooops!');
      });

  }
  get_left_heatmap_value(val){
    console.log('get_left_heatmap_value');
    var value = 'history'+val;
    console.log($('input[name="age' + val + '"]').val());
    if($('input[name="age' + val + '"]').val() < 51){

      console.log($('.'+value+' .left2_heading3').find('b').html());
     // console.log(this.selected_value[0]);
      //Breast_0 ,Breast1_0,
    //  if(this.selected_value[0] == 'Breast_0' || this.selected_value[0] == 'Breast1_0'){
      if($('.'+value+' .left2_heading3').find('b').html()=='Breast'){
        console.log('update variable');
        this.age_and_cancer_type=1;
      }
    }
  }
  recordaudio(type){
    this.recordtype= 1;
    if(type==1){
    this.recordpopupmodal = false;
    setTimeout(() => {
      console.log($('#framesource').html());
      $('#framesource').scrollTop();
      /*$('html, body').animate({
        scrollTop: $('#framesource').offset().top
      }, 'slow');*/
    }, 2000);
    }
    else{
     // this.recorderror = false;
      this.recordpopupmodal = false;
      this.dosubmit1(this.dataForm1.value);
    }
  }
  // Submit PATIENT PROFILE SHEET values
  dosubmit1(formval) {
    console.log('formval.mediprimarypolicy_1  1 '+formval.mediprimarypolicy_1);
    // console.log('=======? '+formval.lastbrace);
    // if(typeof(formval.lastbrace)== object) {
   //   formval.lastbrace = JSON.stringify(formval.lastbrace);
   // console.log('======= '+formval.lastbrace);
  //  }
      this.hit_map_value = '';
    this.inmediplanbcarderror = null;
    this.inmedipolicynoerror = null;
    this.inmedprimarypolicyerror = null;
    this.incommercialcarriererror = null;


    if (this.dataForm1.value.comprimarypolicy == 'yes' || this.dataForm1.value.comprimarypolicy_1 == 'yes' || this.dataForm1.value.comprimarypolicy_2 == 'yes' || this.dataForm1.value.comprimarypolicy_3 == 'yes' || this.dataForm1.value.comprimarypolicy_4 == 'yes' || this.dataForm1.value.comprimarypolicy_5 == 'yes' || this.dataForm1.value.comprimarypolicy_6 == 'yes') {
      console.log('comprimary any1 yes ');
      this.dataForm1.patchValue({
        mediprimarypolicy : 'no',
        mediprimarypolicy_1 : 'no',
        mediprimarypolicy_2 : 'no',
        mediprimarypolicy_3 : 'no',
        mediprimarypolicy_4 : 'no',
        mediprimarypolicy_5 : 'no',
        mediprimarypolicy_6 : 'no',
        medadvantageprimarypolicy : 'no',
        medadvantageprimarypolicy_1 : 'no',
        medadvantageprimarypolicy_2 : 'no',
        medadvantageprimarypolicy_3 : 'no',
        medadvantageprimarypolicy_4 : 'no',
        medadvantageprimarypolicy_5 : 'no',
        medadvantageprimarypolicy_6 : 'no',
      });
    }
    formval = this.dataForm1.value;
    console.log('formval.mediprimarypolicy_1  2 ' + formval.mediprimarypolicy_1);
    if (this.issubmit == true) {   // only for submit

      /* ---------------------  checking there should be only one primary for 7 blocks START  ---------------------  */
      let hasprimary = 0;
                                                /*BLOCK 1*/
      if (this.dataForm1.value.insurance1 == true || this.dataForm1.value.insurance2 == true || this.dataForm1.value.insurance3 == true ) {
        if (this.dataForm1.value.mediprimarypolicy == 'yes' || this.dataForm1.value.medadvantageprimarypolicy == 'yes' || this.dataForm1.value.comprimarypolicy == 'yes' ) {
          hasprimary = 1;
        }
      }
                                                /*BLOCK 2*/
      if (this.dataForm1.value.insurance1_1 == true || this.dataForm1.value.insurance2_1 == true || this.dataForm1.value.insurance3_1 == true ) {
        if (this.dataForm1.value.mediprimarypolicy_1 == 'yes' || this.dataForm1.value.medadvantageprimarypolicy_1 == 'yes' || this.dataForm1.value.comprimarypolicy_1 == 'yes' ) {
          hasprimary = 1;
        }
      }
                                                  /*BLOCK 3*/
      if (this.dataForm1.value.insurance1_2 == true || this.dataForm1.value.insurance2_2 == true || this.dataForm1.value.insurance3_2 == true ) {
        if (this.dataForm1.value.mediprimarypolicy_2 == 'yes' || this.dataForm1.value.medadvantageprimarypolicy_2 == 'yes' || this.dataForm1.value.comprimarypolicy_2 == 'yes' ) {
          hasprimary = 1;
        }
      }
                                                  /*BLOCK 4*/
      if (this.dataForm1.value.insurance1_3 == true || this.dataForm1.value.insurance2_3 == true || this.dataForm1.value.insurance3_3 == true ) {
        if (this.dataForm1.value.mediprimarypolicy_3 == 'yes' || this.dataForm1.value.medadvantageprimarypolicy_3 == 'yes' || this.dataForm1.value.comprimarypolicy_3 == 'yes' ) {
          hasprimary = 1;
        }
      }
                                                /*BLOCK 5*/
      if (this.dataForm1.value.insurance1_4 == true || this.dataForm1.value.insurance2_4 == true || this.dataForm1.value.insurance3_4 == true ) {
        if (this.dataForm1.value.mediprimarypolicy_4 == 'yes' || this.dataForm1.value.medadvantageprimarypolicy_4 == 'yes' || this.dataForm1.value.comprimarypolicy_4 == 'yes' ) {
          hasprimary = 1;
        }
      }
                                                  /*BLOCK 6*/
      if (this.dataForm1.value.insurance1_5 == true || this.dataForm1.value.insurance2_5 == true || this.dataForm1.value.insurance3_5 == true ) {
        if (this.dataForm1.value.mediprimarypolicy_5 == 'yes' || this.dataForm1.value.medadvantageprimarypolicy_5 == 'yes' || this.dataForm1.value.comprimarypolicy_5 == 'yes' ) {
          hasprimary = 1;
        }
      }
                                                    /*BLOCK 7*/
      if (this.dataForm1.value.insurance1_6 == true || this.dataForm1.value.insurance2_6 == true || this.dataForm1.value.insurance3_6 == true ) {
        if (this.dataForm1.value.mediprimarypolicy_6 == 'yes' || this.dataForm1.value.medadvantageprimarypolicy_6 == 'yes' || this.dataForm1.value.comprimarypolicy_6 == 'yes' ) {
          hasprimary = 1;
        }
      }
        this.addpatientvalidation = 1;
        let x: any;
        console.log(this.dataForm1.controls);
        for (x in this.dataForm1.controls) {
            this.dataForm1.controls[x].markAsTouched();
        }
      if ((this.dataForm1.value.insurance1 == true && this.dataForm1.value.mediprimarypolicy == 'yes') || (this.dataForm1.value.insurance1_1 == true && this.dataForm1.value.mediprimarypolicy_1 == 'yes') || (this.dataForm1.value.insurance1_2 == true && this.dataForm1.value.mediprimarypolicy_2 == 'yes') || (this.dataForm1.value.insurance1_3 == true && this.dataForm1.value.mediprimarypolicy_3 == 'yes') || (this.dataForm1.value.insurance1_4 == true && this.dataForm1.value.mediprimarypolicy_4 == 'yes') || (this.dataForm1.value.insurance1_5 == true && this.dataForm1.value.mediprimarypolicy_5 == 'yes') || (this.dataForm1.value.insurance1_6 == true && this.dataForm1.value.mediprimarypolicy_6 == 'yes')) {
        this.selectedflaginsurance = 1;
        console.log('i-..........');
      }
      else {
        this.selectedflaginsurance = 0;
      }
                                               /*HITMAP LOGIN START submit*/

       /* if (this.dataForm1.value.cancer_sup == 'no') {
            let j = 0;
            let z = 0;
            for (let i = 0; i < 18; i++) {
                let familyval1 = 'familyrelation' + i;
                if ( $('select[name="' + familyval1 + '"]').val() != null && $('select[name="' + familyval1 + '"]').val() != '' && $('select[name="' + familyval1 + '"]').val() != 'Self') {
                    j++;
                }
            }
            // POINT: No Personal + 3 Family History = Yellow (in case of not meicare) this is already done in this logic, so not doing anything
            console.log('j++++ ' + j);
            if (j > 2) {
                this.hit_map_value = 'Yellow';
                console.log('inside 13');
            }
            if (j >0 && j< 3) {
                this.hit_map_value = 'Red';
                console.log('inside 14');
            }
            else{
              for (let i = 0; i < 18; i++) {
                let familyval1 = 'familyrelation' + i;
                if ( $('select[name="' + familyval1 + '"]').val() != null && $('select[name="' + familyval1 + '"]').val() != '') {
                  z++;
                }
              }
              if (z<1) {
                this.hit_map_value = 'Red';
                console.log('inside 112');
              }
            }
        }*/
      //  if (this.dataForm1.value.cancer_sup == 'yes') {


          let j = 0;
          let z = 0;
          for (let i = 0; i < 18; i++) {
            let familyval1 = 'familyrelation' + i;
            if ( $('select[name="' + familyval1 + '"]').val() != null && $('select[name="' + familyval1 + '"]').val() != '' && $('select[name="' + familyval1 + '"]').val() != 'Self') {
              j++;
            }
          }
          // POINT: No Personal + 3 Family History = Yellow (in case of not meicare) this is already done in this logic, so not doing anything
          console.log('j++++ ' + j);
          if (j > 2) {
            this.hit_map_value = 'Yellow';
            console.log('inside 13');
          }
          if (j >0 && j< 3) {
            this.hit_map_value = 'Red';
            console.log('inside 14');
          }
          else{
            for (let i = 0; i < 18; i++) {
              let familyval1 = 'familyrelation' + i;
              if ( $('select[name="' + familyval1 + '"]').val() != null && $('select[name="' + familyval1 + '"]').val() != '') {
                z++;
              }
            }
            if (z<1) {
              this.hit_map_value = 'Red';
              console.log('inside 112');
            }
          }


            // POINT.  yes/medicare/primary/male/brest cncer
         //   if (this.dataForm1.value.insurance1 == true && this.dataForm1.value.mediprimarypolicy == 'yes') {
            if (this.selectedflaginsurance == 1) {
                console.log('inside 15');
                // POINT.  yes/medicare/1 Personal + 3 additional cancer from family or relatives = 4 total
                let j=0;
                let k=0;
                for (let i = 0; i < 18; i++) {
                    let familyval1 = 'familyrelation' + i;
                    if ( $('select[name="' + familyval1 + '"]').val() == 'Self') {
                        if (i == 0) {
                            k = 1;
                        }
                        else {
                            k = i;
                        }
                    }
                }

                for (let i = 0; i < 18; i++) {
                    let familyval1 = 'familyrelation' + i;
                    if (( $('select[name="' + familyval1 + '"]').val() != null && $('select[name="' + familyval1 + '"]').val() != '') && i!=k ) {
                        j++;
                    }
                }
                console.log('jjjjjjjjjj  '+j);
                console.log('kkkkkkkkkkk  '+k);

                if (j > 2  && k > 0) {
                    this.hit_map_value = 'GREEN';
                    console.log('inside 22');
                }
                // POINT.  yes/medicare/1 Personal + 2 additional cancer from family or relatives = 3 total
                if (j >0 && j< 3  && k > 0) {
                    this.hit_map_value = 'YELLOW';
                    console.log('inside 23');
                }
                if (this.dataForm1.value.gender1 == 'male') {
                    for (let i in this.dataForm1.value.phtype1) {
                        if (this.dataForm1.value.phtype1[i] == 'Breast Male_1') {
                            this.hit_map_value = 'GREEN';
                            console.log('inside 16');
                        }
                    }
                }

                // POINT.  yes/medicare/Personal Prostate or Personal Ovarian
                for (let i in this.dataForm1.value.phtype1) {
                    if (this.dataForm1.value.phtype1[i] == 'Prostate_1' ||  this.dataForm1.value.phtype1[i] == 'Prostate1_1'  ||  this.dataForm1.value.phtype1[i] == 'Prostate2_1' || this.dataForm1.value.phtype1[i] == 'Ovarian_1' || this.dataForm1.value.phtype1[i] == 'Ovarian1_1' || this.dataForm1.value.phtype1[i] == 'Ovarian2_1' || this.dataForm1.value.phtype1[i] == 'Ovarian3_1') {
                        this.hit_map_value = 'GREEN';
                        console.log('inside 17');
                    }
                }
                // POINT.  yes/medicare/Personal Female Breast Cancer at or before age 50
                if (this.dataForm1.value.gender1 == 'female' && this.dataForm1.value.phage <= 50) {
                    for (let i in this.dataForm1.value.phtype1) {
                        if (this.dataForm1.value.phtype1[i] == 'Breast Female_1' || this.dataForm1.value.phtype1[i] == 'Breast_1' || this.dataForm1.value.phtype1[i] == 'Breast1_1') {
                            this.hit_map_value = 'GREEN';
                            console.log('inside 18');
                        }
                    }
                }
                // POINT.  yes/medicare/Personal Female Breast Cancer over age 50 + minimum 3 family members that have breast cancer
                if (this.dataForm1.value.gender1 == 'female' && this.dataForm1.value.phage > 50) {
                    for (let i in this.dataForm1.value.phtype1) {
                        if (this.dataForm1.value.phtype1[i] == 'Breast Female_1' || this.dataForm1.value.phtype1[i] == 'Breast_1' || this.dataForm1.value.phtype1[i] == 'Breast1_1') {
                            console.log('this.breastcancercountmain' + this.breastcancercountmain);
                            if (this.breastcancercountmain > 2) {
                                this.hit_map_value = 'GREEN';
                                console.log('inside 19');
                            }else{
                              if(this.age_and_cancer_type==1){
                                this.hit_map_value = 'GREEN';
                                console.log('inside 192');
                              }
                            }
                        }
                    }
                }

                // POINT.  yes/medicare/Personal Female Breast Cancer over age 50 + 1 family members Ovarian Cancer
                if (this.dataForm1.value.gender1 == 'female' && this.dataForm1.value.phage > 50) {
                    for (let i in this.dataForm1.value.phtype1) {
                        if (this.dataForm1.value.phtype1[i] == 'Breast Female_1' || this.dataForm1.value.phtype1[i] == 'Breast_1' || this.dataForm1.value.phtype1[i] == 'Breast1_1') {
                            if (this.ovariantcancercountmain > 0) {
                                this.hit_map_value = 'GREEN';
                                console.log('inside 20');
                            }
                        }
                    }
                }

                // POINT.  yes/medicare/Personal Female Breast Cancer over age 50 + 1 family members Ovarian Cancer
                if (this.dataForm1.value.gender1 == 'female' && this.dataForm1.value.phage > 50) {
                    for (let i in this.dataForm1.value.phtype1) {
                        if (this.dataForm1.value.phtype1[i] == 'Breast Female_1' || this.dataForm1.value.phtype1[i] == 'Breast_1' || this.dataForm1.value.phtype1[i] == 'Breast1_1') {
                            if ((this.breastcancercountmain + this.digestivecancercountmain) > 1 ) {
                                this.hit_map_value = 'GREEN';
                                console.log('inside 21');
                            }
                        }
                    }
                }
            }

            // POINT.  yes/not medicare/primary/one self/1 Additional (can be personal or family)
            /*if (this.dataForm1.value.insurance1 != true && (this.dataForm1.value.medadvantageprimarypolicy == 'yes' || this.dataForm1.value.comprimarypolicy == 'yes')) {*/
          console.log('================1244===================');
          console.log(this.dataForm1.value);
          if ((this.dataForm1.value.mediprimarypolicy != 'yes' && this.dataForm1.value.mediprimarypolicy_1 != 'yes'  && this.dataForm1.value.mediprimarypolicy_2 != 'yes'  && this.dataForm1.value.mediprimarypolicy_3 != 'yes'  && this.dataForm1.value.mediprimarypolicy_4 != 'yes'  && this.dataForm1.value.mediprimarypolicy_5 != 'yes'  && this.dataForm1.value.mediprimarypolicy_6 != 'yes' ) && (this.dataForm1.value.medadvantageprimarypolicy == 'yes' || this.dataForm1.value.medadvantageprimarypolicy_1 == 'yes'  || this.dataForm1.value.medadvantageprimarypolicy_2 == 'yes'  || this.dataForm1.value.medadvantageprimarypolicy_3 == 'yes'  || this.dataForm1.value.medadvantageprimarypolicy_4 == 'yes'  || this.dataForm1.value.medadvantageprimarypolicy_5 == 'yes' || this.dataForm1.value.medadvantageprimarypolicy_6 == 'yes' || this.dataForm1.value.comprimarypolicy == 'yes' || this.dataForm1.value.comprimarypolicy_1 == 'yes' || this.dataForm1.value.comprimarypolicy_2 == 'yes' || this.dataForm1.value.comprimarypolicy_3 == 'yes' || this.dataForm1.value.comprimarypolicy_4 == 'yes' || this.dataForm1.value.comprimarypolicy_5 == 'yes' || this.dataForm1.value.comprimarypolicy_6 == 'yes')) {
            console.log('================1233===================');
                let j=0;
                let k=0;
                for (let i = 0; i < 18; i++) {
                    let familyval1 = 'familyrelation' + i;
                    if ( $('select[name="' + familyval1 + '"]').val() == 'Self') {
                        if (i == 0) {
                            k = 1;
                        }
                        else {
                            k = i;
                        }
                    }
                }
                for (let i = 0; i < 18; i++) {
                    let familyval1 = 'familyrelation' + i;
                    if (( $('select[name="' + familyval1 + '"]').val() != null && $('select[name="' + familyval1 + '"]').val() != '') && i!=k ) {
                        j++;
                    }
                }
                if (j > 0 && k > 0) {
                    this.hit_map_value = 'YELLOW';
                    console.log('inside 24');
                }
            }

        console.log('===============================================');
        console.log(this.hit_map_value);
                                          /*HITMAP LOGIN END submit*/




                                             /*ERROR CHECK*/

     console.log('this.insuranceerror');
        if (this.dataForm1.value.insurance1 != true && this.dataForm1.value.insurance2 != true && this.dataForm1.value.insurance3 != true  && this.dataForm1.value.insurance4 != true ) {
          this.insuranceerror = 'Please Choose atleast one answer!';
        //  console.log('?');
        }
        else {
             this.insuranceerror = null;
         //   console.log('??????????[[[[[[[');
        }

        if (this.dataForm1.value.insurance1 == true ) {
            if (this.planbcard == 'yes' || this.planbcard == 'no' ) {
                this.inmediplanbcarderror = null;
            }
            else {
                this.inmediplanbcarderror = 'Please Choose an answer! ';
            }
        } else {
            this.inmediplanbcarderror = null;
        }

        /*  if (this.dataForm1.value.insurance1 == true && this.dataForm1.value.medicarepolicyno != null && this.dataForm1.value.medicarepolicyno != '' ) {
           console.log('if');
           this.inmedipolicynoerror = null;
       } else {
           console.log('else');
           this.inmedipolicynoerror = 'Please give your policy number! ';
       }*/

        if (this.dataForm1.value.insurance1 == true ) {
            if (this.dataForm1.value.medicarepolicyno != null && this.dataForm1.value.medicarepolicyno != '') {
                this.inmedipolicynoerror = null;
            }
            else {
                this.inmedipolicynoerror = 'Please give your policy number! ';
            }
        } else {
            this.inmedipolicynoerror = null;
        }

        /*if (this.dataForm1.value.insurance1 == true && (this.dataForm1.value.mediprimarypolicy == 'yes' || this.dataForm1.value.mediprimarypolicy == 'no' )) {
            this.inmedprimarypolicyerror = null;
        } else {
            this.inmedprimarypolicyerror =  'Please Choose an answer! ';
      }*/
        if (this.dataForm1.value.insurance1 == true ) {
            if (this.dataForm1.value.mediprimarypolicy == 'yes' || this.dataForm1.value.mediprimarypolicy == 'no') {
                this.inmedprimarypolicyerror = null;
            }
            else {
                this.inmedprimarypolicyerror =  'Please Choose an answer! ';
            }
        } else {
            this.inmedprimarypolicyerror = null;
        }


     /* if (this.dataForm1.value.insurance3 == true && (this.dataForm1.value.carrier != null && this.dataForm1.value.carrier != '')) {
        this.incommercialcarriererror = null;
      } else {
        this.incommercialcarriererror =  'Please Choose an answer! ';
      }*/
        if (this.dataForm1.value.insurance3 == true ) {
            if (this.dataForm1.value.carrier != null && this.dataForm1.value.carrier != '') {
                this.incommercialcarriererror = null;
            }
            else {
                this.incommercialcarriererror =  'Please Choose an answer! ';
            }
        } else {
            this.incommercialcarriererror = null;
        }

     /* if (this.dataForm1.value.insurance3 == true && this.dataForm1.value.carrierplan != null && this.dataForm1.value.carrierplan != '') {
        this.incarrierplanerror = null;
      } else {
        this.incarrierplanerror = 'Please give your plan type! ';
      }*/
        if (this.dataForm1.value.insurance3 == true ) {
            if (this.dataForm1.value.carrierplan != null && this.dataForm1.value.carrierplan != '') {
                this.incarrierplanerror = null;
            }
            else {
                this.incarrierplanerror =   'Please give your plan type! ';
            }
        } else {
            this.incarrierplanerror = null;
        }


     /* if (this.dataForm1.value.insurance3 == true && this.dataForm1.value.carrierpolicyno != null && this.dataForm1.value.carrierpolicyno != '') {
        this.carrierpolicynoerror = null;
      } else {
        this.carrierpolicynoerror = 'Please give your plan type! ';
      }*/
        if (this.dataForm1.value.insurance3 == true ) {
            if (this.dataForm1.value.carrierpolicyno != null && this.dataForm1.value.carrierpolicyno != '') {
                this.carrierpolicynoerror = null;
            }
            else {
                this.carrierpolicynoerror =   'Please give your plan type! ';
            }
        } else {
            this.carrierpolicynoerror = null;
        }

   /*   if (this.dataForm1.value.insurance3 == true && (this.dataForm1.value.comprimarypolicy == 'yes' || this.dataForm1.value.comprimarypolicy == 'no' )) {
        this.carrierprimarypolicynoerror = null;
      } else {
        this.carrierprimarypolicynoerror =  'Please Choose an answer! ';
      }*/
        if (this.dataForm1.value.insurance3 == true ) {
            if (this.dataForm1.value.comprimarypolicy == 'yes' || this.dataForm1.value.comprimarypolicy == 'no' ) {
                this.carrierprimarypolicynoerror = null;
            }
            else {
                this.carrierprimarypolicynoerror =  'Please Choose an answer! ';
            }
        } else {
            this.carrierprimarypolicynoerror = null;
        }
     /*   -----------------------------------*/
        if (this.dataForm1.value.insurance2 == true ) {
            if (this.dataForm1.value.medadvantageplan != null && this.dataForm1.value.medadvantageplan != '') {
                this.medadvantageplanplanerror = null;
            }
            else {
                this.medadvantageplanplanerror =   'Please give your plan type! ';
            }
        } else {
            this.medadvantageplanplanerror = null;
        }
        if (this.dataForm1.value.insurance2 == true ) {
            if (this.dataForm1.value.medadvantagepolicyno != null && this.dataForm1.value.medadvantagepolicyno != '') {
                this.medadvantagepolicynoerror = null;
            }
            else {
                this.medadvantagepolicynoerror =   'Please give your plan type! ';
            }
        } else {
            this.medadvantagepolicynoerror = null;
        }
        if (this.dataForm1.value.insurance2 == true ) {
            if (this.dataForm1.value.medadvantageprimarypolicy == 'yes' || this.dataForm1.value.medadvantageprimarypolicy == 'no' ) {
                this.medadvantageprimarypolicyerror = null;
            }
            else {
                this.medadvantageprimarypolicyerror =  'Please Choose an answer! ';
            }
        } else {
            this.medadvantageprimarypolicyerror = null;
        }
        /*-------------------------------------new eerror-------------------------------------*/
    /*    for(let j=1; j<7; j++) {
            if (this.dataForm1.value.insurance1 == true ) {
                if (this.planbcard == 'yes' || this.planbcard == 'no' ) {
                    this.inmediplanbcarderror = null;
                }
                else {
                    this.inmediplanbcarderror = 'Please Choose an answer! ';
                }
            } else {
                this.inmediplanbcarderror = null;
            }
            if (this.dataForm1.value.insurance1 == true ) {
                if (this.dataForm1.value.medicarepolicyno != null && this.dataForm1.value.medicarepolicyno != '') {
                    this.inmedipolicynoerror = null;
                }
                else {
                    this.inmedipolicynoerror = 'Please give your policy number! ';
                }
            } else {
                this.inmedipolicynoerror = null;
            }
            if (this.dataForm1.value.insurance1 == true ) {
                if (this.dataForm1.value.mediprimarypolicy == 'yes' || this.dataForm1.value.mediprimarypolicy == 'no') {
                    this.inmedprimarypolicyerror = null;
                }
                else {
                    this.inmedprimarypolicyerror =  'Please Choose an answer! ';
                }
            } else {
                this.inmedprimarypolicyerror = null;
            }
        }*/
        /*ERROR CHECK*/

/*console.log('carrierprimarypolicynoerror' + this.carrierprimarypolicynoerror);
console.log('carrierpolicynoerror' + this.carrierpolicynoerror);
console.log('incarrierplanerror' + this.incarrierplanerror);
console.log('incommercialcarriererror' + this.incommercialcarriererror);
console.log('inmedprimarypolicyerror' + this.inmedprimarypolicyerror);
console.log('inmedipolicynoerror' + this.inmedipolicynoerror);
console.log('inmediplanbcarderror' + this.inmediplanbcarderror);*/


      if (formval.cgx1 == true) {
        var putcgx = 1;
      }if (formval.cgx1 != true) {
        var putcgx = 0;
      }
      if (this.pgxval == true) {
        var putpgx = 1;
      }if (this.pgxval != true) {
        var putpgx = 0;
      }
      if (formval.topicalpain == true) {
        var puttopicalpain = 1;
      }if (formval.topicalpain != true) {
        var puttopicalpain= 0;
      }
      if (formval.oralpain == true) {
        var putoralpain = 1;
      }if (formval.oralpain != true) {
        var putoralpain= 0;
      }
      if (formval.derma == true) {
        var putderma = 1;
      }if (formval.derma != true) {
        var putderma= 0;
      }
      if (formval.migrane == true) {
        var putmigrane = 1;
      }if (formval.migrane != true) {
        var putmigrane= 0;
      }
      /* if (formval.insurance == true) {
         var putinsurance = 1;
       }if (formval.insurance != true) {
         var putinsurance= 0;
       }*/
      if (this.planbcard == 'yes') {
        var putplanbcard = 1;
      }if (this.planbcard == 'no') {
        var putplanbcard= 0;
      }
      if (formval.cancer_sup == 'yes') {
        var putcancer_sup = 1;
      }if (formval.cancer_sup == 'no') {
        var putcancer_sup = 0;
      }
      if (formval.catheters_sup == 'yes') {
        var putcatheters_sup = 1;
      }if (formval.catheters_sup == 'no') {
        var putcatheters_sup = 0;
      }
      if (formval.allergies_sup == 'yes') {
        var putallergies_sup = 1;
      }if (formval.allergies_sup == 'no') {
        var putallergies_sup = 0;
      }
      if (formval.scooter_sup == 'yes') {
        var putscooter_sup = 1;
      }if (formval.scooter_sup == 'no') {
        var putscooter_sup = 0;
      }
      if (formval.walker_sup == 'yes') {
        var putwalker_sup = 1;
      }if (formval.walker_sup == 'no') {
        var putwalker_sup = 0;
      }
      if (formval.braces_sup == 'yes') {
        var putbraces_sup = 1;
      }if (formval.braces_sup == 'no') {
        var putbraces_sup = 0;
      }
      if (formval.topical_sup == 'yes') {
        var puttopical_sup = 1;
      }
      if (formval.topical_sup == 'no') {
        var puttopical_sup = 0;
      }
      if (formval.pain_sup == 'yes') {
        var putpain_sup = 1;
      }
      if (formval.pain_sup == 'no') {
        var putpain_sup = 0;
      }
      if (formval.wound_sup == 'yes') {
        var putwound_sup = 1;
      }
      if (formval.wound_sup == 'no') {
        var putwound_sup = 0;
      }
      if (formval.diabetic_sup == 'yes') {
        var putdiabetic_sup = 1;
      }
      if (formval.diabetic_sup == 'no') {
        var putdiabetic_sup = 0;
      }
      if (formval.mediprimarypolicy == 'yes') {
        var putmediprimarypolicy = 1;
      }
      if (formval.mediprimarypolicy == 'no') {
        var putmediprimarypolicy = 0;
      }
      if (formval.medadvantageprimarypolicy == 'yes') {
        var putmedadvantageprimarypolicy = 1;
      }
      if (formval.medadvantageprimarypolicy == 'no') {
        var putmedadvantageprimarypolicy = 0;
      }
      if (formval.comprimarypolicy == 'yes') {
        var putcomprimarypolicy = 1;
      }
      if (formval.comprimarypolicy == 'no') {
        var putcomprimarypolicy = 0;
      }
      if (formval.insurance1 == true) {
        var putinsurance1 = 1;
      }if (formval.insurance1 != true) {
        var putinsurance1= 0;
      }
      if (formval.insurance2 == true) {
        var putinsurance2 = 1;
      }if (formval.insurance2 != true) {
        var putinsurance2= 0;
      }
      if (formval.insurance3 == true) {
        var putinsurance3 = 1;
      }if (formval.insurance3 != true) {
        var putinsurance3= 0;
      }
      if (formval.insurance4 == true) {
        var putinsurance4 = 1;
      }if (formval.insurance4 != true) {
        var putinsurance4= 0;
      }
      console.log(this.planbcard+'====');
      console.log(this.planbcard_1+'====');
      if (this.planbcard_1 == 'yes') {
        var putplanbcard_1 = 1;
      }if (this.planbcard_1 == 'no') {
        var putplanbcard_1= 0;
      }
      if (formval.mediprimarypolicy_1 == 'yes') {
        console.log('mediprimarypolicy_1 yessssssssssssss');
        var putmediprimarypolicy_1 = 1;
      }
      if (formval.mediprimarypolicy_1 == 'no') {
        console.log('mediprimarypolicy_1 noooooooooooooo');
        var putmediprimarypolicy_1 = 0;
      }
      if (formval.medadvantageprimarypolicy_1 == 'yes') {
        var putmedadvantageprimarypolicy_1 = 1;
      }
      if (formval.medadvantageprimarypolicy_1 == 'no') {
        var putmedadvantageprimarypolicy_1 = 0;
      }
      if (formval.comprimarypolicy_1 == 'yes') {
        var putcomprimarypolicy_1 = 1;
      }
      if (formval.comprimarypolicy_1 == 'no') {
        var putcomprimarypolicy_1 = 0;
      }
      if (formval.insurance1_1 == true) {
        var putinsurance1_1 = 1;
      }if (formval.insurance1_1 != true) {
        var putinsurance1_1= 0;
      }
      if (formval.insurance2_1 == true) {
        var putinsurance2_1 = 1;
      }if (formval.insurance2_1 != true) {
        var putinsurance2_1 = 0;
      }
      if (formval.insurance3_1 == true) {
        var putinsurance3_1 = 1;
      }if (formval.insurance3_1 != true) {
        var putinsurance3_1 = 0;
      }
      if (formval.insurance4_1 == true) {
        var putinsurance4_1 = 1;
      }if (formval.insurance4_1 != true) {
        var putinsurance4_1 = 0;
      }
      if (this.planbcard_2 == 'yes') {
        var putplanbcard_2 = 1;
      }if (this.planbcard_2 == 'no') {
        var putplanbcard_2= 0;
      }
      if (formval.mediprimarypolicy_2 == 'yes') {
        var putmediprimarypolicy_2 = 1;
      }
      if (formval.mediprimarypolicy_2 == 'no') {
        var putmediprimarypolicy_2 = 0;
      }
      if (formval.medadvantageprimarypolicy_2 == 'yes') {
        var putmedadvantageprimarypolicy_2 = 1;
      }
      if (formval.medadvantageprimarypolicy_2 == 'no') {
        var putmedadvantageprimarypolicy_2 = 0;
      }
      if (formval.comprimarypolicy_2 == 'yes') {
        var putcomprimarypolicy_2 = 1;
      }
      if (formval.comprimarypolicy_2 == 'no') {
        var putcomprimarypolicy_2 = 0;
      }
      if (formval.insurance1_2 == true) {
        var putinsurance1_2 = 1;
      }if (formval.insurance1_2 != true) {
        var putinsurance1_2= 0;
      }
      if (formval.insurance2_2 == true) {
        var putinsurance2_2 = 1;
      }if (formval.insurance2_2 != true) {
        var putinsurance2_2 = 0;
      }
      if (formval.insurance3_2 == true) {
        var putinsurance3_2 = 1;
      }if (formval.insurance3_2 != true) {
        var putinsurance3_2 = 0;
      }
      if (formval.insurance4_2 == true) {
        var putinsurance4_2 = 1;
      }if (formval.insurance4_2 != true) {
        var putinsurance4_2 = 0;
      }
      if (this.planbcard_3 == 'yes') {
        var putplanbcard_3 = 1;
      }if (this.planbcard_3 == 'no') {
        var putplanbcard_3= 0;
      }
      if (formval.mediprimarypolicy_3 == 'yes') {
        var putmediprimarypolicy_3 = 1;
      }
      if (formval.mediprimarypolicy_3 == 'no') {
        var putmediprimarypolicy_3 = 0;
      }
      if (formval.medadvantageprimarypolicy_3 == 'yes') {
        var putmedadvantageprimarypolicy_3 = 1;
      }
      if (formval.medadvantageprimarypolicy_3 == 'no') {
        var putmedadvantageprimarypolicy_3 = 0;
      }
      if (formval.comprimarypolicy_3 == 'yes') {
        var putcomprimarypolicy_3 = 1;
      }
      if (formval.comprimarypolicy_3 == 'no') {
        var putcomprimarypolicy_3 = 0;
      }
      if (formval.insurance1_3 == true) {
        var putinsurance1_3 = 1;
      }if (formval.insurance1_3 != true) {
        var putinsurance1_3 = 0;
      }
      if (formval.insurance2_3 == true) {
        var putinsurance2_3 = 1;
      }if (formval.insurance2_3 != true) {
        var putinsurance2_3 = 0;
      }
      if (formval.insurance3_3 == true) {
        var putinsurance3_3 = 1;
      }if (formval.insurance3_3 != true) {
        var putinsurance3_3 = 0;
      }
      if (formval.insurance4_3 == true) {
        var putinsurance4_3 = 1;
      }if (formval.insurance4_3 != true) {
        var putinsurance4_3 = 0;
      }
      if (this.planbcard_4 == 'yes') {
        var putplanbcard_4 = 1;
      }if (this.planbcard_4 == 'no') {
        var putplanbcard_4= 0;
      }
      if (formval.mediprimarypolicy_4 == 'yes') {
        var putmediprimarypolicy_4 = 1;
      }
      if (formval.mediprimarypolicy_4 == 'no') {
        var putmediprimarypolicy_4 = 0;
      }
      if (formval.medadvantageprimarypolicy_4 == 'yes') {
        var putmedadvantageprimarypolicy_4 = 1;
      }
      if (formval.medadvantageprimarypolicy_4 == 'no') {
        var putmedadvantageprimarypolicy_4 = 0;
      }
      if (formval.comprimarypolicy_4 == 'yes') {
        var putcomprimarypolicy_4 = 1;
      }
      if (formval.comprimarypolicy_4 == 'no') {
        var putcomprimarypolicy_4 = 0;
      }
      if (formval.insurance1_4 == true) {
        var putinsurance1_4 = 1;
      }if (formval.insurance1_4 != true) {
        var putinsurance1_4 = 0;
      }
      if (formval.insurance2_4 == true) {
        var putinsurance2_4 = 1;
      }if (formval.insurance2_4 != true) {
        var putinsurance2_4 = 0;
      }
      if (formval.insurance3_4 == true) {
        var putinsurance3_4 = 1;
      }if (formval.insurance3_4 != true) {
        var putinsurance3_4 = 0;
      }
      if (formval.insurance4_4 == true) {
        var putinsurance4_4 = 1;
      }if (formval.insurance4_4 != true) {
        var putinsurance4_4 = 0;
      }
      if (this.planbcard_5 == 'yes') {
        var putplanbcard_5 = 1;
      }if (this.planbcard_5 == 'no') {
        var putplanbcard_5= 0;
      }
      if (formval.mediprimarypolicy_5 == 'yes') {
        var putmediprimarypolicy_5 = 1;
      }
      if (formval.mediprimarypolicy_5 == 'no') {
        var putmediprimarypolicy_5 = 0;
      }
      if (formval.medadvantageprimarypolicy_5 == 'yes') {
        var putmedadvantageprimarypolicy_5 = 1;
      }
      if (formval.medadvantageprimarypolicy_5 == 'no') {
        var putmedadvantageprimarypolicy_5 = 0;
      }
      if (formval.comprimarypolicy_5 == 'yes') {
        var putcomprimarypolicy_5 = 1;
      }
      if (formval.comprimarypolicy_5 == 'no') {
        var putcomprimarypolicy_5 = 0;
      }
      if (formval.insurance1_5 == true) {
        var putinsurance1_5 = 1;
      }if (formval.insurance1_5 != true) {
        var putinsurance1_5 = 0;
      }
      if (formval.insurance2_5 == true) {
        var putinsurance2_5 = 1;
      }if (formval.insurance2_5 != true) {
        var putinsurance2_5 = 0;
      }
      if (formval.insurance3_5 == true) {
        var putinsurance3_5 = 1;
      }if (formval.insurance3_5 != true) {
        var putinsurance3_5 = 0;
      }
      if (formval.insurance4_5 == true) {
        var putinsurance4_5 = 1;
      }if (formval.insurance4_5 != true) {
        var putinsurance4_5 = 0;
      }
      if (this.planbcard_6 == 'yes') {
        var putplanbcard_6 = 1;
      }if (this.planbcard_6 == 'no') {
        var putplanbcard_6 = 0;
      }
      if (formval.mediprimarypolicy_6 == 'yes') {
        var putmediprimarypolicy_6 = 1;
      }
      if (formval.mediprimarypolicy_6 == 'no') {
        var putmediprimarypolicy_6 = 0;
      }
      if (formval.medadvantageprimarypolicy_6 == 'yes') {
        var putmedadvantageprimarypolicy_6 = 1;
      }
      if (formval.medadvantageprimarypolicy_6 == 'no') {
        var putmedadvantageprimarypolicy_6 = 0;
      }
      if (formval.comprimarypolicy_6 == 'yes') {
        var putcomprimarypolicy_6 = 1;
      }
      if (formval.comprimarypolicy_6 == 'no') {
        var putcomprimarypolicy_6 = 0;
      }
      if (formval.insurance1_6 == true) {
        var putinsurance1_6 = 1;
      }if (formval.insurance1_6 != true) {
        var putinsurance1_6 = 0;
      }
      if (formval.insurance2_6 == true) {
        var putinsurance2_6 = 1;
      }if (formval.insurance2_6 != true) {
        var putinsurance2_6 = 0;
      }
      if (formval.insurance3_6 == true) {
        var putinsurance3_6 = 1;
      }if (formval.insurance3_6 != true) {
        var putinsurance3_6 = 0;
      }
      if (formval.insurance4_6 == true) {
        var putinsurance4_6 = 1;
      }if (formval.insurance4_6 != true) {
        var putinsurance4_6 = 0;
      }
      if (hasprimary == 0) {
        this.hasprimaryerror = 1;
      }
      else {
        this.hasprimaryerror = 0;
      }
      console.log('this.hasprimaryerror  ---- ' + this.hasprimaryerror);

      if (this.dataForm1.valid && this.carrierprimarypolicynoerror == null && this.carrierpolicynoerror == null && this.incarrierplanerror == null && this.incommercialcarriererror == null && this.inmedprimarypolicyerror == null &&  this.inmedipolicynoerror == null &&  this.inmediplanbcarderror == null &&  this.medadvantageplanplanerror == null &&  this.medadvantagepolicynoerror == null &&  this.medadvantageprimarypolicyerror == null && this.insuranceerror == null && this.hasprimaryerror == 0) {
        console.log('inside');
        //   if (this.dataForm1.valid ) {

        console.log('=================this.recordtype' +this.recordtype );
        if(this.recordtype!= 1){
          console.log('start');
        //START TRIAL
        let link= 'https://medigradehealth.com/assets/recorder/chkfile.php?id='+this.patientdetails._id;
        this._http.get(link)
            .subscribe(res => {
              let result = res.json();
              console.log(result);
              if (result.status == true) {
                this.isrecordavailable = 1;
                this.recordtype=1;
              } else{
                this.isrecordavailable = 0;
                this.recordpopupmodal = true;
              }
            }, error => {
              console.log('Oooops!');
            });
        }
        console.log('hi');
        //END TRIAL


        console.log(this.isrecordavailable);
        setTimeout(() => {
        let link= this.serverurl + 'patientrecord';
        let data = {
          patientid: this.id,
          note: this.addnote,
          added_by: this.cookiedetails,
          cgx1: putcgx,
          pgxval: putpgx,
          firstname1: formval.firstname1,
          lastname1: formval.lastname1,
          phone1: formval.phone1,
          address1: formval.address1,
          city1: formval.city1,
          state1: formval.state1,
          zip1: formval.zip1,
          dob1: formval.dob1,
          gender1: formval.gender1,
          race1: formval.race1,
          height1: formval.height1,
          width1: formval.width1,
          weight1: formval.weight1,
          allergies1: formval.allergies1,
          medicareclaim1: formval.medicareclaim1,
          notes1: formval.notes1,
          notes2: formval.notes2,
          notes3: formval.notes3,
          notes4: formval.notes4,
          pharmacyinsurancename: formval.pharmacyinsurancename,
          pharmacyid: formval.pharmacyid,
          pharmacybin: formval.pharmacybin,
          pharmacypcn: formval.pharmacypcn,
          pharmacygroup: formval.pharmacygroup,
          pharmacyhistory: formval.pharmacyhistory,
          pharmacyissue: formval.pharmacyissue,
          pharmacytreatment: formval.pharmacytreatment,
          topicalpain: puttopicalpain,
          oralpain: putoralpain,
          derma: putderma,
          migrane: putmigrane,
          insurance1: putinsurance1,
          insurance2: putinsurance2,
          insurance3: putinsurance3,
          insurance4: putinsurance4,
          planbcard: putplanbcard,
          medicarepolicyno: formval.medicarepolicyno,
          mediprimarypolicy: putmediprimarypolicy,
          comprimarypolicy: putcomprimarypolicy,
          medadvantageprimarypolicy: putmedadvantageprimarypolicy,
          medadvantageplan: formval.medadvantageplan,
          medadvantagepolicyno: formval.medadvantagepolicyno,
          phtype1: formval.phtype1,
          /* phtype2: formval.phtype2,*/
          phage: formval.phage,
          phdead: formval.phdead,
          motype1: formval.motype1,
          /* motype2: formval.motype2,*/
          moage: formval.moage,
          modead: formval.modead,
          fatype1: formval.fatype1,
          /*  fatype2: formval.fatype2,*/
          faage: formval.faage,
          fadead: formval.fadead,
          dautype1: formval.dautype1,
          /*dautype2: formval.dautype2,*/
          dauage: formval.dauage,
          daudead: formval.daudead,
          sontype1: formval.sontype1,
          /*  sontype2: formval.sontype2,*/
          sonage: formval.sonage,
          sondead: formval.sondead,
          brotype1: formval.brotype1,
          /*   brotype2: formval.brotype2,*/
          broage: formval.broage,
          brodead: formval.brodead,
          sistype1: formval.sistype1,
          /* sistype2: formval.sistype2,*/
          sisage: formval.sisage,
          sisdead: formval.sisdead,
          neptype1: formval.neptype1,
          /* neptype2: formval.neptype2,*/
          nepage: formval.nepage,
          nepdead: formval.nepdead,
          niecetype1: formval.niecetype1,
          /* niecetype2: formval.niecetype2,*/
          nieceage: formval.nieceage,
          niecedead: formval.niecedead,
          unctype1: formval.unctype1,
          /* unctype2: formval.unctype2,*/
          uncage: formval.uncage,
          uncdead: formval.uncdead,
          autntype1: formval.autntype1,
          /*  autntype2: formval.autntype2,*/
          autnage: formval.autnage,
          autndead: formval.autndead,
          moftype1: formval.moftype1,
          /* moftype2: formval.moftype2,*/
          mofage: formval.mofage,
          mofdead: formval.mofdead,
          momotype1: formval.momotype1,
          /*  momotype2: formval.momotype2,*/
          momoage: formval.momoage,
          momodead: formval.momodead,
          daftype1: formval.daftype1,
          /*  daftype2: formval.daftype2,*/
          dafage: formval.dafage,
          dafdead: formval.dafdead,
          damtype1: formval.damtype1,
          /*  damtype2: formval.damtype2,*/
          damage: formval.damage,
          damdead: formval.damdead,
          oth1type1: formval.oth1type1,
          /*  oth1type2: formval.oth1type2,*/
          oth1age: formval.oth1age,
          oth1dead: formval.oth1dead,
          oth2type1: formval.oth2type1,
          /* oth2type2: formval.oth2type2,*/
          oth2age: formval.oth2age,
          oth2dead: formval.oth2dead,
          oth3type1: formval.oth3type1,
          /*   oth3type2: formval.oth3type2,*/
          oth3age: formval.oth3age,
          oth3dead: formval.oth3dead,
          pgx1: formval.pgx1,
          pgx2: formval.pgx2,
          pgx3: formval.pgx3,
          pgx4: formval.pgx4,
          pgx5: formval.pgx5,
          pgx6: formval.pgx6,
          pgx7: formval.pgx7,
          pgx8: formval.pgx8,
          pgx9: formval.pgx9,
          pgx10: formval.pgx10,
          pgx11: formval.pgx11,
          pgx12: formval.pgx12,
          pgx13: formval.pgx13,
          pgx14: formval.pgx14,
          pgx15: formval.pgx15,
          pgx16: formval.pgx16,
          pgx17: formval.pgx17,
          pgx18: formval.pgx18,
          /* pgx19: formval.pgx19,*/
          carrier: formval.carrier,
          carrierplan: formval.carrierplan,
          carrierpolicyno: formval.carrierpolicyno,
          cancer_sup: putcancer_sup,
          catheters_sup: putcatheters_sup,
          allergies_sup: putallergies_sup ,
          scooter_sup: putscooter_sup,
          walker_sup: putwalker_sup,
          braces_sup: putbraces_sup,
          topical_sup: puttopical_sup,
          pain_sup: putpain_sup,
          wound_sup: putwound_sup,
          diabetic_sup: putdiabetic_sup,
          triedbraces: formval.triedbraces,
          lastbrace: formval.lastbrace,
          //  lastbrace: moment.utc(formval.lastbrace).valueOf(),
          familyrelation0: formval.familyrelation0,
          familyrelation1: formval.familyrelation1,
          familyrelation2: formval.familyrelation2,
          familyrelation3: formval.familyrelation3,
          familyrelation4: formval.familyrelation4,
          familyrelation5: formval.familyrelation5,
          familyrelation6: formval.familyrelation6,
          familyrelation7: formval.familyrelation7,
          familyrelation8: formval.familyrelation8,
          familyrelation9: formval.familyrelation9,
          familyrelation10: formval.familyrelation10,
          familyrelation11: formval.familyrelation11,
          familyrelation12: formval.familyrelation12,
          familyrelation13: formval.familyrelation13,
          familyrelation14: formval.familyrelation14,
          familyrelation15: formval.familyrelation15,
          familyrelation16: formval.familyrelation16,
          familyrelation17: formval.familyrelation17,
          relation1: formval.relation1,
          relation2: formval.relation2,
          relation3: formval.relation3,
          relation4: formval.relation4,
          relation5: formval.relation5,
          relation6: formval.relation6,
          relation7: formval.relation7,
          relation8: formval.relation8,
          relation9: formval.relation9,
          relation10: formval.relation10,
          relation11: formval.relation11,
          relation12: formval.relation12,
          relation13: formval.relation13,
          relation14: formval.relation14,
          relation15: formval.relation15,
          relation16: formval.relation16,
          relation17: formval.relation17,
          relation18: formval.relation18,
          degree1: formval.degree1,
          degree2: formval.degree2,
          degree3: formval.degree3,
          degree4: formval.degree4,
          degree5: formval.degree5,
          degree6: formval.degree6,
          degree7: formval.degree7,
          degree8: formval.degree8,
          degree9: formval.degree9,
          degree10: formval.degree10,
          degree11: formval.degree11,
          degree12: formval.degree12,
          degree13: formval.degree13,
          degree14: formval.degree14,
          degree15: formval.degree15,
          degree16: formval.degree16,
          degree17: formval.degree17,
          degree18: formval.degree18,
          hit_map_value: this.hit_map_value,
          phname: formval.phname,
          familyrelation1name: formval.familyrelation1name,
          familyrelation2name: formval.familyrelation2name,
          familyrelation3name: formval.familyrelation3name,
          familyrelation4name: formval.familyrelation4name,
          familyrelation5name: formval.familyrelation5name,
          familyrelation6name: formval.familyrelation6name,
          familyrelation7name: formval.familyrelation7name,
          familyrelation8name: formval.familyrelation8name,
          familyrelation9name: formval.familyrelation9name,
          familyrelation10name: formval.familyrelation10name,
          familyrelation11name: formval.familyrelation11name,
          familyrelation12name: formval.familyrelation12name,
          familyrelation13name: formval.familyrelation13name,
          familyrelation14name: formval.familyrelation14name,
          familyrelation15name: formval.familyrelation15name,
          familyrelation16name: formval.familyrelation16name,
          familyrelation17name: formval.familyrelation17name,
          image: formval.image,
          iscompleted: 1,
          helpdeskmailid: this.helpdeskmailid,
          uniqueid: this.patientuniqueid,
          addedbyrepdetailname: this.addedbyrepdetailname,
          insurance1_1: putinsurance1_1,
          insurance2_1: putinsurance2_1,
          insurance3_1: putinsurance3_1,
          insurance4_1: putinsurance4_1,
          planbcard_1: putplanbcard_1,
          medicarepolicyno_1: formval.medicarepolicyno_1,
          mediprimarypolicy_1: putmediprimarypolicy_1,
          comprimarypolicy_1: putcomprimarypolicy_1,
          medadvantageprimarypolicy_1: putmedadvantageprimarypolicy_1,
          medadvantageplan_1: formval.medadvantageplan_1,
          medadvantagepolicyno_1: formval.medadvantagepolicyno_1,
          carrier_1: formval.carrier_1,
          carrierplan_1: formval.carrierplan_1,
          carrierpolicyno_1: formval.carrierpolicyno_1,

          insurance1_2: putinsurance1_2,
          insurance2_2: putinsurance2_2,
          insurance3_2: putinsurance3_2,
          insurance4_2: putinsurance4_2,
          planbcard_2: putplanbcard_2,
          medicarepolicyno_2: formval.medicarepolicyno_2,
          mediprimarypolicy_2: putmediprimarypolicy_2,
          comprimarypolicy_2: putcomprimarypolicy_2,
          medadvantageprimarypolicy_2: putmedadvantageprimarypolicy_2,
          medadvantageplan_2: formval.medadvantageplan_2,
          medadvantagepolicyno_2: formval.medadvantagepolicyno_2,
          carrier_2: formval.carrier_2,
          carrierplan_2: formval.carrierplan_2,
          carrierpolicyno_2: formval.carrierpolicyno_2,
          insurance1_3: putinsurance1_3,
          insurance2_3: putinsurance2_3,
          insurance3_3: putinsurance3_3,
          insurance4_3: putinsurance4_3,
          planbcard_3: putplanbcard_3,
          medicarepolicyno_3: formval.medicarepolicyno_3,
          mediprimarypolicy_3: putmediprimarypolicy_3,
          comprimarypolicy_3: putcomprimarypolicy_3,
          medadvantageprimarypolicy_3: putmedadvantageprimarypolicy_3,
          medadvantageplan_3: formval.medadvantageplan_3,
          medadvantagepolicyno_3: formval.medadvantagepolicyno_3,
          carrier_3: formval.carrier_3,
          carrierplan_3: formval.carrierplan_3,
          carrierpolicyno_3: formval.carrierpolicyno_3,
          insurance1_4: putinsurance1_4,
          insurance2_4: putinsurance2_4,
          insurance3_4: putinsurance3_4,
          insurance4_4: putinsurance4_4,
          planbcard_4: putplanbcard_4,
          medicarepolicyno_4: formval.medicarepolicyno_4,
          mediprimarypolicy_4: putmediprimarypolicy_4,
          comprimarypolicy_4: putcomprimarypolicy_4,
          medadvantageprimarypolicy_4: putmedadvantageprimarypolicy_4,
          medadvantageplan_4: formval.medadvantageplan_4,
          medadvantagepolicyno_4: formval.medadvantagepolicyno_4,
          carrier_4: formval.carrier_4,
          carrierplan_4: formval.carrierplan_4,
          carrierpolicyno_4: formval.carrierpolicyno_4,
          insurance1_5: putinsurance1_5,
          insurance2_5: putinsurance2_5,
          insurance3_5: putinsurance3_5,
          insurance4_5: putinsurance4_5,
          planbcard_5: putplanbcard_5,
          medicarepolicyno_5: formval.medicarepolicyno_5,
          mediprimarypolicy_5: putmediprimarypolicy_5,
          comprimarypolicy_5: putcomprimarypolicy_5,
          medadvantageprimarypolicy_5: putmedadvantageprimarypolicy_5,
          medadvantageplan_5: formval.medadvantageplan_5,
          medadvantagepolicyno_5: formval.medadvantagepolicyno_5,
          carrier_5: formval.carrier_5,
          carrierplan_5: formval.carrierplan_5,
          carrierpolicyno_5: formval.carrierpolicyno_5,
          insurance1_6: putinsurance1_6,
          insurance2_6: putinsurance2_6,
          insurance3_6: putinsurance3_6,
          insurance4_6: putinsurance4_6,
          planbcard_6: putplanbcard_6,
          medicarepolicyno_6: formval.medicarepolicyno_6,
          mediprimarypolicy_6: putmediprimarypolicy_6,
          comprimarypolicy_6: putcomprimarypolicy_6,
          medadvantageprimarypolicy_6: putmedadvantageprimarypolicy_6,
          medadvantageplan_6: formval.medadvantageplan_6,
          medadvantagepolicyno_6: formval.medadvantagepolicyno_6,
          carrier_6: formval.carrier_6,
          carrierplan_6: formval.carrierplan_6,
          carrierpolicyno_6: formval.carrierpolicyno_6,
          breastcancercount: this.breastcancercountmain,
          ovariantcancercount: this.ovariantcancercountmain,
          digestivecancercount: this.digestivecancercountmain,
          isrecordavailable: this.isrecordavailable,
        };
        console.log(this.hit_map_value);
        console.log(data);
        if(this.isrecordavailable != null && this.recordtype==1){
        this._http.post(link, data)
          .subscribe(res => {
            let result = res.json();
            if (result.status == 'success') {
            //  this.opensaveorsubmitmodal = true;
              setTimeout(() => {
             //   this.opensaveorsubmitmodal = false;
                this.addnote = null;
                this.divaddnote = false;
                this.getnotes();
                this.pateintquestioniremodal = false;
                this.showquestionarydiv = false;
                this.opensymptommodalflag = true;
                this.getpatientrecord();
                  this.symptomdetailsbypatientid();
                console.log('call--2');
                this.pgxdetailsbypatientid();
              }, 2000);
            }
          }, error => {
            console.log('Oooops!');
          });
      }
      }, 2000);
      }
    }

    else {   // only for save
      console.log('save-');
   //   console.log(this.dataForm1.value);
      if ((this.dataForm1.value.insurance1 == true && this.dataForm1.value.mediprimarypolicy == 'yes') || (this.dataForm1.value.insurance1_1 == true && this.dataForm1.value.mediprimarypolicy_1 == 'yes') || (this.dataForm1.value.insurance1_2 == true && this.dataForm1.value.mediprimarypolicy_2 == 'yes') || (this.dataForm1.value.insurance1_3 == true && this.dataForm1.value.mediprimarypolicy_3 == 'yes') || (this.dataForm1.value.insurance1_4 == true && this.dataForm1.value.mediprimarypolicy_4 == 'yes') || (this.dataForm1.value.insurance1_5 == true && this.dataForm1.value.mediprimarypolicy_5 == 'yes') || (this.dataForm1.value.insurance1_6 == true && this.dataForm1.value.mediprimarypolicy_6 == 'yes')) {
        this.selectedflaginsurance = 1;
        console.log('i-..........');
      }
      else{
        this.selectedflaginsurance = 0;
      }
  /*                                                /!*HITMAP LOGIN START SAVE*!/

        // POINT.  had no cancer
        if (this.dataForm1.value.cancer_sup == 'no') {
          let j = 0;
          for (let i = 0; i < 18; i++) {
              let familyval1 = 'familyrelation' + i;
              if ( $('select[name="' + familyval1 + '"]').val() != null && $('select[name="' + familyval1 + '"]').val() != '' && $('select[name="' + familyval1 + '"]').val() != 'Self') {
                  j++;
              }
          }
          // POINT: No Personal + 3 Family History = Yellow (in case of not meicare) this is already done in this logic, so not doing anything
            console.log('j++++ ' + j);
          if (j > 2) {
              this.hit_map_value = 'Yellow';
              console.log('inside 13');
          }
          if (j >0 && j< 3) {
              this.hit_map_value = 'Red';
              console.log('inside 14');
          }
        }
        if (this.dataForm1.value.cancer_sup == 'yes') {
            // POINT.  yes/medicare/primary/male/brest cncer
         //   if (this.dataForm1.value.insurance1 == true && this.dataForm1.value.mediprimarypolicy == 'yes') {
          if (this.selectedflaginsurance==1) {
                console.log('inside 15');
                // POINT.  yes/medicare/1 Personal + 3 additional cancer from family or relatives = 4 total
                let j=0;
                let k=0;
                for (let i = 0; i < 18; i++) {
                    let familyval1 = 'familyrelation' + i;
                    if ( $('select[name="' + familyval1 + '"]').val() == 'Self') {
                        if (i == 0) {
                            k = 1;
                        }
                        else {
                            k = i;
                        }
                    }
                }

                for (let i = 0; i < 18; i++) {
                    let familyval1 = 'familyrelation' + i;
                    if (( $('select[name="' + familyval1 + '"]').val() != null && $('select[name="' + familyval1 + '"]').val() != '') && i!=k ) {
                        j++;
                    }
                }
                console.log('jjjjjjjjjj  '+j);
                console.log('kkkkkkkkkkk  '+k);

                if (j > 2  && k > 0) {
                    this.hit_map_value = 'GREEN';
                    console.log('inside 22');
                }
                // POINT.  yes/medicare/1 Personal + 2 additional cancer from family or relatives = 3 total
                if (j >0 && j< 3  && k > 0) {
                    this.hit_map_value = 'YELLOW';
                    console.log('inside 23');
                }
                if (this.dataForm1.value.gender1 == 'male') {
                    for (let i in this.dataForm1.value.phtype1) {
                        if (this.dataForm1.value.phtype1[i] == 'Breast Male_1') {
                            this.hit_map_value = 'GREEN';
                            console.log('inside 16');
                        }
                    }
                }

                // POINT.  yes/medicare/Personal Prostate or Personal Ovarian
                for (let i in this.dataForm1.value.phtype1) {
                if (this.dataForm1.value.phtype1[i] == 'Prostate_1' ||  this.dataForm1.value.phtype1[i] == 'Prostate1_1'  ||  this.dataForm1.value.phtype1[i] == 'Prostate2_1' || this.dataForm1.value.phtype1[i] == 'Ovarian_1' || this.dataForm1.value.phtype1[i] == 'Ovarian1_1' || this.dataForm1.value.phtype1[i] == 'Ovarian2_1' || this.dataForm1.value.phtype1[i] == 'Ovarian3_1') {
                    this.hit_map_value = 'GREEN';
                    console.log('inside 17');
                }
                }
                // POINT.  yes/medicare/Personal Female Breast Cancer at or before age 50
                if (this.dataForm1.value.gender1 == 'female' && this.dataForm1.value.phage <= 50) {
                    for (let i in this.dataForm1.value.phtype1) {
                        if (this.dataForm1.value.phtype1[i] == 'Breast Female_1' || this.dataForm1.value.phtype1[i] == 'Breast_1' || this.dataForm1.value.phtype1[i] == 'Breast1_1') {
                            this.hit_map_value = 'GREEN';
                            console.log('inside 18');
                        }
                    }
                }
                // POINT.  yes/medicare/Personal Female Breast Cancer over age 50 + minimum 3 family members that have breast cancer
                if (this.dataForm1.value.gender1 == 'female' && this.dataForm1.value.phage > 50) {
                    for (let i in this.dataForm1.value.phtype1) {
                        if (this.dataForm1.value.phtype1[i] == 'Breast Female_1' || this.dataForm1.value.phtype1[i] == 'Breast_1' || this.dataForm1.value.phtype1[i] == 'Breast1_1') {
                          console.log('this.breastcancercountmain' + this.breastcancercountmain);
                            if (this.breastcancercountmain > 2) {
                                this.hit_map_value = 'GREEN';
                                console.log('inside 19');
                            }
                        }
                    }
                }

                // POINT.  yes/medicare/Personal Female Breast Cancer over age 50 + 1 family members Ovarian Cancer
                if (this.dataForm1.value.gender1 == 'female' && this.dataForm1.value.phage > 50) {
                    for (let i in this.dataForm1.value.phtype1) {
                        if (this.dataForm1.value.phtype1[i] == 'Breast Female_1' || this.dataForm1.value.phtype1[i] == 'Breast_1' || this.dataForm1.value.phtype1[i] == 'Breast1_1') {
                            if (this.ovariantcancercountmain > 0) {
                                this.hit_map_value = 'GREEN';
                                console.log('inside 20');
                            }
                        }
                    }
                }

                // POINT.  yes/medicare/Personal Female Breast Cancer over age 50 + 1 family members Ovarian Cancer
                if (this.dataForm1.value.gender1 == 'female' && this.dataForm1.value.phage > 50) {
                    for (let i in this.dataForm1.value.phtype1) {
                        if (this.dataForm1.value.phtype1[i] == 'Breast Female_1' || this.dataForm1.value.phtype1[i] == 'Breast_1' || this.dataForm1.value.phtype1[i] == 'Breast1_1') {
                            if ((this.breastcancercountmain + this.digestivecancercountmain) > 1 ) {
                                this.hit_map_value = 'GREEN';
                                console.log('inside 21');
                            }
                        }
                    }
                }
            }

            // POINT.  yes/not medicare/primary/one self/1 Additional (can be personal or family)
            /!*if (this.dataForm1.value.insurance1 != true && (this.dataForm1.value.medadvantageprimarypolicy == 'yes' || this.dataForm1.value.comprimarypolicy == 'yes')) {*!/
          console.log('================1244===================');
          console.log(this.dataForm1.value);
          if ((this.dataForm1.value.mediprimarypolicy != 'yes' && this.dataForm1.value.mediprimarypolicy_1 != 'yes'  && this.dataForm1.value.mediprimarypolicy_2 != 'yes'  && this.dataForm1.value.mediprimarypolicy_3 != 'yes'  && this.dataForm1.value.mediprimarypolicy_4 != 'yes'  && this.dataForm1.value.mediprimarypolicy_5 != 'yes'  && this.dataForm1.value.mediprimarypolicy_6 != 'yes' ) && (this.dataForm1.value.medadvantageprimarypolicy == 'yes' || this.dataForm1.value.medadvantageprimarypolicy_1 == 'yes'  || this.dataForm1.value.medadvantageprimarypolicy_2 == 'yes'  || this.dataForm1.value.medadvantageprimarypolicy_3 == 'yes'  || this.dataForm1.value.medadvantageprimarypolicy_4 == 'yes'  || this.dataForm1.value.medadvantageprimarypolicy_5 == 'yes' || this.dataForm1.value.medadvantageprimarypolicy_6 == 'yes' || this.dataForm1.value.comprimarypolicy == 'yes' || this.dataForm1.value.comprimarypolicy_1 == 'yes' || this.dataForm1.value.comprimarypolicy_2 == 'yes' || this.dataForm1.value.comprimarypolicy_3 == 'yes' || this.dataForm1.value.comprimarypolicy_4 == 'yes' || this.dataForm1.value.comprimarypolicy_5 == 'yes' || this.dataForm1.value.comprimarypolicy_6 == 'yes')) {
              console.log('================1233===================');
                let j=0;
                let k=0;
                for (let i = 0; i < 18; i++) {
                    let familyval1 = 'familyrelation' + i;
                    if ( $('select[name="' + familyval1 + '"]').val() == 'Self') {
                        if (i == 0) {
                            k = 1;
                        }
                        else {
                            k = i;
                        }
                    }
                }
                for (let i = 0; i < 18; i++) {
                    let familyval1 = 'familyrelation' + i;
                    if (( $('select[name="' + familyval1 + '"]').val() != null && $('select[name="' + familyval1 + '"]').val() != '') && i!=k ) {
                        j++;
                    }
                }
                if (j > 0 && k > 0) {
                    this.hit_map_value = 'YELLOW';
                    console.log('inside 24');
                }
            }

        }
   /!*     if (this.dataForm1.value.insurance1 != true) {
            this.hit_map_value = 'Yellow';
            console.log('inside 9.2222');
        }*!/
                                                   /!*HITMAP LOGIN END SAVE*!/
        console.log('===============================================');
        console.log(this.hit_map_value);*/


      if (formval.cgx1 == true) {
        var putcgx = 1;
      }if (formval.cgx1 != true) {
        var putcgx = 0;
      }
      if (this.pgxval == true) {
        var putpgx = 1;
      }if (this.pgxval != true) {
        var putpgx = 0;
      }
      if (formval.topicalpain == true) {
        var puttopicalpain = 1;
      }if (formval.topicalpain != true) {
        var puttopicalpain= 0;
      }
      if (formval.oralpain == true) {
        var putoralpain = 1;
      }if (formval.oralpain != true) {
        var putoralpain= 0;
      }
      if (formval.derma == true) {
        var putderma = 1;
      }if (formval.derma != true) {
        var putderma= 0;
      }
      if (formval.migrane == true) {
        var putmigrane = 1;
      }if (formval.migrane != true) {
        var putmigrane= 0;
      }
      /* if (formval.insurance == true) {
         var putinsurance = 1;
       }if (formval.insurance != true) {
         var putinsurance= 0;
       }*/
      if (this.planbcard == 'yes') {
        var putplanbcard = 1;
      }if (this.planbcard == 'no') {
        var putplanbcard= 0;
      }
      if (formval.cancer_sup == 'yes') {
        var putcancer_sup = 1;
      }if (formval.cancer_sup == 'no') {
        var putcancer_sup = 0;
      }
      if (formval.catheters_sup == 'yes') {
        var putcatheters_sup = 1;
      }if (formval.catheters_sup == 'no') {
        var putcatheters_sup = 0;
      }
      if (formval.allergies_sup == 'yes') {
        var putallergies_sup = 1;
      }if (formval.allergies_sup == 'no') {
        var putallergies_sup = 0;
      }
      if (formval.scooter_sup == 'yes') {
        var putscooter_sup = 1;
      }if (formval.scooter_sup == 'no') {
        var putscooter_sup = 0;
      }
      if (formval.walker_sup == 'yes') {
        var putwalker_sup = 1;
      }if (formval.walker_sup == 'no') {
        var putwalker_sup = 0;
      }
      if (formval.braces_sup == 'yes') {
        var putbraces_sup = 1;
      }if (formval.braces_sup == 'no') {
        var putbraces_sup = 0;
      }
      if (formval.topical_sup == 'yes') {
        var puttopical_sup = 1;
      }
      if (formval.topical_sup == 'no') {
        var puttopical_sup = 0;
      }
      if (formval.pain_sup == 'yes') {
        var putpain_sup = 1;
      }
      if (formval.pain_sup == 'no') {
        var putpain_sup = 0;
      }
      if (formval.wound_sup == 'yes') {
        var putwound_sup = 1;
      }
      if (formval.wound_sup == 'no') {
        var putwound_sup = 0;
      }
      if (formval.diabetic_sup == 'yes') {
        var putdiabetic_sup = 1;
      }
      if (formval.diabetic_sup == 'no') {
        var putdiabetic_sup = 0;
      }
      if (formval.mediprimarypolicy == 'yes') {
        var putmediprimarypolicy = 1;
      }
      if (formval.mediprimarypolicy == 'no') {
        var putmediprimarypolicy = 0;
      }
      if (formval.medadvantageprimarypolicy == 'yes') {
        var putmedadvantageprimarypolicy = 1;
      }
      if (formval.medadvantageprimarypolicy == 'no') {
        var putmedadvantageprimarypolicy = 0;
      }
      if (formval.comprimarypolicy == 'yes') {
        var putcomprimarypolicy = 1;
      }
      if (formval.comprimarypolicy == 'no') {
        var putcomprimarypolicy = 0;
      }
      if (formval.insurance1 == true) {
        var putinsurance1 = 1;
      }if (formval.insurance1 != true) {
        var putinsurance1= 0;
      }
      if (formval.insurance2 == true) {
        var putinsurance2 = 1;
      }if (formval.insurance2 != true) {
        var putinsurance2= 0;
      }
      if (formval.insurance3 == true) {
        var putinsurance3 = 1;
      }if (formval.insurance3 != true) {
        var putinsurance3= 0;
      }
      if (formval.insurance4 == true) {
        var putinsurance4 = 1;
      }if (formval.insurance4 != true) {
        var putinsurance4= 0;
      }



      console.log(this.planbcard+'====');
      console.log(this.planbcard_1+'====');
      if (this.planbcard_1 == 'yes') {
        var putplanbcard_1 = 1;
      }if (this.planbcard_1 == 'no') {
        var putplanbcard_1= 0;
      }
      if (formval.mediprimarypolicy_1 == 'yes') {
        console.log('mediprimarypolicy_1 yessssssssssssss');
        var putmediprimarypolicy_1 = 1;
      }
      if (formval.mediprimarypolicy_1 == 'no') {
        console.log('mediprimarypolicy_1 noooooooooooooo');
        var putmediprimarypolicy_1 = 0;
      }
      if (formval.medadvantageprimarypolicy_1 == 'yes') {
        var putmedadvantageprimarypolicy_1 = 1;
      }
      if (formval.medadvantageprimarypolicy_1 == 'no') {
        var putmedadvantageprimarypolicy_1 = 0;
      }
      if (formval.comprimarypolicy_1 == 'yes') {
        var putcomprimarypolicy_1 = 1;
      }
      if (formval.comprimarypolicy_1 == 'no') {
        var putcomprimarypolicy_1 = 0;
      }
      if (formval.insurance1_1 == true) {
        var putinsurance1_1 = 1;
      }if (formval.insurance1_1 != true) {
        var putinsurance1_1= 0;
      }
      if (formval.insurance2_1 == true) {
        var putinsurance2_1 = 1;
      }if (formval.insurance2_1 != true) {
        var putinsurance2_1 = 0;
      }
      if (formval.insurance3_1 == true) {
        var putinsurance3_1 = 1;
      }if (formval.insurance3_1 != true) {
        var putinsurance3_1 = 0;
      }
      if (formval.insurance4_1 == true) {
        var putinsurance4_1 = 1;
      }if (formval.insurance4_1 != true) {
        var putinsurance4_1 = 0;
      }




      if (this.planbcard_2 == 'yes') {
        var putplanbcard_2 = 1;
      }if (this.planbcard_2 == 'no') {
        var putplanbcard_2= 0;
      }
      if (formval.mediprimarypolicy_2 == 'yes') {
        var putmediprimarypolicy_2 = 1;
      }
      if (formval.mediprimarypolicy_2 == 'no') {
        var putmediprimarypolicy_2 = 0;
      }
      if (formval.medadvantageprimarypolicy_2 == 'yes') {
        var putmedadvantageprimarypolicy_2 = 1;
      }
      if (formval.medadvantageprimarypolicy_2 == 'no') {
        var putmedadvantageprimarypolicy_2 = 0;
      }
      if (formval.comprimarypolicy_2 == 'yes') {
        var putcomprimarypolicy_2 = 1;
      }
      if (formval.comprimarypolicy_2 == 'no') {
        var putcomprimarypolicy_2 = 0;
      }
      if (formval.insurance1_2 == true) {
        var putinsurance1_2 = 1;
      }if (formval.insurance1_2 != true) {
        var putinsurance1_2= 0;
      }
      if (formval.insurance2_2 == true) {
        var putinsurance2_2 = 1;
      }if (formval.insurance2_2 != true) {
        var putinsurance2_2 = 0;
      }
      if (formval.insurance3_2 == true) {
        var putinsurance3_2 = 1;
      }if (formval.insurance3_2 != true) {
        var putinsurance3_2 = 0;
      }
      if (formval.insurance4_2 == true) {
        var putinsurance4_2 = 1;
      }if (formval.insurance4_2 != true) {
        var putinsurance4_2 = 0;
      }

      if (this.planbcard_3 == 'yes') {
        var putplanbcard_3 = 1;
      }if (this.planbcard_3 == 'no') {
        var putplanbcard_3= 0;
      }
      if (formval.mediprimarypolicy_3 == 'yes') {
        var putmediprimarypolicy_3 = 1;
      }
      if (formval.mediprimarypolicy_3 == 'no') {
        var putmediprimarypolicy_3 = 0;
      }
      if (formval.medadvantageprimarypolicy_3 == 'yes') {
        var putmedadvantageprimarypolicy_3 = 1;
      }
      if (formval.medadvantageprimarypolicy_3 == 'no') {
        var putmedadvantageprimarypolicy_3 = 0;
      }
      if (formval.comprimarypolicy_3 == 'yes') {
        var putcomprimarypolicy_3 = 1;
      }
      if (formval.comprimarypolicy_3 == 'no') {
        var putcomprimarypolicy_3 = 0;
      }
      if (formval.insurance1_3 == true) {
        var putinsurance1_3 = 1;
      }if (formval.insurance1_3 != true) {
        var putinsurance1_3 = 0;
      }
      if (formval.insurance2_3 == true) {
        var putinsurance2_3 = 1;
      }if (formval.insurance2_3 != true) {
        var putinsurance2_3 = 0;
      }
      if (formval.insurance3_3 == true) {
        var putinsurance3_3 = 1;
      }if (formval.insurance3_3 != true) {
        var putinsurance3_3 = 0;
      }
      if (formval.insurance4_3 == true) {
        var putinsurance4_3 = 1;
      }if (formval.insurance4_3 != true) {
        var putinsurance4_3 = 0;
      }


      if (this.planbcard_4 == 'yes') {
        var putplanbcard_4 = 1;
      }if (this.planbcard_4 == 'no') {
        var putplanbcard_4= 0;
      }
      if (formval.mediprimarypolicy_4 == 'yes') {
        var putmediprimarypolicy_4 = 1;
      }
      if (formval.mediprimarypolicy_4 == 'no') {
        var putmediprimarypolicy_4 = 0;
      }
      if (formval.medadvantageprimarypolicy_4 == 'yes') {
        var putmedadvantageprimarypolicy_4 = 1;
      }
      if (formval.medadvantageprimarypolicy_4 == 'no') {
        var putmedadvantageprimarypolicy_4 = 0;
      }
      if (formval.comprimarypolicy_4 == 'yes') {
        var putcomprimarypolicy_4 = 1;
      }
      if (formval.comprimarypolicy_4 == 'no') {
        var putcomprimarypolicy_4 = 0;
      }
      if (formval.insurance1_4 == true) {
        var putinsurance1_4 = 1;
      }if (formval.insurance1_4 != true) {
        var putinsurance1_4 = 0;
      }
      if (formval.insurance2_4 == true) {
        var putinsurance2_4 = 1;
      }if (formval.insurance2_4 != true) {
        var putinsurance2_4 = 0;
      }
      if (formval.insurance3_4 == true) {
        var putinsurance3_4 = 1;
      }if (formval.insurance3_4 != true) {
        var putinsurance3_4 = 0;
      }
      if (formval.insurance4_4 == true) {
        var putinsurance4_4 = 1;
      }if (formval.insurance4_4 != true) {
        var putinsurance4_4 = 0;
      }

      if (this.planbcard_5 == 'yes') {
        var putplanbcard_5 = 1;
      }if (this.planbcard_5 == 'no') {
        var putplanbcard_5= 0;
      }
      if (formval.mediprimarypolicy_5 == 'yes') {
        var putmediprimarypolicy_5 = 1;
      }
      if (formval.mediprimarypolicy_5 == 'no') {
        var putmediprimarypolicy_5 = 0;
      }
      if (formval.medadvantageprimarypolicy_5 == 'yes') {
        var putmedadvantageprimarypolicy_5 = 1;
      }
      if (formval.medadvantageprimarypolicy_5 == 'no') {
        var putmedadvantageprimarypolicy_5 = 0;
      }
      if (formval.comprimarypolicy_5 == 'yes') {
        var putcomprimarypolicy_5 = 1;
      }
      if (formval.comprimarypolicy_5 == 'no') {
        var putcomprimarypolicy_5 = 0;
      }
      if (formval.insurance1_5 == true) {
        var putinsurance1_5 = 1;
      }if (formval.insurance1_5 != true) {
        var putinsurance1_5 = 0;
      }
      if (formval.insurance2_5 == true) {
        var putinsurance2_5 = 1;
      }if (formval.insurance2_5 != true) {
        var putinsurance2_5 = 0;
      }
      if (formval.insurance3_5 == true) {
        var putinsurance3_5 = 1;
      }if (formval.insurance3_5 != true) {
        var putinsurance3_5 = 0;
      }
      if (formval.insurance4_5 == true) {
        var putinsurance4_5 = 1;
      }if (formval.insurance4_5 != true) {
        var putinsurance4_5 = 0;
      }
      if (this.planbcard_6 == 'yes') {
        var putplanbcard_6 = 1;
      }if (this.planbcard_6 == 'no') {
        var putplanbcard_6 = 0;
      }
      if (formval.mediprimarypolicy_6 == 'yes') {
        var putmediprimarypolicy_6 = 1;
      }
      if (formval.mediprimarypolicy_6 == 'no') {
        var putmediprimarypolicy_6 = 0;
      }
      if (formval.medadvantageprimarypolicy_6 == 'yes') {
        var putmedadvantageprimarypolicy_6 = 1;
      }
      if (formval.medadvantageprimarypolicy_6 == 'no') {
        var putmedadvantageprimarypolicy_6 = 0;
      }
      if (formval.comprimarypolicy_6 == 'yes') {
        var putcomprimarypolicy_6 = 1;
      }
      if (formval.comprimarypolicy_6 == 'no') {
        var putcomprimarypolicy_6 = 0;
      }
      if (formval.insurance1_6 == true) {
        var putinsurance1_6 = 1;
      }if (formval.insurance1_6 != true) {
        var putinsurance1_6 = 0;
      }
      if (formval.insurance2_6 == true) {
        var putinsurance2_6 = 1;
      }if (formval.insurance2_6 != true) {
        var putinsurance2_6 = 0;
      }
      if (formval.insurance3_6 == true) {
        var putinsurance3_6 = 1;
      }if (formval.insurance3_6 != true) {
        var putinsurance3_6 = 0;
      }
      if (formval.insurance4_6 == true) {
        var putinsurance4_6 = 1;
      }if (formval.insurance4_6 != true) {
        var putinsurance4_6 = 0;
      }
      console.log('=================this.recordtype' +this.recordtype );
      if(this.recordtype!= 1){
        console.log('start');
        //START TRIAL
        let link= 'https://medigradehealth.com/assets/recorder/chkfile.php?id='+this.patientdetails._id;
        this._http.get(link)
            .subscribe(res => {
              let result = res.json();
              console.log(result);
              if (result.status == true) {
                this.isrecordavailable = 1;
                this.recordtype=1;
              } else{
                this.isrecordavailable = 0;
                this.recordpopupmodal = true;
              }
            }, error => {
              console.log('Oooops!');
            });
      }
      setTimeout(() => {
      let link= this.serverurl + 'patientrecord';
      let data = {
        patientid: this.id,
        note: this.addnote,
        added_by: this.cookiedetails,
        cgx1: putcgx,
        pgxval: putpgx,
        firstname1: formval.firstname1,
        lastname1: formval.lastname1,
        phone1: formval.phone1,
        address1: formval.address1,
        city1: formval.city1,
        state1: formval.state1,
        zip1: formval.zip1,
        dob1: formval.dob1,
        gender1: formval.gender1,
        race1: formval.race1,
        height1: formval.height1,
        width1: formval.width1,
        weight1: formval.weight1,
        allergies1: formval.allergies1,
        medicareclaim1: formval.medicareclaim1,
        notes1: formval.notes1,
        notes2: formval.notes2,
        notes3: formval.notes3,
        notes4: formval.notes4,
        pharmacyinsurancename: formval.pharmacyinsurancename,
        pharmacyid: formval.pharmacyid,
        pharmacybin: formval.pharmacybin,
        pharmacypcn: formval.pharmacypcn,
        pharmacygroup: formval.pharmacygroup,
        pharmacyhistory: formval.pharmacyhistory,
        pharmacyissue: formval.pharmacyissue,
        pharmacytreatment: formval.pharmacytreatment,
        topicalpain: puttopicalpain,
        oralpain: putoralpain,
        derma: putderma,
        migrane: putmigrane,
        insurance1: formval.insurance1,
        insurance2: formval.insurance2,
        insurance3: formval.insurance3,
        insurance4: formval.insurance4,
        planbcard: putplanbcard,
        medicarepolicyno: formval.medicarepolicyno,
        mediprimarypolicy: putmediprimarypolicy,
        comprimarypolicy: putcomprimarypolicy,
          medadvantageprimarypolicy: putmedadvantageprimarypolicy,
          medadvantageplan: formval.medadvantageplan,
          medadvantagepolicyno: formval.medadvantagepolicyno,
        phtype1: formval.phtype1,
        /*  phtype2: formval.phtype2,*/
        phage: formval.phage,
          phdead: formval.phdead,
        motype1: formval.motype1,
        /*  motype2: formval.motype2,*/
        moage: formval.moage,
        modead: formval.modead,
        fatype1: formval.fatype1,
        /* fatype2: formval.fatype2,*/
        faage: formval.faage,
        fadead: formval.fadead,
        dautype1: formval.dautype1,
        /*  dautype2: formval.dautype2,*/
        dauage: formval.dauage,
        daudead: formval.daudead,
        sontype1: formval.sontype1,
        /* sontype2: formval.sontype2,*/
        sonage: formval.sonage,
        sondead: formval.sondead,
        brotype1: formval.brotype1,
        /*   brotype2: formval.brotype2,*/
        broage: formval.broage,
        brodead: formval.brodead,
        sistype1: formval.sistype1,
        /*  sistype2: formval.sistype2,*/
        sisage: formval.sisage,
        sisdead: formval.sisdead,
        neptype1: formval.neptype1,
        /*  neptype2: formval.neptype2,*/
        nepage: formval.nepage,
        nepdead: formval.nepdead,
        niecetype1: formval.niecetype1,
        /*   niecetype2: formval.niecetype2,*/
        nieceage: formval.nieceage,
        niecedead: formval.niecedead,
        unctype1: formval.unctype1,
        /*  unctype2: formval.unctype2,*/
        uncage: formval.uncage,
        uncdead: formval.uncdead,
        autntype1: formval.autntype1,
        /*  autntype2: formval.autntype2,*/
        autnage: formval.autnage,
        autndead: formval.autndead,
        moftype1: formval.moftype1,
        /*  moftype2: formval.moftype2,*/
        mofage: formval.mofage,
        mofdead: formval.mofdead,
        momotype1: formval.momotype1,
        /*  momotype2: formval.momotype2,*/
        momoage: formval.momoage,
        momodead: formval.momodead,
        daftype1: formval.daftype1,
        /*  daftype2: formval.daftype2,*/
        dafage: formval.dafage,
        dafdead: formval.dafdead,
        damtype1: formval.damtype1,
        /* damtype2: formval.damtype2,*/
        damage: formval.damage,
        damdead: formval.damdead,
        oth1type1: formval.oth1type1,
        /*  oth1type2: formval.oth1type2,*/
        oth1age: formval.oth1age,
        oth1dead: formval.oth1dead,
        oth2type1: formval.oth2type1,
        /*  oth2type2: formval.oth2type2,*/
        oth2age: formval.oth2age,
        oth2dead: formval.oth2dead,
        oth3type1: formval.oth3type1,
        /*  oth3type2: formval.oth3type2,*/
        oth3age: formval.oth3age,
        oth3dead: formval.oth3dead,
        pgx1: formval.pgx1,
        pgx2: formval.pgx2,
        pgx3: formval.pgx3,
        pgx4: formval.pgx4,
        pgx5: formval.pgx5,
        pgx6: formval.pgx6,
        pgx7: formval.pgx7,
        pgx8: formval.pgx8,
        pgx9: formval.pgx9,
        pgx10: formval.pgx10,
        pgx11: formval.pgx11,
        pgx12: formval.pgx12,
        pgx13: formval.pgx13,
        pgx14: formval.pgx14,
        pgx15: formval.pgx15,
        pgx16: formval.pgx16,
        pgx17: formval.pgx17,
        pgx18: formval.pgx18,
        /*   pgx19: formval.pgx19,*/
        carrier: formval.carrier,
        carrierplan: formval.carrierplan,
        carrierpolicyno: formval.carrierpolicyno,
        cancer_sup: putcancer_sup,
        catheters_sup: putcatheters_sup,
        allergies_sup: putallergies_sup ,
        scooter_sup: putscooter_sup,
        walker_sup: putwalker_sup,
        braces_sup: putbraces_sup,
        topical_sup: puttopical_sup,
        pain_sup: putpain_sup,
        wound_sup: putwound_sup,
        diabetic_sup: putdiabetic_sup,
        triedbraces: formval.triedbraces,
        lastbrace: formval.lastbrace,
      //  lastbrace: moment.utc(formval.lastbrace).valueOf(),
        familyrelation0: formval.familyrelation0,
        familyrelation1: formval.familyrelation1,
        familyrelation2: formval.familyrelation2,
        familyrelation3: formval.familyrelation3,
        familyrelation4: formval.familyrelation4,
        familyrelation5: formval.familyrelation5,
        familyrelation6: formval.familyrelation6,
        familyrelation7: formval.familyrelation7,
        familyrelation8: formval.familyrelation8,
        familyrelation9: formval.familyrelation9,
        familyrelation10: formval.familyrelation10,
        familyrelation11: formval.familyrelation11,
        familyrelation12: formval.familyrelation12,
        familyrelation13: formval.familyrelation13,
        familyrelation14: formval.familyrelation14,
        familyrelation15: formval.familyrelation15,
        familyrelation16: formval.familyrelation16,
        familyrelation17: formval.familyrelation17,
        relation1: formval.relation1,
        relation2: formval.relation2,
        relation3: formval.relation3,
        relation4: formval.relation4,
        relation5: formval.relation5,
        relation6: formval.relation6,
        relation7: formval.relation7,
        relation8: formval.relation8,
        relation9: formval.relation9,
        relation10: formval.relation10,
        relation11: formval.relation11,
        relation12: formval.relation12,
        relation13: formval.relation13,
        relation14: formval.relation14,
        relation15: formval.relation15,
        relation16: formval.relation16,
        relation17: formval.relation17,
        relation18: formval.relation18,
        degree1: formval.degree1,
        degree2: formval.degree2,
        degree3: formval.degree3,
        degree4: formval.degree4,
        degree5: formval.degree5,
        degree6: formval.degree6,
        degree7: formval.degree7,
        degree8: formval.degree8,
        degree9: formval.degree9,
        degree10: formval.degree10,
        degree11: formval.degree11,
        degree12: formval.degree12,
        degree13: formval.degree13,
        degree14: formval.degree14,
        degree15: formval.degree15,
        degree16: formval.degree16,
        degree17: formval.degree17,
        degree18: formval.degree18,
       // hit_map_value: this.hit_map_value,
        hit_map_value: '',
        phname: formval.phname,
        familyrelation1name: formval.familyrelation1name,
        familyrelation2name: formval.familyrelation2name,
        familyrelation3name: formval.familyrelation3name,
        familyrelation4name: formval.familyrelation4name,
        familyrelation5name: formval.familyrelation5name,
        familyrelation6name: formval.familyrelation6name,
        familyrelation7name: formval.familyrelation7name,
        familyrelation8name: formval.familyrelation8name,
        familyrelation9name: formval.familyrelation9name,
        familyrelation10name: formval.familyrelation10name,
        familyrelation11name: formval.familyrelation11name,
        familyrelation12name: formval.familyrelation12name,
        familyrelation13name: formval.familyrelation13name,
        familyrelation14name: formval.familyrelation14name,
        familyrelation15name: formval.familyrelation15name,
        familyrelation16name: formval.familyrelation16name,
        familyrelation17name: formval.familyrelation17name,
        image: formval.image,
        iscompleted: 0,

          insurance1_1: putinsurance1_1,
          insurance2_1: putinsurance2_1,
          insurance3_1: putinsurance3_1,
          insurance4_1: putinsurance4_1,
          planbcard_1: putplanbcard_1,
          medicarepolicyno_1: formval.medicarepolicyno_1,
          mediprimarypolicy_1: putmediprimarypolicy_1,
          comprimarypolicy_1: putcomprimarypolicy_1,
          medadvantageprimarypolicy_1: putmedadvantageprimarypolicy_1,
          medadvantageplan_1: formval.medadvantageplan_1,
          medadvantagepolicyno_1: formval.medadvantagepolicyno_1,
          carrier_1: formval.carrier_1,
          carrierplan_1: formval.carrierplan_1,
          carrierpolicyno_1: formval.carrierpolicyno_1,

          insurance1_2: putinsurance1_2,
          insurance2_2: putinsurance2_2,
          insurance3_2: putinsurance3_2,
          insurance4_2: putinsurance4_2,
          planbcard_2: putplanbcard_2,
          medicarepolicyno_2: formval.medicarepolicyno_2,
          mediprimarypolicy_2: putmediprimarypolicy_2,
          comprimarypolicy_2: putcomprimarypolicy_2,
          medadvantageprimarypolicy_2: putmedadvantageprimarypolicy_2,
          medadvantageplan_2: formval.medadvantageplan_2,
          medadvantagepolicyno_2: formval.medadvantagepolicyno_2,
          carrier_2: formval.carrier_2,
          carrierplan_2: formval.carrierplan_2,
          carrierpolicyno_2: formval.carrierpolicyno_2,
          insurance1_3: putinsurance1_3,
          insurance2_3: putinsurance2_3,
          insurance3_3: putinsurance3_3,
          insurance4_3: putinsurance4_3,
          planbcard_3: putplanbcard_3,
          medicarepolicyno_3: formval.medicarepolicyno_3,
          mediprimarypolicy_3: putmediprimarypolicy_3,
          comprimarypolicy_3: putcomprimarypolicy_3,
          medadvantageprimarypolicy_3: putmedadvantageprimarypolicy_3,
          medadvantageplan_3: formval.medadvantageplan_3,
          medadvantagepolicyno_3: formval.medadvantagepolicyno_3,
          carrier_3: formval.carrier_3,
          carrierplan_3: formval.carrierplan_3,
          carrierpolicyno_3: formval.carrierpolicyno_3,
          insurance1_4: putinsurance1_4,
          insurance2_4: putinsurance2_4,
          insurance3_4: putinsurance3_4,
          insurance4_4: putinsurance4_4,
          planbcard_4: putplanbcard_4,
          medicarepolicyno_4: formval.medicarepolicyno_4,
          mediprimarypolicy_4: putmediprimarypolicy_4,
          comprimarypolicy_4: putcomprimarypolicy_4,
          medadvantageprimarypolicy_4: putmedadvantageprimarypolicy_4,
          medadvantageplan_4: formval.medadvantageplan_4,
          medadvantagepolicyno_4: formval.medadvantagepolicyno_4,
          carrier_4: formval.carrier_4,
          carrierplan_4: formval.carrierplan_4,
          carrierpolicyno_4: formval.carrierpolicyno_4,
          insurance1_5: putinsurance1_5,
          insurance2_5: putinsurance2_5,
          insurance3_5: putinsurance3_5,
          insurance4_5: putinsurance4_5,
          planbcard_5: putplanbcard_5,
          medicarepolicyno_5: formval.medicarepolicyno_5,
          mediprimarypolicy_5: putmediprimarypolicy_5,
          comprimarypolicy_5: putcomprimarypolicy_5,
          medadvantageprimarypolicy_5: putmedadvantageprimarypolicy_5,
          medadvantageplan_5: formval.medadvantageplan_5,
          medadvantagepolicyno_5: formval.medadvantagepolicyno_5,
          carrier_5: formval.carrier_5,
          carrierplan_5: formval.carrierplan_5,
          carrierpolicyno_5: formval.carrierpolicyno_5,
          insurance1_6: putinsurance1_6,
          insurance2_6: putinsurance2_6,
          insurance3_6: putinsurance3_6,
          insurance4_6: putinsurance4_6,
          planbcard_6: putplanbcard_6,
          medicarepolicyno_6: formval.medicarepolicyno_6,
          mediprimarypolicy_6: putmediprimarypolicy_6,
          comprimarypolicy_6: putcomprimarypolicy_6,
          medadvantageprimarypolicy_6: putmedadvantageprimarypolicy_6,
          medadvantageplan_6: formval.medadvantageplan_6,
          medadvantagepolicyno_6: formval.medadvantagepolicyno_6,
          carrier_6: formval.carrier_6,
          carrierplan_6: formval.carrierplan_6,
          carrierpolicyno_6: formval.carrierpolicyno_6,
          breastcancercount: this.breastcancercountmain,
          ovariantcancercount: this.ovariantcancercountmain,
          digestivecancercount: this.digestivecancercountmain,
      };

      console.log(data);
        if(this.isrecordavailable != null && this.recordtype==1) {
          this._http.post(link, data)
              .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                  //   this.opensaveorsubmitmodal = true;
                  setTimeout(() => {
                    this.addnote = null;
                    this.divaddnote = false;
                    this.getnotes();
                    //  this.opensaveorsubmitmodal = false;
                    this.pateintquestioniremodal = false;
                    this.showquestionarydiv = false;
                    this.getpatientrecord();
                    this.symptomdetailsbypatientid();
                    console.log('call-3');
                    this.pgxdetailsbypatientid();
                  }, 2000);
                }
              }, error => {
                console.log('Oooops!');
              });
        }
      }, 2000);
    }
  }


                                                     /*MODAL CANCELS*/
  cancel() {
    this.getdetails();
    // this.dataForm.reset();
    // this.router.navigate(['/patient-list']);
  }
  onHidden() {
    this.pateintquestioniremodal = false;
    this.opensaveorsubmitmodal = false;
    this.showdeletenotemodal = false;
    //   this.opentypemodalflag = false;
    this.opensymptommodalflag = false;
    this.showquestionarydiv = false;
    this.pgxmedicationmodal = false;
    this.recordpopupmodal = false;
    this.modal_for_opt_in_path = false;

  }

  onHidden1() {
    this.opentypemodalflag = false;
  //  console.log('this.pateintquestioniremodal');
  //  console.log(this.pateintquestioniremodal);
    this.issegmentmodalshown = false;
  }
  cancelit() {
    this.dataForm2.reset();
    this.dataForm1.reset();
    this.dataForm.reset();
    this.pateintquestioniremodal = false;
    this.opensaveorsubmitmodal = false;
    this.showdeletenotemodal = false;
    this.opentypemodalflag = false;
    this.opensymptommodalflag = false;
    this.showquestionarydiv = false;
    this.dataForm3.reset();
  }
    gobacktosymptomlist() {
        setTimeout(() => {
            this.pgxmedicationmodal = false;
        }, 500);
    this.opensymptommodalflag = true;
        this.symptomdetailsbypatientid();
    }
                                               /*CANCER SYMPTOMS LAST POPUP FUNCTIONALITIES*/
  savecommoncancersymptoms() {
    this.issubmitcommoncancerform = false;
  }
  submitcommoncancersymptoms() {
    this.issubmitcommoncancerform = true;
      this.pgxmedicationmodal = true;
  }
  /*PGX LAST POPUP FUNCTIONALITIES*/
  savepgx() {
    this.issubmitpgxform = false;
  }
  submitpgx() {
    this.issubmitpgxform = true;
  }
  opensymptommodal() {
    // to open modal and do other parts of the functions
    this.opensymptommodalflag = true;
    this.symptomdetailsbypatientid();
  }
// fetch the values if it is already saved
  symptomdetailsbypatientid() {
    console.log('fetch symptom values');
    let link = this.serverurl + 'getcommoncancersymptomsbypatientid';
    let data = {patientid : this.id};
    this._http.post(link, data)
      .subscribe(res => {
        let result = res.json();
        if (result.status == 'success' && typeof(result.id) != 'undefined') {
        //  console.log('getcommoncancersymptomsbypatientid');
       //   console.log(result.id);
          let userdet = result.id;
          this.iscompletedccsrecord = result.id.iscompleted;
          this.dataForm2 = this.fb.group({
            weightloss: [userdet.weightloss],
            appetite: [userdet.appetite],
            weight: [userdet.weight],
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
            difficulty_swallowing: [userdet.difficulty_swallowing],
            sorethroat: [userdet.sorethroat],
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
            chroniccough: [userdet.chroniccough],
            lowerbackpain: [userdet.lowerbackpain],
            hearingloss: [userdet.hearingloss],
            skinchanges: [userdet.skinchanges],
            legpain: [userdet.legpain],
            swollenabdomen: [userdet.swollenabdomen],
            lumpinbreast: [userdet.lumpinbreast],
            thickeningbreast: [userdet.thickeningbreast],
            disordersofbreast: [userdet.disordersofbreast],
            rednessnipple: [userdet.rednessnipple],
            nipplepain: [userdet.nipplepain],
            nippledischarge: [userdet.nippledischarge],
            breastsize: [userdet.breastsize],
            breastpain: [userdet.breastpain],
            uterinebleeding: [userdet.uterinebleeding],
            urinationurgency: [userdet.urinationurgency],
            pelvicpain: [userdet.pelvicpain],
            gaspain: [userdet.gaspain],
            bloodinurine: [userdet.bloodinurine],
            melena: [userdet.melena],
            stomachpainabdominalpain: [userdet.stomachpainabdominalpain],
            bowelhabits: [userdet.bowelhabits],
            unconstipation: [userdet.unconstipation],
            diarrhea: [userdet.diarrhea],
            colonpolyps: [userdet.colonpolyps],
            inflammatorypolyps: [userdet.inflammatorypolyps],
            rectalbleeding: [userdet.rectalbleeding],
            abdominalbloating1: [userdet.abdominalbloating1],
            abdominalbloating2: [userdet.abdominalbloating2],
            idefecation: [userdet.idefecation],
            ofecalabnormalities: [userdet.ofecalabnormalities],
            pancreaticuabdominalpain: [userdet.pancreaticuabdominalpain],
            cholecystitis1: [userdet.cholecystitis1],
            cholecystitis2: [userdet.cholecystitis2],
            noofbloodclots: [userdet.noofbloodclots],
            personalhighcholesterol: [userdet.personalhighcholesterol],
            fhighcholesterol: [userdet.fhighcholesterol],
            fheartdisease: [userdet.fheartdisease],
            varicose_veins: [userdet.varicose_veins],
            acid_reflux: [userdet.acid_reflux],
            anemia1: [userdet.anemia1],
            migraines: [userdet.migraines],
            pain: [userdet.pain],
            paininunsjoint: [userdet.paininunsjoint],
            backpain: [userdet.backpain],
            fibromyalgia: [userdet.fibromyalgia],
            nerve_pain: [userdet.nerve_pain],
            arthritis: [userdet.arthritis],
            angina: [userdet.angina],
            stroke: [userdet.stroke],
            heart_attack: [userdet.heart_attack],
            high_blood_pressure: [userdet.high_blood_pressure]
          });
          this.getsymptommodaliscompletedornot();
        } else {
        }
      }, error => {
        console.log('Ooops');
      });
  }

  dosubmit2(formval) {

    if (formval.weightloss == true) {
      var weightloss = 1;
    } else {
      var weightloss = 0;
    }
    if (formval.appetite == true) {
      var appetite = 1;
    } else {
      var appetite = 0;
    }
    if (formval.eatingdisorder == true) {
      var eatingdisorder = 1;
    } else {
      var eatingdisorder = 0;
    }
    if (formval.unabdominalpain == true) {
      var unabdominalpain = 1;
    } else {
      var unabdominalpain = 0;
    }
    if (formval.upabdominalpain == true) {
      var upabdominalpain = 1;
    } else {
      var upabdominalpain = 0;
    }
    if (formval.ruquadrantpain == true) {
      var ruquadrantpain = 1;
    } else {
      var ruquadrantpain = 0;
    }
    if (formval.luquadrantpain == true) {
      var luquadrantpain = 1;
    } else {
      var luquadrantpain = 0;
    }
    if (formval.labdominalpain == true) {
      var labdominalpain = 1;
    } else {
      var labdominalpain = 0;
    }
    if (formval.rlquadrantpain == true) {
      var rlquadrantpain = 1;
    } else {
      var rlquadrantpain = 0;
    }
    if (formval.llquadrantpain == true) {
      var llquadrantpain = 1;
    } else {
      var llquadrantpain = 0;
    }
    if (formval.gabdominalpain == true) {
      var gabdominalpain = 1;
    } else {
      var gabdominalpain = 0;
    }
    if (formval.vomiting1 == true) {
      var vomiting1 = 1;
    } else {
      var vomiting1 = 0;
    }
    if (formval.vomiting2 == true) {
      var vomiting2 = 1;
    } else {
      var vomiting2 = 0;
    }
    if (formval.vomiting3 == true) {
      var vomiting3 = 1;
    } else {
      var vomiting3 = 0;
    }
    if (formval.chronicfatigue == true) {
      var chronicfatigue = 1;
    } else {
      var chronicfatigue = 0;
    }
    if (formval.otherfatigue == true) {
      var otherfatigue = 1;
    } else {
      var otherfatigue = 0;
    }
    if (formval.anemia == true) {
      var anemia = 1;
    } else {
      var anemia = 0;
    }
    if (formval.jaundice == true) {
      var jaundice = 1;
    } else {
      var jaundice = 0;
    }
    if (formval.difficulty_swallowing == true) {
      var difficulty_swallowing = 1;
    } else {
      var difficulty_swallowing = 0;
    }
    if (formval.sorethroat == true) {
      var sorethroat = 1;
    } else {
      var sorethroat = 0;
    }
    if (formval.fatigue1 == true) {
      var fatigue1 = 1;
    } else {
      var fatigue1 = 0;
    }
    if (formval.fatigue2 == true) {
      var fatigue2 = 1;
    } else {
      var fatigue2 = 0;
    }
    if (formval.type1diabetes == true) {
      var type1diabetes = 1;
    } else {
      var type1diabetes = 0;
    }
    if (formval.type2diabetes == true) {
      var type2diabetes = 1;
    } else {
      var type2diabetes = 0;
    }
    if (formval.constipation == true) {
      var constipation= 1;
    } else {
      var constipation = 0;
    }
    if (formval.abnormalweightloss == true) {
      var abnormalweightloss = 1;
    } else {
      var abnormalweightloss = 0;
    }
    if (formval.abnormalweightgain == true) {
      var abnormalweightgain = 1;
    } else {
      var abnormalweightgain = 0;
    }
    if (formval.hypertrophicdisorders == true) {
      var hypertrophicdisorders = 1;
    } else {
      var hypertrophicdisorders = 0;
    }
    if (formval.bloodinstool == true) {
      var bloodinstool = 1;
    } else {
      var bloodinstool = 0;
    }
    if (formval.skineruption == true) {
      var skineruption = 1;
    } else {
      var skineruption = 0;
    }
    if (formval.xerosiscutis == true) {
      var xerosiscutis = 1;
    } else {
      var xerosiscutis = 0;
    }
    if (formval.chroniccough == true) {
      var chroniccough = 1;
    } else {
      var chroniccough = 0;
    }

    if (formval.legpain == true) {
      var legpain = 1;
    } else {
      var legpain = 0;
    }
    if (formval.swollenabdomen == true) {
      var swollenabdomen = 1;
    } else {
      var swollenabdomen = 0;
    }
    if (formval.lowerbackpain == true) {
      var lowerbackpain = 1;
    } else {
      var lowerbackpain = 0;
    }
    if (formval.hearingloss == true) {
      var hearingloss = 1;
    } else {
      var hearingloss = 0;
    }
    if (formval.skinchanges == true) {
      var skinchanges = 1;
    } else {
      var skinchanges = 0;
    }
    if (formval.lumpinbreast == true) {
      var lumpinbreast = 1;
    } else {
      var lumpinbreast = 0;
    }
    if (formval.thickeningbreast == true) {
      var thickeningbreast = 1;
    } else {
      var thickeningbreast = 0;
    }
    if (formval.disordersofbreast == true) {
      var disordersofbreast = 1;
    } else {
      var disordersofbreast = 0;
    }
    if (formval.rednessnipple == true) {
      var rednessnipple = 1;
    } else {
      var rednessnipple = 0;
    }
    if (formval.breastsize == true) {
      var breastsize = 1;
    } else {
      var breastsize = 0;
    }
    if (formval.breastpain == true) {
      var breastpain = 1;
    } else {
      var breastpain = 0;
    }
    if (formval.nipplepain == true) {
      var nipplepain = 1;
    } else {
      var nipplepain = 0;
    }
    if (formval.nippledischarge == true) {
      var nippledischarge = 1;
    } else {
      var nippledischarge = 0;
    }
    if (formval.uterinebleeding == true) {
      var uterinebleeding = 1;
    } else {
      var uterinebleeding = 0;
    }
    if (formval.urinationurgency == true) {
      var urinationurgency = 1;
    } else {
      var urinationurgency = 0;
    }
    if (formval.pelvicpain == true) {
      var pelvicpain = 1;
    } else {
      var pelvicpain = 0;
    }
    if (formval.gaspain == true) {
      var gaspain = 1;
    } else {
      var gaspain = 0;
    }
    if (formval.bloodinurine == true) {
      var bloodinurine = 1;
    } else {
      var bloodinurine = 0;
    }
    if (formval.melena == true) {
      var melena = 1;
    } else {
      var melena = 0;
    }
    if (formval.stomachpainabdominalpain == true) {
      var stomachpainabdominalpain = 1;
    } else {
      var stomachpainabdominalpain = 0;
    }
    if (formval.bowelhabits == true) {
      var bowelhabits = 1;
    } else {
      var bowelhabits = 0;
    }
    if (formval.unconstipation == true) {
      var unconstipation= 1;
    } else {
      var unconstipation = 0;
    }
    if (formval.diarrhea == true) {
      var diarrhea = 1;
    } else {
      var diarrhea = 0;
    }
    if (formval.colonpolyps == true) {
      var colonpolyps = 1;
    } else {
      var colonpolyps = 0;
    }
    if (formval.inflammatorypolyps == true) {
      var inflammatorypolyps = 1;
    } else {
      var inflammatorypolyps = 0;
    }
    if (formval.rectalbleeding == true) {
      var rectalbleeding= 1;
    } else {
      var rectalbleeding = 0;
    }
    if (formval.abdominalbloating1 == true) {
      var abdominalbloating1 = 1;
    } else {
      var abdominalbloating1 = 0;
    }
    if (formval.abdominalbloating2 == true) {
      var abdominalbloating2 = 1;
    } else {
      var abdominalbloating2 = 0;
    }
    if (formval.idefecation == true) {
      var idefecation= 1;
    } else {
      var idefecation = 0;
    }
    if (formval.ofecalabnormalities == true) {
      var ofecalabnormalities = 1;
    } else {
      var ofecalabnormalities = 0;
    }
    if (formval.pancreaticuabdominalpain == true) {
      var pancreaticuabdominalpain = 1;
    } else {
      var pancreaticuabdominalpain = 0;
    }
    if (formval.cholecystitis1 == true) {
      var cholecystitis1 = 1;
    } else {
      var cholecystitis1 = 0;
    }
    if (formval.cholecystitis2 == true) {
      var cholecystitis2 = 1;
    } else {
      var cholecystitis2 = 0;
    }
    if (formval.noofbloodclots == true) {
      var noofbloodclots = 1;
    } else {
      var noofbloodclots = 0;
    }

    if (formval.personalhighcholesterol == true) {
      var personalhighcholesterol = 1;
    } else {
      var personalhighcholesterol = 0;
    }
    if (formval.fhighcholesterol == true) {
      var fhighcholesterol = 1;
    } else {
      var fhighcholesterol = 0;
    }
    if (formval.fheartdisease == true) {
      var fheartdisease = 1;
    } else {
      var fheartdisease = 0;
    }
    if (formval.varicose_veins == true) {
      var varicose_veins = 1;
    } else {
      var varicose_veins = 0;
    }
    if (formval.acid_reflux == true) {
      var acid_reflux = 1;
    } else {
      var acid_reflux = 0;
    }
    if (formval.anemia1 == true) {
      var anemia1 = 1;
    } else {
      var anemia1 = 0;
    }
    if (formval.migraines == true) {
      var migraines = 1;
    } else {
      var migraines = 0;
    }
    if (formval.pain == true) {
      var pain = 1;
    } else {
      var pain = 0;
    }
    if (formval.paininunsjoint == true) {
      var paininunsjoint = 1;
    } else {
      var paininunsjoint = 0;
    }
    if (formval.backpain == true) {
      var backpain = 1;
    } else {
      var backpain = 0;
    }
    if (formval.fibromyalgia == true) {
      var fibromyalgia = 1;
    } else {
      var fibromyalgia = 0;
    }
    if (formval.nerve_pain == true) {
      var nerve_pain = 1;
    } else {
      var nerve_pain = 0;
    }
    if (formval.arthritis == true) {
      var arthritis = 1;
    } else {
      var arthritis = 0;
    }
    if (formval.angina == true) {
      var angina = 1;
    } else {
      var angina = 0;
    }

    if (formval.stroke == true) {
      var stroke = 1;
    } else {
      var stroke = 0;
    }

    if (formval.heart_attack == true) {
      var heart_attack = 1;
    } else {
      var heart_attack = 0;
    }

    if (formval.high_blood_pressure == true) {
      var high_blood_pressure = 1;
    } else {
      var high_blood_pressure = 0;
    }

    if (this.issubmitcommoncancerform == true) {    // only for submit , validating the fields
      console.log('submit commonsymptom');
      let x: any;
      for (x in this.dataForm1.controls) {
        this.dataForm1.controls[x].markAsTouched();
      }

      let link = this.serverurl + 'commoncancersymptoms';
      var data = {
        patientid: this.id,
        note: this.addnote,
        added_by: this.cookiedetails,
        weightloss: weightloss,
        //weight: weight,
        appetite: appetite,
        eatingdisorder: eatingdisorder,
        unabdominalpain: unabdominalpain,
        upabdominalpain: upabdominalpain,
        ruquadrantpain: ruquadrantpain,
        luquadrantpain: luquadrantpain,
        labdominalpain: labdominalpain,
        rlquadrantpain: rlquadrantpain,
        llquadrantpain: llquadrantpain,
        gabdominalpain: gabdominalpain,
        vomiting1: vomiting1,
        vomiting2: vomiting2,
        vomiting3: vomiting3,
        chronicfatigue: chronicfatigue,
        otherfatigue: otherfatigue,
        anemia: anemia,
        jaundice: jaundice,
        difficulty_swallowing: difficulty_swallowing,
        sorethroat: sorethroat,
        fatigue1: fatigue1,
        fatigue2: fatigue2,
        type1diabetes: type1diabetes,
        type2diabetes: type2diabetes,
        constipation: constipation,
        abnormalweightloss: abnormalweightloss,
        abnormalweightgain: abnormalweightgain,
        hypertrophicdisorders: hypertrophicdisorders,
        bloodinstool: bloodinstool,
        skineruption: skineruption,
        xerosiscutis: xerosiscutis,
        chroniccough: chroniccough,
        lowerbackpain: lowerbackpain,
        hearingloss: hearingloss,
        skinchanges: skinchanges,
        lumpinbreast: lumpinbreast,
        thickeningbreast: thickeningbreast,
        disordersofbreast: disordersofbreast,
        rednessnipple: rednessnipple,
        nipplepain: nipplepain,
        nippledischarge: nippledischarge,
        breastsize: breastsize,
        breastpain: breastpain,
        uterinebleeding: uterinebleeding,
        urinationurgency: urinationurgency,
        legpain: legpain,
        swollenabdomen: swollenabdomen,
        pelvicpain: pelvicpain,
        gaspain: gaspain,
        bloodinurine: bloodinurine,
        melena: melena,
        stomachpainabdominalpain: stomachpainabdominalpain,
        bowelhabits: bowelhabits,
        unconstipation: unconstipation,
        diarrhea: diarrhea,
        colonpolyps: colonpolyps,
        inflammatorypolyps: inflammatorypolyps,
        rectalbleeding: rectalbleeding,
        abdominalbloating1: abdominalbloating1,
        abdominalbloating2: abdominalbloating2,
        idefecation: idefecation,
        ofecalabnormalities: ofecalabnormalities,
        pancreaticuabdominalpain: pancreaticuabdominalpain,
        cholecystitis1: cholecystitis1,
        cholecystitis2: cholecystitis2,
        noofbloodclots: noofbloodclots,
        personalhighcholesterol: personalhighcholesterol,
        fhighcholesterol: fhighcholesterol,
        fheartdisease: fheartdisease,
        varicose_veins: varicose_veins,
        acid_reflux: acid_reflux,
        anemia1: anemia1,
        migraines: migraines,
        pain: pain,
        paininunsjoint: paininunsjoint,
        backpain: backpain,
        fibromyalgia: fibromyalgia,
        nerve_pain: nerve_pain,
        arthritis: arthritis,
        angina: angina,
        stroke: stroke,
        heart_attack: heart_attack,
        high_blood_pressure: high_blood_pressure,
        iscompleted: 1
      };
   //   console.log(data);
      if (this.dataForm2.valid) {
        this._http.post(link, data)
          .subscribe(res => {
            let result = res.json();
            if (result.status == 'success') {
              this.opensymptommodalflag = false;
              this.addnote = null;
              this.divaddnote = false;
              this.getnotes();
              setTimeout(() => {
                console.log('call--4');
                this.pgxdetailsbypatientid();
                this.getpatientrecord();
                this.getsymptommodaliscompletedornot();
              }, 2000);
            }
          }, error => {
            console.log('Oooops!');
          });
      }
    }
    else {
        console.log('save commonsymptom');
      let link = this.serverurl + 'commoncancersymptoms';
      var data = {
        patientid: this.id,
        note: this.addnote,
        added_by: this.cookiedetails,
        weightloss: weightloss,
        //weight: weight,
        appetite: appetite,
        eatingdisorder: eatingdisorder,
        unabdominalpain: unabdominalpain,
        upabdominalpain: upabdominalpain,
        ruquadrantpain: ruquadrantpain,
        luquadrantpain: luquadrantpain,
        labdominalpain: labdominalpain,
        rlquadrantpain: rlquadrantpain,
        llquadrantpain: llquadrantpain,
        gabdominalpain: gabdominalpain,
        vomiting1: vomiting1,
        vomiting2: vomiting2,
        vomiting3: vomiting3,
        chronicfatigue: chronicfatigue,
        otherfatigue: otherfatigue,
        anemia: anemia,
        jaundice: jaundice,
        difficulty_swallowing: difficulty_swallowing,
        sorethroat: sorethroat,
        fatigue1: fatigue1,
        fatigue2: fatigue2,
        type1diabetes: type1diabetes,
        type2diabetes: type2diabetes,
        constipation: constipation,
        abnormalweightloss: abnormalweightloss,
        abnormalweightgain: abnormalweightgain,
        hypertrophicdisorders: hypertrophicdisorders,
        bloodinstool: bloodinstool,
        skineruption: skineruption,
        xerosiscutis: xerosiscutis,
        chroniccough: chroniccough,
        lowerbackpain: lowerbackpain,
        hearingloss: hearingloss,
        skinchanges: skinchanges,
        lumpinbreast: lumpinbreast,
        thickeningbreast: thickeningbreast,
        disordersofbreast: disordersofbreast,
        rednessnipple: rednessnipple,
        nipplepain: nipplepain,
        nippledischarge: nippledischarge,
        breastsize: breastsize,
        breastpain: breastpain,
        uterinebleeding: uterinebleeding,
        urinationurgency: urinationurgency,
        legpain: legpain,
        swollenabdomen: swollenabdomen,
        pelvicpain: pelvicpain,
        gaspain: gaspain,
        bloodinurine: bloodinurine,
        melena: melena,
        stomachpainabdominalpain: stomachpainabdominalpain,
        bowelhabits: bowelhabits,
        unconstipation: unconstipation,
        diarrhea: diarrhea,
        colonpolyps: colonpolyps,
        inflammatorypolyps: inflammatorypolyps,
        rectalbleeding: rectalbleeding,
        abdominalbloating1: abdominalbloating1,
        abdominalbloating2: abdominalbloating2,
        idefecation: idefecation,
        ofecalabnormalities: ofecalabnormalities,
        pancreaticuabdominalpain: pancreaticuabdominalpain,
        cholecystitis1: cholecystitis1,
        cholecystitis2: cholecystitis2,
        noofbloodclots: noofbloodclots,
        personalhighcholesterol: personalhighcholesterol,
        fhighcholesterol: fhighcholesterol,
        fheartdisease: fheartdisease,
        varicose_veins: varicose_veins,
        acid_reflux: acid_reflux,
        anemia1: anemia1,
        migraines: migraines,
        pain: pain,
        paininunsjoint: paininunsjoint,
        backpain: backpain,
        fibromyalgia: fibromyalgia,
        nerve_pain: nerve_pain,
        arthritis: arthritis,
        angina: angina,
        stroke: stroke,
        heart_attack: heart_attack,
        high_blood_pressure: high_blood_pressure,
        iscompleted: 0
      };
    //  console.log(data);
      this._http.post(link, data)
        .subscribe(res => {
          let result = res.json();
          if (result.status == 'success') {
            this.opensymptommodalflag = false;
            this.addnote = null;
            this.divaddnote = false;
            this.getnotes();
            this.getpatientrecord();
            this.getsymptommodaliscompletedornot();
            console.log('call--5');
            this.pgxdetailsbypatientid();
          }
        }, error => {
          console.log('Oooops!');
        });
    }
  }
    updatevalue(val) {
      console.log('updatevalue');
            if (this.divshowself == 0) {
        console.log( $('input[name="' + val + '"]').is(':checked') );
                setTimeout(() => {
                    //  $( '#newpopup_conbox_wrapper_1' ).find('input[type="checkbox"]').each(function() {
                    // if ($( '#newpopup_conbox_wrapper_1' ).find('input[type="checkbox"]')) {
                    //  if ($(this). prop('checked') == true) {
                  console.log('input[name + val----------------------------------------------');
                  console.log($('input[name="' + val + '"]').is(':checked'));
                    if ($('input[name="' + val + '"]').is(':checked') == true) {
                     // if ($(this).is(':checked'))
                        console.log(val);
                        if (val == 'Breast_0' || val == 'Breast1_0') {
                            this.breastcancercount ++;
                        }
                        if (val == 'Ovarian1_0') {
                            this.ovariantcancercount ++;
                        }
                        if (val == 'Digestive Organs_0' || val == 'Digestive Organs1_0') {
                            this.digestivecancercount ++;
                        }
                    }
                    else {
                        if (val == 'Breast_0' || val == 'Breast1_0') {
                            this.breastcancercount --;
                        }
                        if (val == 'Ovarian1_0' ) {
                            this.ovariantcancercount --;
                        }
                        if (val == 'Digestive Organs_0' || val == 'Digestive Organs1_0') {
                            this.digestivecancercount --;
                        }
                    }
                    console.log( ' this.breastcancercount -----'+ this.breastcancercount);
                    console.log( ' this.ovariantcancercount -----'+ this.ovariantcancercount);
                    console.log( ' this.digestivecancercount -----'+ this.digestivecancercount);
                }, 500);
    }

    }

  putvaluetodataform1() {
    console.log('index is---------');
    console.log($('.poplabel4').index());
    this.breastcancercountmain=this.breastcancercount;
    this.ovariantcancercountmain=this.ovariantcancercount;
    this.digestivecancercountmain=this.digestivecancercount;
    var temparr_1 = [];
    $( '#newpopup_conbox_wrapper_1' ).find('input[type="checkbox"]:checked').each(function() {
      //  console.log($(this).val());
      temparr_1.push($(this).val());
    });

    // this.selected_value = temparr_1;
    if (this.val == 1) {
      this.dataForm1.patchValue({
        phtype1 : temparr_1
      });
    }  if (this.val == 2) {
      this.dataForm1.patchValue({
        motype1 : temparr_1
      });
    }  if (this.val == 3) {
      this.dataForm1.patchValue({
        fatype1 : temparr_1
      });
    }  if (this.val == 4) {
      this.dataForm1.patchValue({
        dautype1 : temparr_1
      });
    }  if (this.val == 5) {
      this.dataForm1.patchValue({
        sontype1 : temparr_1
      });
    }  if (this.val == 6) {
      this.dataForm1.patchValue({
        brotype1 : temparr_1
      });
    }  if (this.val == 7) {
      this.dataForm1.patchValue({
        sistype1 : temparr_1
      });
    }  if (this.val == 8) {
      this.dataForm1.patchValue({
        neptype1 : temparr_1
      });
    }  if (this.val == 9) {
      this.dataForm1.patchValue({
        niecetype1 : temparr_1
      });
    }  if (this.val == 10) {
      this.dataForm1.patchValue({
        unctype1 : temparr_1
      });
    }  if (this.val == 11) {
      this.dataForm1.patchValue({
        autntype1 : temparr_1
      });
    }  if (this.val == 12) {
      this.dataForm1.patchValue({
        moftype1 : temparr_1
      });
    }  if (this.val == 13) {
      this.dataForm1.patchValue({
        momotype1 : temparr_1
      });
    }  if (this.val == 14) {
      this.dataForm1.patchValue({
        daftype1 : temparr_1
      });
    }  if (this.val == 15) {
      this.dataForm1.patchValue({
        damtype1 : temparr_1
      });
    }  if (this.val == 16) {
      this.dataForm1.patchValue({
        oth1type1 : temparr_1
      });
    }  if (this.val == 17) {
      this.dataForm1.patchValue({
        oth2type1 : temparr_1
      });
    }  if (this.val == 18) {
      this.dataForm1.patchValue({
        oth3type1 : temparr_1
      });
    }
    this.opentypemodalflag = false;
    this.symptomtype = null;
    temparr_1 = [];
    console.log('this.dataForm1');
    console.log(this.dataForm1);
    setTimeout( () => {
      this.get_left_heatmap_value(this.cancer_type_modal_val);
    }, 500);
  }

  cancelvaluefromdataform1() {
    this.breastcancercount = this.breastcancercountmain;
    this.ovariantcancercount = this.ovariantcancercountmain;
    this.digestivecancercount = this.digestivecancercountmain;
    if (this.val == 1) {
      this.dataForm1.patchValue({
        phtype1 : null
      });
    }  if (this.val == 2) {
      this.dataForm1.patchValue({
        motype1 : null
      });
    }  if (this.val == 3) {
      this.dataForm1.patchValue({
        fatype1 : null
      });
    }  if (this.val == 4) {
      this.dataForm1.patchValue({
        dautype1 : null
      });
    }  if (this.val == 5) {
      this.dataForm1.patchValue({
        sontype1 : null
      });
    }  if (this.val == 6) {
      this.dataForm1.patchValue({
        brotype1 : null
      });
    }  if (this.val == 7) {
      this.dataForm1.patchValue({
        sistype1 : null
      });
    }  if (this.val == 8) {
      this.dataForm1.patchValue({
        neptype1 : null
      });
    }  if (this.val == 9) {
      this.dataForm1.patchValue({
        niecetype1 : null
      });
    }  if (this.val == 10) {
      this.dataForm1.patchValue({
        unctype1 : null
      });
    }  if (this.val == 11) {
      this.dataForm1.patchValue({
        autntype1 : null
      });
    }  if (this.val == 12) {
      this.dataForm1.patchValue({
        moftype1 : null
      });
    }  if (this.val == 13) {
      this.dataForm1.patchValue({
        momotype1 : null
      });
    }  if (this.val == 14) {
      this.dataForm1.patchValue({
        daftype1 : null
      });
    }  if (this.val == 15) {
      this.dataForm1.patchValue({
        damtype1 : null
      });
    }  if (this.val == 16) {
      this.dataForm1.patchValue({
        oth1type1 : null
      });
    }  if (this.val == 17) {
      this.dataForm1.patchValue({
        oth2type1 : null
      });
    }  if (this.val == 18) {
      this.dataForm1.patchValue({
        oth3type1 : null
      });
    }
    this.opentypemodalflag = false;
    this.symptomtype = null;
  }
                                /*TO PUT LAST POP VALUE TO PATIENT PROFILE SHEET*/
  opentypemodal(val, familyrelation) {
    this.cancer_type_modal_val = val-1;

    if (familyrelation == 'Self') {
      this.divshowself = 1;
    }
    else {
      this.divshowself = 0;

    }
    // this flag is used to know when to do breastcancer++ ,, it will be done only when the modal opens,, not in multiple click to that checkbox
   // this.choose_cancer_type_flag ++;
    this.opentypemodalflag = true;
    setTimeout( () => {
      $('.poplabel4').click(function() {
        console.log('checkbox clicked');
     //   console.log($(this).index());
       // $('.checkedornot')
        $('.poplabel4').find('input').prop('checked', false);
        $(this).find('input').prop('checked', true);
      });

    }, 500);
// console.log('divshowself --------------- '+this.divshowself);
// TO SHOW SAVED CHECKBOX VALUE
    if (val == 1) {
      if (this.dataForm1.value.phtype1 != null) {
        this.symptomtype = this.dataForm1.value.phtype1;
        var phtype1 = this.dataForm1.value.phtype1;
        for (let i in phtype1) {
            setTimeout(() => {
                $( '#newpopup_conbox_wrapper_1' ).find('input[type="checkbox"]').each(function() {
                    if (phtype1[i] == $(this).val()) {
                        $(this).prop('checked', true);
                    }
                });
            }, 500);
        }
      }
      this.val = 1;
    }if (val == 2) {
      if (this.dataForm1.value.motype1 != null) {
        this.symptomtype = this.dataForm1.value.motype1;
          var motype1 = this.dataForm1.value.motype1;
          for (let i in motype1) {
              setTimeout(() => {
                  $( '#newpopup_conbox_wrapper_1' ).find('input[type="checkbox"]').each(function() {
                      if (motype1[i] == $(this).val()) {
                          $(this).prop('checked', true);
                      }
                  });
              }, 500);
          }
      }
      this.val = 2;
    }
    if (val == 3) {
      if (this.dataForm1.value.fatype1 != null) {
        this.symptomtype = this.dataForm1.value.fatype1;
          var fatype1 = this.dataForm1.value.fatype1;
          for (let i in fatype1) {
              setTimeout(() => {
                  $( '#newpopup_conbox_wrapper_1' ).find('input[type="checkbox"]').each(function() {
                      if (fatype1[i] == $(this).val()) {
                          $(this).prop('checked', true);
                      }
                  });
              }, 500);
          }
      }
      this.val = 3;
    }
    if (val == 4) {
      if (this.dataForm1.value.dautype1 != null) {
        this.symptomtype = this.dataForm1.value.dautype1;
          var dautype1 = this.dataForm1.value.dautype1;
          for (let i in dautype1) {
              setTimeout(() => {
                  $( '#newpopup_conbox_wrapper_1' ).find('input[type="checkbox"]').each(function() {
                      if (dautype1[i] == $(this).val()) {
                          $(this).prop('checked', true);
                      }
                  });
              }, 500);
          }
      }
      this.val = 4;
    }if (val == 5) {
      if (this.dataForm1.value.sontype1 != null) {
        this.symptomtype = this.dataForm1.value.sontype1;
          var sontype1 = this.dataForm1.value.sontype1;
          for (let i in sontype1) {
              setTimeout(() => {
                  $( '#newpopup_conbox_wrapper_1' ).find('input[type="checkbox"]').each(function() {
                      if (sontype1[i] == $(this).val()) {
                          $(this).prop('checked', true);
                      }
                  });
              }, 500);
          }
      }
      this.val = 5;
    }if (val == 6) {
      if (this.dataForm1.value.brotype1 != null) {
        this.symptomtype = this.dataForm1.value.brotype1;
          var brotype1 = this.dataForm1.value.brotype1;
          for (let i in brotype1) {
              setTimeout(() => {
                  $( '#newpopup_conbox_wrapper_1' ).find('input[type="checkbox"]').each(function() {
                      if (brotype1[i] == $(this).val()) {
                          $(this).prop('checked', true);
                      }
                  });
              }, 500);
          }
      }
      this.val = 6;
    }if (val == 7) {
      if (this.dataForm1.value.sistype1 != null) {
        this.symptomtype = this.dataForm1.value.sistype1;
          var sistype1 = this.dataForm1.value.sistype1;
          for (let i in sistype1) {
              setTimeout(() => {
                  $( '#newpopup_conbox_wrapper_1' ).find('input[type="checkbox"]').each(function() {
                      if (sistype1[i] == $(this).val()) {
                          $(this).prop('checked', true);
                      }
                  });
              }, 500);
          }
      }
      this.val = 7;
    }if (val == 8) {
      if (this.dataForm1.value.neptype1 != null) {
        this.symptomtype = this.dataForm1.value.neptype1;
          var neptype1 = this.dataForm1.value.neptype1;
          for (let i in neptype1) {
              setTimeout(() => {
                  $( '#newpopup_conbox_wrapper_1' ).find('input[type="checkbox"]').each(function() {
                      if (neptype1[i] == $(this).val()) {
                          $(this).prop('checked', true);
                      }
                  });
              }, 500);
          }
      }
      this.val = 8;
    }if (val == 9) {
      if (this.dataForm1.value.niecetype1 != null) {
        this.symptomtype = this.dataForm1.value.niecetype1;
          var niecetype1 = this.dataForm1.value.niecetype1;
          for (let i in niecetype1) {
              setTimeout(() => {
                  $( '#newpopup_conbox_wrapper_1' ).find('input[type="checkbox"]').each(function() {
                      if (niecetype1[i] == $(this).val()) {
                          $(this).prop('checked', true);
                      }
                  });
              }, 500);
          }
      }
      this.val = 9;
    }if (val == 10) {
      if (this.dataForm1.value.unctype1 != null) {
        this.symptomtype = this.dataForm1.value.unctype1;
          var unctype1 = this.dataForm1.value.unctype1;
          for (let i in unctype1) {
              setTimeout(() => {
                  $( '#newpopup_conbox_wrapper_1' ).find('input[type="checkbox"]').each(function() {
                      if (unctype1[i] == $(this).val()) {
                          $(this).prop('checked', true);
                      }
                  });
              }, 500);
          }
      }
      this.val = 10;
    }if (val == 11) {
      if (this.dataForm1.value.autntype1 != null) {
        this.symptomtype = this.dataForm1.value.autntype1;
          var autntype1 = this.dataForm1.value.autntype1;
          for (let i in autntype1) {
              setTimeout(() => {
                  $( '#newpopup_conbox_wrapper_1' ).find('input[type="checkbox"]').each(function() {
                      if (autntype1[i] == $(this).val()) {
                          $(this).prop('checked', true);
                      }
                  });
              }, 500);
          }
      }
      this.val = 11;
    }if (val == 12) {
      if (this.dataForm1.value.moftype1 != null) {
        this.symptomtype = this.dataForm1.value.moftype1;
          var moftype1 = this.dataForm1.value.moftype1;
          for (let i in moftype1) {
              setTimeout(() => {
                  $( '#newpopup_conbox_wrapper_1' ).find('input[type="checkbox"]').each(function() {
                      if (moftype1[i] == $(this).val()) {
                          $(this).prop('checked', true);
                      }
                  });
              }, 500);
          }
      }
      this.val = 12;
    }if (val == 13) {
      if (this.dataForm1.value.momotype1 != null) {
        this.symptomtype = this.dataForm1.value.momotype1;
          var momotype1 = this.dataForm1.value.momotype1;
          for (let i in momotype1) {
              setTimeout(() => {
                  $( '#newpopup_conbox_wrapper_1' ).find('input[type="checkbox"]').each(function() {
                      if (motype1[i] == $(this).val()) {
                          $(this).prop('checked', true);
                      }
                  });
              }, 500);
          }
      }
      this.val = 13;
    }
    if (val == 14) {
      if (this.dataForm1.value.daftype1 != null) {
        this.symptomtype = this.dataForm1.value.daftype1;
          var daftype1 = this.dataForm1.value.daftype1;
          for (let i in daftype1) {
              setTimeout(() => {
                  $( '#newpopup_conbox_wrapper_1' ).find('input[type="checkbox"]').each(function() {
                      if (daftype1[i] == $(this).val()) {
                          $(this).prop('checked', true);
                      }
                  });
              }, 500);
          }
      }
      this.val = 14;
    }
    if (val == 15) {
      if (this.dataForm1.value.damtype1 != null) {
        this.symptomtype = this.dataForm1.value.damtype1;
          var damtype1 = this.dataForm1.value.damtype1;
          for (let i in damtype1) {
              setTimeout(() => {
                  $( '#newpopup_conbox_wrapper_1' ).find('input[type="checkbox"]').each(function() {
                      if (damtype1[i] == $(this).val()) {
                          $(this).prop('checked', true);
                      }
                  });
              }, 500);
          }
      }
      this.val = 15;
    }
    if (val == 16) {
      if (this.dataForm1.value.oth1type1 != null) {
        this.symptomtype = this.dataForm1.value.oth1type1;
          var oth1type1 = this.dataForm1.value.oth1type1;
          for (let i in oth1type1) {
              setTimeout(() => {
                  $( '#newpopup_conbox_wrapper_1' ).find('input[type="checkbox"]').each(function() {
                      if (oth1type1[i] == $(this).val()) {
                          $(this).prop('checked', true);
                      }
                  });
              }, 500);
          }
      }
      this.val = 16;
    }
    if (val == 17) {
      if (this.dataForm1.value.oth2type1 != null) {
        this.symptomtype = this.dataForm1.value.oth2type1;
          var oth2type1 = this.dataForm1.value.oth2type1;
          for (let i in oth2type1) {
              setTimeout(() => {
                  $( '#newpopup_conbox_wrapper_1' ).find('input[type="checkbox"]').each(function() {
                      if (oth2type1[i] == $(this).val()) {
                          $(this).prop('checked', true);
                      }
                  });
              }, 500);
          }
      }
      this.val = 17;
    }if (val == 18) {
      if (this.dataForm1.value.oth3type1 != null) {
        this.symptomtype = this.dataForm1.value.oth3type1;
          var oth3type1 = this.dataForm1.value.oth3type1;
          for (let i in oth3type1) {
              setTimeout(() => {
                  $( '#newpopup_conbox_wrapper_1' ).find('input[type="checkbox"]').each(function() {
                      if (oth3type1[i] == $(this).val()) {
                          $(this).prop('checked', true);
                      }
                  });
              }, 500);
          }
      }
      this.val = 18;
    }
  }

  callimagesegment() {
    this.issegmentmodalshown = true;
  }
  saveimages() {
   // console.log('this.files00000000');
  //  console.log(this.files);
    this.dataForm1.patchValue({image: this.files[0].response});
    this.issegmentmodalshown = false;
 //   this.showimagediv = true;
  }
/*  deleteimage(imagename: any) {
    console.log(imagename);
    var link = this.serverurl + 'deleteimage';
    // var link ='http://influxiq.com:3001/deleteimage';
    var data = {id: '', image: imagename};
    this._http.post(link, data)
      .subscribe(res => {
        var result = res.json();
        if (result.status == 'success') {
          console.log('Image Deleted');
          this.uploadedfilesrc = '';
          this.progress = 0;
        }

      }, error => {
        console.log("Oooops!");
      });
  }*/
  onUploadOutput(output: UploadOutput): void {
  //  setTimeout(() => {
      // alert(8);
      if (output.type === 'allAddedToQueue') { // when all files added in queue
        // uncomment this if you want to auto upload files when added
        this.disableuploader = 1;
        console.log('this.disableuploader === before');
     //   console.log(this.disableuploader);
       // setTimeout(()=> {
          const event: UploadInput = {
            type: 'uploadAll',
            url: this.serverurl + 'uploads',
            method: 'POST',
            // data: {foo: output.file}
          };
          this.uploadInput.emit(event);

    //    }, 1200);
      } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') { // add file to array when added
       // setTimeout(()=> {    // <<<---    using ()=> syntax
         // console.log('output.file[0].response');
         // console.log(output.file.response);
         // console.log(output.file);
         // console.log(output.file);
          // this.files.push(output.file);
          if (output.file.response != "") {
            // alert(7);
          //  console.log('output.file-------------------');
          //  console.log(output.file);
           // console.log(output.file.response);
            // console.log(output.file[0].response);
            this.files = [];
            this.files.push(output.file);
          }
          this.disableuploader = 0;
        //  console.log('this.disableuploader after');
         // console.log(this.disableuploader);
          // alert(22);
          // console.log(this.files);
        //  console.log('this.files');
        //  console.log(this.files);
          // alert(55);
          //  console.log(output.file[0].response);
     //   }, 1300);
      } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
        // alert(9);
        console.log(this.files);
        // update current data in files array for uploading file
        const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
        this.files[index] = output.file;
      } else if (output.type === 'removed') {
        // remove file from array when removed
        this.files = this.files.filter((file: UploadFile) => file !== output.file);
      } else if (output.type === 'dragOver') {
        this.dragOver = true;
      } else if (output.type === 'dragOut') {
        this.dragOver = false;
      } else if (output.type === 'drop') {
        this.dragOver = false;
      }
   // }, 1200);
    console.log('files??');
    console.log(this.files);
  }

  openpgxmedicationmodal() {
    this.pgxmedicationmodal = true;
  }
  startUpload(): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: 'https://ngx-uploader.com/upload',
      method: 'POST',
      data: { foo: 'bar' }
    };

    this.uploadInput.emit(event);
  }
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
    showinproperform(val) {
    if(val != '' ){
   // console.log('line 6693-------- '+val);
  //  this.selected_value = val;
    var returnarr = [];
    var k;
    for (let i in val) {
      k = val[i].replace(/\d+/g, '');
     k = k.replace('_', '');
        returnarr.push(k);
    }
    }
    return returnarr;
      //  return val;
    }
    addpatientvalidationcall() {
    console.log('call addpatientvalidationcall????????????????????????????????????????');
        this.addpatientvalidation = 0;
    }
    showsingleinsurancediv() {
    console.log('call .....................');
        this.showflagforinsuranceinformation++;
        $('.insuranceinformation' + this.showflagforinsuranceinformation).removeClass('hide');
        console.log(this.showflagforinsuranceinformation);
    }
    gotoppsform() {
        this.opensymptommodalflag = false;
        //  this.pateintquestioniremodal = true;
        this.openquesmodal(1);

    }
    submitmedication() {
    this.pgxmedicationmodal = false;
    }
  dosubmit3(formval) {
    if (formval.lithium == true) {
      var lithium = 1;
    } else {
      var lithium = 0;
    }
    if (formval.abilify == true) {
      var abilify = 1;
    } else {
      var abilify = 0;
    }
    if (formval.seroquel == true) {
      var seroquel = 1;
    } else {
      var seroquel = 0;
    }
    if (formval.clonazepam == true) {
      var clonazepam = 1;
    } else {
      var clonazepam = 0;
    }
    if (formval.latuda == true) {
      var latuda = 1;
    } else {
      var latuda = 0;
    }
    if (formval.valium == true) {
      var valium = 1;
    } else {
      var valium = 0;
    }
    if (formval.ativan == true) {
      var ativan = 1;
    } else {
      var ativan = 0;
    }
    if (formval.zyprexa == true) {
      var zyprexa = 1;
    } else {
      var zyprexa = 0;
    }
    if (formval.xanax == true) {
      var xanax = 1;
    } else {
      var xanax = 0;
    }
    if (formval.zoloft == true) {
      var zoloft = 1;
    } else {
      var zoloft = 0;
    }
    if (formval.celexa == true) {
      var celexa = 1;
    } else {
      var celexa = 0;
    }
    if (formval.paxil == true) {
      var paxil = 1;
    } else {
      var paxil = 0;
    }
    if (formval.cymbalta == true) {
      var cymbalta = 1;
    } else {
      var cymbalta = 0;
    }
    if (formval.klonopin == true) {
      var klonopin = 1;
    } else {
      var klonopin = 0;
    }
    if (formval.waellbutrin == true) {
      var waellbutrin = 1;
    } else {
      var waellbutrin = 0;
    }
    if (formval.prozac == true) {
      var prozac = 1;
    } else {
      var prozac = 0;
    }
    if (formval.lexapro == true) {
      var lexapro = 1;
    } else {
      var lexapro = 0;
    }

    if (formval.amitriptyline == true) {
      var amitriptyline = 1;
    } else {
      var amitriptyline = 0;
    }
    if (formval.viibryd == true) {
      var viibryd = 1;
    } else {
      var viibryd = 0;
    }
    if (formval.trazodone == true) {
      var trazodone = 1;
    } else {
      var trazodone = 0;
    }
    if (formval.nitros == true) {
      var nitros = 1;
    } else {
      var nitros = 0;
    }
    if (formval.heartattack == true) {
      var heartattack = 1;
    } else {
      var heartattack = 0;
    }
    if (formval.lipitor == true) {
      var lipitor= 1;
    } else {
      var lipitor = 0;
    }
    if (formval.crestor == true) {
      var crestor = 1;
    } else {
      var crestor = 0;
    }
    if (formval.zocor == true) {
      var zocor = 1;
    } else {
      var zocor = 0;
    }
    if (formval.mevacor == true) {
      var mevacor = 1;
    } else {
      var mevacor = 0;
    }
    if (formval.skinrash == true) {
      var skinrash = 1;
    } else {
      var skinrash = 0;
    }
    if (formval.prilosec == true) {
      var prilosec = 1;
    } else {
      var prilosec = 0;
    }
    if (formval.zantac == true) {
      var zantac = 1;
    } else {
      var zantac = 0;
    }
    if (formval.nexium == true) {
      var nexium = 1;
    } else {
      var nexium = 0;
    }
    if (formval.neurontin == true) {
      var neurontin = 1;
    } else {
      var neurontin = 0;
    }
    if (formval.triamcinolone == true) {
      var triamcinolone = 1;
    } else {
      var triamcinolone = 0;
    }
    if (formval.clobex == true) {
      var clobex = 1;
    } else {
      var clobex = 0;
    }
    if (formval.fluocinonide == true) {
      var fluocinonide = 1;
    } else {
      var fluocinonide = 0;
    }
    if (formval.betamethasone == true) {
      var betamethasone = 1;
    } else {
      var betamethasone = 0;
    }

    if (this.issubmitpgxform == true) {    // only for submit , validating the fields
      console.log('submit pgxform');
      let x: any;
      for (x in this.dataForm3.controls) {
        this.dataForm3.controls[x].markAsTouched();
      }
      let link = this.serverurl + 'medicationpgx';
      var data = {
        patientid: this.id,
        note: this.addnote,
        added_by: this.cookiedetails,
        lithium: lithium,
        abilify: abilify,
        seroquel: seroquel,
        clonazepam: clonazepam,
        latuda: latuda,
        valium: valium,
        ativan: ativan,
        zyprexa: zyprexa,
        xanax: xanax,
        zoloft: zoloft,
        celexa: celexa,
        paxil: paxil,
        cymbalta: cymbalta,
        klonopin: klonopin,
        waellbutrin: waellbutrin,
        prozac: prozac,
        lexapro: lexapro,
        amitriptyline: amitriptyline,
        viibryd: viibryd,
        trazodone: trazodone,
        nitros: nitros,
        heartattack: heartattack,
        lipitor: lipitor,
        crestor: crestor,
        zocor: zocor,
        mevacor: mevacor,
        skinrash: skinrash,
        prilosec: prilosec,
        zantac: zantac,
        nexium: nexium,
        neurontin: neurontin,
        triamcinolone: triamcinolone,
        clobex: clobex,
        fluocinonide: fluocinonide,
        betamethasone: betamethasone,
        iscompleted: 1
      };
      if (this.dataForm3.valid) {
        this._http.post(link, data)
          .subscribe(res => {
            let result = res.json();
            if (result.status == 'success') {
              this.pgxmedicationmodal = false;
              this.addnote = null;
              this.divaddnote = false;
              this.getnotes();
              setTimeout(() => {
                this.getpatientrecord();
                this.symptomdetailsbypatientid();
                console.log('call--6');
                this.pgxdetailsbypatientid();
              }, 2000);
            }
          }, error => {
            console.log('Oooops!');
          });
      }
    }
    else {
      console.log('save pgx');
      let link = this.serverurl + 'medicationpgx';
      var data = {
        patientid: this.id,
        note: this.addnote,
        added_by: this.cookiedetails,
        lithium: lithium,
        abilify: abilify,
        seroquel: seroquel,
        clonazepam: clonazepam,
        latuda: latuda,
        valium: valium,
        ativan: ativan,
        zyprexa: zyprexa,
        xanax: xanax,
        zoloft: zoloft,
        celexa: celexa,
        paxil: paxil,
        cymbalta: cymbalta,
        klonopin: klonopin,
        waellbutrin: waellbutrin,
        prozac: prozac,
        lexapro: lexapro,
        amitriptyline: amitriptyline,
        viibryd: viibryd,
        trazodone: trazodone,
        nitros: nitros,
        heartattack: heartattack,
        lipitor: lipitor,
        crestor: crestor,
        zocor: zocor,
        mevacor: mevacor,
        skinrash: skinrash,
        prilosec: prilosec,
        zantac: zantac,
        nexium: nexium,
        neurontin: neurontin,
        triamcinolone: triamcinolone,
        clobex: clobex,
        fluocinonide: fluocinonide,
        betamethasone: betamethasone,
        iscompleted: 0
      };
      this._http.post(link, data)
        .subscribe(res => {
          let result = res.json();
          if (result.status == 'success') {
            this.addnote = null;
            this.divaddnote = false;
            this.getnotes();
            this.pgxmedicationmodal = false;
            this.getpatientrecord();
            this.symptomdetailsbypatientid();
            console.log('call--7');
            this.pgxdetailsbypatientid();
          }
        }, error => {
          console.log('Oooops!');
        });
    }
  }

  pgxdetailsbypatientid() {
    console.log('fetch pgx values----------------------------------');
    let link = this.serverurl + 'getpgxbypatientid';
    let data = {patientid : this.id};
    this._http.post(link, data)
      .subscribe(res => {
        let result = res.json();
        if (result.status == 'success' && typeof(result.id) != 'undefined') {
          let userdet = result.id;
          //   this.iscompletedpgxrecord = result.id.iscompleted;
          this.iscompletedpgxrecord = result.id.iscompleted;
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
         // this.getpgxiscompletedornot();
        } else {
        }
      }, error => {
        console.log('Ooops');
      });
  }

  getpgxiscompletedornot() {
    let link = this.serverurl + 'getpgxbypatientid';
    let data = {patientid : this.id};
    this._http.post(link, data)
      .subscribe(res => {
        let result = res.json();
        if (result.status == 'success' && typeof(result.id) != 'undefined') {
          console.log('iscompletedpgxrecord');
          console.log(result.id);
          let userdet = result.id;
          this.iscompletedpgxrecord = result.id.iscompleted;
        } else {
        }
      }, error => {
        console.log('Ooops');
      });
  }
  openpgxmodalreadonly() {
    this.pgxdetailsbypatientid();
    this.pgxmedicationmodal = true;
    setTimeout(() => {
      $('#formpgx').find('input[type="submit"]').hide();
      $('#formpgx').find('input[type="button"]').hide();
      $( '#formpgx' ).find('input').each(function() {
        console.log('disable 9');
        $(this).attr( 'disabled', 'disabled' );
      });

      $( '#formpgx' ).find('textarea').each(function() {
        console.log('disable 10');
        $(this).attr( 'disabled', 'disabled' );
      });
      $( '#formpgx' ).find('checkbox').each(function() {
        console.log('disable 11');
        $(this).attr( 'disabled', 'disabled' );
      });
    }, 500);
  }

  goto_opt_in_path(){

  }
}



