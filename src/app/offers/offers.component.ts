import { Component, OnInit } from "@angular/core";
import { Offer } from "../offer";
import { OffersService } from "app/offers.service";
import { MessageComponent } from "app/shared/message/message.component";
import { MatDialog } from "@angular/material/dialog";
import { UsersService } from "app/users.service";

declare interface TableData {
  headerRow: string[];
  keys: string[];
  dataRows: any[];
}

@Component({
  selector: "app-offers",
  templateUrl: "./offers.component.html",
  styleUrls: ["./offers.component.css"],
})
export class OffersComponent implements OnInit {
  offerTypes = ["Discount", "Cash Amount", "Free Trips"];
  offer = new Offer("", "", new Date(), new Date(), this.offerTypes[0], "");
  submitted = false;

  minDate = new Date();

  //same date after ten years
  maxDate = new Date(
    this.minDate.getFullYear() + 10,
    this.minDate.getMonth(),
    this.minDate.getDate()
  ).toLocaleString();
  public pastOffers: TableData;
  public activeOffers: TableData;
  public expiredOffers: TableData;

  constructor(
    private _OffersService: OffersService,
    private dialog: MatDialog,
    private _UsersService: UsersService
  ) {
    this.getOffers();
  }

  onSubmit() {
    this.offer.start = this.dayZeroing(this.offer.start);
    this.offer.end = this.dayZeroing(this.offer.end);

    this.submitted = true;
  }
  confirm() {
    this._OffersService.addOffer(this.offer).subscribe(
      (response: any) => {
        this.dialog.open(MessageComponent, {
          data: {
            message: "Offer added.",
          },
        });
        this.submitted = false;
        this.newOffer();
        this.getOffers();
        this.ngOnInit();
      },
      (error: any) => {
        if (error.status == 400 || error.status == 404 || error.status == 401) {
          this.dialog.open(MessageComponent, {
            data: {
              message: error.error,
            },
          });
        } else {
          this.dialog.open(MessageComponent, {
            data: {
              message: "Please, try again later.",
            },
          });
        }
        console.clear();
      }
    );
  }
  newOffer() {
    this.offer = new Offer(
      "",
      "",
      new Date(),
      new Date(),
      this.offerTypes[0],
      ""
    );
  }
  deleteClicked(index) {
    let offer = this.pastOffers.dataRows[index];
    if (confirm(`Are you sure you want to delete ${offer.title} offer?`)) {
      this._OffersService.deleteOffer(offer._id).subscribe(
        (response) => {
          this.getOffers();
        },
        (error: any) => {
          if (
            error.status == 400 ||
            error.status == 401 ||
            error.status == 404
          ) {
            this.dialog.open(MessageComponent, {
              data: {
                message: error.error,
              },
            });
          } else {
            this.dialog.open(MessageComponent, {
              data: {
                message: "Please, try again later.",
              },
            });
          }
          console.clear();
        }
      );
    }
  }
  getOffers() {
    this._OffersService.getOffers().subscribe((offers) => {
      this.pastOffers = {
        headerRow: [
          "Title",
          "Code",
          "Start Date",
          "End Date",
          "Offer Type",
          "Value",
        ],
        keys: ["title", "code", "start", "end", "offerType", "value"],
        dataRows: offers,
      };
      this.activeOffers = Object.assign({}, this.pastOffers);
      this.activeOffers.dataRows = this.activeOffers.dataRows.filter(
        (offer) => {
          let today = this.dayZeroing(new Date());
          let endDate = this.dayZeroing(new Date(offer.end));
          return endDate.getTime() >= today.getTime();
        }
      );

      this.expiredOffers = Object.assign({}, this.pastOffers);
      this.expiredOffers.dataRows = this.expiredOffers.dataRows.filter(
        (offer) => {
          let today = this.dayZeroing(new Date());
          let endDate = this.dayZeroing(new Date(offer.end));
          return endDate.getTime() < today.getTime();
        }
      );
    });
  }
  dayZeroing(date: Date) {
    date.setHours(0, 0, 0, 0);
    return date;
  }
  ngOnInit(): void {}
}
