import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'ngx-cookie-service';
import {Validators} from '@angular/forms';
declare var moment: any;
declare var $: any;

@Component({
  selector: 'app-usermanagementlist',
  templateUrl: './usermanagementlist.component.html',
  styleUrls: ['./usermanagementlist.component.css'],
    providers: [Commonservices],
})
export class UsermanagementlistComponent implements OnInit {
    public serverurl;
    public datalist;
    public tags;
    public flag: any;
    public loadervalue:boolean = false;
    public filterval;
    public filterval1;
    public filterval2;
    public groupid: any;
    public childusername: any;
    public userdetailsofchild: any;
 //   public getdetailsbyidis: any;
    public searchval: any = {addedby: ''};
    public p: number = 1;
    public itemsPerPage: number = 15;
    public addcookie: CookieService;
    public cookiedetails;
    public hierarchyaddcookie: CookieService;
    public hierarchycookiedetails;
    public usertype;
    public username;
    public showloader: any = 0;
    public enrollervals: any;
    public enrollervalstotal: any;
    public chkvalarr: Array<any>=[] ;
    public hierarchyarr: any = [];
    public chk: Array<any>=[];
    public selarr: any = [];
    public searchtagflag: any = 0;
    public check_uncheck: any = 0;

    constructor(private _http: Http, private router: Router, private _commonservices: Commonservices,  private route: ActivatedRoute, addcookie: CookieService, hierarchyaddcookie: CookieService) {
        this.serverurl = _commonservices.url;
     //   this.getUserList();
        this.alltags();
        this.filterval2 = '';
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.get('cookiedetails');
        this.usertype = this.addcookie.get('type');
        this.username = this.addcookie.get('username');
        this.hierarchyaddcookie = hierarchyaddcookie ;
        this.hierarchycookiedetails = this.hierarchyaddcookie.get('hierarchycookiedetails');
        if (this.hierarchycookiedetails == null) {
            console.log('blank cookie');
        }
    }
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.groupid = params['groupid'];
            this.childusername = params['childusername'];
            console.log(this.groupid);
            if (this.childusername == null) {
                this.hierarchyaddcookie.set('hierarchycookiedetails', null);
            }
            // all user list
            if (this.groupid == null && (this.usertype == 'superadmin' || this.usertype == 'webdevelopers')) {
                console.log('hi');
              this.getUserListunderthisusername('');
            }
            // userlist under this user
            else if (this.groupid == null && this.usertype != 'superadmin') {
                this.getUserListunderthisusername(this.username);
            }
            // userlist under this groupid (coming from admin mastergrouplist)
            else if (this.groupid != null && this.childusername == null) {
                console.log('hi');
                // this.getUserListunderthisusername(this.childusername);
                this.get_userlist_under_Groupid();
            }
            // userlist under this username (coming from view list under this user list
            else if (this.groupid != null && this.childusername != null) {
                console.log('h---i');
              this.getUserListunderthisusername(this.childusername);
                // this.getuserdetailsbyusername();
            /*    if (this.hierarchycookiedetails == null) {
                    console.log('this.childusername is : ' + this.childusername);
                    this.getUserListunderthisusername(this.childusername);
                    setTimeout(() => {
                        console.log("this.userdetailsofchild "+this.userdetailsofchild);
                            let childusername = this.childusername;
                            //  let arr = { "": 'you', childusername : 'hi'  }; // username ... firstname + lastname
                            let arr = { "": 'you', childusername : this.userdetailsofchild.firstname + ' ' +  this.userdetailsofchild.lastname}; // username ... firstname + lastname
                            console.log('arr1: ');
                            console.log(arr);
                            this.hierarchyaddcookie.putObject('hierarchycookiedetails', arr);
                    }, 1000);
                }
                else {

                }*/
            }
            else {

            }
        });
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
      let totalc=this.datalist.length;
      if (this.check_uncheck == true) {
        $('.chkinput').prop('checked',true);
        this.chk = [];
        this.selarr = [];
        for (let i = startpoint; i <= endpoint; i++) {
          //if(i>=startpoint && i<=endpoint) {
            this.chk[i] = true;
            this.searchtagflag++;
            this.selarr.push(this.datalist[i]._id);
          //}
         // else this.chk[i] = false;
         // this.chkvals(this.datalist[i], i);
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
    //  console.log('=====this.chk====');
    //  console.log(this.chk);
      //  console.log(this['chk'+itemval._id]);
      if (this.chk[ival] == true) {
        this.searchtagflag++;
        this.selarr.push(itemval._id);
      }
      else {
        let indexval: any = this.selarr.indexOf(itemval._id);
        console.log(indexval);
        this.selarr.splice(indexval, 1);
        this.searchtagflag --;
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
      page : 'userlist',
    }
    this._http.post(link, data)
      .subscribe(res => {
        let result = res.json();
        console.log(result);
        if (result.status == 'success') {
          this.getUserListunderthisusername('');
          this.getUserListunderthisusernamewithoutlimit('');
          $('.chkinput').prop('checked',false);
          this.selarr=[];
          this.chk=[];
          this.searchtagflag=0;
        }
      }, error => {
        console.log('Oooops!');
      });
  }

    getUserList() {
        this.loadervalue = true;
        let link = this.serverurl + 'usernrepcontractList';
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                    console.log('usernrepcontractList');
                    console.log(result);
                    this.loadervalue = false;
                    this.datalist = result.id;
                    // this.enrollervalstotal = result.id;
                    this.flag = 1;
                   /* this.specificlist = [];
                    this.specificlist1 = [];
                    this.specificlist2 = [];
                    this.specificlist = this.datalist;*/
                }

            }, error => {
                console.log('Oooops!');
            });
    }

    getUserListunderthisusername(username) {
        this.loadervalue = true;
        let link = this.serverurl + 'getUserListunderthisusername';
        let data = {username : username,limitval:100};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                  this.showloader=1;
                    console.log('UserListunderthisusername');
                    console.log(result);
                    this.loadervalue = false;
                    this.datalist = result.id;
                    this.enrollervalstotal = result.id;
                    this.flag = 2;
                   /* this.specificlist = [];
                    this.specificlist1 = [];
                    this.specificlist2 = [];
                    this.specificlist = this.datalist;*/
                 //  this.getUserListunderthisusernamewithoutlimit(username);
                }

            }, error => {
                console.log('Oooops!');
            });
    }
    getUserListunderthisusernamewithoutlimit(username) {
        this.loadervalue = true;
        let link = this.serverurl + 'getUserListunderthisusername';
        let data = {username : username,limitval:this._commonservices.commonresultlimit};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                  this.showloader=1;
                    console.log('UserListunderthisusername');
                    console.log(result);
                    this.loadervalue = false;
                    this.datalist = result.id;
                    this.enrollervalstotal = result.id;
                    this.flag = 2;
                   /* this.specificlist = [];
                    this.specificlist1 = [];
                    this.specificlist2 = [];
                    this.specificlist = this.datalist;*/
                }

            }, error => {
                console.log('Oooops!');
            });
    }

    get_userlist_under_Groupid() {
        this.loadervalue = true;
        let link = this.serverurl + 'get_userlist_under_this_Groupid';
        let data = {
            groupid: this.groupid
        };
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
              if (result.status == 'success') {
                console.log('get_userlist_under_this_Groupid');
                console.log(result);
                this.showloader=1;
                this.loadervalue = false;
                this.datalist = result.id;
                this.enrollervalstotal = result.id;
                this.flag = 3;
                /* this.specificlist1 = [];
                    this.specificlist = [];
                    this.specificlist2 = [];
                    this.specificlist1 = this.datalist;*/
              }

            }, error => {
                console.log('Oooops!');
            });
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
    showtagname(tagid) {
        for (let i in this.tags) {
            if (this.tags[i]._id == tagid) {
                return this.tags[i].tagname;
            }
        }
    }

    markasdone(itemid) {
        let link = this.serverurl + 'markasdone';
        let data = {
            userid: itemid,
            iswebinarchekced : 1,
        };
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                console.log(result);
                if (result.status == 'success') {
                    //this.getUserList();
                  this.getUserListunderthisusername('');
                }
            }, error => {
                console.log('Oooops!');
            });
    }
    searchbyval() {
        this.filterval = '';
        if (this.filterval1 != '' && this.filterval1 != null) {
            this.filterval = this.filterval1 + '|';
        }
        if (this.filterval2 != '' && this.filterval2 != null) {
            this.filterval += this.filterval2;
        }
    }
    autocompleListFormatter = (data: any) => {
        return data.addedby;
    }
    valueChanged(data: any): string {
        console.log(data);
        console.log('hi');
        return data;
    }
 /*   getdetailsbyid() {
        let link = this.serverurl + 'getuserdetailswithtags';
        let data = {userid : this.id};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                //   console.log(result);
                if (result.status == 'success' && typeof(result.id) != 'undefined') {
                    console.log('-----------------------------');
                    console.log(result.id);
                    this.getdetailsbyidis = result.id;
                } else {
                }
            }, error => {
                console.log('Ooops');
            });
    }*/
    gotoagreementpdf(id) {
        var url = 'http://' + this._commonservices.commonvalue.commonurl1 + '/testpdf/html2pdf/employment-agreement.php?id=' + id;
        window.open(url, '_blank');
    }
    showtime(logintime) {
       return moment(logintime).format('MM-DD-YYYY HH:mm');
    }
    showgreenno(Patientdetail) {
        var j = 0;
        for (let i in Patientdetail) {
            if (Patientdetail[i].hit_map_value == 'GREEN' || Patientdetail[i].hit_map_value == 'Green') {
                j++;
            }
        }
        return j;
    }
  showppscount(Patientdetail) {
        var j = 0;
        for (let i in Patientdetail) {
            if (Patientdetail[i].hit_map_value!=null) {
              if(Patientdetail[i].hit_map_value.length>0)
                j++;
            }
        }
        return j;
    }
    showlist() {

    }

    getuserdetailsbyusername() {
        let link = this.serverurl + 'getuserdetailsbyuserid';
        let data = {
            username: this.childusername,
        };
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                console.log(result);
                if (result.status == 'success') {
                  this.showloader=1;
                    this.userdetailsofchild = result.id;
                    //this.datalist = result.id;

                 /*   console.log('this.userdetailsofchild :');
                    console.log(this.userdetailsofchild);*/
                    /*if (this.userdetailsofchild != null) {
                        //  let arr = { "": 'you', childusername : 'hi'  }; // username ... firstname + lastname
                        let arr = { "": 'you', childusername : this.userdetailsofchild.firstname + ' ' +  this.userdetailsofchild.lastname}; // username ... firstname + lastname
                        console.log('arr');
                        console.log(arr);
                        this.hierarchyaddcookie.putObject('hierarchycookiedetails', arr);
                    }*/
                }
            }, error => {
                console.log('Oooops!');
            });
    }


  deleteuser(val) {
    console.log('deleteuser');
    let link = this.serverurl + 'deleteuser';
    let data = {_id: val};
    this._http.post(link, data)
      .subscribe(res => {
        let result = res;
        console.log(result);
        console.log('Data Deleted');
        if (this.groupid == null && (this.usertype == 'superadmin' || this.usertype == 'webdevelopers')) {
          console.log('hi');
          this.getUserListunderthisusername('');
        }
        // userlist under this groupid (coming from admin mastergrouplist)
        else if (this.groupid != null && this.childusername == null) {
          console.log('hi');
          this.get_userlist_under_Groupid();
        }
        // userlist under this user
        else if (this.groupid == null && this.usertype != 'superadmin') {
          this.getUserListunderthisusername(this.username);
        }
        // userlist under this username (coming from view list under this user list
        else if (this.groupid != null && this.childusername != null) {
          console.log('h---i');
          this.getUserListunderthisusername(this.childusername);
        }
      }, error => {
        console.log('Oooops!');
      });
  }
  makeittestuser(val) {
    let link = this.serverurl + 'makeittestuser';
    let data = {
      userid: val,
      istestuser : 1,
    };
    this._http.post(link, data)
      .subscribe(res => {
        let result = res.json();
        console.log(result);
        if (result.status == 'success') {
          this.getUserListunderthisusername('');
        }
      }, error => {
        console.log('Oooops!');
      });
  }
}
