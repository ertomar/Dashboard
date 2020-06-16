import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { ROUTES } from "../../sidebar/sidebar.component";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { Location } from "@angular/common";
import { LoginComponent } from "../login/login.component";

@Component({
  moduleId: module.id,
  selector: "navbar-cmp",
  templateUrl: "navbar.component.html",
})
export class NavbarComponent implements OnInit {
  private listTitles: any[];
  location: Location;
  private nativeElement: Node;
  private toggleButton;
  private sidebarVisible: boolean;

  public isCollapsed = true;
  @ViewChild("navbar-cmp", { static: false }) button;

  constructor(
    location: Location,
    private renderer: Renderer2,
    private element: ElementRef,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.location = location;
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
  }
  account() {
    this.router.navigate(["/login"]);
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter((listTitle) => listTitle);
    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggle")[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
    });
  }
  getTitle() {
    var title = this.location.prepareExternalUrl(this.location.path());

    if (title.charAt(0) === "#") {
      title = title.slice(1);
    }
    if (title.charAt(0) === "/") {
      title = title.slice(16);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === title) {
        return this.listTitles[item].title;
      }
    }
    return "Dashboard";
  }
  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName("html")[0];
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName("main-panel")[0]
    );
    setTimeout(function () {
      toggleButton.classList.add("toggled");
    }, 500);

    html.classList.add("nav-open");
    if (window.innerWidth < 991) {
      mainPanel.style.position = "fixed";
    }
    this.sidebarVisible = true;
  }
  sidebarClose() {
    const html = document.getElementsByTagName("html")[0];
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName("main-panel")[0]
    );
    if (window.innerWidth < 991) {
      setTimeout(function () {
        mainPanel.style.position = "";
      }, 500);
    }
    this.toggleButton.classList.remove("toggled");
    this.sidebarVisible = false;
    html.classList.remove("nav-open");
  }
  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName("nav")[0];

    if (!this.isCollapsed) {
      navbar.classList.remove("navbar-transparent");
      navbar.classList.add("bg-white");
    } else {
      navbar.classList.add("navbar-transparent");
      navbar.classList.remove("bg-white");
    }
  }
}
