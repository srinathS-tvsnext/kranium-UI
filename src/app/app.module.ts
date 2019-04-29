import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule, MatCheckboxModule, MatSelectModule, MatInputModule,
  MatIconModule, MatToolbarModule, MatTableModule, MatPaginatorModule, MatExpansionModule,
  MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule, MatAutocompleteModule, MatSlideToggleModule,
  MatTooltipModule, MatFormFieldModule 
} from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AppComponent } from './app.component';
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
import { InvestigationlistComponent } from './investigationlist/investigationlist.component';
import { PreviousprescriptionComponent } from './previousprescription/previousprescription.component';
import { ReportviewComponent } from './reportview/reportview.component';
import { ReportgraphicalviewComponent } from './reportgraphicalview/reportgraphicalview.component';
import { ServicerenderedComponent } from './servicerendered/servicerendered.component';
import { ManagefavouritesComponent } from './managefavourites/managefavourites.component';
import { ManageformsComponent } from './manageforms/manageforms.component';
import { ManagerolesComponent } from './manageroles/manageroles.component';
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
import { MpastencounterComponent } from './managefavourites/mpastencounter/mpastencounter.component';
import { MvitalsComponent } from './managefavourites/mvitals/mvitals.component';
import { MhistoryComponent } from './managefavourites/mhistory/mhistory.component';
import { MexaminationComponent } from './managefavourites/mexamination/mexamination.component';
import { MdiagnosisComponent } from './managefavourites/mdiagnosis/mdiagnosis.component';
import { MinvestigationComponent } from './managefavourites/minvestigation/minvestigation.component';
import { MprescriptionComponent } from './managefavourites/mprescription/mprescription.component';
import { MreportsComponent } from './managefavourites/mreports/mreports.component';
import { MfollowupsComponent } from './managefavourites/mfollowups/mfollowups.component';
import { AddrolesComponent } from './addroles/addroles.component';
import { MasterchangepasswordComponent } from './master/masterchangepassword/masterchangepassword.component';
import { MasterconfigComponent } from './master/masterconfig/masterconfig.component';
import { CreaterolesComponent } from './createroles/createroles.component';

//services
import { InterceptorService } from './interceptor.service';
import { GlobalService } from './global.service';
import { PreviewformComponent } from './previewform/previewform.component';
import { TemplatenamePopupComponent } from './templatename-popup/templatename-popup.component';
import { TemplatenameDrugPopupComponent } from './templatename-drug-popup/templatename-drug-popup.component';
import { InvestigationTemplateComponent } from './investigation-template/investigation-template.component';
import { OpsumaryTemplateNameComponent } from './opsumary-template-name/opsumary-template-name.component';
import { MasterComponent } from './master/master.component';
import { MastervitalsComponent } from './master/mastervitals/mastervitals.component';
import { MasterfollowupsComponent } from './master/masterfollowups/masterfollowups.component';
// import { Ng4AutoCompleteTextBoxModule } from 'ng4-autocomplete-textbox'
import { NguiAutoCompleteModule } from '@ngui/auto-complete';


import { GlobalResolver } from './global.resolver';


// import { SelectModule } from 'ng2-select';
// import { NgxPaginationModule } from 'ngx-pagination';
import { CrongjobSettingsComponent } from './crongjob-settings/crongjob-settings.component';
import { CongjobpopupComponent } from './congjobpopup/congjobpopup.component';
import { LanguageComponent } from './master/language/language.component';
import { LoginBackgroundImgComponent } from './login-background-img/login-background-img.component';
import { InvestigationShortcodeComponent } from './investigation-shortcode/investigation-shortcode.component';
import { EditManageformComponent } from './edit-manageform/edit-manageform.component';
import { AddconfigComponent } from './master/addconfig/addconfig.component';
import { InvestigationAddShortcodeComponent } from './investigation-add-shortcode/investigation-add-shortcode.component';
import { EditvitalsComponent } from './editvitals/editvitals.component';
import { LanguageeditpopupComponent } from './master/languageeditpopup/languageeditpopup.component';
// import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { DuplicateFormComponent } from './duplicate-form/duplicate-form.component';

import { ManageformTittleComponent } from './master/manageform-tittle/manageform-tittle.component';
import { ManageformAddtitleComponent } from './master/manageform-addtitle/manageform-addtitle.component';
import { ManageformEdittittleComponent } from './master/manageform-edittittle/manageform-edittittle.component';
import { InvestigationEditShortcodeComponent } from './investigation-edit-shortcode/investigation-edit-shortcode.component';
import { EditconfigComponent } from './master/editconfig/editconfig.component';
// import {SelectModule} from 'angular2-select';
// import { QuillEditorModule } from 'ngx-quill-editor';
import { EditMastervitalComponent } from './master/edit-mastervital/edit-mastervital.component';
import { EditMasterfollowupsComponent } from './master/edit-masterfollowups/edit-masterfollowups.component';

