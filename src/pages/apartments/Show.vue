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
      <div class="apartment-info">
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
    <Loading v-else></Loading>
  </DefaultLayout>
</template>
<script>
import axios from "axios";
import DefaultLayout from "../../layouts/DefaultLayout.vue";
import Loading from "../../components/Loading.vue";
import Carousel from "../../components/ApartmentImagesCarousel.vue";
import store from "../../store";

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
    };
  },
  methods: {
    fetchApartment() {
      axios.get(`${this.BASE_URL}/apartments/${this.slug}`).then((res) => {
        this.apartment = res.data.apartment;
      });
    },
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
.container {
  max-width: 90%;
  margin: 0 auto;

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
</style>
