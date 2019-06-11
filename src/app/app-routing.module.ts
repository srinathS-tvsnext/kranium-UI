import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

//Basic Menubar Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';


import { PatientdetailsComponent } from './patientdetails/patientdetails.component';
import { PastencountersComponent } from './pastencounters/pastencounters.component';
import { VitalsComponent } from './vitals/vitals.component';
import { HistoryComponent } from './history/history.component';
import { ExaminationComponent } from './examination/examination.component';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { InvestigationComponent } from './investigation/investigation.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { FollowupsComponent } from './followups/followups.component';
import { ReportsComponent } from './reports/reports.component';
import { OpsummaryComponent } from './opsummary/opsummary.component';
import { PatientlistComponent } from './patientlist/patientlist.component';
import { PastencounterdetailsComponent } from './pastencounterdetails/pastencounterdetails.component';
import { AddvitalsComponent } from './addvitals/addvitals.component';
import { EdithistoryComponent } from './edithistory/edithistory.component';
import { PreviousprescriptionComponent } from './previousprescription/previousprescription.component';
import { ReportviewComponent } from './reportview/reportview.component';
import { ReportgraphicalviewComponent } from './reportgraphicalview/reportgraphicalview.component';
import { ServicerenderedComponent } from './servicerendered/servicerendered.component';
import { ManagefavouritesComponent } from './managefavourites/managefavourites.component';
import { ManageformsComponent } from './manageforms/manageforms.component';
import { ManagerolesComponent } from './manageroles/manageroles.component';
import { AddrolesComponent } from './addroles/addroles.component';

import { AddnewmanageformComponent } from './addnewmanageform/addnewmanageform.component';
import { DetailmanageformComponent } from './detailmanageform/detailmanageform.component';
import { ForgotComponent } from './authentication/forgot/forgot.component';
import { MobileComponent } from './authentication/mobile/mobile.component';
import { OtpComponent } from './authentication/otp/otp.component';
import { PasswordComponent } from './authentication/password/password.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { HomescreenComponent } from './homescreen/homescreen.component';
import { PrescriptionshortageComponent } from './prescriptionshortage/prescriptionshortage.component';
//Manage favourites component
import { MpastencounterComponent } from './managefavourites/mpastencounter/mpastencounter.component';
import { MvitalsComponent } from './managefavourites/mvitals/mvitals.component';
import { MhistoryComponent } from './managefavourites/mhistory/mhistory.component';
import { MexaminationComponent } from './managefavourites/mexamination/mexamination.component';
import { MdiagnosisComponent } from './managefavourites/mdiagnosis/mdiagnosis.component';
import { MinvestigationComponent } from './managefavourites/minvestigation/minvestigation.component';
// import { MprescriptionComponent } from './managefavourites/mprescription/mprescription.component';
import { MreportsComponent } from './managefavourites/mreports/mreports.component';
import { MfollowupsComponent } from './managefavourites/mfollowups/mfollowups.component';
import { MasterComponent } from './master/master.component';
import { MastervitalsComponent } from './master/mastervitals/mastervitals.component';
import { MasterfollowupsComponent } from './master/masterfollowups/masterfollowups.component';
import { MasterchangepasswordComponent } from './master/masterchangepassword/masterchangepassword.component';
import { MasterconfigComponent } from './master/masterconfig/masterconfig.component';
import { CreaterolesComponent } from './createroles/createroles.component';
import { CrongjobSettingsComponent } from './crongjob-settings/crongjob-settings.component';
import { AddlanguageComponent } from './master/addlanguage/addlanguage.component';
import { LanguageComponent } from './master/language/language.component';
//End
import { GlobalResolver } from './global.resolver';

import { LoginBackgroundImgComponent } from './login-background-img/login-background-img.component';
import { InvestigationShortcodeComponent } from './investigation-shortcode/investigation-shortcode.component';
import { EditManageformComponent } from './edit-manageform/edit-manageform.component';
import { AddconfigComponent } from './master/addconfig/addconfig.component';
import { InvestigationAddShortcodeComponent } from './investigation-add-shortcode/investigation-add-shortcode.component';
import { EditvitalsComponent } from './editvitals/editvitals.component';

