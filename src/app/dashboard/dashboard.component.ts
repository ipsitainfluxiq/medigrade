import { Component, OnInit } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    private addcookie: CookieService;
    private cookiedetails;
    constructor( addcookie: CookieService, private router: Router) {
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.get('cookiedetails');
        /*   console.log(this.cookiedetails);
        if (this.cookiedetails == null) {
            this.router.navigate(['/']);
        }
        else if (this.cookiedetails != null) {
            if (this.cookiedetails.type == 'salesrep') {

            }
            this.router.navigate(['/']);
        }*/
    }

    ngOnInit() {
    }
    calllogout() {
        this.addcookie.deleteAll();
        this.router.navigate(['/log-in']);
    }
}
