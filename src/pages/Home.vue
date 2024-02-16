<template>
  <DefaultLayout>
    <div class="mb-5">
      <ApartmentSearch />
      <AdvancedSearch />
    </div>
    <SponsoredResultsComponent />
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "../layouts/DefaultLayout.vue";
import AdvancedSearch from "../components/AdvancedSearch.vue";
import ApartmentSearch from "../components/ApartmentSearch.vue";
import SponsoredResultsComponent from "../components/SponsoredResultsComponent.vue";

export default {
  components: {
    DefaultLayout,
    ApartmentSearch,
    AdvancedSearch,
    SponsoredResultsComponent,
  },
};
</script>

<style lang="scss" scoped></style>
