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
      `https://www.clax-egyp.me/api/admin/drivers/names`,
      {
        driversIds: Ids,
      },
      { responseType: "json" }
    );
  }

  public getDrivers(): Observable<any> {
    return this._HttpClient.get(`https://www.clax-egyp.me/api/admin/drivers`, {
      responseType: "json",
    });
  }
  public deleteDriver(id): Observable<any> {
    return this._HttpClient.post(
      "https://www.clax-egyp.me/api/admin/drivers/delete",
      {
        driverId: id,
      },
      { responseType: "text" }
    );
  }
  public getDriver(id: string): Observable<any> {
    let driver = this._HttpClient.get(
      `https://www.clax-egyp.me/api/admin/drivers/${id}`
    );
    return driver;
  }
  public respond(id: string, response: boolean): Observable<any> {
    return this._HttpClient.post(
      `https://www.clax-egyp.me/api/admin/drivers/respond/${id}`,
      {
        response,
      },
      { responseType: "text" }
    );
  }
}
