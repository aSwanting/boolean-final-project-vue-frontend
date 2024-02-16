<template>
  <DefaultLayout>
    <main class="container" v-if="apartment">

      <div class="container-carousel">
        <div class="carousel mt-4">
          <Carousel :items="apartment" />
        </div>
      </div>


      <h2 class="title">{{ apartment.name }}</h2>


      <div class="apartment">
        <p class="fw-bold">{{ apartment.address }}, {{ apartment.country }}</p>
        <p>{{ apartment.description }}</p>

        <div class="info">
          <p class="fw-bold">Apartment Info:</p>
          <div class="container mb-4">
            <div class="row justify-content-evenly">
              <div class="col-auto d-flex align-items-center service py-1 flex-grow-1">
                <span>
                  <font-awesome-icon icon="bed" class="me-2" />
                  Beds : {{ apartment.beds }}</span>
              </div>
              <div class="col-auto d-flex align-items-center service py-1 flex-grow-1">
                <span>
                  <font-awesome-icon icon="fa-regular fa-square" class="me-2" />
                  Rooms : {{ apartment.rooms }}
                </span>
              </div>
              <div class="col-auto d-flex align-items-center service py-1 flex-grow-1">
                <span>
                  <font-awesome-icon icon="toilet" class="me-2" />
                  Bathrooms : {{ apartment.bathrooms }}</span>
              </div>
              <div class="col-auto d-flex align-items-center service py-1 flex-grow-1">
                <span>
                  <font-awesome-icon icon="house" class="me-2" />
                  Square meters : {{ apartment.square_meters }}&#xb2;
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="services">
          <p class="fw-bold">Services:</p>
          <div class="container mb-4">
            <div class="row justify-content-evenly">
              <div class="col-auto d-flex align-items-center service py-1 flex-grow-1"
                v-for="service in apartment.services" :key="service.id">
                <span class="service-name">{{ service.name }}</span> <font-awesome-icon class="ms-1"
                  :icon="serviceIcons[service.id - 1]" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
    <Loading v-else></Loading>
    <div class="container">
      <div id="map"></div>
      <button class="contact btn-primary text-center" @click="showModal">
        <span class="fw-bold primary align-middle">
          Contact
        </span>
        <i>
          <font-awesome-icon class="ms-3 align-middle" :icon="['fas', 'message']" />
        </i>

      </button>
    </div>

    <MessageModal @close-modal="closeModal" v-show="isModalVisible" :items="apartment">
      <template v-slot:header>
        <h4>
          Send a message to {{ apartment.user.first_name }}
        </h4>
      </template>
      <template v-slot:body>
      </template>
    </MessageModal>
  </DefaultLayout>
</template>
<script>
import axios from "axios";
import DefaultLayout from "../../layouts/DefaultLayout.vue";
import Loading from "../../components/Loading.vue";
import Carousel from "../../components/ApartmentImagesCarousel.vue";
import store from "../../store";
import { RouterLink } from "vue-router";
import MessageModal from '../../components/MessageModal.vue';
import { format } from 'date-fns';

export default {
  components: {
    Loading,
    DefaultLayout,
    Carousel,
    RouterLink,
    MessageModal,

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
      isModalVisible: false,
      serviceIcons: [
        "wifi",
        "water-ladder",
        "parking",
        "dumbbell",
        "shield",
        "jug-detergent",
        "paw",
        "mug-saucer",
        "hammer",
        "bell-concierge",
      ],
    };
  },
  methods: {
    fetchApartment() {
      axios.get(`${this.BASE_URL}/apartments/${this.slug}`).then((res) => {
        this.apartment = res.data.apartment;
        console.log(this.apartment);
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
      let map = L.map('map').setView([this.apartment.latitude, this.apartment.longitude], 13);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

      let marker = L.marker([this.apartment.latitude, this.apartment.longitude]).addTo(map);
    },
    closeModal() {
      this.isModalVisible = false
      // console.log('click')
    },
    showModal() {
      this.isModalVisible = true
    }
  },
  created() {
    this.fetchApartment();
  }
};
</script>
<style lang="scss" scoped>
@use "../../styles/partials/variables" as *;



.container-carousel {
  max-width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100px;
  position: relative;

  .carousel {
    overflow-x: hidden;
    max-width: 100%;
    background-color: $light-grey;
    margin-bottom: 20px;
  }


  .title::first-letter {
    text-transform: uppercase;

  }

  .title {

    text-align: center;
    margin-bottom: 8px;

  }

  .apartment-info {
    padding: 0 30px;
  }





}

#map {
  border-radius: 10px;
  min-width: 250px;
  min-height: 250px;
}

.service {

  justify-content: center;
  flex-direction: column-reverse;
  min-width: 100px;

}


.contact {
  margin-top: 20px;
}



@media (min-width: 576px) {}

@media screen and (min-width: 768px) {
  .service {
    flex-direction: row;
    justify-content: space-evenly;
  }
}


@media (min-width: 992px) {}


@media (min-width: 1200px) {}


@media (min-width: 1400px) {}
</style>
