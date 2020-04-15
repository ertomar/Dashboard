import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { KeyValue } from "@angular/common";

declare interface TableData {
  headerRow: string[];
  keys: string[];
  dataRows: any[];
}

@Component({
  selector: "table-cmp",
  moduleId: module.id,
  templateUrl: "table.component.html",
})
export class TableComponent implements OnInit {
  @Input() data: TableData;
  @Output() clicked = new EventEmitter<number>();
  deleteClick(index: number) {
    this.clicked.emit(index);
  }
  ngOnInit() {}
}
