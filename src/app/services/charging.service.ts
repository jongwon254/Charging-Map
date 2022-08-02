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

  searchChargingPoints(id: number, city: string, power: number, ports: number): Observable<ChargingData[]> {
    return this.http.get<ChargingData[]>(environment.baseUrl
       + "/search/?id=" + id 
       + "&city=" + city
       + "&power=" + power
       + "&ports=" + ports )
  }

}
