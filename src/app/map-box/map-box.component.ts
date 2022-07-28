import { Component, OnInit } from '@angular/core';
import * as Mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.scss']
})

export class MapBoxComponent implements OnInit {

  constructor() { }
  

  ngOnInit(): void {

    

    (Mapboxgl as any).accessToken = environment.map_token;
    
    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, { enableHighAccuracy: true })

    function successLocation(position: any) {
      console.log(position)
      setupMap([position.coords.longitude, position.coords.latitude])
    }

    function errorLocation() {
      setupMap([9.183333, 48.783333])
    }

    function setupMap(center: [number, number]) {
      const map = new Mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: 12 
      });

      map.addControl(new Mapboxgl.NavigationControl())

      map.addControl(new Mapboxgl.FullscreenControl())

  
      map.addControl(
        new MapboxDirections({
        accessToken: Mapboxgl.accessToken
        }),
        'top-left'
        );
      
    }

    
    
  }

}
