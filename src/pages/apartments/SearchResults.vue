<template>
  <DefaultLayout>
    <section class="search-component shadow">
      <!-- <div class="container"> -->
      <SearchComponent />
      <!-- </div> -->
    </section>
    <section class="search-results">
      <div class="container-fluid h-100 p-0">
        <SearchResultsWithMap />
      </div>
    </section>
  </DefaultLayout>
</template>

<script>
import store from "../../store";
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
  data() {
    return {
      store,
    };
  },
  mounted() {
    if (store.addressList) {
      console.log("results loaded");
    } else {
      console.log("address lost to reload");
      store.jsonFetch();
    }
  },
};
</script>

<style lang="scss" scoped>
.search-results {
  flex-grow: 1;
  overflow: auto;
}
</style>
