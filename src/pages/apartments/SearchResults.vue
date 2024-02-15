<template>
  <DefaultLayout>
    <SearchComponent></SearchComponent>

    <div class="container d-flex  justify-content-between column-gap-4">
      <div id="map"></div>
    </div>

    <SearchResultsComponent v-if="store.addressList"></SearchResultsComponent>

    <div class="wrapper" v-else>
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
import SearchComponent from "../../components/SearchComponent.vue";
import SearchResultsComponent from "../../components/SearchResultsComponent.vue"
export default {
  components: {
    ApartmentCard,
    Carousel,
    Loading,
    DefaultLayout,
    SearchComponent,
    SearchResultsComponent

  },
  data() {
    return {
      store,
      apartments: [],
      showLoader: true,
      query: null,
      map: null,
      markers: null,
      marker: null,
      popup: null,

    };
  },
  methods: {
    async fetchApartments() {
      await axios.get("http://127.0.0.1:8000/api/apartments/all").then((res) => {

        let allApartments = res.data.results.apartments;
        if (this.map) {
          allApartments.forEach(apartment => {
            let marker = L.marker([apartment.latitude, apartment.longitude]).addTo(this.map);
            let popup = L.popup().setContent(`<a href="http://localhost:5174/apartments/${apartment.slug}">${apartment.address}</a>`);
            marker.bindPopup(popup);

          });
        }
      })
    },
    async fetchResults() {
      await axios.get("http://127.0.0.1:8000/api/apartments/results/").then((res) => {

        this.apartments = res.data.results.apartments;
        this.query = res.data.results.query;
        store.addressList = this.apartments
        store.data = this.query
        console.log(this.query);
        this.showLoader = false;
        this.getMap();

      });
    },
    getMap() {
      this.map = L.map('map').setMinZoom(3).setMaxZoom(15).setView([this.query.latitude, this.query.longitude]).setZoom(this.radiusConverting(this.query.search_radius))
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map);
      console.log(this.query.search_radius);
      this.markers = L.layerGroup();
      this.apartments.forEach(apartment => {
        this.marker = L.marker([apartment.latitude, apartment.longitude]).addTo(this.markers)
      });
      this.markers.addTo(this.map);



      // this.map.on('moveend', () => {

      //   this.markers.clearLayers();

      //   let center = this.map.getCenter();
      //   store.data.latitude = center.lat.toFixed(6);
      //   store.data.longitude = center.lng.toFixed(6);

      //   store.searchApartments(store.data);

      //   store.addressList.forEach(apartment => {
      //     this.marker = L.marker([apartment.latitude, apartment.longitude]).addTo(this.markers).addTo(this.map);
      //   });;


      // });
      this.map.on('zoomend', () => {

        console.log(this.map.getZoom());
        // let bounds = this.map.getBounds();
        // let center = this.map.getCenter();
        // let range = this.map.distance(center, bounds._northEast) / 1000;
        // store.data.latitude = center.lat.toFixed(6);
        // store.data.longitude = center.lng.toFixed(6);
        // this.getRange(range);

        // store.searchApartments(store.data);

        // this.markers.clearLayers();

        // store.addressList.forEach(apartment => {
        //   this.marker = L.marker([apartment.latitude, apartment.longitude]).addTo(this.markers).addTo(this.map);
        // });;


      });





    },
    radiusConverting(i) {
      if (i <= 200 && i >= 161) {
        return 5
      } else if (i <= 160 && i >= 121) {
        return 6
      }
      else if (i <= 120 && i >= 81) {
        return 7
      }
      else if (i <= 90 && i >= 61) {
        return 7
      }
      else if (i <= 60) {
        return 8
      }

    }

  },
  watch: {
    "store.trigger": {
      handler() {

        if (this.map) {

          this.map.flyTo([store.data.latitude, store.data.longitude], this.radiusConverting(store.data.search_radius));
          this.markers.clearLayers();

          store.addressList.forEach(apartment => {
            this.marker = L.marker([apartment.latitude, apartment.longitude]).addTo(this.markers).addTo(this.map);
          })
        }

      },
      immediate: true,
    }
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
