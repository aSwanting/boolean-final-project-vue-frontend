<template>
  <div id="map"></div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";

export default {
  mounted() {
    const newMap = L.map("map").setView([45.463619, 9.18812], 6);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(newMap);
  },
};
</script>

<style lang="scss" scoped>
#map {
  height: 100%;
}
</style>
