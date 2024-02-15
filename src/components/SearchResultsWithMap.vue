<template>
  <div class="wrapper">
    <div class="results">
      <SearchResults />
    </div>
    <div class="map">
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
    };
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/partials/variables" as *;

.wrapper {
  overflow: hidden;
  height: 100%;
  display: flex;
  // gap: 15px;
  .results {
    flex: 1 1 50%;
    overflow: auto;
    // padding: 3px;
  }
  .map {
    flex: 1 1 50%;
  }
}
</style>
