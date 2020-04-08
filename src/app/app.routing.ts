import { Routes } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthGuard } from "./_guard/index";
import { LoginComponent } from "./shared/login/login.component";

export const AppRoutes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    // canActivate: [AuthGuard],
    pathMatch: "full"
  },
  { path: "login", component: LoginComponent },
  {
    path: "",
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/admin-layout/admin-layout.module#AdminLayoutModule"
      }
    ]
  },

  {
    path: "**",
    canActivate: [AuthGuard],
    redirectTo: "dashboard"
  }
];
