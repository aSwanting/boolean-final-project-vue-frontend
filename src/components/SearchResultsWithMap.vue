<template>
  <section>
    <div class="wrapper shadow">
      <div class="results">
        <SearchResults />
      </div>
      <div class="map">
        <ResultsMap />
      </div>
    </div>
  </section>
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

section {
  height: 100%;
}
.wrapper {
  overflow: hidden;
  border: 6px solid $primary;
  border-radius: 20px;
  height: 100%;
  display: flex;
  .results {
    width: 55%;
    overflow: auto;
  }
  .map {
    width: 45%;
  }
}
</style>
