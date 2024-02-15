<template>
  <div class="container">
    <div class="search-wrapper">
      <div class="search-component p-3 border rounded shadow">
        <SearchComponent />
      </div>
      <div class="results-component overflow-hidden">
        <SearchResultsWithMap />
      </div>
    </div>
  </div>
</template>

<script>
import SearchComponent from "../components/SearchComponent.vue";
import SearchResultsComponent from "../components/SearchResultsComponent.vue";
import SponsoredResultsComponent from "../components/SponsoredResultsComponent.vue";
import ResultsMap from "../components/ResultsMap.vue";
import SearchResultsWithMap from "../components/SearchResultsWithMap.vue";
export default {
  components: {
    SearchComponent,
    SearchResultsComponent,
    SponsoredResultsComponent,
    ResultsMap,
    SearchResultsWithMap,
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  max-width: 90%;
}
.search-wrapper {
  display: flex;
  flex-direction: column;
  padding: 30px;
  height: 100%;
  gap: 30px;
  .search-component {
  }
  .results-component {
    flex-grow: 1;
  }
}
</style>
