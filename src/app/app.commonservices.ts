import {Injectable} from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
@Injectable()
export class Commonservices {
  url: any;
  urlis: any;
    phpurl: any;
    directnodeurl: any;
  hostis: any;
  commonvalue: any;
  value = 2;
  public commonresultlimit: number;
    public totalval: number=0;
  public env:any='';
  constructor(private http: HttpClient) {
    this.env='live';
    if(this.env=='live'){
      this.url = 'http://18.191.201.143/php/server.php?q=';
      this.phpurl = 'http://18.191.201.143/php/';
      this.directnodeurl = 'http://18.191.201.143:2998/';
      this.urlis = 'http://medigradehealth.com/#/';
    }
    if(this.env=='dev'){
      this.url = 'http://18.191.201.143/php/server_dev.php?q=';
      this.phpurl = 'http://18.191.201.143/php/';
      this.directnodeurl = 'http://18.191.201.143:2997/';
      this.urlis = 'http://development.medigradehealth.com/#/';
    }
    if(this.env=='old'){
      this.url = 'http://18.191.201.143/php/server_old.php?q=';
      this.phpurl = 'http://18.191.201.143/php/';
      this.directnodeurl = 'http://18.191.201.143:2996/';
      this.urlis = 'http://oldversion.medigradehealth.com/#/';
    }
    this.hostis = window.location.host;
    console.log(this.hostis);
   //   this.url = 'https://medigradehealth.com/server.php?q=';
    //  this.phpurl = 'https://medigradehealth.com/';
      this.commonresultlimit = 100000000000000;
      this.totalval=0;
    if (this.value == 1) {
      this.commonvalue = {
        mailfrom: 'ALtus Health Group',
        mailid: 'support@altushealthgroup.com',
        indextitle: 'altushealth',
        title: 'Altus Health',
        title1: 'Altushealth',
        commonurl: 'altushealthgroup.com',
        name: 'ALTUS HEALTH GROUP',
        webpagelink: 'www.altushealthgroup.com',
        adminemail: 'altushealth.com',
        trainingstepvariable: 'Altus',
        CGXInformation2018: 'AltusCGXInformation2018',
        CGXCallScript: 'AltusCGXCallScript',
        TestProcess2018: 'AltusTestProcess2018',
        FLyer: 'Altus_FLyer',
        address1: '610 West Congress Street',
        address2: 'Detroit, Michigan 48226',
        name1: 'ALTUS HEALTH CARE',
        shortform: 'AHG',
        name2: 'Altus',
      };
    }/*
    if (this.value == 2) {
      this.commonvalue = {
        mailfrom: 'Greenvalley Portal',
        mailid: 'support@medigradehealth.com',
        indextitle: 'greenvalley',
        title: 'Green Valley',
        title1: 'Greenvalley',
        commonurl: 'medigradehealth.com',
        name: 'GREENVALLEY PORTAL',
        webpagelink: 'www.medigradehealth.com',
        adminemail: 'greenvalleyhealthgroup.com',
        trainingstepvariable: 'Greenvalley',
        CGXInformation2018: 'GreenvalleyCGXInformation2018',
        CGXCallScript: 'GreenValleyCGXCallScript',
        TestProcess2018: 'GreenvalleyTestProcess2018',
        dailer: 'Agent_manual_2.7 version 080718',
        advocate: 'Patient_Advocate_Flow_Chart',
        FLyer: 'GreenValley_Flyer',
        sop001: 'SOP_001_CRM_Training_Test_PPS_Data_Entry',
        sop002: 'SOP_002_HELP_DESK_INTERNAL_PA_SUPPORT_Line',
        Troubleshooting: 'Greenvalley_Headset_troubleshooting',
       // address1: '722 Weiland Rd Rochester',
        address1: '722 Weiland Road Rochester',
        address2: 'NY 14626',
        name1: 'Greenvalley Health',
        shortform: 'GVH',
          name2: 'Greenvalley',
      };
    }*/
    if (this.value == 2) {
      this.commonvalue = {
        mailfrom: 'Medigrade Health',
        mailid: 'support@medigradehealth.com',
        indextitle: 'medigradehealth',
        title: 'Medigrade Health',
        title1: 'Medigrade Health',
        commonurl: 'medigradehealth.com',
        commonurl1: '18.191.201.143/php',
        name: 'MEDIGRADE HEALTH',
        webpagelink: 'www.medigradehealth.com',
        adminemail: 'medigradehealthgroup.com',
        trainingstepvariable: 'Medigrade',
        CGXInformation2018: 'MedigradeCGXInformation2018',
        CGXCallScript: 'MedigradeCGXCallScript',
        TestProcess2018: 'MedigradeTestProcess2018',
        dailer: 'Agent_manual_2.7 version 080718',
        advocate: 'Patient_Advocate_Flow_Chart',
        FLyer: 'Medigrade_Flyer',
        sop001: 'SOP_001_CRM_Training_Test_PPS_Data_Entry',
        sop002: 'SOP_002_HELP_DESK_INTERNAL_PA_SUPPORT_Line',
        Troubleshooting: 'Medigrade_Headset_troubleshooting',
        // address1: '722 Weiland Rd Rochester',
        address1: '1845 San Marco Rd #301, Marco Island, FL 34145, USA',
        address2: 'NY 14626',
        name1: 'Medigrade Health',
        shortform: 'MDH',
        name2: 'Medigrade',
      };
    }
  }
}
