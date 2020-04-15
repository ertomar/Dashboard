import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { LoginService } from "../login.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private _LoginService: LoginService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        console.log(err);
        if (
          (err.status === 401 || err.status === 400) &&
          (err.status.toString().includes("Token") ||
            err.status.toString().includes("token"))
        ) {
          // auto logout if 401 response returned from api
          this._LoginService.logout();

          location.reload(true);
        }

        return throwError(err);
      })
    );
  }
}
