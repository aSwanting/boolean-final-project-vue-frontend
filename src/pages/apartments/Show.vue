<template>
  <DefaultLayout>
    <header class="container">
      <ul class="topbar">
        <li class="topbar__item message-btn" @click="showModal">
          <i>
            <font-awesome-icon :icon="['fas', 'message']" />
          </i>
          <p>
            Message
          </p>
        </li>
        <li class="topbar__item share-btn">
          <i>
            <font-awesome-icon :icon="['fas', 'share']" />
          </i>
          <p>
            Share
          </p>
        </li>
        <li class="topbar__item save-btn">
          <i>
            <font-awesome-icon :icon="['fas', 'heart']" />
          </i>
          <p>
            Save
          </p>
        </li>
      </ul>
    </header>
    <main class="container" v-if="apartment">
      
      <div class="carousel">
        <Carousel :items="apartment" />
      </div>


      <h2 class="title">{{ apartment.name }}</h2>


      <div class="apartment-info">
        <p>{{ apartment.address }}, {{ apartment.country }}</p>
        <p>{{ apartment.description }}</p>
        <div class="services">
          <div class="col-2" v-for="service in apartment.services" :key="service.id">
            {{ service.name }}
          </div>
        </div>
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
    </main >
    <Loading v-else></Loading>
    <div class="container">
      <div id="map"></div>
    </div>
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
      var map = L.map('map').setView([this.apartment.latitude, this.apartment.longitude], 13);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

      var marker = L.marker([this.apartment.latitude, this.apartment.longitude]).addTo(map);
    }
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

.container {
  max-width: 100%;
  display: flex;
  flex-direction: column;

  .topbar {
    display: flex;
    width: 100%;
    align-items: center;
    order: -2;
    padding: 10px 30px;
    gap: 8px;
    background-color: $primary;
    flex-shrink: 0;
    height: 50px;
    font-weight: bold;

    .message-btn {
      flex-grow: 1;

    }
    .topbar__item:hover > i {
      
        font-size: 20px;
    }
    .topbar__item {
      display: flex;
      gap: 4px;
      align-items: center;
    }
  }
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


  @media (min-width: 576px) {
    .topbar {
      margin-bottom: 8px;
    }
    .title {
      order: -1;
    }
  }


  @media (min-width: 768px) {}


  @media (min-width: 992px) {}


  @media (min-width: 1200px) {}


  @media (min-width: 1400px) {}
}
#map {
  border-radius: 10px;
  min-width: 250px;
  min-height: 250px;
}
</style>
