import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ToastrModule } from "ngx-toastr";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDialogModule } from "@angular/material/dialog";
import { CookieService } from "ngx-cookie-service";
import { SidebarModule } from "./sidebar/sidebar.module";
import { FooterModule } from "./shared/footer/footer.module";
import { NavbarModule } from "./shared/navbar/navbar.module";
import { FixedPluginModule } from "./shared/fixedplugin/fixedplugin.module";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { environment } from "../environments/environment";
import { AppComponent } from "./app.component";
import { AppRoutes } from "./app.routing";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { LoginComponent } from "./shared/login/login.component";
import { MessageComponent } from "./shared/message/message.component";
import { FormsModule } from "@angular/forms";
import { JwtInterceptor } from "./_helpers/jwt.interceptor";
import { ErrorInterceptor } from "./_helpers/error.interceptor";
import { AuthGuard } from "./_guard";
import { PassengersService } from "./services/passengers.service";
import { OffersComponent } from "./pages/offers/offers.component";
import { MatTabsModule } from "@angular/material/tabs";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule, MAT_DATE_LOCALE } from "@angular/material/core";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { OffersService } from "./services/offers.service";
import { TableComponent } from "./pages/table/table.component";
import { ConfirmationComponent } from "./shared/confirmation/confirmation.component";
import { DatePipe } from "@angular/common";
import { ComplaintsComponent } from "./pages/complaints/complaints.component";
import { ComplaintDetailsComponent } from "./pages/complaint-details/complaint-details.component";
import { MailVerficationComponent } from "./pages/mail-verfication/mail-verfication.component";
import { ResetPasswordComponent } from "./pages/reset-password/reset-password.component";

import { MapsComponent } from "./pages/maps/maps.component";
import { LinesComponent } from "./pages/lines/lines.component";
import { from } from "rxjs";
import { NotificationsComponent } from "./pages/notifications/notifications.component";

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    MessageComponent,
    OffersComponent,
    TableComponent,
    ConfirmationComponent,
    ComplaintsComponent,
    ComplaintDetailsComponent,
    MailVerficationComponent,
    ResetPasswordComponent,
    MapsComponent,
    LinesComponent,
    NotificationsComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    HttpClientModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
  ],
  providers: [
    CookieService,
    AuthGuard,
    { provide: MAT_DATE_LOCALE, useValue: "en-GB" },
    PassengersService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    OffersService,
    NotificationsComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
