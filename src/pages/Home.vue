<template>
  <div class="text-center border rounded shadow p-5 m-5">
    <SearchComponent />
  </div>
  <div class="text-center border rounded shadow p-5 m-5">
    <SearchResultsComponent />
  </div>
</template>

<script>
import SearchComponent from "../components/SearchComponent.vue";
import SearchResultsComponent from "../components/SearchResultsComponent.vue";
export default {
  components: {
    SearchComponent,
    SearchResultsComponent,
  },
};
</script>

<style lang="scss" scoped></style>
