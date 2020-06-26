import { Component, OnInit } from "@angular/core";
import { TableData } from "app/interfaces/table-data";
import { NotificationsComponent } from "../notifications/notifications.component";
import { DriversService } from "app/services/drivers.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-drivers",
  templateUrl: "./drivers.component.html",
  styleUrls: ["./drivers.component.css"],
})
export class DriversComponent implements OnInit {
  currentDrivers: TableData;
  applications: TableData;

  constructor(
    private _DriversService: DriversService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationsComponent: NotificationsComponent
  ) {
    this.getDrivers();
  }
  getDrivers() {
    this.currentDrivers = null;
    this.applications = null;
    this._DriversService.getDrivers().subscribe((drivers) => {
      this.currentDrivers = {
        headerRow: ["Name", "Phone", "Balance", "rate"],
        keys: ["name", "phone", "balance", "rate"],
        dataRows: drivers,
        title: "Active Drivers",
        buttonName: "Details",
        searchField: "phone",
      };
      this.currentDrivers.dataRows.forEach((element) => {
        try {
          element.name = element.name.first + " " + element.name.last;
        } catch (error) {
          console.log(error);
        }
      });
      this.applications = Object.assign({}, this.currentDrivers);
      this.applications.title = "Drivers' Applications";
      this.applications.buttonName = "Details";
      this.applications.dataRows = this.applications.dataRows.filter(
        (driver) => {
          return !driver.is_verified;
        }
      );
      this.currentDrivers.dataRows = this.currentDrivers.dataRows.filter(
        (driver) => {
          return driver.is_verified;
        }
      );
    });
  }
  detailsClickedApp(index) {
    let driverId = this.applications.dataRows[index]._id;
    this.router.navigate([btoa(driverId)], { relativeTo: this.route });
  }
  detailsClickedDrivers(index) {
    let driverId = this.currentDrivers.dataRows[index]._id;
    this.router.navigate([btoa(driverId)], { relativeTo: this.route });
  }
  deleteClicked(index) {
    let driver = this.currentDrivers.dataRows[index];
    if (confirm(`Are you sure you want to delete ${driver.name}?`)) {
      this._DriversService.deleteDriver(driver._id).subscribe(
        (response) => {
          this.getDrivers();
        },
        (error: any) => {
          this.notificationsComponent.showNotification(error.error);

          console.clear();
        }
      );
    }
  }
  ngOnInit(): void {}
}
