import { Component, OnInit } from '@angular/core';
import { ChargingData } from '../models/charging.model';
import { ChargingService } from '../services/charging.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private chargingService: ChargingService) { }

  id: number = 101906;
  numberResult: number = 10
  chargingData?: ChargingData;
  chargingList?: ChargingData[];

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

  resetResults() {
    this.numberResult = 10
    this.getChargingPoints()
    
  }

  

  getValues(id: string, city: string, power: string, ports: string) {
    this.deleteRow()
    console.log(this.chargingList)
    console.log(this.numberResult)
    
    this.searchChargingPoints(Number(id), city, Number(power), Number(ports))
    console.log(this.chargingList)
    console.log(this.numberResult)
    //this.numberResult = 1
    // get api with params and fill charginglist and numberresult
  }

  deleteRow() {
    this.chargingList?.splice(0, this.numberResult);
    this.numberResult = 0
    //this.chargingList = []
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

  private searchChargingPoints(id: number, city: string, power: number, ports: number) {
    this.chargingService.searchChargingPoints(id, city, power, ports).subscribe((response) => {
      this.chargingList = response;
      console.log(response);
      console.log(this.chargingList)
      console.log(this.numberResult)
      this.numberResult = 5
      console.log(this.numberResult)
    }, (err) => {
      alert("Error fetching charging points.")
    })
  }
  
}


