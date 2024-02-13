<template>
  <DefaultLayout>
    <div
      v-if="store.queryData"
      class="search-component p-5 m-5 border rounded shadow"
    >
      <p>Query: {{ store.queryData.searchQuery }}</p>
      <p>Latitude: {{ store.queryData.latitude }}</p>
      <p>Longitude: {{ store.queryData.latitude }}</p>
      <p>Rooms: {{ store.queryData.rooms }}</p>
      <p>Beds: {{ store.queryData.beds }}</p>
      <p>Range: {{ store.queryData.search_radius }}km</p>
      <p>Services: {{ store.queryData.services.join(", ") }}</p>
    </div>
    <div class="search-component p-5 m-5 border rounded shadow" v-else>
      Query data was lost on reload :(
    </div>

    <div class="wrapper">
      <div v-if="apartments[0]" class="container">
        <div class="card-wrapper">
          <ApartmentCard
            class="apartment-card"
            v-for="apartment in apartments"
            :apartment="apartment"
          >
            <Carousel
              class="card-image"
              :class="{ sponsored: !apartment.sponsored }"
              :apartment="apartment"
            />
          </ApartmentCard>
        </div>
      </div>
      <div v-else-if="showLoader == false" class="no-apt">
        <p>There are no apartments with the selected values!</p>
        <router-link class="btn-primary" :to="{ name: 'home' }">
          Home
        </router-link>
      </div>
      <Loading v-show="showLoader == true"></Loading>
    </div>
  </DefaultLayout>
</template>

<script>
import store from "../../store";
import axios from "axios";
import ApartmentCard from "../../components/ApartmentCard.vue";
import Carousel from "../../components/Carousel.vue";
import Loading from "../../components/Loading.vue";
import DefaultLayout from "../../layouts/DefaultLayout.vue";
export default {
  components: {
    ApartmentCard,
    Carousel,
    Loading,
    DefaultLayout,
  },
  data() {
    return {
      store,
      apartments: [],
      showLoader: true,
    };
  },
  methods: {
    fetchResults() {
      axios.get("http://127.0.0.1:8000/api/apartments/results/").then((res) => {
        this.apartments = res.data.results;
        this.showLoader = false;
      });
    },
  },
  beforeMount() {
    this.fetchResults();
  },
};
</script>

<style lang="scss" scoped>
@use "../../styles/partials/variables" as *;
.card-image.sponsored {
  outline: 4px solid $primary;
}
.wrapper {
  position: relative;
  min-height: 360px;
}

.container {
  max-width: 1200px;
  padding: 50px;
  height: 100%;
}

.card-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 25px;

  .apartment-card {
    cursor: pointer;
  }
}

.no-apt {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;

  .btn-primary {
    flex-shrink: 1;
  }
}
</style>