import { CreaterolesEditComponent } from './createroles-edit/createroles-edit.component';
import { UpdateMfOpsummaryTemplateNameComponent } from './update-mf-opsummary-template-name/update-mf-opsummary-template-name.component';
import { AddlanguageComponent } from './master/addlanguage/addlanguage.component';
import { InpatientlistComponent } from './inpatientlist/inpatientlist.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    PatientdetailsComponent,
    PastencountersComponent,
    VitalsComponent,
    HistoryComponent,
    ExaminationComponent,
    DiagnosisComponent,
    InvestigationComponent,
    PrescriptionComponent,
    FollowupsComponent,
    ReportsComponent,
    OpsummaryComponent,
    PatientlistComponent,
    PastencounterdetailsComponent,
    AddvitalsComponent,
    EdithistoryComponent,
    InvestigationlistComponent,
    PreviousprescriptionComponent,
    ReportviewComponent,
    ReportgraphicalviewComponent,
    ServicerenderedComponent,
    ManagefavouritesComponent,
    ManageformsComponent,
    ManagerolesComponent,
    AddnewmanageformComponent,
    DetailmanageformComponent,
    SigninComponent,
    ForgotComponent,
    MobileComponent, OtpComponent, PasswordComponent,
    SignupComponent, AddrolesComponent, LanguageeditpopupComponent, InvestigationEditShortcodeComponent, EditconfigComponent,
    ManageformTittleComponent, ManageformAddtitleComponent,
    ManageformEdittittleComponent, AuthenticationComponent, HomescreenComponent,
    PrescriptionshortageComponent, MpastencounterComponent, MvitalsComponent,
    MhistoryComponent, MexaminationComponent, MdiagnosisComponent, MinvestigationComponent,
    MprescriptionComponent, MreportsComponent, MfollowupsComponent, PreviewformComponent,
    TemplatenamePopupComponent, TemplatenameDrugPopupComponent, InvestigationTemplateComponent,
    OpsumaryTemplateNameComponent, MasterComponent, MastervitalsComponent, MasterfollowupsComponent,
    MasterchangepasswordComponent, MasterconfigComponent, CreaterolesComponent,
    CrongjobSettingsComponent, CongjobpopupComponent, LanguageComponent, LoginBackgroundImgComponent,
    InvestigationShortcodeComponent, EditManageformComponent, AddconfigComponent,
    InvestigationAddShortcodeComponent, EditvitalsComponent, DuplicateFormComponent,
    EditMastervitalComponent, EditMasterfollowupsComponent, CreaterolesEditComponent, UpdateMfOpsummaryTemplateNameComponent, AddlanguageComponent, InpatientlistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatAutocompleteModule,
    FormsModule, ReactiveFormsModule,
    HttpModule,NguiAutoCompleteModule,
    ComponentsModule, NgSelectModule,
    CKEditorModule, MatTooltipModule, NgMultiSelectDropDownModule,
    MatButtonModule, MatCheckboxModule, MatSelectModule, MatInputModule, MultiselectDropdownModule,
    MatIconModule, MatToolbarModule, MatTableModule, MatPaginatorModule, MatExpansionModule, MatDialogModule, MatDatepickerModule,
    BrowserAnimationsModule, MatRadioModule, MatAutocompleteModule, MatSlideToggleModule,
    CommonModule, HttpClientModule, MatSnackBarModule, MatPaginatorModule, MatNativeDateModule, MatFormFieldModule 

  ],
  entryComponents: [UpdateMfOpsummaryTemplateNameComponent,EditMasterfollowupsComponent, EditMastervitalComponent, ManageformEdittittleComponent,
    DuplicateFormComponent, LanguageeditpopupComponent, CongjobpopupComponent,
    InvestigationlistComponent, OpsumaryTemplateNameComponent, InvestigationTemplateComponent,
    TemplatenameDrugPopupComponent, ReportviewComponent, ReportgraphicalviewComponent,
    PreviewformComponent, TemplatenamePopupComponent, InvestigationEditShortcodeComponent,
    EditconfigComponent, CreaterolesEditComponent],
    
  providers: [GlobalService, GlobalResolver, { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
