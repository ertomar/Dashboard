import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "app/login.service";

@Component({
  selector: "app-admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.scss"]
})
export class AdminLayoutComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  constructor(private _LoginService: LoginService) {}
  ngOnInit() {
    this.isLoggedIn$ = this._LoginService.isLoggedIn;
  }
}
