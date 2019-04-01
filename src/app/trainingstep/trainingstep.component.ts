import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import {Commonservices} from '../app.commonservices';
declare var $: any;

@Component({
    selector: 'app-trainingstep',
    templateUrl: './trainingstep.component.html',
    styleUrls: ['./trainingstep.component.css'],
    providers: [Commonservices],
})
export class TrainingstepComponent implements OnInit {
    public vindex: any = 0;
    private addcookie: CookieService;
    private cookiedetails;
    public serverurl;
    public trainingvideolist : any;
    public webinar : any;
    public gonextmodal: boolean = false;

    constructor(addcookie: CookieService, private _http: Http, private router: Router, public _commonservices: Commonservices) {
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.get('cookiedetails');
      //  console.log('trainingstep get cookie');
      //  console.log(this.cookiedetails);
        this.serverurl = _commonservices.url;
      if (this.cookiedetails == null || this.cookiedetails <5) {
        this.router.navigate(['/log-in']);
      } else {
            this.callit();
            this.getuserdetails();
        }
    }

    ngOnInit() {

    }
    callit() {
        let link = this.serverurl + 'gettrainingvideostatusindex';
        let data = {
            userid: this.cookiedetails,
        };
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
             //   console.log(result);
                this.trainingvideolist = parseInt(result.status.timeindex);
                console.log(this.trainingvideolist);
                // console.log(this.trainingvideolist.status.timeindex);
            }, error => {
                console.log('Oooops!');
            });
    }
    getuserdetails() {
        let link = this.serverurl + 'getuserdetails';
        let data = {
            userid: this.cookiedetails,
        };
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                this.webinar = result.id.iswebinarchekced;
            }, error => {
                console.log('Oooops!');
            });
    }

    ngAfterViewChecked() {

        setTimeout(() => {
            var curval=this.trainingvideolist;
          //  console.log('curvval '+ this.trainingvideolist );
           // console.log('curvval '+ curval );
            let vindex=this.vindex;
            /* console.log("$('#tspan').text()");
        console.log($('#tspan').text());
        console.log($('#tspan').html());*/
            console.log(document.getElementById('video1'));
            document.getElementById('video1').addEventListener('loadedmetadata', function() {

              //  console.log('vindex');
              //  console.log(vindex);
                if(vindex==1) $('video').get(0).currentTime = curval;
                else $('video').get(0).pause();
            }, true);

            vindex++;
            var aud = document.getElementById('video1');
            aud.onended = function(e) {
                console.log('The audio has ended');
                setTimeout(()=> {
                    $('video').get(0).pause();
                    // $('video').get(1).pause();
                    $('video').get(0).load();
                    $('video').get(0).pause();
                    // aud.currentTime=58;
                    $('video').get(0).pause();
                    $('video').find('source').attr('src', '');
                    //  this.gonextmodal = true;
                    $('#modalcall').click();
                  //  console.log('aud');
                  //  console.log(aud);
                }, 1000);
            };
            $('video').get(0).play();
        }, 1000);
    }

    calllogout() {
        var aud = document.getElementById("video1");
        // console.log(aud.currentTime);
        let link = this.serverurl + 'trainingvideostatus';
        let data = {
            userid: this.cookiedetails,
            timeindex: $('video').get(0).currentTime,
        };
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                    this.addcookie.deleteAll();
                    this.router.navigate(['/log-in']);
                }
            }, error => {
                console.log('Oooops!');
            });
    }
    onHidden() {
        this.gonextmodal = false;
    }

    callreplay() {
        let link = this.serverurl + 'trainingvideostatusforreplay';
        let data = {
            userid: this.cookiedetails,
            timeindex: 'c',
        };
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                    location.reload();
                }
            }, error => {
                console.log('Oooops!');
            });
    }
    demomodal() {
        this.gonextmodal = true;
    }
    calldashboard(val) {
      var link;
      var data;
      if (val == 1) {
         link = this.serverurl + 'dashboardtrainingvideostatus';
         data = {
            userid: this.cookiedetails,
            timeindex: 'c',
        };
      }
      if (val == 2) { // skip
         link = this.serverurl + 'skipstep';
         data = {
          userid: this.cookiedetails
        };
      }
        this._http.post(link, data)
            .subscribe(res => {
                let result = res.json();
                if (result.status == 'success') {
                }
            }, error => {
                console.log('Oooops!');
            });
        if (this.cookiedetails.type == 'salesrep') {
            if (this.webinar == 0) {
                this.router.navigate(['/completewebinar']);
            }
            else {
                this.router.navigate(['/rep-dashboard']);
            }
        }
        else if (this.cookiedetails.type == 'corporate' || 'leadmanager' || 'masteraccount') {
            // this.router.navigate(['/rep-dashboard']);
            if (this.webinar == 0) {
                this.router.navigate(['/completewebinar']);
            }
            else {
                this.router.navigate(['/rep-dashboard']);
            }
        }
        else if (this.cookiedetails.type == 'recruiter') {
            //  this.router.navigate(['/recruiterdashboard']);
            if (this.webinar == 0) {
                this.router.navigate(['/completewebinar']);
            }
            else {
                this.router.navigate(['/rep-dashboard']);
            }
        }
        else { // superadmin
            this.router.navigate(['/rep-dashboard']);
        }
    }
}
