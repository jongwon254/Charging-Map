import { Injectable } from '@angular/core';
import { ChargingData } from '../models/charging.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// services to fetch data from API
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

  searchChargingPoints(city: string, power: number): Observable<ChargingData[]> {
    return this.http.get<ChargingData[]>(environment.baseUrl
       + "/search/?city=" + city
       + "&power=" + power)
  }

  searchChargingPointsCity(city: string): Observable<ChargingData[]> {
    return this.http.get<ChargingData[]>(environment.baseUrl
       + "/search/?city=" + city)
  }

}
