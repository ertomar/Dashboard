import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { TableData } from "app/interfaces/table-data";

@Component({
  selector: "table-cmp",
  moduleId: module.id,
  templateUrl: "table.component.html",
})
export class TableComponent implements OnInit {
  @Input() data: TableData;
  @Output() clicked = new EventEmitter<number>();
  buttonClick(index: number) {
    this.clicked.emit(index);
  }
  ngOnInit() {}
}
