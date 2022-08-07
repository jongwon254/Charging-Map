import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { ChargingData } from '../models/charging.model';
import { ChargingService } from '../services/charging.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private chargingService: ChargingService, private changeDetector: ChangeDetectorRef) { }

  id: number = 101906;
  numberResult: number = 10
  numberResultSearch: number = 10
  chargingData?: ChargingData;
  chargingList?: ChargingData[];
  chargingListSearch?: ChargingData[];
  search_length: number = 0;

  ngOnInit(): void {
    this.getChargingPoints();
    //this.getChargingPoint(this.id);
  }

  goNext() {
    this.numberResult += 10;
  }

  goBack() {
    if(this.numberResult != 10) {
      this.numberResult -= 10
    }
  }

  goNextSearch() {
    if((this.numberResultSearch+10) <= this.search_length) {
      this.numberResultSearch += 10;
    } else {
      this.numberResultSearch = this.search_length
    }
  }

  goBackSearch() {
    if(this.numberResultSearch % 10 != 0 && this.numberResultSearch >= 10) {
      this.numberResultSearch -= (this.numberResultSearch % 10)
    } else if(this.numberResultSearch > 10) {
      this.numberResultSearch -= 10
    }
  }

  resetResults() {
    this.numberResult = 10
    this.getChargingPoints()
    this.chargingListSearch?.splice(0, this.numberResultSearch);
    this.numberResultSearch = 0
    this.chargingListSearch = undefined
    
  }

  // filtering 
  getValues(id: string, city: string, power: string) {
    this.deleteRow()
    console.log(this.chargingListSearch)

    // id search
    if(!power && !city) {
      this.getChargingPoint(Number(id))
      // city search
    } else if(!power) {
      this.searchChargingPointsCity(city)
      console.log("housenumber null")
      // city + power search
    } else {
      this.searchChargingPoints(city, Number(power))
      console.log("housenumber not null")
    }

    console.log(this.numberResultSearch)
    console.log(this.chargingListSearch)
  }

  deleteRow() {
    this.chargingList?.splice(0, this.numberResult);
    this.numberResult = 0
    this.chargingList = undefined
    this.numberResultSearch = 0
    this.chargingListSearch = undefined
    this.chargingData = undefined
  }


  private getChargingPoints() {
    this.chargingService.getChargingPoints().subscribe((response) => {
      this.chargingList = response;
    }, (err) => {
      alert("Error fetching charging points.");
    })
  }

  private getChargingPoint(id: number) {
    this.chargingService.getChargingPoint(id).subscribe((response) => {
      this.chargingData = response;
      console.log(response);
      this.changeDetector.detectChanges()
    }, (err) => {
      alert("Error fetching charging point.")
    }) 
  }

  private searchChargingPoints(city: string, power: number) {
    this.chargingService.searchChargingPoints(city, power).subscribe((response) => {
      this.chargingListSearch = response
      console.log(response);
      console.log(this.chargingListSearch)
      this.search_length = this.chargingListSearch!.length
      if(this.search_length <= 10) {
        this.numberResultSearch = this.search_length
      } else {
        this.numberResultSearch = 10
      }
      this.changeDetector.detectChanges()
    }, (err) => {
      alert("Error fetching charging points.")
    })
  }

  private searchChargingPointsCity(city: string) {
    this.chargingService.searchChargingPointsCity(city).subscribe((response) => {
      this.chargingListSearch = response
      console.log(response);
      console.log(this.chargingListSearch)

      this.search_length = this.chargingListSearch!.length
      if(this.search_length <= 10) {
        this.numberResultSearch = this.search_length
      } else {
        this.numberResultSearch = 10
      }
      this.changeDetector.detectChanges()
    }, (err) => {
      alert("Error fetching charging points.")
    })
  }
  
}


