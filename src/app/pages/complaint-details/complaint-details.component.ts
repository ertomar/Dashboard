import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ComplaintsService } from "app/services/complaints.service";
import { MessageComponent } from "app/shared/message/message.component";

@Component({
  selector: "app-complaint-details",
  templateUrl: "./complaint-details.component.html",
  styleUrls: ["./complaint-details.component.css"],
})
export class ComplaintDetailsComponent implements OnInit {
  dialog: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private _ComplaintsService: ComplaintsService
  ) {}
  id: string;
  complaint: any;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params["id"];
      this._ComplaintsService.getComplaint(this.id).subscribe((response) => {
        this.complaint = response;
      });
    });
  }
}
