<template>
  <!-- <DefaultLayout> -->
  <header class="shadow">
    <div class="container">
      <SearchComponent />
    </div>
  </header>
  <section class="search-results">
    <div class="container-fluid h-100 p-0">
      <SearchResultsWithMap />
    </div>
  </section>
  <!-- </DefaultLayout> -->
</template>

<script>
import DefaultLayout from "../../layouts/DefaultLayout.vue";
import SearchComponent from "../../components/SearchComponent.vue";
import SearchResultsComponent from "../../components/SearchResultsComponent.vue";
import SponsoredResultsComponent from "../../components/SponsoredResultsComponent.vue";
import ResultsMap from "../../components/ResultsMap.vue";
import SearchResultsWithMap from "../../components/SearchResultsWithMap.vue";
export default {
  components: {
    DefaultLayout,
    SearchComponent,
    SearchResultsComponent,
    SponsoredResultsComponent,
    ResultsMap,
    SearchResultsWithMap,
  },
};
</script>

<style lang="scss" scoped>
// .container {
//   padding: 0;
//   max-width: 1000px;
// }
header {
  padding: 20px;
  z-index: 99999;
}
.search-results {
  // padding: 20px 0;
  flex-grow: 1;
  overflow: auto;
}
</style>
