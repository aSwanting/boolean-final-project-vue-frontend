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
import store from "../store";
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
  data() {
    return {
      store,
    };
  },
  async mounted() {
    if (!store.addressList) {
      console.log("fetching apartments and services...");
      await store.fetchApartmentsAndServices();
      console.log(store);
    }
  },
};
</script>

<style lang="scss" scoped></style>
