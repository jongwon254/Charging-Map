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
  token = true;

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
    this.numberResultSearch += 10;
  }

  goBackSearch() {
    if(this.numberResultSearch != 10) {
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

  
  getValues(city: string, house_number: string) {
    this.deleteRow()
    console.log(this.chargingListSearch)
    
    if(!house_number) {
      this.searchChargingPointsCity(city)
      console.log("housenumber null")
    } else {
      this.searchChargingPoints(city, house_number)
      console.log("housenumber not null")
    }
    
    


    console.log(this.numberResultSearch)
    
    console.log(this.chargingListSearch)
    //this.numberResult = 1
    // get api with params and fill charginglist and numberresult
  }

  deleteRow() {
    this.chargingList?.splice(0, this.numberResult);
    this.numberResult = 0
    this.chargingList = undefined
    this.numberResultSearch = 0
    this.chargingListSearch = undefined
  }


  private getChargingPoints() {
    this.chargingService.getChargingPoints().subscribe((response) => {
      this.chargingList = response;
      //console.log(response);
    }, (err) => {
      alert("Error fetching charging points.");
    })
  }

  private getChargingPoint(id: number) {
    this.chargingService.getChargingPoint(id).subscribe((response) => {
      this.chargingData = response;
      console.log(response);
    }, (err) => {
      alert("Error fetching charging point.")
    }) 
  }

  private searchChargingPoints(city: string, house_number: string) {
    this.chargingService.searchChargingPoints(city, house_number).subscribe((response) => {
      this.chargingListSearch = response
      console.log(response);
      console.log(this.chargingListSearch)
      this.numberResultSearch = this.chargingListSearch!.length
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
      this.numberResultSearch = this.chargingListSearch!.length
      this.changeDetector.detectChanges()
    }, (err) => {
      alert("Error fetching charging points.")
    })
  }
  
}


