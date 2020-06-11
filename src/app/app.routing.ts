import { Routes } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthGuard } from "./_guard/index";
import { LoginComponent } from "./shared/login/login.component";
import { MailVerficationComponent } from "./pages/mail-verfication/mail-verfication.component";
import { ResetPasswordComponent } from "./pages/reset-password/reset-password.component";

export const AppRoutes: Routes = [
  {
    path: "",
    redirectTo: "administration/dashboard",
    // canActivate: [AuthGuard],
    pathMatch: "full",
  },
  { path: "login", component: LoginComponent },
  { path: "confirm-mail/:id", component: MailVerficationComponent },
  { path: "reset-password/:id", component: ResetPasswordComponent },
  {
    path: "",
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "administration",
        loadChildren:
          "./layouts/admin-layout/admin-layout.module#AdminLayoutModule",
      },
    ],
  },
];
