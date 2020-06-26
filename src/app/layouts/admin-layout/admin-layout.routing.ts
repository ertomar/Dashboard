import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UsersComponent } from "../../pages/users/users.component";
import { OffersComponent } from "app/pages/offers/offers.component";
import { ComplaintsComponent } from "app/pages/complaints/complaints.component";
import { ComplaintDetailsComponent } from "app/pages/complaint-details/complaint-details.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UserComponent } from "app/pages/user/user.component";
import { LinesComponent } from "app/pages/lines/lines.component";
import { DriversComponent } from "app/pages/drivers/drivers.component";
import { DriverDetailsComponent } from "app/pages/driver-details/driver-details.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "passengers", component: UsersComponent },
  { path: "passengers/:id", component: UserComponent },
  { path: "offers", component: OffersComponent },
  { path: "complaints", component: ComplaintsComponent },
  { path: "complaints/:id", component: ComplaintDetailsComponent },
  { path: "maps", component: MapsComponent },
  { path: "lines", component: LinesComponent },
  { path: "drivers", component: DriversComponent },
  { path: "drivers/:id", component: DriverDetailsComponent },
];
