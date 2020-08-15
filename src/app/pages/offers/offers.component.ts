import { Component, OnInit } from "@angular/core";
import { Offer } from "../../classes/offer";
import { OffersService } from "app/services/offers.service";
import { TableData } from "app/interfaces/table-data";
import { NotificationsComponent } from "../notifications/notifications.component";

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
    private notificationComponent: NotificationsComponent
  ) {
    this.getOffers();
  }

  onSubmit() {
    try {
      let startDate = this.offer.start as any;

      startDate = startDate._d;

      this.offer.start = this.dayZeroing(startDate);
    } catch {
      this.offer.start = this.dayZeroing(this.offer.start);
    }
    try {
      let endDate = this.offer.end as any;

      endDate = endDate._d;

      this.offer.end = this.dayZeroing(endDate);
    } catch {
      this.offer.end = this.dayZeroing(this.offer.end);
    }
    if (this.offer.end.getTime() >= this.offer.start.getTime()) {
      this.submitted = true;
    } else {
      this.submitted = false;
      this.notificationComponent.showNotification(
        "The start date should be earlier than end date."
      );
    }
  }
  confirm() {
    this._OffersService.addOffer(this.offer).subscribe(
      () => {
        this.notificationComponent.showNotification("Offer has been added.");
        this.submitted = false;

        this.newOffer();
        this.getOffers();
        this.ngOnInit();
      },
      (error: any) => {
        this.notificationComponent.showNotification(error.error);

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
        () => {
          this.getOffers();
        },
        (error: any) => {
          this.notificationComponent.showNotification(error.error);

          console.clear();
        }
      );
    }
  }
  getOffers() {
    this.pastOffers = null;
    this.activeOffers = null;
    this.expiredOffers = null;
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
        title: "Past Offers",
        buttonName: "Delete",
        searchField: "code",
      };
      this.activeOffers = Object.assign({}, this.pastOffers);
      this.activeOffers.title = "Active Offers";
      this.activeOffers.dataRows = this.activeOffers.dataRows.filter(
        (offer) => {
          let today = this.dayZeroing(new Date());
          let endDate = this.dayZeroing(new Date(offer.end));
          return endDate.getTime() >= today.getTime();
        }
      );

      this.expiredOffers = Object.assign({}, this.pastOffers);
      this.expiredOffers.title = "Expired Offers";
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
