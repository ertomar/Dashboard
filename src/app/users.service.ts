import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(private _HttpClient: HttpClient) {}
  getUsers(): Observable<any> {
    return this._HttpClient.get("http://localhost:3000/api/admin/get-users");
  }
}
