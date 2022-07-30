import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
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

      map.on('load', () => {

        map.addSource('markers', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                'type': 'Feature',
                'geometry': {
                  'type': 'Point',
                  'coordinates': [9.183333, 48.783333]
                },
                'properties': {
                  'title': 'Charging Point'
                }
              },
              {
                'type': 'Feature',
                'geometry': {
                  'type': 'Point',
                  'coordinates': [7.77161, 49.443]
                },
                'properties': {
                  'title': 'Charging Point'
                }
              }
            ]
          }
        })
  
        map.addLayer({
          'id': 'points',
          'type': 'symbol',
          'source': 'markers',
          'layout': {
            'icon-image':'car-15',
            'text-field': ['get', 'title'],
            'text-font': [
            'Open Sans Semibold',
            'Arial Unicode MS Bold'
            ],
            'text-offset': [0, 0.5],
            'text-anchor': 'top'
          }
        })

      })
    }
  }

  // <button (click)="mark(chargingList[i].id)">Add</button>

}
