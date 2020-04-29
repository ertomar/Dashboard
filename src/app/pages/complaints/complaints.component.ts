import { Component, OnInit } from "@angular/core";
import { ComplaintsService } from "app/services/complaints.service";
import { TableData } from "app/interfaces/table-data";

@Component({
  selector: "app-complaints",
  templateUrl: "./complaints.component.html",
  styleUrls: ["./complaints.component.css"],
})
export class ComplaintsComponent implements OnInit {
  constructor(private _ComplaintsService: ComplaintsService) {
    this.getComplaints();
  }

  public complaints: TableData;
  public complaintsTable: TableData;

  getComplaints() {
    this._ComplaintsService.getComplaints().subscribe((complaints) => {
      this.complaints = {
        headerRow: ["Code", "Text", "User type", "Trip", "Passenger", "Driver"],
        keys: [
          "code",
          "text",
          "from_passenger",
          "_trip",
          "_passenger",
          "driver",
        ],
        dataRows: complaints,
        title: "Complaints",
        buttonName: "Details",
      };

      this.complaintsTable = Object.assign({}, this.complaints);
      this.complaintsTable.dataRows.forEach((element) => {
        element.driver =
          element._trip._driver.name.first +
          " " +
          element._trip._driver.name.last;
        element._trip = element._trip._line.from + "-" + element._trip._line.to;
        element._passenger =
          element._passenger.name.first + " " + element._passenger.name.first;
        element.from_passenger == "true" ? "Passenger" : "Driver";
      });
    });
  }
  detailsClicked(index) {
    console.log(index);
  }

  ngOnInit(): void {}
}
