import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserComponent } from "../../pages/user/user.component";

import { NotificationsComponent } from "../../pages/notifications/notifications.component";

import { OffersComponent } from "app/pages/offers/offers.component";
import { ComplaintsComponent } from "app/pages/complaints/complaints.component";
import { ComplaintDetailsComponent } from "app/pages/complaint-details/complaint-details.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "user", component: UserComponent },

  { path: "offers", component: OffersComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "complaints", component: ComplaintsComponent },
  { path: "complaints/:id", component: ComplaintDetailsComponent },
];
