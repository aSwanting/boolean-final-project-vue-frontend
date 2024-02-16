<template>
  <DefaultLayout>

    <div class="container" v-if="apartment">

      <figure v-if="apartment.images.length < 1">
        <img class="cover-img" :src="`${BASE_URL_COVER_IMG}${apartment.cover_image}`" alt="">
      </figure>

      <div class="carousel" v-else>
        <Carousel :items="apartment" />
      </div>


      <!-- <div class="container-images">
            <img class="images" v-for="img in apartment.images " :key="img.id" :src="`${BASE_URL_IMAGES}${img.link}`">
        </div> -->
    </div>
    <Loading v-else></Loading>
    <div class="container apt-info">
      <div class="row flex-row justify-content-between">
        <div class="col-6">
          <div class="apartment-info" v-if="apartment">
            <h3>{{ apartment.name }}</h3>
            <p>{{ apartment.address }}, {{ apartment.country }}</p>
            <p>{{ apartment.description }}</p>
            <div class="services">
              <div class="col-2" v-for="service in apartment.services" :key="service.id">
                {{ service.name }}
              </div>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div id="map"></div>
        </div>
      </div>
    </div>

  </DefaultLayout>
</template>
<script>
import axios from "axios";
import DefaultLayout from "../../layouts/DefaultLayout.vue";
import Loading from "../../components/Loading.vue";
import Carousel from "../../components/ApartmentImagesCarousel.vue";
import store from "../../store";
import { format } from 'date-fns';

export default {
  components: {
    Loading,
    DefaultLayout,
    Carousel,
  },
  props: {
    slug: String,
  },

  data() {
    return {
      store,
      apartment: null,
      BASE_URL: "http://127.0.0.1:8000/api",
      BASE_URL_COVER_IMG: "http://127.0.0.1:8000/storage/cover_images/",
      BASE_URL_IMAGES: `http://127.0.0.1:8000/storage/images/`,
      data: {},
      map: null,
    };
  },
  methods: {
    fetchApartment() {
      axios.get(`${this.BASE_URL}/apartments/${this.slug}`).then((res) => {
        this.apartment = res.data.apartment;
        this.getIPAddress();
        this.getMap();
      });
    },
    getIPAddress() {
      axios.get('https://api.ipify.org?format=json')
        .then((res) => {
          this.data = {
            IPAddress: res.data.ip,
            apartmentID: this.apartment.id,
            date: format(new Date(), 'yy-MM-dd HH:mm:ss'),
          }
          this.postVisit();
        })
        .catch((error) => {
          console.error('Si è verificato un errore durante il recupero dell\'indirizzo IP:', error);
        })
    },
    postVisit() {
      axios.post(`${this.BASE_URL}/apartments/visits`, this.data)
        .then((res) => {
          console.log('Indirizzo IP salvato con successo nel back-end.', res);
        })
        .catch((error) => {
          console.error('Si è verificato un errore durante il salvataggio dell\'indirizzo IP nel back-end:', error);
        })
    },
    getMap() {
      this.map = L.map('map').setView([this.apartment.latitude, this.apartment.longitude], 10);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map);

      let marker = L.marker([this.apartment.latitude, this.apartment.longitude]).addTo(this.map);
    }
  },
  created() {
    this.fetchApartment();
  }
};
</script>
<style lang="scss" scoped>
.apartment-info {
  height: 500px;
}

.container {
  max-width: 90%;
  margin: 0 auto;
  min-height: 100px;
  position: relative;

  .carousel {
    overflow-x: hidden;
    max-width: 100%;
    padding: 20px 0;
  }
}

.container-images {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.cover-img {
  display: block;
  width: 500px;
  margin: 16px auto;
}

.images {
  max-width: 150px;
  display: block;
}

.services {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.col-2 {
  flex-basis: calc(100% / 6);
}

.apartment-info {
  padding: 12px;

  * {
    margin: 8px 0;
  }
}

#map {
  min-width: 100px;
  min-height: 100px;
  max-height: 500px;
  max-width: 500px;
  height: 100%;
}
</style>
