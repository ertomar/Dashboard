import { Component, OnInit } from "@angular/core";
import { TableData } from "app/interfaces/table-data";
import { LinesService } from "app/services/lines.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NotificationsComponent } from "../notifications/notifications.component";

@Component({
  selector: "app-lines",
  templateUrl: "./lines.component.html",
  styleUrls: ["./lines.component.css"],
})
export class LinesComponent implements OnInit {
  constructor(
    private notificationComponent: NotificationsComponent,
    private _LinesService: LinesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getLines();
  }

  public lines: TableData;
  public linesTable: TableData;
  getLines() {
    this._LinesService.getLines().subscribe((lines) => {
      this.lines = {
        headerRow: ["From", "To", "Cost", "Stations Number"],
        keys: ["from", "to", "cost", "_stations"],
        dataRows: lines,
        title: "Lines",
        buttonName: "Delete",
        searchField: "from",
      };
      this.linesTable = Object.assign({}, this.lines);
      this.linesTable.dataRows.forEach((line) => {
        try {
          line._stations = line._stations.length;
        } catch (error) {
          console.log(error);
        }
      });
    });
  }
  deleteClicked(index) {
    let line = this.lines.dataRows[index];
    if (
      confirm(`Are you sure you want to delete ${line.from}-${line.to} line?`)
    ) {
      this._LinesService.deleteLine(line._id).subscribe(
        (response) => {
          this.linesTable = null;
          this.lines = null;
          this.getLines();
        },
        (error: any) => {
          this.notificationComponent.showNotification(error.error);

          console.clear();
        }
      );
    }
  }

  ngOnInit(): void {}
}
