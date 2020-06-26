import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ComplaintsService {
  constructor(private _HttpClient: HttpClient) {}
  public respond(id: string, complaintResponse: string): Observable<any> {
    return this._HttpClient.post(
      `https://www.clax-egyp.me/api/admin/complaints/respond/${id}`,
      {
        response: complaintResponse,
      },
      { responseType: "text" }
    );
  }
  public getComplaints(): Observable<any> {
    let complaints = this._HttpClient.get(
      "https://www.clax-egyp.me/api/admin/complaints"
    );
    return complaints;
  }
  public getComplaint(id: string): Observable<any> {
    let complaints = this._HttpClient.get(
      `https://www.clax-egyp.me/api/admin/complaints/${id}`
    );
    return complaints;
  }
}
