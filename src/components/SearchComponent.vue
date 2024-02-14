<template>
  <div>
    <div class="display-6 mb-3">SEARCH COMPONENT</div>
    <div class="btn btn-primary" @click="fetchApartments()">
      Fetch Services and Apartments
    </div>
  </div>
</template>

<script>
import store from "../store";
export default {
  data() {
    return {
      store,
    };
  },
  methods: {
    async fetchApartments() {
      console.log("fetch apartments");
      await store.fetchApartments();
      console.log("address", store.addressList);
      console.log("services", store.serviceList);
    },
  },
};
</script>

<style lang="scss" scoped></style>
