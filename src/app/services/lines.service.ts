import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LinesService {
  constructor(private _HttpClient: HttpClient) {}
  getLines(): Observable<any> {
    return this._HttpClient.get(
      `https://www.clax-egyp.me/api/passengers/pairing/line`,
      { responseType: "json" }
    );
  }

  public deleteLine(id): Observable<any> {
    return this._HttpClient.post(
      "https://www.clax-egyp.me/api/admin/lines/delete",
      {
        lineId: id,
      },
      { responseType: "text" }
    );
  }
  public addLine(line): Observable<any> {
    return this._HttpClient.post(
      "http://localhost:3000/api/admin/lines/add",
      {
        line,
      },
      { responseType: "text" }
    );
  }
}
