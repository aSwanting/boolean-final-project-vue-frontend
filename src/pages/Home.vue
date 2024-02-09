<template>
  <DefaultLayout>
    <AdvancedSearch />
    <ApartmentSearch />
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "../layouts/DefaultLayout.vue";
import AdvancedSearch from "../components/AdvancedSearch.vue";
import ApartmentSearch from "../components/ApartmentSearch.vue";
export default {
  components: {
    DefaultLayout,
    ApartmentSearch,
    AdvancedSearch,
  },
};
</script>

<style lang="scss" scoped></style>
