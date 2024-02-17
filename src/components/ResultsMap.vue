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
      popup: null,
    };
  },
  watch: {
    radius() {
      if (this.zone) {
        this.zone.setRadius(this.radius * 1000);
      }
    },
    "store.addressList.length": {
      handler() {
        if (this.markers) this.markers.clearLayers();
        if (store.addressList) this.drawMarkers();
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
          radius: this.radius * 1000,
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
      store.addressList.forEach((apartment) => {
        this.marker = L.marker([apartment.latitude, apartment.longitude]).addTo(
          this.markers
        );
        this.popup = L.popup({ interactive: true }).setContent(` <div class="d-flex flex-column" style="width: 200px; margin-left: 4px;"><a href="http://localhost:5174/apartments/${apartment.slug}" ><img src="http://127.0.0.1:8000/storage/cover_images/${apartment.cover_image}" style="width: 100%;"><p>${apartment.address}</p></a></div>`);
        this.marker.bindPopup(this.popup)
      });
      this.markers.addTo(this.map);
    },

  },

  computed: {
    radius() {
      return store.filters[0].value;
    },
    zoom() {
      return 10 - Math.round((this.radius / 200) * 3);
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
      radius: this.radius * 1000,
      color: "#8ee9ce",
    }).addTo(this.map);
    this.markers = L.layerGroup();
    if (store.addressList) this.drawMarkers();
  },
};
</script>

<style lang="scss" scoped>
#map {
  height: 100%;
}
</style>
