<template>
  <DefaultLayout>

    <div class="container d-flex  justify-content-between column-gap-4">
      <div class="search-component p-5  border rounded shadow flex-grow-1 ">
        <p>Query: {{ query.searchQuery }}</p>
        <p>Latitude: {{ query.latitude }}</p>
        <p>Longitude: {{ query.latitude }}</p>
        <p>Rooms: {{ query.rooms }}</p>
        <p>Beds: {{ query.beds }}</p>
        <p>Range: {{ query.search_radius }}km</p>
        <!-- <p>Services:{{ query.services.join(", ") }}</p> -->
      </div>
      <div id="map"></div>
    </div>



    <div class="wrapper">
      <div v-if="apartments" class="container">
        <div class="card-wrapper">
          <ApartmentCard class="apartment-card" v-for="apartment in apartments" :apartment="apartment">
            <Carousel class="card-image" :class="{ sponsored: !apartment.sponsored }" :apartment="apartment" />
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
      query: "",
    };
  },
  methods: {
    async fetchResults() {
      await axios.get("http://127.0.0.1:8000/api/apartments/results/").then((res) => {
        console.log(res.data);
        this.apartments = res.data.results.apartments;
        this.query = res.data.results.query;
        this.showLoader = false;
        this.getMap();
      });
    },
    getMap() {
      var map = L.map('map').setView([this.query.latitude, this.query.longitude], 11);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

      map.on('moveend', () => {

        let bounds = map.getBounds();
        let center = map.getCenter();
        let distance1 = map.distance(center, bounds._northEast);
        console.log(distance1 / 1000, center);

      })

      this.apartments.forEach(apartment => {
        var marker = L.marker([apartment.latitude, apartment.longitude]).on('click', () => {
          // this.$router.push({ name: 'apartments.show', params: { slug: apartment.slug } })
          console.log('hello')
        }).addTo(map);
        var popup = L.popup({ interactive: true }).setContent(`<a href="http://localhost:5174/apartments/${apartment.slug}">${apartment.address}</a>`)



        // popup.on('click', () => {
        //   // this.$router.push({ name: 'apartments.show', params: { slug: apartment.slug } })
        //   console.log('hello')
        // });

        marker.bindPopup(popup);
      });


    },

  },
  beforeMount() {
    this.fetchResults();

  }
};
</script>

<style lang="scss" scoped>
@use "../../styles/partials/variables" as *;

#map {
  height: 350px;
  aspect-ratio: 1;
  border-radius: 10px;
}

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
