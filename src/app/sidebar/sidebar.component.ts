import { Component, OnInit, ElementRef } from "@angular/core";

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: "dashboard", title: "Statistics", icon: "nc-bank", class: "" },
  { path: "passengers", title: "Passengers", icon: "nc-single-02", class: "" },
  {
    path: "drivers",
    title: "Drivers",
    icon: "fa fa-id-card-o",
    class: "",
  },
  { path: "offers", title: "Offers", icon: "nc-diamond", class: "" },
  {
    path: "complaints",
    title: "Complaints",
    icon: "fa fa-comment-o",
    class: "",
  },

  {
    path: "lines",
    title: "Lines",
    icon: "fa fa-road",
    class: "",
  },
  { path: "maps", title: "Track Driver", icon: "nc-pin-3", class: "" },
];

@Component({
  moduleId: module.id,
  selector: "sidebar-cmp",
  templateUrl: "sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  constructor(private elem: ElementRef) {}
  removeNcIconsClass() {
    let elements = this.elem.nativeElement.querySelectorAll(".fa");
    elements.forEach(function (element, index) {
      element.classList.remove("nc-icon");
    });
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
  ngAfterViewInit() {
    this.removeNcIconsClass();
  }
}
