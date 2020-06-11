import { Component, OnInit, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ConfirmMailService } from "app/services/confirm-mail.service";

@Component({
  selector: "app-mail-verfication",
  templateUrl: "./mail-verfication.component.html",
  styleUrls: ["./mail-verfication.component.css"],
})
export class MailVerficationComponent implements OnInit {
  id: string;
  status: number = 400;
  loaded: boolean = false;
  constructor(
    private elementRef: ElementRef,
    private activatedRoute: ActivatedRoute,
    private _ConfirmMailService: ConfirmMailService
  ) {}
  verifyEmail() {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.id = params["id"].split("/").join("%2F");
        this._ConfirmMailService.verifyEmail(this.id).subscribe((response) => {
          if (response.status) {
            this.status = response.status;
          } else if (response === "Mail Verified") {
            this.status = 200;
          }
          this.loaded = true;
        });
      },
      () => {
        this.status = 400;
        this.loaded = true;
      }
    );
  }

  ngOnInit(): void {
    this.verifyEmail();
  }
  ngAfterViewInit() {}
}
