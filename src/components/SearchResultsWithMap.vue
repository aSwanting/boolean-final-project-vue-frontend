<template>
  <div class="map-toggle btn btn-primary shadow" @click="viewToggle()">
    MAP VIEW
  </div>
  <div class="wrapper">
    <div class="results p-3" :class="{ 'map-view': mapView }">
      <SearchResults />
    </div>
    <div class="map" :class="{ 'map-view': mapView }">
      <ResultsMap />
    </div>
  </div>
</template>

<script>
import store from "../store";
import ResultsMap from "./ResultsMap.vue";
import SearchResults from "./SearchResultsComponent.vue";
export default {
  components: {
    ResultsMap,
    SearchResults,
  },
  data() {
    return {
      store,
      mapView: false,
    };
  },
  methods: {
    viewToggle() {
      return (this.mapView = !this.mapView);
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/partials/variables" as *;

.wrapper {
  overflow: hidden;
  height: 100%;
  position: relative;
  // display: flex;
  // gap: 15px;
  // & > * {
  //   border: 3px solid purple;
  // }
  // .results {
  //   flex: 1 1 100%;
  //   overflow: auto;
  //   // padding: 3px;
  // }
  // .map {
  //   flex: 1 1 50%;
  // }
  .results {
    height: 100%;
    width: 100%;
    left: 0%;
    position: absolute;
    overflow: auto;
    transition: 300ms all;
    &.map-view {
      left: -100%;
    }
  }
  .map {
    height: 100%;
    width: 100%;
    left: 100%;
    position: absolute;
    transition: 300ms all;
    &.map-view {
      left: 0%;
    }
  }
}
.map-toggle {
  position: absolute;
  top: 95%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999999;
  // padding: 10px 60px;
  width: 80%;
}

@media (min-width: 768px) {
  .wrapper {
    .results {
      width: 50%;
      // left: 0%;
      // position: relative;
    }
    .map {
      width: 50%;
      left: 50%;
      // position: relative;
    }
  }
  .map-toggle {
    display: none;
  }
}
</style>
