<template>
  <div class="card-wrapper" v-if="store.addressList">
    <router-link
      v-for="(apartment, index) in store.addressList"
      :to="{ name: 'apartments.show', params: { slug: apartment.slug } }"
    >
      <div class="apartment-card">
        <div class="card-inner" :class="{ sponsored: !apartment.sponsored }">
          <div class="apartment-card-image">
            <Carousel :apartment="apartment" />
            <div class="icon-sponsor d-none">
              <font-awesome-icon icon="award" />
            </div>
          </div>
          <div class="apartment-card-body">
            <div class="location">
              {{ apartment.region }}, {{ apartment.country }}
            </div>
            <div class="name">{{ apartment.name }}</div>
            <div class="filters d-flex gap-4">
              <div class="">
                <font-awesome-icon class="me-2" icon="house" />{{
                  apartment.rooms
                }}
              </div>
              <div class="">
                <font-awesome-icon class="me-2" icon="bed" />{{
                  apartment.beds
                }}
              </div>
              <div class="">
                <font-awesome-icon class="me-2" icon="toilet" />{{
                  apartment.bathrooms
                }}
              </div>
            </div>

            <div class="services d-flex gap-4">
              <font-awesome-icon
                v-for="service in apartment.services"
                :class="{ active: store.services[service.id - 1].active }"
                :icon="store.services[service.id - 1].icon"
              />
            </div>
            <p class="distance" v-show="apartment.distance">
              {{ apartment.distance }} kilometers away
            </p>
          </div>
        </div>
      </div>
    </router-link>
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

.card-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
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
    border-radius: 10px;
    overflow: hidden;

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

    & > * {
      flex: 1 1 50%;
    }

    .apartment-card-body {
      padding: 20px 18px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      font-size: 13px;

      .location {
        font-size: 14px;
        font-weight: 800;
      }

      .name {
        font-weight: 300;
        font-size: 14px;
        font-style: italic;
        color: rgba(0, 0, 0, 0.473);
      }
      .filters,
      .services {
        color: grey;
        & .active {
          color: rgb(0, 182, 142);
        }
      }

      .distance {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.8);
      }
    }
  }

  // &::after {
  //   content: "";
  //   display: block;
  //   background-color: rgba(0, 0, 0, 0.1);
  //   height: 2px;
  //   width: 80%;
  //   margin: 24px auto;
  // }
}
</style>
