<template>
  <div class="pe-3" v-if="store.addressList">
    <div v-for="(apartment, index) in store.addressList" class="apartment-card">
      <div class="card-inner" :class="{ sponsored: !apartment.sponsored }" @click="goToShow(index)">
        <div class="apartment-card-image">
          <Carousel :apartment="apartment" />
          <div class="icon-sponsor d-none">
            <font-awesome-icon icon="award" />
          </div>
        </div>
        <div class="apartment-card-body">
          <p class="location">
            {{ apartment.region }}, {{ apartment.country }}
          </p>
          <p class="name">{{ apartment.name }}</p>
          <p class="distance" v-show="apartment.distance">
            {{ apartment.distance }} kilometers away
          </p>
        </div>
      </div>
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
  methods: {
    goToShow(index) {
      const slug = store.addressList[index].slug;
      this.$router.push({ path: `/apartments/${slug}` });
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/partials/variables" as *;

p {
  margin: 0;
}

.apartment-card {
  // padding: 0 25px;

  .card-inner {
    display: flex;
    height: 205px;
    cursor: pointer;
    box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.05);
    transition: 200ms all;
    position: relative;

    &:hover {
      box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.2);
    }

    &.sponsored {
      border: 3px solid #ffbf00;

      .icon-sponsor {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 20px;
        color: #ffbf00;
        display: block !important;
      }
    }


    &>* {
      flex: 1 1 50%;
    }

    .apartment-card-image {}

    .apartment-card-body {
      padding: 24px 18px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .location {
        font-size: 16px;
        font-weight: 800;
      }

      .name {
        font-weight: 300;
        font-size: 18px;
        font-style: italic;
        color: rgba(0, 0, 0, 0.473);
      }

      .distance {
        color: rgba(0, 0, 0, 0.8);
      }
    }
  }

  &::after {
    content: "";
    display: block;
    background-color: rgba(0, 0, 0, 0.1);
    height: 2px;
    width: 80%;
    margin: 24px auto;
  }
}
</style>
