import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public addcookie: CookieService;
  public cookiedetails: any;
  // public router: any;

    constructor(addcookie: CookieService, public router: Router) {
      // this.usertype = this.addcookie.get('type');
      
      
     /* this.cookiedetails = this.addcookie.get('cookiedetails');
      console.log('from frontheader');
      console.log(this.cookiedetails);
      if (this.cookiedetails == null || this.cookiedetails.length<5) {
        this.router.navigate(['/log-in']);
      }*/
    }

    ngOnInit() {
    }

}
