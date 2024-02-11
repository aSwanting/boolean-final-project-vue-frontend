<template>
  <DefaultLayout>
    <ApartmentSearch />
    <AdvancedSearch />
    <carousel />
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "../layouts/DefaultLayout.vue";
import AdvancedSearch from "../components/AdvancedSearch.vue";
import ApartmentSearch from "../components/ApartmentSearch.vue";
import Carousel from "../components/Carousel.vue";
export default {
  components: {
    DefaultLayout,
    ApartmentSearch,
    AdvancedSearch,
    Carousel,
  },
};
</script>

<style lang="scss" scoped></style>
