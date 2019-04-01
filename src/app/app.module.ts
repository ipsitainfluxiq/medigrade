import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Subscription} from 'rxjs/Subscription';
import {appRoutingProviders, routing} from './routes';
import { AppComponent } from './app.component';
import { CKEditorModule } from 'ngx-ckeditor';
import { LoginComponent } from './login/login.component';
import { RecruiterdashboardComponent } from './recruiterdashboard/recruiterdashboard.component';
import { AutologinComponent } from './autologin/autologin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SalesrepdashboardComponent } from './salesrepdashboard/salesrepdashboard.component';
import { RepsignupComponent } from './repsignup/repsignup.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RecruitersignupComponent } from './recruitersignup/recruitersignup.component';
import { RepcontractComponent } from './repcontract/repcontract.component';
import { TrainingstepComponent } from './trainingstep/trainingstep.component';
import { FrontfooterComponent } from './frontfooter/frontfooter.component';
import { FrontheaderComponent } from './frontheader/frontheader.component';
import { PateintdetailComponent } from './pateintdetail/pateintdetail.component';
import { PateintsComponent } from './pateints/pateints.component';
import { PateintquestionireComponent } from './pateintquestionire/pateintquestionire.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AccordionModule } from 'ngx-bootstrap/accordion';
/*import { CookieService } from 'angular2-cookie/services/cookies.service';*/
import { NgSelectModule } from '@ng-select/ng-select';
import { CookieService } from 'ngx-cookie-service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UsersearchPipe } from './search.pipe';
import { UsersearchPipe1 } from './searchbyfield.pipe';
import { Newsearchpipe } from './newsearchpipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { CompensationmodifierComponent } from './compensationmodifier/compensationmodifier.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { PatientrecordComponent } from './patientrecord/patientrecord.component';
import { UserrecruiterdetailComponent } from './userrecruiterdetail/userrecruiterdetail.component';
import { UserrecruitereditComponent } from './userrecruiteredit/userrecruiteredit.component';
import { UserrecruiterlistComponent } from './userrecruiterlist/userrecruiterlist.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ClipboardModule } from 'ngx-clipboard';
import { CgxComponent } from './cgx/cgx.component';
import { OrderBy } from './orderby';
import { NumberDirective } from './number.directive';
import { CompletewebinarComponent } from './completewebinar/completewebinar.component';
import { TrainingcenterComponent } from './trainingcenter/trainingcenter.component';
import { ResourceComponent } from './resource/resource.component';
import { WebinarComponent } from './webinar/webinar.component';
import { ReportsComponent } from './reports/reports.component';
import { CommissionsComponent } from './commissions/commissions.component';
import { SharelinkComponent } from './sharelink/sharelink.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { LandingComponent } from './landing/landing.component';
import { Landing2Component } from './landing2/landing2.component';
import { PatientlistrecordviewComponent } from './patientlistrecordview/patientlistrecordview.component';
import { UsermanagementlistComponent } from './usermanagementlist/usermanagementlist.component';
import { HelpdeskaddComponent } from './helpdeskadd/helpdeskadd.component';
import { HelpdeskeditComponent } from './helpdeskedit/helpdeskedit.component';
import { HelpdesklistComponent } from './helpdesklist/helpdesklist.component';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { NgxUploaderModule } from 'ngx-uploader';
import {TooltipModule} from 'ngx-tooltip';
import { CorporatemanageraddComponent } from './corporatemanageradd/corporatemanageradd.component';
import { CorporatemanagereditComponent } from './corporatemanageredit/corporatemanageredit.component';
import { CorporatemanagerlistComponent } from './corporatemanagerlist/corporatemanagerlist.component';
import { MastergroupaddComponent } from './mastergroupadd/mastergroupadd.component';
import { MastergrouplistComponent } from './mastergrouplist/mastergrouplist.component';
import { MastergroupeditComponent } from './mastergroupedit/mastergroupedit.component';
import { enableProdMode } from '@angular/core';
import { AgreementComponent } from './agreement/agreement.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Usermanagementlist1Component } from './usermanagementlist1/usermanagementlist1.component';
import { Patients1Component } from './patients1/patients1.component';

enableProdMode();

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RecruiterdashboardComponent,
        DashboardComponent,
        SalesrepdashboardComponent,
        RepsignupComponent,
        HeaderComponent,
        FooterComponent,
        RecruitersignupComponent,
        RepcontractComponent,
        TrainingstepComponent,
        FrontheaderComponent,
        FrontfooterComponent,
        PateintquestionireComponent,
        PateintsComponent,
        PateintdetailComponent,
        UsersearchPipe,
        UsersearchPipe1,
        Newsearchpipe,
        CompensationmodifierComponent,
        MyaccountComponent,
        PatientrecordComponent,
        UserrecruiterdetailComponent,
        UserrecruitereditComponent,
        UserrecruiterlistComponent,
        ResetpasswordComponent,
        ForgetpasswordComponent,
        AutologinComponent,
        CgxComponent,
        OrderBy,
        NumberDirective,
        CompletewebinarComponent,
        TrainingcenterComponent,
        ResourceComponent,
        WebinarComponent,
        ReportsComponent,
        CommissionsComponent,
        SharelinkComponent,
        HomeComponent,
        ContactComponent,
        LandingComponent,
        Landing2Component,
        PatientlistrecordviewComponent,
        UsermanagementlistComponent,
        HelpdeskaddComponent,
        HelpdeskeditComponent,
        HelpdesklistComponent,
        CorporatemanageraddComponent,
        CorporatemanagereditComponent,
        CorporatemanagerlistComponent,
        MastergroupaddComponent,
        MastergrouplistComponent,
        MastergroupeditComponent,
        AgreementComponent,
        Usermanagementlist1Component,
        Patients1Component
    ],
    imports: [
        BrowserModule,
        routing,
        BsDropdownModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        HttpClientModule,
        AccordionModule.forRoot(),
        ModalModule.forRoot(),
        NgxPaginationModule,
        ClipboardModule,
        Ng2AutoCompleteModule,
        NgxUploaderModule,
        TooltipModule,
        CKEditorModule,
      BsDatepickerModule.forRoot(),
      NgSelectModule
    ],
    providers: [appRoutingProviders, CookieService],
    bootstrap: [AppComponent]
})
export class AppModule { }

