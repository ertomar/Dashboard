import { Component, OnInit } from "@angular/core";
import { SafeUrl, DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { DriversService } from "app/services/drivers.service";
import { NotificationsComponent } from "../notifications/notifications.component";

@Component({
  selector: "app-driver-details",
  templateUrl: "./driver-details.component.html",
  styleUrls: ["./driver-details.component.css"],
})
export class DriverDetailsComponent implements OnInit {
  dialog: any;
  profilePic: SafeUrl;
  criminalRecord: SafeUrl;
  driverLicense: SafeUrl;
  driver: any;
  governs = [
    "الإسكندرية",
    "الإسماعيلية",
    "أسوان",
    "أسيوط",
    "الأقصر",
    "البحيرة",
    "بني سويف",
    "بورسعيد",
    "جنوب سيناء",
    "الجيزة",
    "الدقهلية",
    "دمياط",
    "سوهاج",
    "السويس",
    "الشرقية",
    "الغربية",
    "القاهرة",
    "كفر الشيخ",
  ];
  id: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private _DriversService: DriversService,
    private domSanitizer: DomSanitizer,
    private notificationComponent: NotificationsComponent,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  getDriver() {
    this.activatedRoute.params.subscribe((params) => {
      this.id = atob(params["id"]);
      this._DriversService.getDriver(this.id).subscribe((response) => {
        console.log(response);
        this.driver = response;
        let bufferImg = atob(response.profilePic.data);

        this.profilePic = this.domSanitizer.bypassSecurityTrustUrl(
          "data:image/jpeg;base64," + bufferImg
        );
        bufferImg = atob(response.criminalRecord.data);
        this.criminalRecord = this.domSanitizer.bypassSecurityTrustUrl(
          "data:image/jpeg;base64," + bufferImg
        );
        bufferImg = atob(response.license.data);
        this.driverLicense = this.domSanitizer.bypassSecurityTrustUrl(
          "data:image/jpeg;base64," + bufferImg
        );
      });
    });
  }
  deleteClicked() {
    if (
      confirm(
        `Are you sure you want to delete ${this.driver.name.first} ${this.driver.name.last}?`
      )
    ) {
      this._DriversService.deleteDriver(this.driver._id).subscribe(
        (response) => {
          this.notificationComponent.showNotification("Successfully deleted.");
          setTimeout(() =>
            this.router.navigateByUrl("/administration/drivers")
          );
        },
        (error: any) => {
          this.notificationComponent.showNotification(error.error);
          console.clear();
        }
      );
    }
  }
  respond(response: boolean) {
    this._DriversService.respond(this.driver._id, response).subscribe(
      (res) => {
        this.notificationComponent.showNotification("Response sent.");
        setTimeout(() => this.router.navigateByUrl("/administration/drivers"));
      },
      (error: any) => {
        this.notificationComponent.showNotification(error.error);
        console.clear();
      }
    );
  }

  ngOnInit(): void {
    this.getDriver();
  }
}
