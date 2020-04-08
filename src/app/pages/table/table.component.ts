import { Component, OnInit } from "@angular/core";
import { UsersService } from "../../users.service";

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: "table-cmp",
  moduleId: module.id,
  templateUrl: "table.component.html"
})
export class TableComponent implements OnInit {
  public users: TableData;

  ngOnInit() {
    this.users = {
      headerRow: ["ID", "Name", "Phone", "Rate", "Balance"],
      dataRows: []
    };
  }
  constructor(private _UsersService: UsersService) {
    _UsersService.getUsers().subscribe(users => {
      this.users.dataRows = users;
      console.log(users[0].name.first);
    });
  }
}
