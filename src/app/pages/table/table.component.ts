import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { TableData } from "app/interfaces/table-data";

@Component({
  selector: "table-cmp",
  moduleId: module.id,
  templateUrl: "table.component.html",
})
export class TableComponent implements OnInit {
  searchResult: TableData;
  @Input() data: TableData;
  @Output() clicked = new EventEmitter<number>();
  buttonClick(index: number) {
    this.clicked.emit(index);
  }
  //return data[this.data.searchField].toString().includes(text.toString());
  onSearchChange(text) {
    if (text != "") {
      this.searchResult.dataRows = this.data.dataRows.filter((data) =>
        data[this.data.searchField].toString().includes(text.toString())
      );
    } else {
      this.searchResult = Object.assign({}, this.data);
    }
  }
  ngOnInit() {
    this.searchResult = Object.assign({}, this.data);
  }
}
