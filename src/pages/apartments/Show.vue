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
      BASE_URL_COVER_IMG: "http://127.0.0.1:8000/storage/",
      BASE_URL_IMAGES: `http://127.0.0.1:8000/storage/`,
      isModalVisible: false,
    };
  },
  methods: {
    fetchApartment() {
      axios.get(`${this.BASE_URL}/apartments/${this.slug}`).then((res) => {
        this.apartment = res.data.apartment;
      });
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
  },
  mounted() {
    console.log("show montata");
  },
  unmounted() {
    console.log("show unmounted");
  },
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
}</style>
