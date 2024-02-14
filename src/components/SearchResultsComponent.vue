<template>
  <div>
    <div class="p-3 m-3 border rounded shadow">
      <div
        class="d-grid gap-3"
        style="grid-template-columns: repeat(auto-fit, minmax(150px, 1fr))"
        v-if="store.addressList"
      >
        <div v-for="apartment in store.addressList">
          <ApartmentCard :apartment="apartment">
            <Carousel
              :apartment="apartment"
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
