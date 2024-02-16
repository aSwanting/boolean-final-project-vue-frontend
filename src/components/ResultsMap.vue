<template>
  <div id="map"></div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";

import store from "../store";

export default {
  data() {
    return {
      store,
      map: null,
      zone: null,
      markers: null,
      marker: null,
    };
  },
  watch: {
    "store.radius": {
      handler() {
        console.log("zoom", this.zoom);
        if (this.zone) {
          this.zone.setRadius(store.radius * 1000);
        }
      },
      immediate: true,
    },
    "store.addressList.length": {
      handler() {
        console.log("address list change");
        if (this.markers) this.markers.clearLayers();
        this.drawMarkers();
      },
    },
    zoom() {
      if (this.zone) {
        this.map.setZoom(this.zoom);
      }
    },
    latitude() {
      if (!this.zone) {
        this.zone = L.circle([this.latitude, this.longitude], {
          radius: store.radius * 1000,
          color: "#8ee9ce",
        }).addTo(this.map);
      }

      this.zone.setLatLng([this.latitude, this.longitude]);
      // this.map.setView([this.latitude, this.longitude], this.zoom);
      this.map.flyTo([this.latitude, this.longitude], this.zoom);
    },
  },
  methods: {
    drawMarkers() {
      console.log("drawing markes...", store.addressList);
      store.addressList.forEach((apartment) => {
        this.marker = L.circleMarker(
          [apartment.latitude, apartment.longitude],
          {
            radius: 5,
            stroke: false,
            fillColor: "#ff0000",
            fillOpacity: 0.8,
          }
        ).addTo(this.markers);
      });
      this.markers.addTo(this.map);
    },
  },

  computed: {
    zoom() {
      return 10 - Math.round((store.radius / 200) * 3);
    },
    latitude() {
      return store.position.lat;
    },
    longitude() {
      return store.position.lon;
    },
  },
  mounted() {
    this.map = L.map("map").setView([this.latitude, this.longitude], this.zoom);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      this.map
    );
    this.zone = L.circle([this.latitude, this.longitude], {
      radius: store.radius * 1000,
      color: "#8ee9ce",
    }).addTo(this.map);
    this.markers = L.layerGroup();
    this.drawMarkers();
  },
};
</script>

<style lang="scss" scoped>
#map {
  height: 100%;
}
</style>
