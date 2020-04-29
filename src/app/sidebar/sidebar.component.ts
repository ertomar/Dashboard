import { Component, OnInit, ElementRef } from "@angular/core";

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: "/dashboard", title: "Statistics", icon: "nc-bank", class: "" },
  { path: "/offers", title: "Offers", icon: "nc-diamond", class: "" },
  { path: "/maps", title: "Maps", icon: "nc-pin-3", class: "" },
  {
    path: "/notifications",
    title: "Notifications",
    icon: "nc-bell-55",
    class: "",
  },
  { path: "/user", title: "Users", icon: "nc-single-02", class: "" },
  {
    path: "/complaints",
    title: "Complaints",
    icon: "fa fa-comment-o",
    class: "",
  },
  {
    path: "/typography",
    title: "Typography",
    icon: "nc-caps-small",
    class: "",
  },
  {
    path: "/upgrade",
    title: "Upgrade to PRO",
    icon: "nc-spaceship",
    class: "active-pro",
  },
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