import { DuplicateFormComponent } from './duplicate-form/duplicate-form.component';

import { ManageformTittleComponent } from './master/manageform-tittle/manageform-tittle.component';
import { ManageformAddtitleComponent } from './master/manageform-addtitle/manageform-addtitle.component';
import { InpatientlistComponent } from './inpatientlist/inpatientlist.component';

const routes: Routes = [
  { path: 'Authentication', component: AuthenticationComponent, data: { Key: 'Signin' } },
  { path: 'Signin', component: SigninComponent, data: { Key: 'Signin' } },
  { path: 'Forgot', component: ForgotComponent, data: { Key: 'Forgot' } },
  { path: 'Mobile', component: MobileComponent, data: { Key: 'Mobile' } },
  { path: 'Otp', component: OtpComponent, data: { Key: 'Otp' } },
  { path: 'Password', component: PasswordComponent, data: { Key: 'Password' } },
  { path: 'Signup', component: SignupComponent, data: { Key: 'Signup' } },

  {
    path: 'Homescreen', component: HomescreenComponent, data: { Key: 'Appointment' }, resolve: {
      users: GlobalResolver
    }, children:
      [
        { path: 'dashboard', component: DashboardComponent, data: { Key: 'Dashboard' } },
        { path: 'user-profile', component: UserProfileComponent, data: { Key: 'User Profile' } },
        { path: 'table-list', component: TableListComponent, data: { Key: 'Table List' } },
        { path: 'typography', component: TypographyComponent, data: { Key: 'Typography' } },
        { path: 'icons', component: IconsComponent, data: { Key: 'Icons' } },
        { path: 'maps', component: MapsComponent, data: { Key: 'Maps' } },
        { path: 'notifications', component: NotificationsComponent, data: { Key: 'Notifications' } },
        { path: 'Servicerendered', component: ServicerenderedComponent, data: { Key: 'Services Rendered' } },
        {
          path: 'Managefavourites', component: ManagefavouritesComponent, data: { Key: 'Manage Favourites' },
          children: [
            { path: 'MPastencounters', component: MpastencounterComponent, data: { Key: 'Past Encounters' } },
            { path: 'MVitals', component: MvitalsComponent, data: { Key: 'Vitals' } },
            { path: 'MHistory', component: MhistoryComponent, data: { Key: 'History' } },
            { path: 'MExamination', component: MexaminationComponent, data: { Key: 'Examination' } },
            { path: 'MDiagnosis', component: MdiagnosisComponent, data: { Key: 'Diagnosis' } },
            { path: 'MInvestigation', component: MinvestigationComponent, data: { Key: 'Investigation' } },
            // { path: 'MPrescription', component: MprescriptionComponent, data: { Key: 'Prescription' } },
            { path: 'MFollowups', component: MfollowupsComponent, data: { Key: 'Follow-ups' } },
            { path: 'MReports', component: MreportsComponent, data: { Key: 'Reports' } },
          ]
        },
        { path: 'Manageforms', component: ManageformsComponent, data: { Key: 'Manage Forms' } },

        {
          path: 'Master', component: MasterComponent, data: { Key: 'Master' }, children:
          [
            { path: 'Mastervitals', component: MastervitalsComponent, data: { Key: 'Vitals' } },
            { path: 'Mastercronjob', component: CrongjobSettingsComponent, data: { Key: 'Master Sync' } },
            { path: 'Masterfollowups', component: MasterfollowupsComponent, data: { Key: 'Follow-up' } },
            { path: 'Masterchangepassword', component: MasterchangepasswordComponent, data: { Key: 'Change Password' } },
            { path: 'Masterconfig', component: MasterconfigComponent, data: { Key: 'Config' } },
            { path: 'Manageroles', component: ManagerolesComponent, data: { Key: 'Manage Activity' } },
            { path: 'Addroles', component: AddrolesComponent, data: { Key: 'Manage Users' } },
            { path: 'Createroles', component: CreaterolesComponent, data: { Key: 'Create Roles' } },
            { path: 'Language', component: LanguageComponent, data: { Key: 'Language' } },
            { path: 'AddLanguage', component: AddlanguageComponent, data: { Key: 'Add Language' } },
            { path: 'Loginimage', component: LoginBackgroundImgComponent, data: { Key: 'Login image' } },
            { path: 'Shortcode', component: InvestigationShortcodeComponent, data: { Key: 'Short Codes' } },
            { path: 'AddConfig', component: AddconfigComponent, data: { Key: 'Add Config' } },
            { path: 'AddShortcode', component: InvestigationAddShortcodeComponent, data: { Key: 'Add Shortcode' } },
            { path: 'MFTittle', component: ManageformTittleComponent, data: { Key: 'Manage Form Title' } },
            { path: 'AddMFTittle', component: ManageformAddtitleComponent, data: { Key: 'Add Manage Form Title' } },
          ]
        },

        { path: 'Addnewmanageform', component: AddnewmanageformComponent, data: { Key: 'Add New Form' } },
        { path: 'Detailmanageform/:id', component: DetailmanageformComponent, data: { Key: 'Detail Form' } },
        { path: 'Editform/:id', component: EditManageformComponent, data: { Key: 'Edit Form' } },
        { path: 'duplicateform/:id', component: DuplicateFormComponent, data: { Key: 'Clone Form' } },
        { path: 'Patientlist', component: PatientlistComponent, data: { Key: 'Patient List' } },
        { path: 'Inpatientlist', component: InpatientlistComponent, data: { Key: 'Inpatient List'} },
        {
          path: 'Patientdetails', component: PatientdetailsComponent, data: { Key: 'Patient Details' },
          children: [
            { path: 'Past_Encounters', component: PastencountersComponent, data: { Key: 'Past Encounters' } },
            { path: 'Vitals', component: VitalsComponent, data: { Key: 'Vitals' } },
            { path: 'History', component: HistoryComponent, data: { Key: 'History' } },
            { path: 'Edithistory', component: EdithistoryComponent, data: { Key: 'Edit History' } },
            { path: 'Examination', component: ExaminationComponent, data: { Key: 'Examination' } },
            { path: 'Diagnosis', component: DiagnosisComponent, data: { Key: 'Diagnosis' } },
            { path: 'Investigation', component: InvestigationComponent, data: { Key: 'Investigation' } },
            { path: 'Prescription', component: PrescriptionComponent, data: { Key: 'Medication' } },
            { path: 'Followups', component: FollowupsComponent, data: { Key: 'Follow-up' } },
            { path: 'Reports', component: ReportsComponent, data: { Key: 'Reports' } },
            { path: 'summary', component: OpsummaryComponent, data: { Key: 'Op-Summary' } },
            { path: 'Pastencounterdetails', component: PastencounterdetailsComponent, data: { Key: 'Past Encounter Details' } },
            { path: 'Addvitals', component: AddvitalsComponent, data: { Key: 'Add Vitals' } },
            { path: 'Editvitals', component: EditvitalsComponent, data: { Key: 'Edit Vitals' } },

            { path: 'Previousprescription', component: PreviousprescriptionComponent, data: { Key: 'Previous Prescription' } },
            { path: 'Reportview', component: ReportviewComponent, data: { Key: 'Report View' } },
            { path: 'Reportgraphicalview', component: ReportgraphicalviewComponent, data: { Key: 'Report Graphical View' } },
            { path: 'Prescriptionshortage', component: PrescriptionshortageComponent, data: { Key: 'Prescription Shortage' } },

          ]
        },
      ]
  },
  { path: '', redirectTo: 'Signin', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
