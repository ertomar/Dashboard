import { Component, OnInit } from "@angular/core";
import { TableData } from "app/interfaces/table-data";
import { Router, ActivatedRoute } from "@angular/router";
import { PassengersService } from "app/services/passengers.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  constructor(
    private _PassengersService: PassengersService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getPassengers();
  }

  public passengers: TableData;
  public passengersTable: TableData;
  getPassengers() {
    this._PassengersService.getUsers().subscribe((passengers) => {
      this.passengers = {
        headerRow: ["Name", "Phone", "Balance", "rate"],
        keys: ["name", "phone", "balance", "rate"],
        dataRows: passengers,
        title: "Passengers",
        buttonName: "Details",
        searchField: "phone",
      };
      this.passengersTable = Object.assign({}, this.passengers);
      this.passengersTable.dataRows.forEach((element) => {
        try {
          element.name = element.name.first + " " + element.name.last;
        } catch (error) {
          console.log(error);
        }
      });
    });
  }
  detailsClicked(index) {
    let passengerId = this.passengers.dataRows[index]._id;
    this.router.navigate([btoa(passengerId)], { relativeTo: this.route });
  }
  ngOnInit(): void {}
}
