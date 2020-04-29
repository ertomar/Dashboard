import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserComponent } from "../../pages/user/user.component";
import { TableComponent } from "../../pages/table/table.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UpgradeComponent } from "../../pages/upgrade/upgrade.component";
import { OffersComponent } from "app/pages/offers/offers.component";
import { ComplaintsComponent } from "app/pages/complaints/complaints.component";
import { ComplaintDetailsComponent } from "app/pages/complaint-details/complaint-details.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "user", component: UserComponent },
  { path: "typography", component: TypographyComponent },
  { path: "offers", component: OffersComponent },
  { path: "maps", component: MapsComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "upgrade", component: UpgradeComponent },
  { path: "complaints", component: ComplaintsComponent },
  { path: "complaints/:id", component: ComplaintDetailsComponent },
];
