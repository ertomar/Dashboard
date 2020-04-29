import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ComplaintsService {
  constructor(private _HttpClient: HttpClient) {}
  public respond(complaintResponse: string): Observable<any> {
    return this._HttpClient.post(
      "http://localhost:3000/api/admin/add-offer",
      {
        complaintResponse,
      },
      { responseType: "text" }
    );
  }
  public getComplaints(): Observable<any> {
    let complaints = this._HttpClient.get(
      "http://localhost:3000/api/admin/complaints"
    );
    return complaints;
  }
  public getComplaint(id: string): Observable<any> {
    let complaints = this._HttpClient.get(
      `http://localhost:3000/api/admin/complaints/${id}`
    );
    return complaints;
  }
}
