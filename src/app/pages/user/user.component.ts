import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SafeUrl, DomSanitizer } from "@angular/platform-browser";
import { NotificationsComponent } from "../notifications/notifications.component";
import { PassengersService } from "app/services/passengers.service";

@Component({
  selector: "user-cmp",
  moduleId: module.id,
  templateUrl: "user.component.html",
})
export class UserComponent implements OnInit {
  dialog: any;
  imageurl: SafeUrl;
  firstName: string = "";
  lastName: string = "";
  phone: string = "";
  mail: string = "";
  govern: string = "";
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
  constructor(
    private activatedRoute: ActivatedRoute,
    private _PassengersService: PassengersService,
    private domSanitizer: DomSanitizer,
    private notificationComponent: NotificationsComponent,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  id: string;
  passenger: any;
  response: string = "";
  getPassenger() {
    this.activatedRoute.params.subscribe((params) => {
      this.id = atob(params["id"]);
      this._PassengersService.getUser(this.id).subscribe((response) => {
        this.passenger = response;
        this.firstName = this.passenger.name.first;
        this.lastName = this.passenger.name.last;
        this.phone = this.passenger.phone;
        this.mail = this.passenger.mail;
        this.govern = this.passenger.govern;
        // let bufferImg = response._trip._driver.profilePic.data;
        // this.imageurl = this.domSanitizer.bypassSecurityTrustUrl(
        //   "data:image/jpeg;base64," + bufferImg
        // );
      });
    });
  }
  ngOnInit() {
    this.getPassenger();
  }
  redirectToFamilyMember(id) {
    this.router.navigateByUrl(`/administration/passengers/${btoa(id)}`);
  }
  editPassenger() {
    this._PassengersService
      .editUser({
        id: this.passenger._id,
        firstName: this.firstName,
        lastName: this.lastName,
        phone: this.phone,
        mail: this.mail,
        govern: this.govern,
      })
      .subscribe(
        (res) => {
          this.notificationComponent.showNotification("Passenger Edited.");
        },
        (error: any) => {
          this.notificationComponent.showNotification(error.error);

          console.clear();
        }
      );
  }
}
