<template>
  <div>
    <div class="container">
      <div
        class="d-grid gap-3"
        style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))"
        v-if="store.sponsoredAddressList"
      >
        <div v-for="apartment in store.sponsoredAddressList">
          <ApartmentCard :apartment="apartment">
            <Carousel
              :apartment="apartment"
              class="shadow"
              :class="{
                'border border-4 border-primary': !apartment.sponsored,
              }"
            />
          </ApartmentCard>
        </div>
      </div>
      <div v-else>No addresses loaded</div>
    </div>
  </div>
</template>

<script>
import store from "../store";
import ApartmentCard from "./ApartmentCard.vue";
import Carousel from "./Carousel.vue";
export default {
  components: {
    ApartmentCard,
    Carousel,
  },
  data() {
    return {
      store,
    };
  },
};
</script>

<style lang="scss" scoped></style>
