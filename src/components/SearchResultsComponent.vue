<template>
  <div v-if="store.addressList">
    <div v-for="apartment in store.addressList" class="apartment-card">
      <div class="card-image">
        <Carousel
          :apartment="apartment"
          :class="{
            'border border-4 border-primary': !apartment.sponsored,
          }"
        />
      </div>
      <div class="card-body">
        <p class="location">{{ apartment.region }}, {{ apartment.country }}</p>
        <p class="name">{{ apartment.name }}</p>
        <p class="distance" v-show="apartment.distance">
          {{ apartment.distance }} kilometers away
        </p>
      </div>
      <!-- <ApartmentCard :apartment="apartment">
        <Carousel
          :apartment="apartment"
          :class="{
            'border border-4 border-primary': !apartment.sponsored,
          }"
        />
      </ApartmentCard> -->
    </div>
  </div>
  <div class="position-relative h-100" v-else>
    <Loading />
  </div>
</template>

<script>
import store from "../store";
import ApartmentCard from "./ApartmentCard.vue";
import Carousel from "./Carousel.vue";
import Loading from "./Loading.vue";
export default {
  components: {
    ApartmentCard,
    Carousel,
    Loading,
  },
  data() {
    return {
      store,
    };
  },
};
</script>

<style lang="scss" scoped>
.apartment-card {
  display: flex;
  height: 200px;
  p {
    margin: 0;
  }
  & > * {
    width: 50%;
    padding: 15px;
    border-block: 1px solid rgba(0, 0, 0, 0.2);
  }

  .card-image {
  }
  .card-body {
  }
}
</style>
