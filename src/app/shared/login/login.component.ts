import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { MessageComponent } from "../message/message.component";
import { LoginService } from "../../services/login.service";
import { CookieService } from "ngx-cookie-service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public email: string = "";
  public password: string = "";

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private _LoginService: LoginService,
    private _CookieService: CookieService
  ) {}
  login() {
    this._LoginService.loginUser(this.email, this.password).subscribe(
      (response: any) => {},
      (error: any) => {
        if (error.status == 400 || error.status == 404 || error.status == 401) {
          this.dialog.open(MessageComponent, {
            data: {
              message: error.error,
            },
          });
        } else {
          this.dialog.open(MessageComponent, {
            data: {
              message: "Please, try again later.",
            },
          });
        }
        console.clear();
      }
    );
    // if (this.email === "email@email.com" && this.password === "p@ssw0rd") {
    //   this.router.navigate(["success"]);
    // } else {
    //   this.dialog.open(MessageComponent, {
    //     data: {
    //       message: "Error!!!"
    //     }
    //   });
    // }
  }

  ngOnInit(): void {}
}
