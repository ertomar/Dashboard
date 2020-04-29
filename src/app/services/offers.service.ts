import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Offer } from "../classes/offer";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class OffersService {
  constructor(private _HttpClient: HttpClient) {}
  public addOffer(offer: Offer): Observable<any> {
    return this._HttpClient.post(
      "http://localhost:3000/api/admin/add-offer",
      {
        offer,
      },
      { responseType: "text" }
    );
  }
  public getOffers(): Observable<any> {
    return this._HttpClient.get("http://localhost:3000/api/admin/get-offers");
  }
  public deleteOffer(id): Observable<any> {
    return this._HttpClient.post(
      "http://localhost:3000/api/admin/delete-offer",
      {
        offerId: id,
      },
      { responseType: "text" }
    );
  }
}
