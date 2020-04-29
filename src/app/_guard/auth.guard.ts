import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "app/services/login.service";
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    protected router: Router,
    protected _LoginService: LoginService,
    private _CookieService: CookieService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    let url: string = state.url;
    return this.checkLogin(url);
  }
  checkLogin(url: string): boolean {
    if (this._CookieService.check("Token")) {
      return true;
    }

    // Store the attempted URL for redirecting
    this._LoginService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(["/login"]);
    return false;
  }
}
