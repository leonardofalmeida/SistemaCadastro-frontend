import React, { Component } from "react";
import L from "leaflet";

import "./styles.css";

export default class Maps extends Component {
  componentDidMount() {
    this.map = L.map("map", {
      center: [-21.236922, -45.002487],
      id: "mapbox.light",
      zoom: 4,
      layers: [
        L.tileLayer.wms(
          "http://sistemas.gt4w.com.br/geoserver/processo_seletivo/wms",
          {
            layers: "processo_seletivo:ufs_brasil"
          }
        )
      ]
    });

    this.geojsonFeature = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-45.924799, -23.069949]
      }
    };
    this.geo = L.geoJSON(this.geojsonFeature).addTo(this.map);
  }

  render() {
    return (
      <div>
        <div id="map" />
      </div>
    );
  }
}
