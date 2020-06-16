import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DriversService {
  constructor(private _HttpClient: HttpClient) {}
  public getDriversNames(Ids: any): Observable<any> {
    return this._HttpClient.post(
      `https://www.clax-egyp.me/api/admin/get-drivers`,
      {
        driversIds: Ids,
      },
      { responseType: "json" }
    );
  }
}
