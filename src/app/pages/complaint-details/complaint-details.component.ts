import { Component, OnInit, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ComplaintsService } from "app/services/complaints.service";
import { MessageComponent } from "app/shared/message/message.component";
import { SafeUrl, DomSanitizer } from "@angular/platform-browser";
import { MatDialog } from "@angular/material/dialog";
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
          if (
            error.status == 400 ||
            error.status == 404 ||
            error.status == 401
          ) {
            this.notificationComponent.showNotification(error.error);
          } else {
            this.notificationComponent.showNotification(error.error);
          }
          console.clear();
        }
      );
    }
  }
  ngOnInit(): void {
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
