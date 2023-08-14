import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

const API_KEY = environment.token_map;

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
})
export class MapViewComponent  implements OnInit {

  public map!: mapboxgl.Map;

  constructor(private modalCtrl: ModalController) { }

  @Input() latitud!     : string;
  @Input() longitud!    : string;

  estiloMap: any;
  zoomMap: any;
  centerMap: any;

  ngOnInit() {
    this.centerMap = [this.longitud, this.latitud];
    this.zoomMap = [17];
    this.estiloMap = 'mapbox://styles/mapbox/streets-v11';
  }

  buildMap(){
    this.map = new mapboxgl.Map({
      container: 'map', // container ID
      style: this.estiloMap, // style URL
      center: this.centerMap, // starting position
      zoom: 15, // starting zoom
      accessToken: API_KEY
    });

    // Create a default Marker and add it to the map.
    const marker1 = new mapboxgl.Marker()
    .setLngLat(this.centerMap)
    .addTo(this.map);

    // Add zoom and rotation controls to the map.
    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.resize();
  }

  ionViewDidEnter() {
    this.buildMap();
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

}
