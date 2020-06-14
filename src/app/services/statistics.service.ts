import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class StatisticsService {
  constructor(private _HttpClient: HttpClient) {}
  public getStatistics(): Observable<any> {
    return this._HttpClient.get("http://localhost:3000/api/admin/statistics");
  }
}
