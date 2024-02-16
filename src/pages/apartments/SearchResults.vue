<template>
  <header class="shadow">
    <div class="container">
      <SearchComponent />
    </div>
  </header>
  <section class="search-results">
    <div class="container">
      <SearchResultsWithMap />
    </div>
  </section>
</template>

<script>
import SearchComponent from "../../components/SearchComponent.vue";
import SearchResultsComponent from "../../components/SearchResultsComponent.vue";
import SponsoredResultsComponent from "../../components/SponsoredResultsComponent.vue";
import ResultsMap from "../../components/ResultsMap.vue";
import SearchResultsWithMap from "../../components/SearchResultsWithMap.vue";
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
  padding: 0;
  max-width: 1000px;
}
header {
  padding: 20px;
  z-index: 99999;
}
.search-results {
  padding: 20px;
  flex-grow: 1;
  overflow: hidden;
  .container {
    height: 100%;
  }
}
</style>
