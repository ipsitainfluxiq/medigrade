/**
 * Created by ipsita on 7/4/17.
 */

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RecruiterdashboardComponent } from './recruiterdashboard/recruiterdashboard.component';
import { SalesrepdashboardComponent } from './salesrepdashboard/salesrepdashboard.component';
import { RepsignupComponent } from './repsignup/repsignup.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RecruitersignupComponent } from './recruitersignup/recruitersignup.component';
import { TrainingstepComponent } from './trainingstep/trainingstep.component';
import { RepcontractComponent } from './repcontract/repcontract.component';
import { FrontheaderComponent } from './frontheader/frontheader.component';
import { FrontfooterComponent } from './frontfooter/frontfooter.component';
import { PateintsComponent } from './pateints/pateints.component';
import { Patients1Component } from './patients1/patients1.component';
import { PateintquestionireComponent } from './pateintquestionire/pateintquestionire.component';
import { PateintdetailComponent } from './pateintdetail/pateintdetail.component';
import { CompensationmodifierComponent } from './compensationmodifier/compensationmodifier.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { PatientrecordComponent } from './patientrecord/patientrecord.component';
import { UserrecruiterlistComponent } from './userrecruiterlist/userrecruiterlist.component';
import { UserrecruitereditComponent } from './userrecruiteredit/userrecruiteredit.component';
import { UserrecruiterdetailComponent } from './userrecruiterdetail/userrecruiterdetail.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { AutologinComponent } from './autologin/autologin.component';
import { CgxComponent } from './cgx/cgx.component';
import { CompletewebinarComponent } from './completewebinar/completewebinar.component';
import { TrainingcenterComponent } from './trainingcenter/trainingcenter.component';
import {ResourceComponent} from './resource/resource.component';
import {WebinarComponent} from './webinar/webinar.component';
import {ReportsComponent} from './reports/reports.component';
import {CommissionsComponent} from './commissions/commissions.component';
import {SharelinkComponent} from './sharelink/sharelink.component';
import {HomeComponent} from './home/home.component';
import {ContactComponent} from './contact/contact.component';
import {LandingComponent} from './landing/landing.component';
import {Landing2Component} from './landing2/landing2.component';
import {PatientlistrecordviewComponent} from './patientlistrecordview/patientlistrecordview.component';
import {UsermanagementlistComponent} from './usermanagementlist/usermanagementlist.component';
import {HelpdesklistComponent} from './helpdesklist/helpdesklist.component';
import {HelpdeskeditComponent} from './helpdeskedit/helpdeskedit.component';
import {HelpdeskaddComponent} from './helpdeskadd/helpdeskadd.component';
import {CorporatemanageraddComponent} from './corporatemanageradd/corporatemanageradd.component';
import {CorporatemanagereditComponent} from './corporatemanageredit/corporatemanageredit.component';
import {CorporatemanagerlistComponent} from './corporatemanagerlist/corporatemanagerlist.component';
import {MastergroupaddComponent} from './mastergroupadd/mastergroupadd.component';
import {MastergrouplistComponent} from './mastergrouplist/mastergrouplist.component';
import {MastergroupeditComponent} from './mastergroupedit/mastergroupedit.component';
import {AgreementComponent} from './agreement/agreement.component';
import {Usermanagementlist1Component} from './usermanagementlist1/usermanagementlist1.component';

const appRoutes: Routes = [

    { path: '', component: HomeComponent},
    { path: 'log-in', component: LoginComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'recruiterdashboard', component: RecruiterdashboardComponent},
    { path: 'rep-dashboard', component: SalesrepdashboardComponent},
    { path: 'sign-up', component: RepsignupComponent},
    { path: 'sign-up/:id', component: RepsignupComponent},
    { path: 'sign-up/:id/:username', component: RepsignupComponent},
    { path: 'sign-up/:id/:username/:flag', component: RepsignupComponent},
    { path: 'header', component: HeaderComponent},
    { path: 'footer', component: FooterComponent},
    { path: 'recrutersignup', component: RecruitersignupComponent},
    { path: 'employment-agreement', component: RepcontractComponent},
    { path: 'trainingstep', component: TrainingstepComponent},
    { path: 'frontheader', component: FrontheaderComponent},
    { path: 'frontfooter', component: FrontfooterComponent},
    { path: 'patient-list', component: PateintsComponent},
    { path: 'patient-list/:id', component: PateintsComponent},
    { path: 'patient-list1', component: Patients1Component},
    { path: 'patient-list1/:id', component: Patients1Component},
    { path: 'patientquestionire', component: PateintquestionireComponent},
    { path: 'add-patient', component: PateintdetailComponent},
    { path: 'compensationmodifier', component: CompensationmodifierComponent},
    { path: 'myaccount', component: MyaccountComponent},
    { path: 'patientrecord/:id', component: PatientrecordComponent},
    { path: 'patientrecord/:id/:type', component: PatientrecordComponent},
    { path: 'userrecruiterlist/:id', component: UserrecruiterlistComponent},
    { path: 'userrecruiteredit/:id', component: UserrecruitereditComponent},
    { path: 'userrecruiterdetail/:id', component: UserrecruiterdetailComponent},
    { path: 'forgetpassword', component: ForgetpasswordComponent},
    { path: 'resetpassword/:id', component: ResetpasswordComponent},
    { path: 'autologin/:id', component: AutologinComponent},
    { path: 'cgx', component: CgxComponent},
    { path: 'cgx/:id', component: CgxComponent},
    { path: 'cgx/:id/:username1/:flag', component: CgxComponent},
    { path: 'completewebinar', component: CompletewebinarComponent},
    { path: 'trainingcenter', component: TrainingcenterComponent},
    { path: 'resources', component: ResourceComponent},
    { path: 'webinar', component: WebinarComponent},
    { path: 'reports', component: ReportsComponent},
    { path: 'commissions', component: CommissionsComponent},
    { path: 'sharelink', component: SharelinkComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'landing', component: LandingComponent},
    { path: 'landing/:id', component: LandingComponent},
    { path: 'landing/:id/:username/:flag', component: LandingComponent},
    { path: 'landing2', component: Landing2Component},
    { path: 'patientlist', component: PatientlistrecordviewComponent},
    { path: 'userlist', component: UsermanagementlistComponent},
    { path: 'userlist/:groupid', component: UsermanagementlistComponent},
    { path: 'userlist/:groupid/:childusername', component: UsermanagementlistComponent},
    { path: 'userlist1', component: Usermanagementlist1Component},
    { path: 'userlist1/:groupid', component: Usermanagementlist1Component},
    { path: 'userlist1/:groupid/:childusername', component: Usermanagementlist1Component},
    { path: 'helpdeskedit/:id', component: HelpdeskeditComponent},
    { path: 'helpdesklist', component: HelpdesklistComponent},
    { path: 'helpdeskadd', component: HelpdeskaddComponent},
    { path: 'corporatemanageredit/:id', component: CorporatemanagereditComponent},
    { path: 'corporatemanagerlist', component: CorporatemanagerlistComponent},
    { path: 'corporatemanageradd', component: CorporatemanageraddComponent},
    { path: 'mastergroupadd', component: MastergroupaddComponent},
    { path: 'mastergrouplist', component: MastergrouplistComponent},
    { path: 'mastergroupedit/:id', component: MastergroupeditComponent},
    { path: 'agreement', component: AgreementComponent},

  // { path: 'content', component: ContentComponent,outlet:'content'},
];


export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes,{ useHash: true });
