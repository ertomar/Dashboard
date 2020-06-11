import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ConfirmMailService {
  constructor(private _HttpClient: HttpClient) {}
  public verifyEmail(id: string): Observable<any> {
    return this._HttpClient
      .put(
        `https://www.clax-egyp.me/clients/passengers/verify-mail/${id}`,
        {},
        { responseType: "text" }
      )
      .pipe(
        catchError((err) => {
          return [err];
        })
      );
  }
}
