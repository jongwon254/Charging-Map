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

  getValues(id: string) {
    this.deleteRow()
    // get api with params and fill charginglist and numberresult
  }

  deleteRow() {
    this.chargingList?.splice(0, this.numberResult);
    this.numberResult = 0
    this.chargingList = []
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

}
