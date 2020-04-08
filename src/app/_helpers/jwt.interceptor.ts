import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private _CookieService: CookieService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    if (this._CookieService.get("Token")) {
      let token = this._CookieService.get("Token");
      request = request.clone({
        setHeaders: {
          "x-login-token": token
        }
      });
    }

    return next.handle(request);
  }
}
