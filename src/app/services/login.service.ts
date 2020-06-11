import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  redirectUrl = "administration/dashboard";
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private _HttpClient: HttpClient,
    private _CookieService: CookieService,
    private router: Router
  ) {}
  public loginUser(email: string, password: string): Observable<any> {
    return this._HttpClient
      .post(
        "https://www.clax-egyp.me/api/admin/login",
        {
          mail: email,
          pass: password,
        },
        { responseType: "text" }
      )
      .pipe(
        map((response) => {
          if (response) {
            this._CookieService.set("Token", response);
            this.router.navigate([this.redirectUrl]);
          }
        })
      );
  }
  public logout() {
    this._CookieService.delete("Token");
  }
}
