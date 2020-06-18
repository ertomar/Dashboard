import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PassengersService {
  constructor(private _HttpClient: HttpClient) {}
  getUsers(): Observable<any> {
    return this._HttpClient.get(
      "https://www.clax-egyp.me/api/admin/get-passengers"
    );
  }
  public getUser(id: string): Observable<any> {
    let complaints = this._HttpClient.get(
      `https://www.clax-egyp.me/api/admin/get-passengers/${id}`
    );
    return complaints;
  }
  public editUser(passenger): Observable<any> {
    let complaints = this._HttpClient.post(
      `https://www.clax-egyp.me/api/admin/passengers/edit`,
      {
        passenger,
      },
      { responseType: "text" }
    );
    return complaints;
  }
}
