import { Injectable } from '@angular/core';
import { ChargingData } from '../models/charging.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChargingService {

  private _list: ChargingData[] = [];

  constructor(private http: HttpClient) { }

  getChargingPoint(id: number): Observable<ChargingData> {
    return this.http.get<ChargingData>(environment.baseUrl + "/" + id)
  }

  getChargingPoints(): Observable<ChargingData[]> {
    return this.http.get<ChargingData[]>(environment.baseUrl)
  }

  searchChargingPoints(city: string, house_number: string): Observable<ChargingData[]> {
    return this.http.get<ChargingData[]>(environment.baseUrl
       + "/search/?city=" + city
       + "&house_number=" + house_number)
       //+ "&city=" + city
       //#+ "&power=" + power
       //+ "&ports=" + ports )
  }

  searchChargingPointsCity(city: string): Observable<ChargingData[]> {
    return this.http.get<ChargingData[]>(environment.baseUrl
       + "/search/?city=" + city)
       //+ "&city=" + city
       //#+ "&power=" + power
       //+ "&ports=" + ports )
  }

}
