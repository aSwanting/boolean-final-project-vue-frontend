<template>
  <div>
    <div class="display-6 mb-3">SEARCH RESULTS COMPONENT</div>

    <div class="p-3 m-3 border rounded shadow">
      <div class="fw-bold mb-3">Services</div>
      <div v-if="store.serviceList">
        <div>{{ store.serviceList.map((e) => e.name).join(", ") }}</div>
      </div>
      <div v-else>No addresses loaded</div>
    </div>

    <div class="p-3 m-3 border rounded shadow">
      <div class="fw-bold mb-3">Addresses</div>
      <div
        class="d-grid gap-3"
        style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))"
        v-if="store.addressList"
      >
        <div v-for="apartment in store.addressList">
          <ApartmentCard :apartment="apartment"
            ><Carousel :apartment="apartment" />
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
