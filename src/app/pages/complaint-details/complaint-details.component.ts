import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ComplaintsService } from "app/services/complaints.service";
import { SafeUrl, DomSanitizer } from "@angular/platform-browser";
import { NotificationsComponent } from "../notifications/notifications.component";

@Component({
  selector: "app-complaint-details",
  templateUrl: "./complaint-details.component.html",
  styleUrls: ["./complaint-details.component.css"],
})
export class ComplaintDetailsComponent implements OnInit {
  dialog: any;
  imageurl: SafeUrl;
  constructor(
    private activatedRoute: ActivatedRoute,
    private _ComplaintsService: ComplaintsService,
    private domSanitizer: DomSanitizer,
    private notificationComponent: NotificationsComponent
  ) {}
  id: string;
  complaint: any;
  response: string = "";
  respondBtnClick() {
    if (this.response != "") {
      this._ComplaintsService.respond(this.id, this.response).subscribe(
        (res) => {
          this.notificationComponent.showNotification(
            "Response has been sent."
          );
        },
        (error: any) => {
          this.notificationComponent.showNotification(error.error);
        }
      );
    }
  }
  ngOnInit(): void {
    this.getComplaint();
  }
  getComplaint() {
    this.activatedRoute.params.subscribe((params) => {
      this.id = atob(params["id"]);
      this._ComplaintsService.getComplaint(this.id).subscribe((response) => {
        this.complaint = response;
        let bufferImg = response._trip._driver.profilePic.data;
        this.imageurl = this.domSanitizer.bypassSecurityTrustUrl(
          "data:image/jpeg;base64," + bufferImg
        );
      });
    });
  }
}
