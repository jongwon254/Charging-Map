import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as Mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.scss']
})

// create instance of MapBox
export class MapBoxComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // MapBox Auth Token
    (Mapboxgl as any).accessToken = environment.map_token;
    
    // Get current location in browser
    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, { enableHighAccuracy: true })

    function successLocation(position: any) {
      console.log(position)
      setupMap([position.coords.longitude, position.coords.latitude])
    }

    function errorLocation() {
      setupMap([9.183333, 48.783333])
    }

    // Setup map and add navigation controls
    function setupMap(center: [number, number]) {
      const map = new Mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/jongwon254/cl6jsco53001x14ql93eabfxv',
        center: center,
        zoom: 13 
      });

      map.addControl(new Mapboxgl.NavigationControl())

      map.addControl(new Mapboxgl.FullscreenControl())

      
    }
  }
}
