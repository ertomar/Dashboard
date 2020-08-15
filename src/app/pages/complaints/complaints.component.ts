import { Component, OnInit } from "@angular/core";
import { ComplaintsService } from "app/services/complaints.service";
import { TableData } from "app/interfaces/table-data";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-complaints",
  templateUrl: "./complaints.component.html",
  styleUrls: ["./complaints.component.css"],
})
export class ComplaintsComponent implements OnInit {
  constructor(
    private _ComplaintsService: ComplaintsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
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
        searchField: "code",
      };

      this.complaintsTable = Object.assign({}, this.complaints);
      this.complaintsTable.dataRows.forEach((element) => {
        try {
          element._passenger =
            element._passenger.name.first + " " + element._passenger.name.last;
          element.from_passenger = element.from_passenger
            ? "Passenger"
            : "Driver";
          if (element._trip) {
            element.driver =
              element._trip._tour._driver.name.first +
              " " +
              element._trip._tour._driver.name.last;
            element._trip =
              element._trip._tour._line.from +
              "-" +
              element._trip._tour._line.to;
          } else {
            element.driver = "none";
            element._trip = "none";
          }

          element.from_passenger == true ? "Passenger" : "Driver";
        } catch (error) {
          console.log(error);
        }
      });
    });
  }
  detailsClicked(index) {
    let complaintId = this.complaints.dataRows[index]._id;
    this.router.navigate([btoa(complaintId)], { relativeTo: this.route });
  }

  ngOnInit(): void {}
}
